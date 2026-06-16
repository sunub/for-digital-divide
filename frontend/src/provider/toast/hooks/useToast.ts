"use client";

import { nanoid } from "nanoid";
import type React from "react";
import { useToastStore } from "../store/toast-store";
import type { ToastType } from "../types";

export function useToast() {
  const dispatch = useToastStore((state) => state.dispatch);

  function showToast(
    type: ToastType,
    message: string[] | string | React.ReactNode,
    optionsOrDuration?:
      | number
      | {
          title?: string;
          icon?: React.ReactNode;
          duration?: number;
        },
  ) {
    const id = nanoid();

    let options: {
      title?: string;
      icon?: React.ReactNode;
      duration?: number;
    } = {};

    if (typeof optionsOrDuration === "number") {
      options = { duration: optionsOrDuration };
    } else if (optionsOrDuration) {
      options = optionsOrDuration;
    }

    const duration = options.duration !== undefined ? options.duration : 3000;

    let finalMessage: string[] | undefined;
    let children: React.ReactNode;

    if (typeof message === "string") {
      finalMessage = [message];
    } else if (Array.isArray(message)) {
      finalMessage = message as string[];
    } else {
      children = message;
    }

    dispatch({
      type,
      payload: {
        id,
        message: finalMessage,
        children,
        type,
        duration,
        title: options.title,
        icon: options.icon,
      },
    });

    if (duration !== 0) {
      setTimeout(() => {
        dispatch({ type: "remove", payload: { id } });
      }, duration);
    }
  }

  return showToast;
}
