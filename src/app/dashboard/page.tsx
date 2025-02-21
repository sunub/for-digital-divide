'use client';

import { styled } from 'styled-components';
import { DeviceContent, DeviceFrame } from '@/components/ui/device';
import {
  PatternIcon,
  PasskeyIcon,
  PasswordIcon,
  PinIcon,
} from '@/components/Icon';
import { motion } from 'motion/react';
import React, { useReducer, useRef } from 'react';
import Link from 'next/link';

type VisibilityState = {
  isPatternVisible: boolean;
  isPasskeyVisible: boolean;
  isPasswordVisible: boolean;
  isPinVisible: boolean;
};

type AppType = {
  type: keyof typeof ICON_NAME;
  icon: React.ElementType;
  isVisible: boolean;
  pos: { x: number; y: number };
  href: string;
  disabled: boolean;
};

const ICON_NAME = {
  TOGGLE_PATTERN: '패턴',
  TOGGLE_PASSKEY: '비밀번호',
  TOGGLE_PASSWORD: '암호',
  TOGGLE_PIN: 'PIN',
} as const;

function reducer(
  state: VisibilityState,
  action: { type: string },
): VisibilityState {
  switch (action.type) {
    case 'TOGGLE_PATTERN':
      return { ...state, isPatternVisible: !state.isPatternVisible };
    case 'TOGGLE_PASSKEY':
      return { ...state, isPasskeyVisible: !state.isPasskeyVisible };
    case 'TOGGLE_PASSWORD':
      return { ...state, isPasswordVisible: !state.isPasswordVisible };
    case 'TOGGLE_PIN':
      return { ...state, isPinVisible: !state.isPinVisible };
    default:
      return state;
  }
}

function Page() {
  const constraintsRef = useRef<HTMLDivElement>(null);
  const [state, dispatch] = useReducer(reducer, {
    isPatternVisible: false,
    isPasskeyVisible: false,
    isPasswordVisible: false,
    isPinVisible: false,
  });

  const APPS: AppType[] = [
    {
      type: 'TOGGLE_PIN',
      icon: PinIcon,
      isVisible: state.isPinVisible,
      pos: { x: 4, y: 4 },
      href: '/dashboard/pin',
      disabled: false,
    },
    {
      type: 'TOGGLE_PATTERN',
      icon: PatternIcon,
      isVisible: state.isPatternVisible,
      pos: { x: 1, y: 4 },
      href: '/dashboard/pattern',
      disabled: true,
    },
    {
      type: 'TOGGLE_PASSKEY',
      icon: PasskeyIcon,
      isVisible: state.isPasskeyVisible,
      pos: { x: 2, y: 4 },
      href: '#',
      disabled: true,
    },
    {
      type: 'TOGGLE_PASSWORD',
      icon: PasswordIcon,
      isVisible: state.isPasswordVisible,
      pos: { x: 3, y: 4 },
      href: '#',
      disabled: true,
    },
  ] as const;

  return (
    <DeviceFrame>
      <DeviceContent ref={constraintsRef} className="pt-8 gap-4">
        {APPS.map(({ type, icon, pos, href, disabled }) => (
          <AppContainer
            key={type}
            href={href ?? '#'}
            aria-disabled={disabled}
            $pos={pos}
            $disabled={disabled}
            onClick={(e) => {
              if (disabled) e.preventDefault();
            }}
          >
            {React.createElement(icon)}
            <Anchor $isVisible={true}>{ICON_NAME[type]}</Anchor>
          </AppContainer>
        ))}
      </DeviceContent>
    </DeviceFrame>
  );
}

const Anchor = styled(motion.span)<{ $isVisible: boolean }>`
  display: block;
  visibility: ${({ $isVisible }) => ($isVisible ? 'visible' : 'hidden')};
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
  transition: opacity 0.2s ease-in-out;
`;

const AppContainer = styled(Link)<{
  $pos: { x: number; y: number };
  $disabled: boolean;
}>`
  grid-row-start: ${({ $pos }) => $pos.y};
  grid-row-end: ${({ $pos }) => $pos.y + 1};
  grid-column-start: ${({ $pos }) => $pos.x};
  grid-column-end: ${({ $pos }) => $pos.x + 1};

  display: grid;
  place-items: center;
  background: ${({ $disabled }) =>
    $disabled
      ? 'color-mix(in oklch, var(--destructive), transparent 40%)'
      : 'color-mix(in oklch, var(--color-button), transparent 30%)'};
  color: ${({ $disabled }) =>
    $disabled
      ? 'color-mix(in oklch, var(--destructive), var(--color-text))'
      : 'var(--color-primary)'};

  position: relative;
  aspect-ratio: 1 / 1;
  padding: 1rem;

  border: 1px solid color-mix(in oklch, var(--color-primary), transparent 40%);
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  border-bottom-left-radius: 28px;
  border-bottom-right-radius: 28px;
  box-shadow: 0 4px 0 3px
    ${({ $disabled }) =>
      $disabled ? 'var(--destructive)' : 'var(--color-button)'};

  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  user-select: ${({ $disabled }) => ($disabled ? 'none' : 'auto')};

  will-change: transform;
  transition: transform 1s
    linear(
      0,
      0.009,
      0.035 2.1%,
      0.141,
      0.281 6.7%,
      0.723 12.9%,
      0.938 16.7%,
      1.017,
      1.077,
      1.121,
      1.149 24.3%,
      1.159,
      1.163,
      1.161,
      1.154 29.9%,
      1.129 32.8%,
      1.051 39.6%,
      1.017 43.1%,
      0.991,
      0.977 51%,
      0.974 53.8%,
      0.975 57.1%,
      0.997 69.8%,
      1.003 76.9%,
      1.004 83.8%,
      1
    );
  &:hover {
    transform: translateY(-10px);
    transform: scale(1.05);
  }
`;

export default Page;
