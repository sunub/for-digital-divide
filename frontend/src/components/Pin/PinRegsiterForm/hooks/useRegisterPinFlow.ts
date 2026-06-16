import { useRouter } from "next/navigation";
import { useActionState, useEffect, useRef, useState } from "react";
import type { ActionState } from "@/app/login/types";
import { useToast } from "@/provider/toast/hooks/useToast";
import { useEffectEvent } from "@/shared/hooks/useEffectEvent";

export type LoginStep = "idle" | "logging-in" | "seeding" | "completed";

interface UseDemoLoginFlowProps {
  action: (
    state: Awaited<ActionState>,
    payload: FormData,
  ) => ActionState | Promise<ActionState>;
  onActionComplete?: () => void;
  onSuccess?: () => void;
}

export function useRegisterPinFlow({
  action,
  onActionComplete,
  onSuccess,
}: UseDemoLoginFlowProps) {
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
  const handleActionComplete = useEffectEvent(() => {
    onActionComplete?.();
  });

  const didSeedRef = useRef(false);

  const handleLoginError = useEffectEvent((...args: unknown[]) => {
    const payload = args[0] as string[];
    showToast("error", payload);
    handleActionComplete();
    setCurrentStep("idle");
    didSeedRef.current = false;
  });

  const handleLoginSuccess = useEffectEvent(async () => {
    try {
      setCurrentStep("completed");

      if (onSuccess) {
        onSuccess();
      } else {
        router.back();
        setTimeout(() => {
          if (window.location.pathname.includes("/register-pin")) {
            router.replace("/dashboard");
          }
        }, 120);
      }
    } catch (error) {
      console.error("PIN registration redirect failed:", error);
      showToast("error", "PIN 등록 후 이동 중 문제가 발생했습니다.");
      setCurrentStep("idle");
      didSeedRef.current = false;
    }
  });

  useEffect(() => {
    if (actionState.status === "error") {
      handleLoginError(actionState.payload);
      return;
    }

    if (actionState.status === "success") {
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
      isGlobalPending,
    },
  };
}
