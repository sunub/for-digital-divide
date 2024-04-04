'use client';

import React from 'react';
import { KeypadDetail } from '@/utils/keypad';
import { SvgGrid } from '@/utils/keypad';
import styled from 'styled-components';
import { useNumpadStore } from './KeypadProvider';
import Button from '@/components/Button/Button';

interface Props {
  keypad: KeypadDetail;
}

function Keypad({ props }: { props: Props }) {
  const { keypad } = props;
  const { svgGrid } = keypad;
  const numpadKeys = new Map();
  const { numpad, updateNumpad } = useNumpadStore((state) => state);

  return (
    <div>
      <p>보안 키를 입력해주세요</p>
      <p>4자리로 입력해주세요</p>
      <div
        className="flex flex-col justify-evenly border border-gray-500"
        style={{ width: '21cqw' }}
      >
        {svgGrid.map((row) => (
          <ul key={crypto.randomUUID()} className="flex flex-row">
            {row.map(({ x, y, num }: SvgGrid) => {
              numpadKeys.set(`${x}-${y}`, num);

              if (num === 101) {
                return (
                  <li
                    key={crypto.randomUUID()}
                    style={{ width: '7cqw' }}
                    className="flex justify-center align-middle"
                  >
                    <button type="button" className="text-sm">
                      전체삭제
                    </button>
                  </li>
                );
              }

              return (
                <li
                  key={crypto.randomUUID()}
                  className="flex justify-center align-middle p-2"
                  style={{ width: '7cqw' }}
                >
                  <button type="button">
                    <NumPad
                      $x={x}
                      $y={y}
                      className={`w-numpad h-numpad bg-numpad block`}
                      onClick={() => {
                        if (numpad.length >= 4) return;
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
      <div>
        <Button type="submit">확인</Button>
      </div>
    </div>
  );
}

const NumPad = styled.span<{ $x: number; $y: number }>`
  background-position: ${({ $x, $y }) => `${$x}px ${$y}px`};
`;

export default Keypad;
