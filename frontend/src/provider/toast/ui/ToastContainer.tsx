"use client";

import { AnimatePresence } from "motion/react";
import { useToastStore } from "../store/toast-store";
import { container } from "../style/toast.css";
import { ToastMessage } from "./ToastMessage";

export function ToastContainer() {
  const toasts = useToastStore((state) => state.toasts);

  return (
    <div className={container}>
      <AnimatePresence>
        {toasts.map((toast, i) => (
          <ToastMessage
            key={toast.id}
            toast={toast}
            index={i}
            length={toasts.length}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
