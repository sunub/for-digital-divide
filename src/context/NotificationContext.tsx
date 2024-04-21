'use client';

import React from 'react';
import { type StoreApi, useStore } from 'zustand';
import {
  type NotificationStore,
  createNotificationStore,
} from '@/store/notification-store';

export const NotificationContext =
  React.createContext<StoreApi<NotificationStore> | null>(null);

export function NotificationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const notificationRef = React.useRef<StoreApi<NotificationStore>>();
  if (!notificationRef.current) {
    notificationRef.current = createNotificationStore();
  }

  return (
    <NotificationContext.Provider value={notificationRef.current}>
      {children}
    </NotificationContext.Provider>
  );
}

export const useNotificationStore = <T,>(
  selector: (store: NotificationStore) => T,
): T => {
  const notificationContext = React.useContext(NotificationContext);
  if (!notificationContext) {
    throw new Error(
      'useNotificationStore must be used within a NotificationContextProvider',
    );
  }
  return useStore(notificationContext, selector);
};
