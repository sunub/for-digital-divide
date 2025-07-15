'use client';

import { useEffect } from 'react';
import { useToast } from '@/provider/toast/hooks/useToast';
import type { ActionState } from '@/app/login/types';

export function useFormActionToast(actionState: ActionState | null, callback?: () => void) {
  const showToast = useToast();

  useEffect(() => {
    if (!actionState) return;
    if (actionState.status === 'error') {
      showToast('error', actionState.payload);
    } else if (
      (actionState.status === 'continue' && actionState.nextStep === 'seeding') ||
      actionState.status === 'success'
    ) {
      if (callback) {
        callback();
      }
      showToast('success', actionState.payload);
    }
  }, [actionState]);
}
