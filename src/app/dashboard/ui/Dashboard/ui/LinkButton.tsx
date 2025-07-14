'use client';

import styled from 'styled-components';
import { Slot } from '@radix-ui/react-slot';

export function LinkButton({ asChild, children }: { children: React.ReactNode; asChild?: boolean }) {
  const Comp = asChild ? Slot : Button;

  return <Button as={Comp}>{children}</Button>;
}

const Button = styled.button`
  font-size: 0.75rem;
  color: var(--color-primary);
  background-color: color-mix(in oklch, var(--color-button), oklch(0.6835 0.1233 259.81) 60%);
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;

  opacity: 0.8;
  transform: scale(1);
  box-shadow: 0px 0px 0px rgba(0, 0, 0, 0);

  transition: all 300ms cubic-bezier(0.18, 0.89, 0.32, 1.28);
  &:hover {
    opacity: 1;
    transform: scale(1.06);
  }

  &:active {
    transform: scale(0.85);
    box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.6);
  }
`;
