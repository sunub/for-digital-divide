"use client";

import { Flex } from "@internal/design-system/primitives";
import type { MotionNodeAnimationOptions } from "motion/react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useFunnel } from "@/shared/hooks/useFunnel/useFunnel";
import { useIsMounted } from "@/shared/hooks/useIsMounted";
import { useOnboardingStore } from "@/store/onboarding-store";
import AccountStep from "../components/AccountStep";
import VerifySelectionStep from "../components/VerifySelectionStep";
import { ONBOARDING_STEPS } from "../funnelConfig";
import { IdCardInfoStep } from "../IdCardInfoStep";
import IdCardSelectionStep from "../IdCardSelectionStep";
import TermsStep from "../TermsStep/TermsStep";
import { ToastMessage } from "../ui/ToastMessage";
import VerifyInfoStep from "../VerifyInfoStep";
import VerifyOtpStep from "../VerifyOtpStep";

interface LoginContentContainerProps {
  hasPinLoginAvailable: boolean; // 기존 프롭 유지
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

export function LoginContentContainer({ reason }: LoginContentContainerProps) {
  const isMounted = useIsMounted();
  const state = useOnboardingStore();
  const router = useRouter();

  const funnel = useFunnel(isMounted ? ONBOARDING_STEPS : [], state);

  if (!isMounted) {
    return (
      <Flex
        direction={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        style={{
          width: "100%",
        }}
      >
        로딩 중...
      </Flex>
    );
  }

  const currentStepId = funnel.currentStepId;
  return (
    <Flex
      direction={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      gap={"3rem"}
      height={"full"}
    >
      {reason && <ToastMessage reason={reason} />}
      <AnimationPresenceWrapper animationKey={currentStepId}>
        {currentStepId === "verify-selection" && (
          <VerifySelectionStep onNext={funnel.next} />
        )}
        {currentStepId === "verify-info" && (
          <VerifyInfoStep onNext={funnel.next} />
        )}
        {currentStepId === "verify-otp" && (
          <VerifyOtpStep onNext={funnel.next} />
        )}
        {currentStepId === "terms" && <TermsStep onNext={funnel.next} />}
        {currentStepId === "id-card-selection" && (
          <IdCardSelectionStep onNext={funnel.next} />
        )}
        {currentStepId === "id-card-info" && (
          <IdCardInfoStep onNext={() => router.replace("/login/success")} />
        )}
        {currentStepId === "account" && <AccountStep onNext={funnel.next} />}
      </AnimationPresenceWrapper>
    </Flex>
  );
}
