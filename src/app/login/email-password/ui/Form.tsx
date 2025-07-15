'use client';

import styled from 'styled-components';
import { useActionState, useState } from 'react';
import { emailPasswordLoginAction } from '../utils/emailPaswordLoginAction';
import { useFormActionToast } from '@/shared/hooks/useFormActionToast';
import { FlexCenterDiv } from '@/shared/style/component/div';
import { ArrowIcon } from '@/components/LeadingIconInput/ui/ArrowIcon';
import { SubmitButton } from './SubmitButton';
import { useSeedingDemoData } from '../hooks/useSeedingDemoData';
import { SubmittingStatus } from './SubmittingStatus';
import { useRedirectDashboard } from '../../hooks/useRedirectDashboard';

import type { ActionState } from '../../types';

export function Form({ children }: { children: React.ReactNode }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSeedingProgress, setIsSeedingProgress] = useState(false);
  const [actionState, formAction, isPending] = useActionState<ActionState, FormData>(emailPasswordLoginAction, {
    status: 'idle',
    payload: [''],
    currentStep: 'login',
  });

  useFormActionToast(actionState, () => setIsSeedingProgress(true));
  useSeedingDemoData(isSeedingProgress, setIsSeedingProgress);
  useRedirectDashboard(isSeedingProgress);

  return (
    <form id={'init-username-form'} action={formAction} className="flex flex-col place-content-center gap-3" noValidate>
      <InputContainer>
        <ArrowIconIndicator />
        {children}
      </InputContainer>
      <SubmittingStatus
        actionState={actionState}
        isSubmitting={isSubmitting}
        isPending={isPending}
        isSeedingProgress={isSeedingProgress}
      />
      <SubmitButton onClick={() => setIsSubmitting(true)} isPending={isPending} />
    </form>
  );
}

function ArrowIconIndicator() {
  return (
    <IconContainer>
      <ArrowIcon />
    </IconContainer>
  );
}

const IconContainer = styled(FlexCenterDiv)`
  gap: 0.5rem;
  color: var(--color-button);
  transition:
    transform 0.3s ease-in-out,
    opacity 0.3s ease-in-out;
  will-change: transform, opacity;
  opacity: 0.3;
  padding-bottom: 0.5rem;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;

  &:hover ${IconContainer}:not(:hover) {
    transform: translateY(4px) scale(1.1);
    opacity: 1;
  }

  &:focus-within ${IconContainer}:not(:focus) {
    transform: translateY(4px) scale(1.1);
    opacity: 1;
  }
`;
