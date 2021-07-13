import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getEpic from "app/epics/queries/getEpic"
import updateEpic from "app/epics/mutations/updateEpic"
import { EpicForm, FORM_ERROR } from "app/epics/components/EpicForm"

export const EditEpic = () => {
  const router = useRouter()
  const epicId = useParam("epicId", "number")
  const [epic, { setQueryData }] = useQuery(
    getEpic,
    { id: epicId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateEpicMutation] = useMutation(updateEpic)

  return (
    <>
      <Head>
        <title>Edit Epic {epic.id}</title>
      </Head>

      <div>
        <h1>Edit Epic {epic.id}</h1>
        <pre>{JSON.stringify(epic)}</pre>

        <EpicForm
          submitText="Update Epic"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateEpic}
          initialValues={epic}
          onSubmit={async (values) => {
            try {
              const updated = await updateEpicMutation({
                id: epic.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(Routes.ShowEpicPage({ epicId: updated.id }))
            } catch (error) {
              console.error(error)
              return {
                [FORM_ERROR]: error.toString(),
              }
            }
          }}
        />
      </div>
    </>
  )
}

const EditEpicPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditEpic />
      </Suspense>

      <p>
        <Link href={Routes.EpicsPage()}>
          <a>Epics</a>
        </Link>
      </p>
    </div>
  )
}

EditEpicPage.authenticate = true
EditEpicPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditEpicPage
