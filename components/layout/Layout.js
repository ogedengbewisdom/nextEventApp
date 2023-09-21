import { Fragment, useContext } from "react"
import Mainheader from "./Mainheader"
import Notification from "../../ui/notification"
import NotificationCtx from "../../store/notification-context"

const Layout = (props) => {

  const notificationCtx = useContext(NotificationCtx)
  const activeNotification = notificationCtx.notification
   return (
     <Fragment>
        <Mainheader />
        <main>{props.children}</main>
        {activeNotification && <Notification title={activeNotification.title} status={activeNotification.status} message={activeNotification.message} />}
    </Fragment>)
}

export default Layout