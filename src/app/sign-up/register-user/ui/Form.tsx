'use client';

import styled from 'styled-components';
import { useActionState, useEffect } from 'react';
import { useFormActionToast } from '@/shared/hooks/useFormActionToast';
import { usernameAction } from '../utils/usernameAction';
import { FlexCenterDiv } from '@/shared/style/component/div';
import { ArrowIcon } from '@/components/LeadingIconInput/ui/ArrowIcon';
import { SubmitButton } from './SubmitButton';
import { ActionState } from '@/app/login/types';
import { useRouter } from 'next/navigation';

export function Form({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [actionState, formAction, isPending] = useActionState<ActionState, FormData>(usernameAction, {
    status: 'idle',
    payload: [''],
    currentStep: 'username',
  });

  useEffect(() => {
    router.prefetch('/login');
    if (actionState && actionState.status === 'continue') {
      router.push('/login');
    }
  }, [actionState]);
  useFormActionToast(actionState);

  return (
    <form id={'init-username-form'} action={formAction} className="flex flex-col place-content-center gap-3" noValidate>
      <InputContainer>
        <ArrowIconIndicator />
        {children}
      </InputContainer>
      <SubmitButton isPending={isPending} />
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
