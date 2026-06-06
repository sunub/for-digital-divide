"use client";

import { create } from "zustand";
import type { Toast } from "../types";

type ToastAction =
  | { type: "success"; payload: Toast }
  | { type: "error"; payload: Toast }
  | { type: "info"; payload: Toast }
  | { type: "warning"; payload: Toast }
  | { type: "remove"; payload: { id: string } };

interface ToastStore {
  toasts: Toast[];
  dispatch: (action: ToastAction) => void;
}

export const useToastStore = create<ToastStore>((set) => ({
  toasts: [],
  dispatch: (action) =>
    set((state) => {
      if (!action) return state;
      switch (action.type) {
        case "success":
        case "error":
        case "info":
        case "warning":
          return { toasts: [...state.toasts, action.payload] };
        case "remove":
          return { toasts: state.toasts.filter((toast) => toast.id !== action.payload.id) };
        default:
          return state;
      }
    }),
}));
