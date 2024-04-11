'use client';

import React from 'react';
import { KeypadInfo } from '@/utils/keypad';
import { SvgGrid } from '@/utils/keypad';
import styled from 'styled-components';
import { useNumpadStore, useSubmitNumpadStroe } from './KeypadProvider';
import Button from '@/components/Button/Button';

interface PinNumpadProps {
  padInfo: KeypadInfo;
  uses: 'register' | 'confirm';
}

function PinNumpad(props: PinNumpadProps) {
  const { padInfo, uses } = props;
  const { keypad } = padInfo;
  const { svgGrid } = keypad;

  const { numpad, updateNumpad, deleteNumpad } =
    uses === 'register'
      ? useNumpadStore((state) => state)
      : useSubmitNumpadStroe((state) => state);

  return (
    <div className="flex flex-col items-center gap-4 shadow-card_lower p-6 rounded-xl bg-white">
      <div>
        <h1 className="text-l font-bold">보안 키를 입력해주세요</h1>
        <p className="text-sm pt-2">4자리로 입력해주세요</p>
      </div>
      <div
        className="flex flex-col justify-evenly pb-6 pt-6 pl-2 pr-2 rounded-md"
        style={{ width: '21cqw' }}
      >
        {svgGrid.map((row) => (
          <ul key={crypto.randomUUID()} className="flex flex-row">
            {row.map(({ x, y, num }: SvgGrid) => {
              if (num === '101') {
                return (
                  <li
                    key={crypto.randomUUID()}
                    style={{ width: '7cqw' }}
                    className="flex justify-center align-middle relative"
                  >
                    <NumpadButton
                      type="button"
                      className="text-sm"
                      onClick={() => deleteNumpad()}
                    >
                      <span className="block z-10 relative text-pretty leading-5">
                        전체삭제
                      </span>
                    </NumpadButton>
                  </li>
                );
              }

              if (num == '100') {
                return (
                  <li
                    key={crypto.randomUUID()}
                    className="flex justify-center align-middle p-2 relative"
                    style={{ width: '7cqw' }}
                  >
                    <label htmlFor="reorder-numpad-btn">
                      <NumPad
                        $x={x}
                        $y={y}
                        className={`w-numpad h-numpad bg-numpad block`}
                        onClick={() => {
                          if (numpad.length >= 4 || num == '100') return;
                          updateNumpad(`${num}`);
                        }}
                      />
                    </label>
                    <input
                      name="reorder"
                      id="reorder-numpad-btn"
                      className="w-0 h-0"
                      type="radio"
                      onChange={() => {
                        const form = document.getElementById(
                          'pin-pattern-form',
                        ) as HTMLFormElement;

                        form.requestSubmit();
                      }}
                    />
                  </li>
                );
              }

              return (
                <li
                  key={crypto.randomUUID()}
                  className="flex justify-center align-middle p-2 relative"
                  style={{ width: '7cqw' }}
                >
                  <NumpadButton type="button">
                    <NumPad
                      $x={x}
                      $y={y}
                      className={`w-numpad h-numpad bg-numpad block`}
                      onClick={() => {
                        if (numpad.length >= 4 || num == '100') return;
                        updateNumpad(`${num}`);
                      }}
                    />
                  </NumpadButton>
                </li>
              );
            })}
          </ul>
        ))}
      </div>
      <SubmitBtnContainer>
        <Button type="submit">확인</Button>
      </SubmitBtnContainer>
    </div>
  );
}

const NumpadButton = styled.button`
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

const NumPad = styled.span<{ $x: number; $y: number }>`
  background-position: ${({ $x, $y }) => `${$x}px ${$y}px`};
  position: relative;
`;

const SubmitBtnContainer = styled.div`
  position: relative;

  &::before {
    display: block;
    content: '';
    height: 2.5px;
    width: 64px;
    border-radius: 16px;

    position: absolute;
    top: -36px;
    left: calc(50% - 32px);
    background-color: color-mix(in oklch, var(--color-text), transparent 20%);
  }
`;

export default PinNumpad;
