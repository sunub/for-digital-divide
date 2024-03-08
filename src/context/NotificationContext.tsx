'use client';

import React from 'react';
import NotificationItem from '@/components/NotificationItem';

interface NotificationContextProps {
  notificationList: Notification[] | any;
  action:
    | {
        add: (notification: Notification) => void;
        remove: (id: string) => void;
      }
    | any;
}

export interface Notification {
  id: string;
  message: string;
  type: 'default' | 'error' | 'success';
}

export const NotificationContext =
  React.createContext<NotificationContextProps>({
    notificationList: null,
    action: null,
  });

function NotificationContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [notificationList, setNotification] = React.useState<Notification[]>(
    [],
  );

  const contextValue = React.useMemo(() => {
    const add = (notification: Notification) => {
      const newNotification = [...notificationList, notification];
      setNotification(newNotification);
    };

    const remove = (id: string) => {
      const newNotification = notificationList.filter((item) => item.id !== id);
      setNotification(newNotification);
    };

    const action = {
      add,
      remove,
    };

    return { notificationList, action };
  }, [notificationList, setNotification]);

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
    </NotificationContext.Provider>
  );
}

export default NotificationContextProvider;
