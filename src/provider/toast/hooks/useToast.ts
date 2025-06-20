'use client';

import { useSetAtom } from 'jotai';
import { nanoid } from 'nanoid';
import { toastsAtom } from '../atom';
import type { ToastType } from '../types';

export function useToast() {
  const dispatch = useSetAtom(toastsAtom);

  function showToast(type: ToastType, message: string[] | string, duration = 3000) {
    const id = nanoid();
    if (!Array.isArray(message)) {
      message = [message];
    }

    dispatch({ type, payload: { id, message, type } });

    setTimeout(() => {
      dispatch({ type: 'remove', payload: { id } });
    }, duration);
  }

  return showToast;
}
