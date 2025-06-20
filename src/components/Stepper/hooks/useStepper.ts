'use client';

import { useAtom } from 'jotai';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { stepperAtom } from '../store/atom';
import { SIGN_UP_STEPS } from '../store/atom';

export function useStepper() {
  const [_, setStepper] = useAtom(stepperAtom);
  const pathname = usePathname();

  useEffect(() => {
    updateStep();
  }, [pathname]);

  const updateStep = () =>
    setStepper(prev => {
      let steps = prev.steps;
      if (pathname === '/sign-up/username' && steps.length <= 3) {
        steps = [...steps, ...SIGN_UP_STEPS];
      }

      const currentStepIndex = steps.findIndex(s => s.path === pathname);
      return {
        currentStep: currentStepIndex,
        steps: steps.map((step, i) => ({
          ...step,
          done: i < currentStepIndex,
        })),
      };
    });

  const clearSteps = () => {
    setStepper(prev => ({
      ...prev,
      currentStep: 0,
      steps: prev.steps.map(step => ({ ...step, done: false })),
    }));
  };

  return { updateStep, clearSteps };
}
