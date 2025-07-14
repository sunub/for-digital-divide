'use client';

import { KeypadInfo } from '@/utils/keypad';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect } from 'react';
import { pinRegisterAction } from '../utils/pinRegisterAction';
import { useToast } from '@/provider/toast/hooks/useToast';
import { createPortal } from 'react-dom';
import { PinNumpad } from './PinNumpad';
import styled from 'styled-components';
import { useNumpadStore } from '@/context/NumpadContext';

interface PinFormProps extends React.HTMLAttributes<HTMLFormElement> {
  padInfo: KeypadInfo;
  children: React.ReactNode;
}

export function PinForm({ padInfo, children, ...props }: PinFormProps) {
  const showToast = useToast();
  const router = useRouter();
  const deleteNumpad = useNumpadStore((s) => s.deleteNumpad);

  useEffect(() => {
    const drawerContent = document.getElementById('drawer-content');
    if (!drawerContent) {
      return;
    }
    createPortal(<PinNumpad padInfo={padInfo} />, drawerContent);
  }, []);

  useEffect(() => {
    router.prefetch('/dashboard');
  }, []);

  const handleAction = useCallback(async (formData: FormData) => {
    const result = await pinRegisterAction(formData);
    deleteNumpad();
    if (result.status == 'error') {
      return showToast('error', result.message);
    }
    showToast('success', '핀번호가 등록되었습니다.');
    router.push('/dashboard');
  }, []);

  return (
    <Form className="device-form__drawer-container" id={'pinnumber-input'} action={handleAction} noValidate {...props}>
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
