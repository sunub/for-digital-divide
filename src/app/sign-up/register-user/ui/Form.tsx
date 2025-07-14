'use client';

import styled from 'styled-components';
import { useActionState } from 'react';
import { useFormActionToast } from '@/shared/hooks/useFormActionToast';
import { usernameAction } from '../utils/usernameAction';
import { FlexCenterDiv } from '@/shared/style/component/div';
import { ArrowIcon } from '@/components/LeadingIconInput/ui/ArrowIcon';
import { SubmitButton } from './SubmitButton';

export function Form({ children }: { children: React.ReactNode }) {
  const [actionState, formAction, isPending] = useActionState(usernameAction, null);

  // actionState를 useFormActionToast가 기대하는 형태로 변환
  const transformedActionState = actionState
    ? {
        status: actionState.status as 'success' | 'error',
        payload: Array.isArray(actionState.payload) ? actionState.payload.join(', ') : actionState.payload,
      }
    : null;

  useFormActionToast(transformedActionState, '/login');

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
