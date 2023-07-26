import { Fragment } from "react"
import Mainheader from "./Mainheader"

const Layout = (props) => {
   return (
     <Fragment>
        <Mainheader />
        <main>{props.children}</main>
    </Fragment>)
}

export default Layout