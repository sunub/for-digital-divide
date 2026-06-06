"use client";

import { useToastStore } from "../store/toast-store";
import { nanoid } from "nanoid";
import type { ToastType } from "../types";

export function useToast() {
  const dispatch = useToastStore((state) => state.dispatch);

  function showToast(
    type: ToastType,
    message: string[] | string,
    duration = 3000,
  ) {
    const id = nanoid();
    if (!Array.isArray(message)) {
      message = [message];
    }

    dispatch({ type, payload: { id, message, type } });

    setTimeout(() => {
      dispatch({ type: "remove", payload: { id } });
    }, duration);
  }

  return showToast;
}
