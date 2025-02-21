'use client';

import { useStore } from 'zustand';
import {
  type NotificationStore,
  notificationStore,
} from '@/store/notification-store';

export const useNotificationStore = <T,>(
  selector: (store: NotificationStore) => T,
): T => {
  return useStore(notificationStore, selector);
};
