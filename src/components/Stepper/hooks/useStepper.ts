'use client';

import { useAtom } from 'jotai';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { stepperAtom } from '../store/atom';

export function useStepper() {
  const [, setStepper] = useAtom(stepperAtom);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPath = pathname + (searchParams.size !== 0 ? `?${searchParams.toString()}` : '');

  useEffect(() => {
    updateStep();
  }, [pathname, searchParams]);

  const updateStep = () =>
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

  const clearSteps = () => {
    setStepper((prev) => ({
      ...prev,
      currentStep: 0,
      steps: prev.steps.map((step) => ({ ...step, done: false })),
    }));
  };

  return { updateStep, clearSteps };
}
