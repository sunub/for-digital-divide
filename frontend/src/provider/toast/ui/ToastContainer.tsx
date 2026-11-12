"use client";

import { AnimatePresence } from "motion/react";
import { useToastStore } from "../store/toast-store";
import { container } from "../style/toast.css";
import { ToastMessage } from "./ToastMessage";

export function ToastContainer() {
  const toasts = useToastStore((state) => state.toasts);

  return (
    // 항상 렌더링되는 live region 이어야 새 알림(예: 인증번호 문자)이 스크린리더에 자동으로 읽힌다.
    <div className={container} role="status" aria-live="polite">
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
