"use client";

import { useAtom } from "jotai";
import { AnimatePresence } from "motion/react";
import { toastsAtom } from "../atom";
import { container } from "../style/toast.css";
import { ToastMessage } from "./ToastMessage";

export function ToastContainer() {
  const [toasts] = useAtom(toastsAtom);

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
