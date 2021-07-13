import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getEpic from "app/epics/queries/getEpic"
import deleteEpic from "app/epics/mutations/deleteEpic"

export const Epic = () => {
  const router = useRouter()
  const epicId = useParam("epicId", "number")
  const [deleteEpicMutation] = useMutation(deleteEpic)
  const [epic] = useQuery(getEpic, { id: epicId })

  return (
    <>
      <Head>
        <title>Epic {epic.id}</title>
      </Head>

      <div>
        <h1>Epic {epic.id}</h1>
        <pre>{JSON.stringify(epic, null, 2)}</pre>

        <Link href={Routes.EditEpicPage({ epicId: epic.id })}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteEpicMutation({ id: epic.id })
              router.push(Routes.EpicsPage())
            }
          }}
          style={{ marginLeft: "0.5rem" }}
        >
          Delete
        </button>
      </div>
    </>
  )
}

const ShowEpicPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.EpicsPage()}>
          <a>Epics</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Epic />
      </Suspense>
    </div>
  )
}

ShowEpicPage.authenticate = true
ShowEpicPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowEpicPage
