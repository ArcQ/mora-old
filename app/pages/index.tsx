import { Suspense } from "react"
import { Link, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import logout from "app/auth/mutations/logout"
import NavLayout from "../core/layouts/NavLayout"

/*
 * This file is just for a pleasant getting started page for your new app.
 * You can delete everything in here and start from scratch if you like.
 */

const UserInfo = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)

  if (currentUser) {
    return (
      <>
        <button
          className="inline-flex items-center w-full px-6 py-3 text-sm font-medium leading-4 text-white bg-green-400 md:px-3 md:w-auto md:rounded-full lg:px-5 hover:bg-green-300 focus:outline-none md:focus:ring-2 focus:ring-0 focus:ring-offset-2 focus:ring-green-400"
          onClick={async () => {
            await logoutMutation()
          }}
        >
          Logout
        </button>
        <div>
          User id: <code>{currentUser.id}</code>
          <br />
          User role: <code>{currentUser.role}</code>
        </div>
      </>
    )
  } else {
    return (
      <>
        <Link href={Routes.SignupPage()}>
          <a className="w-full px-6 py-2 mr-0 text-gray-700 md:px-0 lg:pl-2 md:mr-4 lg:mr-5 md:w-auto">
            <strong>Sign Up</strong>
          </a>
        </Link>
        <Link href={Routes.LoginPage()}>
          <a className="inline-flex items-center w-full px-6 py-3 text-sm font-medium leading-4 text-white bg-green-400 md:px-3 md:w-auto md:rounded-full lg:px-5 hover:bg-green-300 focus:outline-none md:focus:ring-2 focus:ring-0 focus:ring-offset-2 focus:ring-green-400">
            <strong>Login</strong>
          </a>
        </Link>
      </>
    )
  }
}

const Home: BlitzPage = () => {
  return (
    <>
      <main>
        <section className="w-full px-6 pb-12 antialiased bg-white">
          <div className="mx-auto max-w-7xl">
            <div className="container max-w-lg px-4 py-32 mx-auto text-left md:max-w-none md:text-center">
              <h1 className="text-5xl font-extrabold leading-10 tracking-tight text-left text-gray-900 md:text-center sm:leading-none md:text-6xl lg:text-7xl">
                <span className="inline md:block">Mora Points.</span>{" "}
                <span className="relative mt-2 text-transparent bg-clip-text bg-gradient-to-br from-green-400 to-green-300 md:inline-block">
                  Let&apos;s fix the world together
                </span>
              </h1>
              <div className="mx-auto mt-5 text-gray-500 md:mt-12 md:max-w-lg md:text-center lg:text-lg">
                Make an impact on the most important issues.
                <br />
                Have fun while doing it.
              </div>
              <div className="flex flex-col items-center mt-12 text-center">
                <span className="relative inline-flex w-full md:w-auto">
                  <a
                    href="/signup"
                    type="button"
                    className="inline-flex items-center justify-center w-full px-8 py-4 text-base font-bold leading-6 text-white bg-green-400 border border-transparent rounded-full md:w-auto hover:bg-green-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400"
                  >
                    Sign up Now
                  </a>
                </span>
                <a href="#" className="mt-3 text-sm text-green-400">
                  We&apos;re in early alpha! Learn More
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer></footer>
    </>
  )
}

Home.suppressFirstRenderFlicker = false
Home.getLayout = (page) => <NavLayout title="Home">{page}</NavLayout>

export default Home
