'use client';

import React, { useState } from 'react';
import { type Notification } from '@/store/notification-store';
import { useNotificationStore } from '@/context/NotificationContext';
import NotificationItem from '../NotificationItem';

type NotificationItem = [string, Notification];

function NotificationList() {
  const notifications = useNotificationStore((state) => state.notifications);
  const [list, setList] = useState([...notifications]);

  React.useEffect(() => {
    setList([...notifications]);
  }, [notifications]);

  return (
    <ol
      id="status-notification"
      role="region"
      aria-label="Notification"
      aria-live="polite"
    >
      {list &&
        list.map(({ id, message, type }) => (
          <NotificationItem key={id} id={id} type={type} message={message} />
        ))}
    </ol>
  );
}

export default NotificationList;
