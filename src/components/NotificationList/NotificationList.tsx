'use client';

import React from 'react';
import { type Notification } from '@/store/notification-store';
import { useNotificationStore } from '@/context/NotificationContext';
import NotificationItem from '../NotificationItem';

type NotificationItem = [string, Notification];

function NotificationList() {
  const notifications = useNotificationStore((state) => state.notifications);

  return (
    <ol
      id="status-notification"
      role="region"
      aria-label="Notification"
      aria-live="polite"
    >
      {notifications &&
        notifications.map(({ id, message, type }) => (
          <NotificationItem key={id} id={id} type={type} message={message} />
        ))}
    </ol>
  );
}

export default NotificationList;
