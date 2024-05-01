'use client';

import styled from 'styled-components';
import Device from './device';
import React from 'react';
import useToggle from '@/hooks/use-toggle';
import { DeviceFrame, DeviceContent, Drawer } from '@/components/ui/device';
import { StatusButton } from '@/components/ui/status-buttonv2';
import { Button } from '@/components/ui/buttonv2';

export default function UserPage() {
  const [padnumber, setPadnumber] = React.useState(
    Array.from({ length: 4 }, () => 0),
  );
  const [pinnumber, setPinnumber] = React.useState(
    Array.from({ length: 4 }, () => 0),
  );
  const pin = Array.from({ length: 4 }, () => '');

  function handleChecked(e: React.ChangeEvent<HTMLInputElement>) {
    setPadnumber((prev) => {
      const newPadnumber = [...prev];
      for (let i = 0; i < newPadnumber.length; i++) {
        if (newPadnumber[i] === 0) {
          newPadnumber[i] = Number(e.target.value);
          break;
        }
      }
      return newPadnumber;
    });
  }

  return (
    <form>
      <DeviceFrame>
        <DeviceContent>
          <div>
            <h1>PIN 번호를 입력해주세요</h1>
          </div>

          <div className="inline-flex flex-row gap-4">
            {pin.map((className, i) => (
              <Pointer
                key={`${i}th-pin-pointer`}
                id={`${i}th-pin-pointer`}
                className={`pin-pointer ${className}`}
              />
            ))}
          </div>
        </DeviceContent>
        <Drawer>
          <Numpad />
          <Buttons />
        </Drawer>
      </DeviceFrame>
    </form>
  );
}

const Pointer = styled.span`
  --pin-pointer-width: 10cqw;

  position: relative;
  display: inline-block;
  width: var(--pin-pointer-width);
  height: 8cqh;
  background: oklch(92.86% 0.036 289.07 / 60%);
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.06);

  &::before {
    content: '';
    width: 30px;
    height: 3px;
    border-radius: 5px;
    background: oklch(99.88% 0.015 294.47);

    position: absolute;
    bottom: 10%;
    left: calc(50% - 15px);
  }
`;

function Buttons() {
  return (
    <div className="flex flex-row justify-end w-full h-full pr-[4.7rem] gap-2">
      <StatusButton
        type="button"
        size={'wide'}
        status={'idle'}
        variant={'default'}
      >
        확인
      </StatusButton>
      <Button type="button" variant={'destructive'}>
        전체삭제
      </Button>
    </div>
  );
}

function Numpad() {
  const numpads = [
    ['rounded-tl-[16px]', '', 'rounded-tr-[16px]'],
    ['', '', ''],
    ['rounded-bl-[16px]', '', 'rounded-br-[16px]'],
  ];

  return (
    <React.Fragment>
      <div className="flex flex-col gap-[2px]">
        {numpads.map((numpad, row) => (
          <ol
            key={row}
            className="text-device-text flex flex-row w-[273px] gap-[2px]"
          >
            {numpad.map((rounded, col) => (
              <li
                key={col}
                className={`bg-device text-[36px] ${rounded} w-[100px] h-[91px] place-content-center text-center hover:scale-105 hover:border-button-default-foreground hover:shadow-lg active:scale-95`}
                style={{
                  transition: 'all 300ms cubic-bezier(0.17,1.48,0.24,1)',
                }}
              >
                <button type="button" className="w-full h-full">
                  {row * 3 + col + 1}
                </button>
              </li>
            ))}
          </ol>
        ))}
      </div>
    </React.Fragment>
  );
}
