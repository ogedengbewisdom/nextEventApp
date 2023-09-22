import { useContext, useEffect } from 'react';

import classes from './notification.module.css';
import NotificationCtx from '../store/notification-context';

function Notification(props) {
  const notification = useContext(NotificationCtx);
  const activeNotification = notification.notification

  const { title, message, status } = props;

 

  let statusClasses = '';

  if (status === 'success') {
    statusClasses = classes.success;
  }

  if (status === 'error') {
    statusClasses = classes.error;
  }

  if (status === 'pending') {
    statusClasses = classes.pending;
  }

  useEffect(() => {
    if (activeNotification.status === "success" || activeNotification.status === "error") {
      const timer = setTimeout(() => {
        notification.hideNotification()
      }, 2000);
      return () => {
        clearTimeout(timer)
      }
    }
  }, [notification, activeNotification])

  const activeClasses = `${classes.notification} ${statusClasses}`;

  return (
    <div className={activeClasses} onClick={notification.hideNotification}>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
}

export default Notification;