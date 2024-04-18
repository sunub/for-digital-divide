import { createStore } from 'zustand';
import { z } from 'zod';

export type Notification = {
  message: string;
  type: 'default' | 'error' | 'success';
};

export type NotificationState = {
  notifications: Map<string, Notification>;
};

export type NotificationAction = {
  add: (notification: Notification, id: string) => void;
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
  notifications: new Map<string, Notification>(),
} as NotificationState;

export type NotificationStore = NotificationState & NotificationAction;

export const createNotificationStore = (
  initState: NotificationState = defaultInitState,
) => {
  return createStore<NotificationStore>((set) => ({
    ...initState,
    add: (notification: Notification, id: string) => {
      set((state) => {
        state.notifications.set(id, notification);
        return state;
      });
    },
    remove: (id: string) => {
      set((state) => {
        state.notifications.delete(id);
        return state;
      });
    },
  }));
};
