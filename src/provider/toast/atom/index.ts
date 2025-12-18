"use client";

import { atomWithReducer } from "jotai/utils";
import type { Toast } from "../types";

type ToastAction =
  | { type: "success"; payload: Toast }
  | { type: "error"; payload: Toast }
  | { type: "info"; payload: Toast }
  | { type: "warning"; payload: Toast }
  | { type: "remove"; payload: { id: string } };

export const toastsAtom = atomWithReducer<Toast[], ToastAction>(
  [],
  (state, action) => {
    if (!action) return state;
    switch (action.type) {
      case "success":
      case "error":
      case "info":
      case "warning":
        return [...state, action.payload];
      case "remove":
        return state.filter((toast) => toast.id !== action.payload.id);
      default:
        return state;
    }
  },
);
