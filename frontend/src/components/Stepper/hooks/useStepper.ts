"use client";

import { useStepperStore } from "../store/stepper-store";
import { usePathname, useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";

export function useStepper() {
  const setStepper = useStepperStore((state) => state.setStepper);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPath =
    pathname + (searchParams.size !== 0 ? `?${searchParams.toString()}` : "");

  const updateStep = useCallback(() => {
    setStepper((prev) => {
      const steps = prev.steps;
      const currentStepIndex = steps.findIndex((s) => {
        return s.path === currentPath;
      });
      return {
        currentStep: currentStepIndex,
        steps: steps.map((step, i) => ({
          ...step,
          done: i < currentStepIndex,
        })),
      };
    });
  }, [currentPath, setStepper]);

  useEffect(() => {
    updateStep();
  }, [updateStep]);

  const clearSteps = useCallback(() => {
    setStepper((prev) => ({
      ...prev,
      currentStep: 0,
      steps: prev.steps.map((step) => ({ ...step, done: false })),
    }));
  }, [setStepper]);

  return { updateStep, clearSteps };
}
