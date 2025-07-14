'use client';

import { memo } from 'react';
import styled from 'styled-components';

export const HoveringTextField = memo(
  ({ isHovering, hasDeviceId = true }: { isHovering: boolean; hasDeviceId?: boolean }) => {
    return (
      <HoveringText $isHovering={isHovering} $hasDeviceId={hasDeviceId}>
        {''}
      </HoveringText>
    );
  }
);

const HoveringText = styled.p<{ $isHovering: boolean; $hasDeviceId: boolean }>`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  opacity: ${({ $isHovering }) => ($isHovering ? 1 : 0)};
  transition: opacity 300ms ease;

  background: linear-gradient(
    to bottom,
    color-mix(
      in oklch,
      ${props => (props.$hasDeviceId ? 'oklch(63.93% 0.206 288.34)' : 'var(--foreground-destructive)')},
      transparent 15%
    ),
    transparent
  );

  color: #333;
  text-shadow: 0 0 5px white;

  padding: 0.25rem 1rem;
  margin-top: 0.35rem;
  border-radius: 1rem;
  width: max-content;
  font-size: 0.75rem;
  font-size: 1rem;
  color: var(--color-text);
`;
