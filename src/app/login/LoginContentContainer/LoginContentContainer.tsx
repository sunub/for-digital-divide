"use client";

import type { MotionNodeAnimationOptions } from "motion/react";
import { motion } from "motion/react";
import { Flex } from "@/shared/ui/Flex";
import { ToastMessage } from "../ui/ToastMessage";

interface LoginContentContainerProps {
  searchParams: { method: string; reason?: string };
  defaultMethodNode: React.ReactNode;
  emailMethodNode: React.ReactNode;
  pinMethodNode: React.ReactNode;
}

const pageVariants: MotionNodeAnimationOptions["variants"] = {
  initial: { opacity: 0, x: "100%", z: -1 },
  in: { opacity: 1, x: 0, z: 0 },
  out: { opacity: 0, x: "-100%", z: -1 },
};

const pageTransition: MotionNodeAnimationOptions["transition"] = {
  type: "tween",
  ease: "anticipate",
  duration: 0.4,
};

export function AnimationPresenceWrapper({
  animationKey,
  children,
}: {
  animationKey: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      key={animationKey}
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      style={{ width: "100%", height: "100%" }}
    >
      {children}
    </motion.div>
  );
}

export function LoginContentContainer({
  searchParams,
  ...props
}: LoginContentContainerProps) {
  const { method } = searchParams;
  const { reason } = searchParams || {};

  return (
    <Flex
      direction={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      gap={"3rem"}
    >
      {reason && <ToastMessage reason={reason} />}
      {method === "default" && (
        <AnimationPresenceWrapper animationKey={"default"}>
          {props.defaultMethodNode}
        </AnimationPresenceWrapper>
      )}

      {method === "email" && (
        <AnimationPresenceWrapper animationKey={"email"}>
          {props.emailMethodNode}
        </AnimationPresenceWrapper>
      )}
      {method === "pin" && (
        <AnimationPresenceWrapper animationKey={"pin"}>
          {props.pinMethodNode}
        </AnimationPresenceWrapper>
      )}
    </Flex>
  );
}
