"use client";

import { animate, motion, press } from "motion/react";
import { useEffect, useRef } from "react";
import { useAlertDialogContext } from "@/components/AlertDialog/hooks/useAlertDialogContext";
import * as style from "./AlertCloseButton.css";

export function AlertCloseButton() {
  const { onOpenToggle } = useAlertDialogContext();
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (buttonRef.current === null) return;
    press(buttonRef.current, (element) => {
      animate(element, {
        scale: 0.85,
        boxShadow: "0px 0px 12px rgba(0, 0, 0, 0.6)",
      });

      return () =>
        animate(element, {
          scale: 1,
          boxShadow: "0px 0px 0px rgba(0, 0, 0, 0)",
        });
    });
  }, []);

  return (
    <motion.button
      className={style.closeButton}
      ref={buttonRef}
      initial={{ scale: 0.99, opacity: 0.8 }}
      whileHover={{ scale: 1.06, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 600,
        damping: 20,
        duration: 0.2,
      }}
      onClick={() => onOpenToggle()}
    >
      취소하기
    </motion.button>
  );
}
