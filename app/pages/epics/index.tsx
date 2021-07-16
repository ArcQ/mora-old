import { Suspense } from "react"
import Image from "next/image"
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

      <div className="max-w-7xl mx-auto my-5">
        <h1 className="text-8xl my-5">Epics</h1>
        <p>Start contributing to issues you care about.</p>

        <a
          href="/component/card-8"
          className="relative block h-48 overflow-hidden bg-gray-100 rounded-lg shadow dark:bg-gray-800 xl:h-64"
        >
          <Image
            alt="tailwind Card"
            loading=""
            src="https://tailwindcomponents.com/storage/4193/conversions/temp49657-thumb.jpg"
            class="w-full h-full object-cover"
          />
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center space-x-4">
              <div className="flex flex-col space-y-1">
                <a
                  href="/component/card-8"
                  className="font-semibold text-gray-800 dark:text-gray-200 sm:text-lg dark:hover:text-primary hover:text-primary hover:underline"
                >
                  Card
                </a>
                <a
                  href="/u/akhil"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:underline"
                >
                  Akhil
                </a>
              </div>
            </div>
          </div>
        </a>

        <h1 className="text-2xl my-5 font-bold">Coming Soon</h1>

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
