'use client';

import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useAlertDialogContext } from '@/components/AlertDialog/hooks/useAlertDialogContext';
import { animate, motion, press } from 'motion/react';

export function AlertCloseButton() {
  const { onOpenToggle } = useAlertDialogContext();
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (buttonRef.current === null) return;
    press(buttonRef.current, element => {
      animate(element, {
        scale: 0.85,
        boxShadow: '0px 0px 12px rgba(0, 0, 0, 0.6)',
      });

      return () =>
        animate(element, {
          scale: 1,
          boxShadow: '0px 0px 0px rgba(0, 0, 0, 0)',
        });
    });
  }, []);

  return (
    <CloseButton
      initial={{ scale: 0.99, opacity: 0.8 }}
      whileHover={{ scale: 1.06, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 600, damping: 20, duration: 0.2 }}
      onClick={() => onOpenToggle()}
    >
      취소하기
    </CloseButton>
  );
}

const CloseButton = styled(motion.button)`
  font-size: 0.75rem;
  color: var(--color-primary);
  background-color: color-mix(in oklch, var(--color-text), transparent 50%);
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
`;
