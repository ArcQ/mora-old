import { Link, useRouter, useMutation, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createDream from "app/dreams/mutations/createDream"
import { DreamForm, FORM_ERROR } from "app/dreams/components/DreamForm"

const NewDreamPage: BlitzPage = () => {
  const router = useRouter()
  const [createDreamMutation] = useMutation(createDream)

  return (
    <div>
      <h1>Create New Dream</h1>

      <DreamForm
        submitText="Create Dream"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateDream}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const dream = await createDreamMutation(values)
            router.push(Routes.ShowDreamPage({ dreamId: dream.id }))
          } catch (error) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />

      <p>
        <Link href={Routes.DreamsPage()}>
          <a>Dreams</a>
        </Link>
      </p>
    </div>
  )
}

NewDreamPage.authenticate = true
NewDreamPage.getLayout = (page) => <Layout title={"Create New Dream"}>{page}</Layout>

export default NewDreamPage
