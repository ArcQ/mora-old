import { Link, useRouter, useMutation, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createEpic from "app/epics/mutations/createEpic"
import { EpicForm, FORM_ERROR } from "app/epics/components/EpicForm"

const NewEpicPage: BlitzPage = () => {
  const router = useRouter()
  const [createEpicMutation] = useMutation(createEpic)

  return (
    <div>
      <h1>Create New Epic</h1>

      <EpicForm
        submitText="Create Epic"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateEpic}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const epic = await createEpicMutation(values)
            router.push(Routes.ShowEpicPage({ epicId: epic.id }))
          } catch (error) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />

      <p>
        <Link href={Routes.EpicsPage()}>
          <a>Epics</a>
        </Link>
      </p>
    </div>
  )
}

NewEpicPage.authenticate = true
NewEpicPage.getLayout = (page) => <Layout title={"Create New Epic"}>{page}</Layout>

export default NewEpicPage
