import { Suspense } from "react"
import Image from "next/image"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getEpics from "app/epics/queries/getEpics"
import NavLayout from "../../core/layouts/NavLayout"
import TitleNavLayout from "../../core/layouts/TitleNavLayout"

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
              <a className="relative block overflow-hidden rounded-lg shadow dark:bg-gray-800 xl:h-64">
                <div className="relative h-48 w-full">
                  <Image
                    alt="tailwind Card"
                    loading="eager"
                    src="https://tailwindcomponents.com/storage/4193/conversions/temp49657-thumb.jpg"
                    className="w-full h-full object-cover"
                    layout="fill"
                  />
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex flex-col space-y-1">
                      <p className="font-semibold text-gray-800 dark:text-gray-200 sm:text-lg dark:hover:text-primary hover:text-primary hover:underline">
                        {epic.name}
                      </p>
                    </div>
                  </div>
                </div>
              </a>
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
        <h1 className="text-2xl my-5 font-bold">Coming Soon</h1>
        <Suspense fallback={<div>Loading...</div>}>
          <EpicsList />
        </Suspense>
        <p>
          <Link href={Routes.NewEpicPage()}>
            <a>Create Epic</a>
          </Link>
        </p>
      </div>
    </>
  )
}

EpicsPage.suppressFirstRenderFlicker = true
EpicsPage.getLayout = (page) => (
  <TitleNavLayout
    displayTitle="Epics"
    displayDescription="Epics are planet saving initiatives. You can't do everything yourself, pick the ones that mean the most to you. Let us do the hard work figuring out what we can do to help and how to measure how much impact we're making."
  >
    {page}
  </TitleNavLayout>
)

export default EpicsPage
