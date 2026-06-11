"use client";

import { Suspense } from "react";
import { useRouter } from "next/navigation";
import { Flex } from "@internal/design-system/primitives";
import { useOnboardingStore } from "@/store/onboarding-store";
import { useFunnel } from "@/shared/hooks/useFunnel/useFunnel";
import { ONBOARDING_STEPS } from "./funnelConfig";
import { useIsMounted } from "@/shared/hooks/useIsMounted";

// 스텝 컴포넌트 임포트
import IntroStep from "./components/IntroStep";
import VerifySelectionStep from "./components/VerifySelectionStep";
import VerifyInfoStep from "./components/VerifyInfoStep";
import VerifyOtpStep from "./components/VerifyOtpStep";
import TermsStep from "./components/TermsStep";
import IdCardSelectionStep from "./components/IdCardSelectionStep";
import IdCardInfoStep from "./components/IdCardInfoStep";
import AccountStep from "./components/AccountStep";
import SuccessStep from "./components/SuccessStep";
import PinRegisterStep from "./components/PinRegisterStep";

function OnboardingFunnel() {
  const isMounted = useIsMounted();
  const state = useOnboardingStore();
  const router = useRouter();

  const funnel = useFunnel(isMounted ? ONBOARDING_STEPS : [], state);

  if (!isMounted) {
    return (
      <Flex 
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ 
          width: "360px", 
          minHeight: "600px", 
          padding: "2rem",
          borderRadius: "16px",
          background: "var(--color-surface, #fff)",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)"
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
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{
        width: "360px", // 고정 크기 설정으로 CLS 최소화
        minHeight: "600px",
        padding: "2rem",
        borderRadius: "16px",
        background: "var(--color-surface, #fff)",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
      }}
    >
      {currentStepId === "intro" && <IntroStep onNext={funnel.next} />}
      {currentStepId === "verify-selection" && <VerifySelectionStep onNext={funnel.next} />}
      {currentStepId === "verify-info" && <VerifyInfoStep onNext={funnel.next} />}
      {currentStepId === "verify-otp" && <VerifyOtpStep onNext={funnel.next} />}
      {currentStepId === "terms" && <TermsStep onNext={funnel.next} />}
      {currentStepId === "id-card-selection" && <IdCardSelectionStep onNext={funnel.next} />}
      {currentStepId === "id-card-info" && <IdCardInfoStep onNext={funnel.next} />}
      {currentStepId === "account" && <AccountStep onNext={funnel.next} />}
      {currentStepId === "success" && <SuccessStep onNext={funnel.next} />}
      {currentStepId === "pin-register" && <PinRegisterStep onComplete={handleCompleteOnboarding} />}
    </Flex>
  );
}

export default function EmailPasswordLogin() {
  return (
    <Suspense fallback={
      <Flex 
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ 
          width: "360px", 
          minHeight: "600px", 
          padding: "2rem",
          borderRadius: "16px",
          background: "var(--color-surface, #fff)",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)"
        }}
      >
        퍼널 준비 중...
      </Flex>
    }>
      <OnboardingFunnel />
    </Suspense>
  );
}
