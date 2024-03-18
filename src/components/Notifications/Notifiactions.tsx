'use client';

import React from 'react';
import {
  NotificationContext,
  type Notification,
} from '@/context/NotificationContext';
import NotificationItem from '../NotificationItem';
import { PreloadResources } from '@/app/preload';

function Notifications() {
  const { notificationList } = React.useContext(NotificationContext);

  return (
    <ol
      id="status-notification"
      role="region"
      aria-label="Notification"
      aria-live="polite"
    >
      {notificationList &&
        notificationList.map((notification: Notification) => (
          <NotificationItem
            key={notification.id}
            id={notification.id}
            type={notification.type}
            message={notification.message}
          />
        ))}
    </ol>
  );
}

export default Notifications;
