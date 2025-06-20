'use client';

import React from 'react';
import styled from 'styled-components';
import { useNumpadStore } from '@/context/NumpadContext';

export function PinContent() {
  const pin = useNumpadStore(s => s.numpad);

  return (
    <React.Fragment>
      <div className="flex flex-col place-content-center gap-4">
        <div className="place-content-center text-center select-none">
          <p className="text-xl font-bold text-pretty">PIN 번호를</p>
          <p className="text-xl font-bold text-pretty">입력해주세요</p>
        </div>
        <PointerWrapper>
          {pin.map((pinnumber, i) => (
            <Pointer key={`${i}th-pin-pointer`} id={`${i}th-pin-pointer`} className={'pin-pointer'}>
              <input name="pinnumbers" value={pin[i]} type="text" className="hidden w-0 h-0 select-none" readOnly />
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
      </div>
    </React.Fragment>
  );
}

const PointerWrapper = styled.div`
  display: inline-flex;
  flex-direction: row;
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
    width: 1px;
    height: 1px;
    opacity: 0;
    user-select: none;
    visibility: hidden;
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
