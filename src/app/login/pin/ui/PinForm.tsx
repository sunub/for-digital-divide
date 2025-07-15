'use client';

import { KeypadInfo } from '@/utils/keypad';
import { useActionState, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { PinNumpad } from './PinNumpad';
import styled from 'styled-components';
import { pinLoginAction } from '../utils/pinLoginAction';

import type { ActionState } from '../../types';
import { useFormActionToast } from '@/shared/hooks/useFormActionToast';
import { SubmittingStatus } from '../../email-password/ui/SubmittingStatus';
import { ContentOpener } from '@/shared/layout/ui/ContentOpener';
import { PinContent } from './PinContent';
import { useSeedingDemoData } from '../../email-password/hooks/useSeedingDemoData';
import { useRedirectDashboard } from '../../hooks/useRedirectDashboard';

interface PinFormProps extends React.HTMLAttributes<HTMLFormElement> {
  padInfo: KeypadInfo;
  children: React.ReactNode;
}

export function PinForm({ padInfo, children, ...props }: PinFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSeedingProgress, setIsSeedingProgress] = useState(false);
  const [actionState, formAction, isPending] = useActionState<ActionState, FormData>(pinLoginAction, {
    status: 'idle',
    payload: [''],
    currentStep: 'login',
  });

  useEffect(() => {
    const drawerContent = document.getElementById('drawer-content');
    if (!drawerContent) {
      return;
    }
    createPortal(<PinNumpad padInfo={padInfo} />, drawerContent);
  }, []);

  useFormActionToast(actionState, () => setIsSeedingProgress(true));
  useSeedingDemoData(isSeedingProgress, setIsSeedingProgress);
  useRedirectDashboard(isSeedingProgress);

  return (
    <Form
      className="device-form__drawer-container"
      id={'pinnumber-input'}
      action={formAction}
      noValidate
      onSubmit={() => setIsSubmitting(true)}
      {...props}
    >
      <ContentOpener />
      <PinContent>
        <SubmittingStatus
          actionState={actionState}
          isPending={isPending}
          isSeedingProgress={isSeedingProgress}
          isSubmitting={isSubmitting}
        />
      </PinContent>
      {children}
    </Form>
  );
}

const Form = styled.form`
  --content-height: 20fr;
  --drawer-height: 1fr;
  --drawer-animation: null;
  --drawer-container-size: 90%;
  --drawer-content-display: flex;

  display: grid;
  transition: grid 500ms cubic-bezier(0.17, 1.48, 0.24, 1);
  width: 100cqw;
  height: 100cqh;
  grid-template-rows: [content-device] var(--content-height) [drawer-device] var(--drawer-height);

  &:has(label[for='device-content'] > input:checked) {
    --drawer-content-display: none;
    --content-height: 20fr;
    --drawer-height: 1fr;
  }

  &:has(label[for='drawer'] > input:checked) {
    --content-height: 3fr;
    --drawer-height: 4fr;
    --drawer-animation: bounce-drawer-box;
    --drawer-container-size: 100%;
  }

  & > div#drawer-container {
    width: var(--drawer-container-size);
  }
`;
