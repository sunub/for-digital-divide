'use client';

import React from 'react';
import styled from 'styled-components';
import Button from '@/components/Button/Button';
import { KeypadInfo } from '@/utils/keypad';
import { SvgGrid } from '@/utils/keypad';
import { useNumpadStore, useSubmitNumpadStroe } from '../../context/NumpadContext';

interface PinNumpadProps {
  padInfo: KeypadInfo;
  uses: 'register' | 'confirm';
}

function PinNumpad(props: PinNumpadProps) {
  const { padInfo, uses } = props;
  const { keypad } = padInfo;
  const { svgGrid } = keypad;

  const { numpad, status, updateNumpad, deleteNumpad } =
    uses === 'register' ? useNumpadStore((state) => state) : useSubmitNumpadStroe((state) => state);

  return (
    <div className="flex flex-col items-center gap-4 shadow-card_lower p-6 rounded-xl bg-white">
      <div>
        <h1 className="text-l font-bold">보안 키를 입력해주세요</h1>
        <p className="text-sm pt-2">4자리로 입력해주세요</p>
      </div>
      <div className="flex flex-col justify-evenly pb-6 pl-2 pr-2 rounded-md w-full">
        {svgGrid.map((row) => (
          <ul key={crypto.randomUUID()} className="flex flex-row w-full justify-around items-center">
            {row.map(({ x, y, num }: SvgGrid) => {
              if (num === '101') {
                return (
                  <li
                    key={crypto.randomUUID()}
                    className="bg-device text-[36px] rounded-br-[16px] w-[100px] h-[91px] place-content-center text-center"
                  >
                    <button type="button" className="text-xs" onClick={() => deleteNumpad()}>
                      <DeleteBtn>전체삭제</DeleteBtn>
                    </button>
                  </li>
                );
              }

              if (num == '100') {
                return (
                  <li
                    key={crypto.randomUUID()}
                    className="bg-device text-[36px] rounded-bl-[16px] w-[100px] h-[91px] flex justify-center p-2 relative items-center"
                  >
                    <label htmlFor={`reorder-numpad-btn-${uses}`}>
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
                      id={`reorder-numpad-btn-${uses}`}
                      className="w-0 h-0"
                      type="radio"
                      onChange={() => {
                        const form = document.getElementById('pin-pattern-form') as HTMLFormElement;

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
                  <button type="button">
                    <NumPad
                      $x={x}
                      $y={y}
                      className={`w-numpad h-numpad bg-numpad block`}
                      onClick={() => {
                        if (numpad.length >= 4 || num == '100') return;
                        updateNumpad(`${num}`);
                      }}
                    />
                  </button>
                </li>
              );
            })}
          </ul>
        ))}
      </div>
      <SubmitBtnContainer>
        <Button type="submit" status={status}>
          확인
        </Button>
      </SubmitBtnContainer>
    </div>
  );
}
const DeleteBtn = styled.span`
  display: block;
  z-index: 10;
  position: relative;
  word-wrap: break-word;
  line-height: 1.25rem;
  cursor: pointer;

  &::before {
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
  }
`;

const NumPad = styled.span<{ $x: number; $y: number }>`
  cursor: pointer;
  background-position: ${({ $x, $y }) => `${$x}px ${$y}px`};
  position: relative;

  &::before {
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
  }
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
