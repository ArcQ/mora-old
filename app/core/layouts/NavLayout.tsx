import { ReactNode } from "react"
import NavBar from "./NavBar"
import Layout from "./Layout"

type LayoutProps = {
  title?: string
  children: ReactNode
}

const NavLayout = ({ title, children }: LayoutProps) => {
  return (
    <Layout>
      <NavBar />
      {children}
    </Layout>
  )
}

export default NavLayout
