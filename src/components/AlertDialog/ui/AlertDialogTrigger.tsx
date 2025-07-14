'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import styled from 'styled-components';
import { useAlertDialogContext } from '../hooks/useAlertDialogContext';

interface AlertDialogTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

export const AlertDialogTrigger = React.forwardRef<HTMLButtonElement, AlertDialogTriggerProps>(
  ({ asChild = false, ...props }, ref) => {
    const context = useAlertDialogContext();
    const Comp = asChild ? Slot : StyledButton;

    return (
      <Comp
        ref={ref}
        aria-haspopup="dialog"
        aria-expanded={context.open}
        aria-controls={context.contentId}
        data-state={context.open ? 'open' : 'closed'}
        onClick={context.onOpenToggle}
        {...props}
      />
    );
  }
);

AlertDialogTrigger.displayName = 'AlertDialogTrigger';

const StyledButton = styled.button`
  background-color: #dc2626;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #b91c1c;
  }

  /* 트리거의 data-state를 이용해 스타일링 가능 */
  &[data-state='open'] {
    outline: 2px solid #f87171;
  }
`;
