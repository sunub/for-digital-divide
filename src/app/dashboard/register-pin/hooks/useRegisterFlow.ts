import { useRouter } from "next/navigation";
import { useActionState, useEffect, useRef, useState } from "react";
import type { ActionState } from "@/app/login/types";
import { useToast } from "@/provider/toast/hooks/useToast";
import { useEffectEvent } from "@/shared/hooks/useEffectEvent";

type LoginStep = "idle" | "logging-in" | "seeding" | "completed";

interface UseDemoLoginFlowProps {
  action: (
    state: Awaited<ActionState>,
    payload: FormData,
  ) => ActionState | Promise<ActionState>;
}

export function useDemoLoginFlow({ action }: UseDemoLoginFlowProps) {
  const router = useRouter();
  const showToast = useToast();

  const [currentStep, setCurrentStep] = useState<LoginStep>("idle");
  const [actionState, formAction, isPending] = useActionState<
    ActionState,
    FormData
  >(action, {
    status: "idle",
    payload: [""],
    currentStep: "login",
  });
  const isGlobalPending = isPending || currentStep === "completed";
  const didSeedRef = useRef(false);

  const handleLoginError = useEffectEvent((payload) => {
    showToast("error", payload as string[]);
    setCurrentStep("idle");
    didSeedRef.current = false;
  });

  const handleLoginSuccess = useEffectEvent(async () => {
    try {
      setCurrentStep("completed");
      showToast("success", "데모 데이터 준비 완료! 대시보드로 이동합니다.");
      router.back();
    } catch (error) {
      console.error("Seeding failed:", error);
      showToast("error", "Seeding failed. Please try again.");
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
        handleLoginSuccess();
      }
    }
  }, [actionState, handleLoginError, handleLoginSuccess]);

  return {
    formAction,
    actionState,
    status: {
      step: currentStep,
      isPending,
      isGlobalPending,
    },
  };
}
