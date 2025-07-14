'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useStepper } from '@/components/Stepper/hooks/useStepper';
import { useToast } from '@/provider/toast/hooks/useToast';

interface ActionState {
  status: string;
  payload: string[];
}

export function useFormActionToast(
  actionState: ActionState | null,
  navigationDestination: string,
  callback?: () => void,
) {
  const showToast = useToast();
  const { updateStep } = useStepper();
  const router = useRouter();

  useEffect(() => {
    router.prefetch(navigationDestination);
  }, []);

  useEffect(() => {
    if (!actionState) return;
    if (actionState.status === 'error') {
      showToast('error', actionState.payload);
    } else if (actionState.status === 'success') {
      if (callback) {
        callback();
      }
      updateStep();
      showToast('success', actionState.payload);
      router.push(navigationDestination);
    }
  }, [actionState]);
}
