import { createStore } from 'zustand';
import { z } from 'zod';
import { persist, createJSONStorage } from 'zustand/middleware';

export type Notification = {
  id: string;
  message: string;
  type: 'default' | 'error' | 'success';
};

export type NotificationState = {
  notifications: Notification[];
};

export type NotificationAction = {
  add: (notification: Notification) => void;
  remove: (id: string) => void;
};

export const NotificationSchema = z.object({
  message: z.string(),
  type: z.union([
    z.literal('default'),
    z.literal('error'),
    z.literal('success'),
  ]),
});

export const NotificationStateSchema = z.map(
  z.string(),
  z.object({
    message: z.string(),
    type: z.union([
      z.literal('default'),
      z.literal('error'),
      z.literal('success'),
    ]),
  }),
);

export const defaultInitState = {
  notifications: [],
} as NotificationState;

export type NotificationStore = NotificationState & NotificationAction;

export const createNotificationStore = (
  initState: NotificationState = defaultInitState,
) => {
  return createStore<NotificationState & NotificationAction>()(
    persist(
      (set) => ({
        ...initState,
        add: (notification: Notification) => {
          set((state) => {
            if (state.notifications.find((n) => n.id === notification.id)) {
              return state;
            }
            return { notifications: [...state.notifications, notification] };
          });
        },
        remove: (id: string) => {
          set((state) => ({
            notifications: state.notifications.filter((n) => n.id !== id),
          }));
        },
      }),
      {
        name: 'notification-store',
        storage: createJSONStorage(() => localStorage),
      },
    ),
  );
};
