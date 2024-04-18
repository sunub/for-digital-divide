'use client';

import React from 'react';
import { type Notification } from '@/store/notification-store';
import { useNotificationStore } from '@/context/NotificationContext';
import NotificationItem from '../NotificationItem';

type NotificationItem = [string, Notification];

function NotificationList() {
  const [notificationList, setNotificationList] = React.useState<
    NotificationItem[]
  >([]);
  const { notifications } = useNotificationStore((state) => state);

  React.useEffect(() => {
    setNotificationList([...notifications.entries()]);
  }, [notifications]);

  return (
    <ol
      id="status-notification"
      role="region"
      aria-label="Notification"
      aria-live="polite"
    >
      {notificationList &&
        notificationList.map(([id, notification]: NotificationItem) => (
          <NotificationItem
            key={id}
            id={id}
            type={notification.type}
            message={notification.message}
          />
        ))}
    </ol>
  );
}

export default NotificationList;
