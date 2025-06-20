'use client';

import { useAtom } from 'jotai';
import { AnimatePresence } from 'motion/react';
import React from 'react';
import { ToastMessage } from './ToastMessage';
import { toastsAtom } from '../atom';
import { Container } from '../style';

export function ToastContainer() {
  const [toasts] = useAtom(toastsAtom);

  return (
    <Container>
      <AnimatePresence>
        {toasts.map((toast, i) => (
          <ToastMessage key={toast.id} toast={toast} index={i} length={toasts.length} />
        ))}
      </AnimatePresence>
    </Container>
  );
}
