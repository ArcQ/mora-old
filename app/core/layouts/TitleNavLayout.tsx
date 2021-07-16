import { ReactNode } from "react"
import { Head } from "blitz"
import NavBar from "./NavBar"
import NavLayout from "./NavLayout"
import { LayoutProps } from "./Layout"

type TitleLayoutProps = LayoutProps & {
  displayTitle: string
  displayDescription: string
}

const TitleNavLayout = ({
  title,
  children,
  displayTitle,
  displayDescription,
}: TitleLayoutProps) => {
  return (
    <NavLayout>
      <div className="max-w-7xl mx-auto mb-5 mt-10">
        <h1 className="text-8xl my-5">{displayTitle}</h1>
        <p>{displayDescription}</p>
        {children}
      </div>
    </NavLayout>
  )
}

export default TitleNavLayout
