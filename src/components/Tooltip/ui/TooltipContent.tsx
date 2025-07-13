'use client';

import styled, { keyframes } from 'styled-components';
import { useRef } from 'react';
import { useTooltipContext } from './TooltipProvider';
import { createPortal } from 'react-dom';
import { useTooltipPosition } from '../hooks/useTooltipPosition';
import { useIsMounted } from '@/shared/hooks/useIsMounted';

export function TooltipContent({ children }: { children: React.ReactNode }) {
  const tooltipRef = useRef<HTMLDivElement>(null);
  const { rootContainerRef, isVisible } = useTooltipContext();
  const { top, left, triangleTop } = useTooltipPosition(rootContainerRef);
  const isMounted = useIsMounted();

  if (!isMounted) return null;
  return createPortal(
    <Container
      ref={tooltipRef}
      className="tooltip-content"
      $isVisible={isVisible}
      $top={top}
      $left={left}
      $triangleTop={triangleTop}
    >
      {children}
    </Container>,
    document.getElementById('tooltip-root') || document.body
  );
}

const showTooltip = keyframes`
  0% {
    opacity: 0;
    transform: translateX(-50%) translateY(-4px);
  }
  100% {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
`;

const Container = styled.div<{ $isVisible: boolean; $top: number; $left: number; $triangleTop: number }>`
  position: absolute;
  top: ${({ $top }) => $top}px;
  left: ${({ $left }) => ($left ? `${$left}px` : '50%')};
  width: fit-content;
  padding: 4px 8px;
  border-radius: 0.5rem;
  font-size: 0.75rem;
  color: var(--color-background);
  font-weight: 500;
  background-color: var(--color-accent);

  transform: translateX(-50%);
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
  animation: ${({ $isVisible }) => ($isVisible ? showTooltip : 'none')} 0.2s ease-in-out forwards;

  user-select: none;
  z-index: 100;

  &::before {
    content: '';
    position: absolute;
    top: ${({ $triangleTop }) => $triangleTop}px;
    left: 50%;
    transform: translateX(-50%);
    background-color: var(--color-accent);
    width: var(--tooltip-triangle-width);
    height: var(--tooltip-triangle-height);
    clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
  }
`;
