'use client';

import { motion, AnimatePresence } from 'motion/react';
import { LoaderCircle, BadgeCheckIcon, ShieldBanIcon } from 'lucide-react';
import styled from 'styled-components';
import type { ActionState } from '../../types';

interface StatusLoaderProps {
  isPending: boolean;
  children: React.ReactNode;
  actionState?: ActionState;
}

function ErrorIcon() {
  return (
    <motion.div
      key="error"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
    >
      <ShieldBanIcon size={18} strokeWidth={2.5} color="#e53e3e" />
    </motion.div>
  );
}

function SuccessIcon() {
  return (
    <motion.div
      key="done"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
    >
      <BadgeCheckIcon size={18} strokeWidth={2.5} color="#38a169" />
    </motion.div>
  );
}

export function StatusLoader({ isPending, children, actionState }: StatusLoaderProps) {
  return (
    <LoaderContainer>
      <IconWrapper>
        <AnimatePresence mode="wait">
          {isPending ? (
            <motion.div
              key="pending"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
            >
              <LoaderCircle size={18} strokeWidth={2.5} color="#5a67d8" />
            </motion.div>
          ) : (
            <>{actionState ? actionState.status === 'continue' ? <SuccessIcon /> : <ErrorIcon /> : <SuccessIcon />}</>
          )}
        </AnimatePresence>
      </IconWrapper>

      <TextWrapper>
        <AnimatePresence mode="wait">
          <Text
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            $actionState={actionState}
          >
            {children}
          </Text>
        </AnimatePresence>
      </TextWrapper>
    </LoaderContainer>
  );
}

const LoaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.5rem;
  min-width: 250px;
  padding-left: 1rem;
`;

const IconWrapper = styled.div`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TextWrapper = styled.div`
  font-size: 1rem;
  font-weight: 600;
  color: #4a5568;
  text-align: center;
`;

const Text = styled(motion.span)<{ $actionState?: ActionState }>`
  color: ${({ $actionState }) => {
    if ($actionState?.status === 'success') return '#38a169';
    if ($actionState?.status === 'error') return '#e53e3e';
    return '#4a5568';
  }};
  transition: color 0.3s ease-in-out;
`;
