"use client";

import { Flex } from "@internal/design-system/primitives";
import type { MotionNodeAnimationOptions } from "motion/react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useShallow } from "zustand/react/shallow";
import { useFunnel } from "@/shared/hooks/useFunnel/useFunnel";
import { useIsMounted } from "@/shared/hooks/useIsMounted";
import { useOnboardingStore } from "@/store/onboarding/onboarding-store";
import { ONBOARDING_STEPS } from "../funnelConfig";
import { IdCardInfoStep } from "../IdCardInfoStep";
import IdCardSelectionStep from "../IdCardSelectionStep";
import TermsStep from "../TermsStep/TermsStep";
import VerifyInfoStep from "../VerifyInfoStep";
import VerifyOtpStep from "../VerifyOtpStep";
import { VerifySelectionStep } from "../VerifySelectionStep";

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

export function OnboardingContentContainer() {
  const isMounted = useIsMounted();
  const router = useRouter();
  const funnelConditionState = useOnboardingStore(
    useShallow((state) => ({
      isVerifyInfoSubmitted: state.isVerifyInfoSubmitted,
      isSmsVerified: state.isSmsVerified,
      termsAgreed: state.termsAgreed,
      selectedIdCardType: state.selectedIdCardType,
    })),
  );

  const funnel = useFunnel(
    isMounted ? ONBOARDING_STEPS : [],
    funnelConditionState,
  );

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
      width={"fullCqw"}
      padding={"1rem"}
    >
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
          <IdCardInfoStep
            onNext={() => router.replace("/onboarding/success")}
          />
        )}
      </AnimationPresenceWrapper>
    </Flex>
  );
}

// {currentStepId === "account" && <AccountStep onNext={funnel.next} />}
