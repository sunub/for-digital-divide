'use client';

import React from 'react';
import { KeypadInfo } from '@/utils/keypad';
import { SvgGrid } from '@/utils/keypad';
import styled from 'styled-components';
import { useNumpadStore, useSubmitNumpadStroe } from './KeypadProvider';
import Button from '@/components/Button/Button';
import { motion } from 'framer-motion';
import useToggle from '@/hooks/use-toggle';

interface Props {
  padInfo: KeypadInfo;
  uses: string;
  isIdle: boolean;
}

function Keypad({ props }: { props: Props }) {
  const { padInfo, uses } = props;
  const { keypad } = padInfo;
  const { svgGrid } = keypad;

  const { numpad, updateNumpad, deleteNumpad } =
    uses === 'register'
      ? useNumpadStore((state) => state)
      : useSubmitNumpadStroe((state) => state);
  console.log(svgGrid);

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        className="flex flex-col justify-evenly border pb-6 pt-6 pl-2 pr-2 rounded-md bg-slate-50"
        style={{ width: '21cqw', border: '2px solid var(--color-text)' }}
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

              return (
                <Li
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
                </Li>
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

const Li = styled(motion.li)``;

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

export default Keypad;
