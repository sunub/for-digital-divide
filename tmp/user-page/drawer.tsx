'use client';

import React from 'react';
import { StatusButton } from '@/components/ui/status-buttonv2';
import { Button } from '@/components/ui/buttonv2';
import { KeypadDetail, KeypadInfo } from '@/utils/keypad';
import { useNumpadStore } from '@/context/NumpadContext';
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

function Numpad({ keypad }: { keypad: KeypadDetail }) {
  const updateNumpad = useNumpadStore((s) => s.updateNumpad);
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
          className="text-device-text flex flex-row justify-center w-[273px] gap-[2px]"
        >
          {row.map(({ x, y, num }, j) => {
            return (
              <li
                key={crypto.randomUUID()}
                className={`bg-device text-[36px] ${numpadShape[i][j]} w-[80px] h-[85px] place-content-center text-center hover:scale-105 hover:border-button-default-foreground hover:shadow-lg active:scale-95`}
                style={{
                  transition: 'all 300ms cubic-bezier(0.17,1.48,0.24,1)',
                }}
              >
                <button
                  type="button"
                  className="w-full h-full inline-flex items-center justify-center"
                  onClick={() => updateNumpad(num)}
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

function Buttons() {
  const deleteNumpad = useNumpadStore((s) => s.deleteNumpad);

  return (
    <div className="flex flex-row justify-center w-full h-full gap-4">
      <StatusButton
        type="submit"
        size={'wide'}
        status={'idle'}
        variant={'default'}
      >
        확인
      </StatusButton>
      <Button type="button" variant={'destructive'} onClick={deleteNumpad}>
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
`;

export default PinPad;
