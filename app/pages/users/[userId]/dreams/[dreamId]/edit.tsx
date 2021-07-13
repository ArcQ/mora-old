import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getDream from "app/dreams/queries/getDream"
import updateDream from "app/dreams/mutations/updateDream"
import { DreamForm, FORM_ERROR } from "app/dreams/components/DreamForm"

export const EditDream = () => {
  const router = useRouter()
  const dreamId = useParam("dreamId", "number")
  const userId = useParam("userId", "number")
  const [dream, { setQueryData }] = useQuery(
    getDream,
    { id: dreamId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateDreamMutation] = useMutation(updateDream)

  return (
    <>
      <Head>
        <title>Edit Dream {dream.id}</title>
      </Head>

      <div>
        <h1>Edit Dream {dream.id}</h1>
        <pre>{JSON.stringify(dream)}</pre>

        <DreamForm
          submitText="Update Dream"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateDream}
          initialValues={dream}
          onSubmit={async (values) => {
            try {
              const updated = await updateDreamMutation({
                id: dream.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(Routes.ShowDreamPage({ userId: userId!, dreamId: updated.id }))
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

const EditDreamPage: BlitzPage = () => {
  const userId = useParam("userId", "number")

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditDream />
      </Suspense>

      <p>
        <Link href={Routes.DreamsPage({ userId: userId! })}>
          <a>Dreams</a>
        </Link>
      </p>
    </div>
  )
}

EditDreamPage.authenticate = true
EditDreamPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditDreamPage
