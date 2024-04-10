'use client';

import styled from 'styled-components';

export const NumpadButton = styled.button`
  &::before {
    content: '';
    display: block;
    position: absolute;
    top: 5.75px;
    left: 8.75px;

    width: 60px;
    height: 60px;
    border-radius: 50%;
    aspect-ratio: 1/ 1;
  }

  &:hover::before {
    background-color: var(--color-button);
    mix-blend-mode: multiply;
  }
`;

export const NumPad = styled.span<{ $x: number; $y: number }>`
  background-position: ${({ $x, $y }) => `${$x}px ${$y}px`};
  position: relative;
`;
