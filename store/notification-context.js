import { createContext, useState } from "react";


const NotificationCtx = createContext({
    notification: null,
    showNotification: (notification) => {},
    hideNotification: () => {}
})

export default NotificationCtx;

export const NotificationProvider = (props) => {

    const [showNotification, setShowNotification] = useState();

    const showNotificationHandler = (notification) => {
        setShowNotification(notification)
    };

    const hideNotificationHandler = () => {
        setShowNotification(null)
    };

    const contextValue = {
        notification: showNotification,
        showNotification: showNotificationHandler,
        hideNotification: hideNotificationHandler
    }

    return (
        <NotificationCtx.Provider value={contextValue}>
            {props.children}
        </NotificationCtx.Provider>
    )
};