import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getEpics from "app/epics/queries/getEpics"

const ITEMS_PER_PAGE = 100

export const EpicsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ epics, hasMore }] = usePaginatedQuery(getEpics, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {epics.map((epic) => (
          <li key={epic.id}>
            <Link href={Routes.ShowEpicPage({ epicId: epic.id })}>
              <a>{epic.name}</a>
            </Link>
          </li>
        ))}
      </ul>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  )
}

const EpicsPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Epics</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewEpicPage()}>
            <a>Create Epic</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <EpicsList />
        </Suspense>
      </div>
    </>
  )
}

EpicsPage.authenticate = true
EpicsPage.getLayout = (page) => <Layout>{page}</Layout>

export default EpicsPage
