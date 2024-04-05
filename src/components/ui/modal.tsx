'use client';

import React, { HTMLAttributes } from 'react';
import styled from 'styled-components';
import Button from '@/components/Button';
import Username from '../LoginForm/LoginInput/Username';
import useToggle from '@/hooks/use-toggle';

interface ModalProps extends HTMLAttributes<HTMLDialogElement> {
  children: React.ReactNode;
  isOpen: boolean;
}

const Modal = React.forwardRef<HTMLDialogElement, ModalProps>((props, ref) => {
  const [isFocus, toggleFocus] = useToggle(false);
  const { isOpen, children, ...rest } = props;

  return (
    <Dialog ref={ref} open {...rest}>
      <Form method="dialog">
        {children}
        <Button>확인</Button>
      </Form>
    </Dialog>
  );
});

const Dialog = styled.dialog`
  position: absolute;
  top: -64px;
  left: 0px;
  z-index: 1000;

  width: 100dvw;
  height: 100dvh;

  background: var(--color-background);
`;

const Form = styled.form`
  display: grid;
  align-content: center;
  justify-items: center;
  gap: 1.5rem;

  width: 100%;
  height: 100%;
`;

export default Modal;
