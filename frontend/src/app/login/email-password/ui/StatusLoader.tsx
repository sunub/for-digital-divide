"use client";

import { Flex } from "@for-digital-divide/design-system";
import { BadgeCheckIcon, LoaderCircle, ShieldBanIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import type { ActionState } from "../../types";
import * as style from "./StatusLoader.css";

interface StatusLoaderProps {
  isPending: boolean;
  children: React.ReactNode;
  actionState?: ActionState;
}

function ErrorIcon() {
  return (
    <motion.div
      key="error"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
    >
      <ShieldBanIcon size={16} strokeWidth={2.5} color="#e53e3e" />
    </motion.div>
  );
}

function SuccessIcon() {
  return (
    <motion.div
      key="done"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
    >
      <BadgeCheckIcon size={16} strokeWidth={2.5} color="#38a169" />
    </motion.div>
  );
}

function mapStatus(
  status: ActionState["status"] | undefined,
  isPending: boolean,
): "success" | "error" | "default" | undefined {
  if (isPending) {
    return "default";
  }
  if (status === "success" || status === "continue") {
    return "success";
  }
  if (status === "error") {
    return "error";
  }
  return "default";
}

export function StatusLoader({
  isPending,
  children,
  actionState,
}: StatusLoaderProps) {
  return (
    <Flex
      alignItems={"center"}
      justifyContent={"flex-start"}
      minWidth={"quarterCqw"}
      paddingRight={2}
      marginLeft={"auto"}
      marginRight={"auto"}
    >
      <Flex
        width={"2rem"}
        height={"2rem"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <AnimatePresence mode="wait">
          {isPending ? (
            <motion.div
              key="pending"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            >
              <LoaderCircle size={16} strokeWidth={2.5} color="#5a67d8" />
            </motion.div>
          ) : actionState ? (
            actionState.status === "continue" ? (
              <SuccessIcon />
            ) : (
              <ErrorIcon />
            )
          ) : (
            <SuccessIcon />
          )}
        </AnimatePresence>
      </Flex>

      <div className={style.textWrapper}>
        <AnimatePresence mode="wait">
          <motion.span
            className={style.text({
              status: mapStatus(actionState?.status, isPending),
            })}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.span>
        </AnimatePresence>
      </div>
    </Flex>
  );
}
