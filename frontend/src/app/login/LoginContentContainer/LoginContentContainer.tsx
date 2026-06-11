"use client";

import { Flex } from "@internal/design-system/primitives";
import type { MotionNodeAnimationOptions } from "motion/react";
import { motion } from "motion/react";
import { useSearchParams } from "next/navigation";
import { useFunnel } from "@/shared/hooks/useFunnel/useFunnel";
import EmailPasswordLogin from "../email-password/page";
import { LOGIN_FUNNEL_STEPS, type LoginFunnelData } from "../funnelConfig";
import { LoginSelection } from "../LoginSelection";
import { LoginPinPage } from "../Pin";
import { VerifyStep } from "../VerifyStep/VerifyStep";
import { ToastMessage } from "../ui/ToastMessage";

interface LoginContentContainerProps {
  hasPinLoginAvailable: boolean;
  reason?: string;
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
  hasPinLoginAvailable,
  reason,
}: LoginContentContainerProps) {
  const searchParams = useSearchParams();
  const step = searchParams.get("step") || "";

  const method: LoginFunnelData["method"] =
    step === "email-input"
      ? "email"
      : step === "pin-input"
      ? "pin"
      : step === "verify" || !step
      ? "verify"
      : "default";

  const formData: LoginFunnelData = {
    method,
    hasPinLoginAvailable,
    isSeedingComplete: false,
  };

  const { currentStepId } = useFunnel<LoginFunnelData>(
    LOGIN_FUNNEL_STEPS,
    formData,
  );

  return (
    <Flex
      direction={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      gap={"3rem"}
    >
      {reason && <ToastMessage reason={reason} />}
      <AnimationPresenceWrapper animationKey={currentStepId}>
        {currentStepId === "verify" && <VerifyStep />}

        {currentStepId === "selection" && (
          <LoginSelection hasPinLoginAvailable={hasPinLoginAvailable} />
        )}

        {currentStepId === "email-input" && <EmailPasswordLogin />}

        {currentStepId === "pin-input" && <LoginPinPage />}
      </AnimationPresenceWrapper>
    </Flex>
  );
}
