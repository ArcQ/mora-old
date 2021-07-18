import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getDream from "app/dreams/queries/getDream"
import deleteDream from "app/dreams/mutations/deleteDream"

export const Dream = () => {
  const router = useRouter()
  const dreamId = useParam("dreamId", "number")
  const [deleteDreamMutation] = useMutation(deleteDream)
  const [dream] = useQuery(getDream, { id: dreamId })

  return (
    <>
      <Head>
        <title>Dream {dream.id}</title>
      </Head>

      <div>
        <h1>Dream {dream.id}</h1>
        <pre>{JSON.stringify(dream, null, 2)}</pre>

        <Link href={Routes.EditDreamPage({ dreamId: dream.id })}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteDreamMutation({ id: dream.id })
              router.push(Routes.DreamsPage())
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

const ShowDreamPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.DreamsPage()}>
          <a>Dreams</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Dream />
      </Suspense>
    </div>
  )
}

ShowDreamPage.authenticate = true
ShowDreamPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowDreamPage
