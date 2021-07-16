import { ReactNode } from "react"
import { Head } from "blitz"
import NavBar from "./NavBar"

type LayoutProps = {
  title?: string
  children: ReactNode
}

const Layout = ({ title, children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{title || "mora"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      {children}
    </>
  )
}

export default Layout
