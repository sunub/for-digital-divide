"use client";

import { Flex } from "@internal/design-system/primitives";
import type { MotionNodeAnimationOptions } from "motion/react";
import { motion } from "motion/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useFunnel } from "@/shared/hooks/useFunnel/useFunnel";
import { useIsMounted } from "@/shared/hooks/useIsMounted";
import { useOnboardingStore } from "@/store/onboarding-store";
import AccountStep from "../components/AccountStep";
import IdCardInfoStep from "../components/IdCardInfoStep";
import IdCardSelectionStep from "../components/IdCardSelectionStep";
// 10개 단계별 컴포넌트 임포트
import IntroStep from "../components/IntroStep";
import PinRegisterStep from "../components/PinRegisterStep";
import SuccessStep from "../components/SuccessStep";
import TermsStep from "../components/TermsStep";
import VerifyInfoStep from "../components/VerifyInfoStep";
import VerifyOtpStep from "../components/VerifyOtpStep";
import VerifySelectionStep from "../components/VerifySelectionStep";
import { ONBOARDING_STEPS } from "../funnelConfig";
import { ToastMessage } from "../ui/ToastMessage";

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
          minHeight: "450px", // CLS 방지를 위한 고정 최소 높이 설정
        }}
      >
        로딩 중...
      </Flex>
    );
  }

  const currentStepId = funnel.currentStepId;

  const handleCompleteOnboarding = () => {
    state.resetOnboarding(); // 스토어 초기화
    router.replace("/dashboard");
  };

  return (
    <Flex
      direction={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      gap={"3rem"}
      style={{
        width: "100%",
        minHeight: "450px", // CLS 방지를 위한 고정 최소 높이 설정
      }}
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
          <IdCardInfoStep onNext={funnel.next} />
        )}
        {currentStepId === "account" && <AccountStep onNext={funnel.next} />}
        {currentStepId === "success" && <SuccessStep onNext={funnel.next} />}
        {currentStepId === "pin-register" && (
          <PinRegisterStep onComplete={handleCompleteOnboarding} />
        )}
      </AnimationPresenceWrapper>
    </Flex>
  );
}
