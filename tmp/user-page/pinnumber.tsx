'use client';

import styled from 'styled-components';
import React from 'react';
import { DeviceFrame, DeviceContent, Drawer } from '@/components/ui/device';
import { StatusButton } from '@/components/ui/status-buttonv2';
import { Button } from '@/components/ui/buttonv2';
import { useForm } from '@conform-to/react';
import { z } from 'zod';
import { getZodConstraint } from '@conform-to/zod';

const PinnumberSchema = z.object({
  pinnumber: z.string().length(4),
});

export default function UserPage() {
  const [form, fields] = useForm({
    id: 'pinnumber-input',
    constraint: getZodConstraint(PinnumberSchema),
  });
  const [pinnumber, setPinnumber] = React.useState(
    Array.from({ length: 4 }, () => -1),
  );
  const pin = Array.from({ length: 4 }, () => '');

  function deletePinnumber() {
    setPinnumber(Array.from({ length: 4 }, () => -1));
  }

  function handleNumpadClick(e: React.MouseEvent<HTMLButtonElement>) {
    const value = Number(e.currentTarget.textContent);
    setPinnumber((prev) => {
      const next = [...prev];
      next[prev.findIndex((v) => v === -1)] = Number(value);
      return next;
    });
  }

  return (
    <form id={form.id} noValidate>
      <DeviceFrame>
        <DeviceContent>
          <div className="flex flex-col place-content-center gap-4">
            <div className="place-content-center text-center">
              <p className="text-xl font-bold text-pretty">PIN 번호를</p>
              <p className="text-xl font-bold text-pretty">입력해주세요</p>
            </div>
            <PointerWrapper>
              {pin.map((className, i) => (
                <Pointer
                  key={`${i}th-pin-pointer`}
                  id={`${i}th-pin-pointer`}
                  className={`pin-pointer ${className}`}
                >
                  <input
                    type="radio"
                    name="pointer"
                    checked={i === 0 ? true : pinnumber[i - 1] !== -1}
                    className="pin-pointer-input"
                    readOnly
                  />
                  <input
                    type="radio"
                    checked={pinnumber[i] !== -1}
                    className="pinnumber-display"
                    readOnly
                  />
                </Pointer>
              ))}
            </PointerWrapper>
          </div>
        </DeviceContent>
        <Drawer>
          <Numpad handleNumpadClick={handleNumpadClick} />
          <Buttons deletePinnumber={deletePinnumber} />
        </Drawer>
      </DeviceFrame>
    </form>
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

function Buttons({ deletePinnumber }: { deletePinnumber: () => void }) {
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

function Numpad({
  handleNumpadClick,
}: {
  handleNumpadClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) {
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
                <button
                  type="button"
                  className="w-full h-full"
                  onClick={handleNumpadClick}
                >
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
