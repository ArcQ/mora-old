import { AuthenticationError, Link, useMutation, Routes } from "blitz"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/core/components/Form"
import login from "app/auth/mutations/login"
import { Login } from "app/auth/validations"

type LoginFormProps = {
  onSuccess?: () => void
}

export const LoginForm = (props: LoginFormProps) => {
  const [loginMutation] = useMutation(login)

  return (
    <div className="w-full lg:w-1/2 flex justify-center bg-white dark:bg-gray-900">
      <div className="w-full sm:w-4/6 md:w-3/6 lg:w-2/3 text-gray-800 dark:text-gray-100 flex flex-col justify-center px-2 sm:px-0 py-16">
        <div className="px-2 sm:px-6">
          <h3 className="text-2xl sm:text-3xl md:text-2xl font-bold leading-tight">
            Login To Your Account
          </h3>
        </div>

        <Form
          schema={Login}
          initialValues={{ email: "", password: "" }}
          onSubmit={async (values) => {
            try {
              await loginMutation(values)
              props.onSuccess?.()
            } catch (error) {
              if (error instanceof AuthenticationError) {
                return { [FORM_ERROR]: "Sorry, those credentials are invalid" }
              } else {
                return {
                  [FORM_ERROR]:
                    "Sorry, we had an unexpected error. Please try again. - " + error.toString(),
                }
              }
            }
          }}
        >
          <LabeledTextField name="email" label="Email" placeholder="Email" />
          <LabeledTextField
            name="password"
            label="Password"
            placeholder="Password"
            type="password"
          />

          <div className="pt-5">
            <div className="flex items-center">
              <input id="rememberme" name="rememberme" className="w-3 h-3 mr-2" type="checkbox" />
              <label htmlFor="rememberme" className="text-xs">
                Remember Me
              </label>
            </div>
            <Link href={Routes.ForgotPasswordPage()}>
              <a className="text-xs text-indigo-600" href="javascript: void(0)">
                Forgot Password?
              </a>
            </Link>
          </div>
          <div>
            <button
              type="submit"
              className="focus:outline-none w-full sm:w-auto bg-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 rounded text-white px-8 py-3 text-sm mt-6"
            >
              Login
            </button>
            <p className="mt-6 text-xs">
              Don’t Have An Account?{" "}
              <a className="underline text-indigo-600" href="/signup">
                Sign Up
              </a>
            </p>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default LoginForm
