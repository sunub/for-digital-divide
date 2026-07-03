import { seedDemoAccountAndTransactionInfo } from "@root/prisma/seed";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useRef, useState } from "react";
import type { ActionState } from "@/app/onboarding/types";
import { useToast } from "@/provider/toast/hooks/useToast";
import { useEffectEvent } from "./useEffectEvent";

export type LoginStep = "idle" | "logging-in" | "seeding" | "completed";

interface UseDemoLoginFlowProps<TPayload = FormData> {
  action: (
    state: Awaited<ActionState>,
    payload: TPayload,
  ) => ActionState | Promise<ActionState>;
  onSeedingStart?: () => void;
  onActionComplete?: () => void;
  redirectPath?: string;
}

export function useDemoLoginFlow<TPayload = FormData>({
  action,
  onSeedingStart,
  onActionComplete,
  redirectPath = "/dashboard",
}: UseDemoLoginFlowProps<TPayload>) {
  const router = useRouter();
  const showToast = useToast();

  const [currentStep, setCurrentStep] = useState<LoginStep>("idle");
  const [actionState, formAction, isPending] = useActionState<
    ActionState,
    TPayload
  >(action, {
    status: "idle",
    payload: [""],
    currentStep: "login",
  });
  const isSeedingInProgress = currentStep === "seeding";
  const isGlobalPending =
    isPending || isSeedingInProgress || currentStep === "completed";

  const didSeedRef = useRef(false);

  const handleActionComplete = useEffectEvent(() => {
    onActionComplete?.();
  });

  const handleLoginError = useEffectEvent((...args: unknown[]) => {
    const payload = args[0] as string[];
    showToast("error", payload);
    setCurrentStep("idle");
    handleActionComplete();
    didSeedRef.current = false;
  });

  const handleLoginSuccess = useEffectEvent(async () => {
    try {
      setCurrentStep("seeding");
      onSeedingStart?.();
      showToast("success", "로그인 성공! 데모 데이터를 준비합니다.");

      await seedDemoAccountAndTransactionInfo();

      setCurrentStep("completed");
      showToast("success", "데모 데이터 준비 완료! 대시보드로 이동합니다.");

      router.push(redirectPath);
    } catch (error) {
      console.error("Seeding failed:", error);
      showToast("error", "시딩에 실패 했습니다. 다시 시도해주세요");
      setCurrentStep("idle");
      didSeedRef.current = false;
    }
  });

  useEffect(() => {
    if (actionState.status === "error") {
      handleLoginError(actionState.payload);
      return;
    }

    if (
      actionState.status === "continue" &&
      actionState.nextStep === "seeding"
    ) {
      if (!didSeedRef.current) {
        didSeedRef.current = true;
        handleActionComplete();
        handleLoginSuccess();
      }
    }
  }, [actionState, handleLoginError, handleLoginSuccess, handleActionComplete]);

  return {
    formAction,
    actionState,
    status: {
      step: currentStep,
      isPending,
      isSeeding: isSeedingInProgress,
      isGlobalPending,
    },
  };
}
