'use client';

import React from 'react';
import styled from 'styled-components';
import { useNumpadStore } from '@/context/NumpadContext';
import { Gugi } from 'next/font/google';
import { FlexCenterDiv } from '@/shared/style/component/div';

const gugi = Gugi({ subsets: ['latin'], weight: '400' });

export function PinContent() {
  const pin = useNumpadStore((s) => s.numpad);
  console.log('PinContent pin:', pin);

  return (
    <RootContainer>
      <HeaderContainer>
        <Title>핀 번호 등록</Title>
        <Description>등록된 핀 번호가 존재하지 않아 핀 번호를 새롭게 등록 해야 합니다</Description>
      </HeaderContainer>
      <PointerWrapper>
        {pin.map((pinnumber, i) => (
          <Pointer key={`${i}th-pin-pointer`} id={`${i}th-pin-pointer`} className={'pin-pointer'}>
            <input name="pinnumbers" value={pin[i]} type="hidden" />
            <input
              type="radio"
              name="pointer"
              checked={i === 0 ? true : pinnumber !== ''}
              className="pin-pointer-input"
              readOnly
            />
            <input type="radio" checked={pinnumber !== ''} className="pinnumber-display" readOnly />
          </Pointer>
        ))}
      </PointerWrapper>
    </RootContainer>
  );
}

const RootContainer = styled(FlexCenterDiv)`
  grid-area: content-device / 1;
  flex-direction: column;
  gap: 1rem;
`;

const HeaderContainer = styled(FlexCenterDiv)`
  flex-direction: column;
  max-width: 17rem;
`;

const Title = styled.h1`
  font-size: 1.75rem;
  font-weight: 900;
  word-wrap: break-word;
  font-family: ${gugi.style.fontFamily};
  color: color-mix(in oklch, oklch(63.93% 0.206 288.34), var(--color-primary) 0%);
`;

const Description = styled.p`
  font-size: 1rem;
  font-weight: 700;
  word-wrap: break-word;
  margin-top: 0.25rem;
  color: color-mix(in oklch, oklch(63.93% 0.206 288.34) 50%, var(--color-primary) 0%);
`;

const PointerWrapper = styled.div`
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

const Pointer = styled.span`
  --pin-pointer-width: 10cqw;
  --pin-pointer-cursor: hidden;
  --pin-pointer-placeholder: 0;

  position: relative;
  display: inline-block;
  width: var(--pin-pointer-width);
  height: 8cqh;
  border-radius: 8px;
  background: oklch(75.35% 0.162 289.07 / 60%);
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.06);

  & > input {
    position: absolute;
    width: 1px;
    height: 1px;
    opacity: 0;
    user-select: none;
    pointer-events: none;
    clip: rect(0, 0, 0, 0);
  }

  &:has(input.pinnumber-display:checked) {
    --pin-pointer-placeholder: 1;
  }

  &:has(input.pin-pointer-input:checked) {
    --pin-pointer-cursor: visible;
  }

  &::before {
    content: '';
    width: 30px;
    height: 3px;
    border-radius: 5px;
    background: oklch(99.88% 0.015 294.47);
    visibility: var(--pin-pointer-cursor);

    position: absolute;
    bottom: 10%;
    left: calc(50% - 15px);
    animation: blink 1.25s infinite;

    @keyframes blink {
      0%,
      100% {
        opacity: 1;
      }
      50% {
        opacity: 0;
      }
    }
  }

  &::after {
    content: '';
    width: 15px;
    height: 15px;

    position: absolute;
    top: calc(50% - 7.5px);
    left: calc(50% - 7.5px);

    background: oklch(99.88% 0.015 294.47);
    border-radius: 50%;
    aspect-ratio: 1 / 1;
    transform: scale(var(--pin-pointer-placeholder));
    transition: transform 250ms ease;
  }
`;
