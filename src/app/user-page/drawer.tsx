'use client';

import React from 'react';
import { Drawer } from '@/components/ui/device';
import { StatusButton } from '@/components/ui/status-buttonv2';
import { Button } from '@/components/ui/buttonv2';
import { KeypadDetail, KeypadInfo } from '@/utils/keypad';
import styled from 'styled-components';

function PinPad({ padInfo }: { padInfo: KeypadInfo }) {
  const { keypad } = padInfo;

  return (
    <React.Fragment>
      <Numpad keypad={keypad} />
      <Buttons />
    </React.Fragment>
  );
}

function Numpad({
  keypad,
  handleNumpadClick,
}: {
  keypad: KeypadDetail;
  handleNumpadClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) {
  const numpadShape = [
    ['rounded-tl-[16px]', '', 'rounded-tr-[16px]'],
    ['', '', ''],
    ['', '', ''],
    ['rounded-bl-[16px]', '', 'rounded-br-[16px]'],
  ];

  return (
    <div className="flex flex-col gap-[2px]">
      {keypad.svgGrid.map((row, i) => (
        <ul
          key={crypto.randomUUID()}
          className="text-device-text flex flex-row w-[273px] gap-[2px]"
        >
          {row.map(({ x, y, num }, j) => {
            return (
              <li
                key={crypto.randomUUID()}
                className={`bg-device text-[36px] ${numpadShape[i][j]} w-[100px] h-[91px] place-content-center text-center hover:scale-105 hover:border-button-default-foreground hover:shadow-lg active:scale-95`}
                style={{
                  transition: 'all 300ms cubic-bezier(0.17,1.48,0.24,1)',
                }}
              >
                <button
                  type="button"
                  className="w-full h-full inline-flex items-center justify-center"
                  onClick={handleNumpadClick}
                >
                  <Pad
                    className="block bg-numpad w-numpad h-numpad"
                    $x={x}
                    $y={y}
                  />
                </button>
              </li>
            );
          })}
        </ul>
      ))}
    </div>
  );
}

function Buttons({ deletePinnumber }: { deletePinnumber?: () => void }) {
  return (
    <div className="flex flex-row justify-around w-full h-full gap-2">
      <StatusButton
        type="button"
        size={'wide'}
        status={'idle'}
        variant={'default'}
      >
        확인
      </StatusButton>
      <Button type="button" variant={'destructive'} onClick={deletePinnumber}>
        전체삭제
      </Button>
    </div>
  );
}

const Pad = styled.span<{ $x: number; $y: number }>`
  cursor: pointer;
  content: '';
  background-position: ${({ $x, $y }) => `${$x}px ${$y}px`};
  position: relative;

  /* &::before {
    content: '';
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%) scale(0.3);

    width: 60px;
    height: 60px;
    border-radius: 50%;
    aspect-ratio: 1/ 1;

    transition: all 250ms;
    opacity: 0;
    background-color: var(--color-button);
  }

  &:active::before {
    opacity: 0.1;
    transform: translateX(-50%) translateY(-50%) scale(1.2);
  }

  &:hover::before {
    opacity: 0.2;
    transform: translateY(-50%) translateX(-50%) scale(1);
    mix-blend-mode: multiply;
  }

  @keyframes bounce-numpad-box {
    from,
    20%,
    53%,
    80%,
    to {
      animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
      transform: translateX(-50%) translateY(-50%) scale3d(1, 1, 1);
    }
    40%,
    43% {
      animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
      transform: translateX(-50%) translateY(-50%) scale3d(0.78, 0.78, 0.78);
    }
    70% {
      animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
      transform: translateX(-50%) translateY(-50%) scale3d(0.9, 0.9, 0.9);
    }
    90% {
      animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
      transform: translateX(-50%) translateY(-50%) scale3d(0.95, 0.95, 0.95);
    }
  } */
`;

export default PinPad;
