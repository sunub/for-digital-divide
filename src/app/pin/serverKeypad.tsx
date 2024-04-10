import React from 'react';
import { KeypadInfo } from '@/utils/keypad';
import { SvgGrid } from '@/utils/keypad';
import Button from '@/components/Button/Button';
import * as Styled from './keypad.style';
import crypto from 'crypto';

async function getPadInfo(): Promise<KeypadInfo> {
  const baseurl =
    process.env.NODE_ENV === 'production'
      ? 'https://for-digital-divide.vercel.app'
      : 'http://localhost:3000';

  const response = await fetch(`${baseurl}/api/keypad`, {
    cache: 'no-store',
  });
  const data = await response.json();
  return data;
}

export async function Keypad() {
  const padInfo = await getPadInfo();
  const { keypad } = padInfo;
  const { svgGrid } = keypad;

  return (
    <div>
      <div>HI</div>
      {/* <div style={{ width: '21cqw', border: '2px solid var(--color-text)' }}>
        {svgGrid.map((row) => (
          <ul key={crypto.randomUUID()}>
            {row.map(({ x, y, num }: SvgGrid) => {
              if (num === '101') {
                return (
                  <li key={crypto.randomUUID()} style={{ width: '7cqw' }}>
                    <Styled.NumpadButton type="button">
                      <span>전체삭제</span>
                    </Styled.NumpadButton>
                  </li>
                );
              }

              return (
                <li key={crypto.randomUUID()} style={{ width: '7cqw' }}>
                  <Styled.NumpadButton type="button">
                    <Styled.NumPad $x={x} $y={y} />
                  </Styled.NumpadButton>
                </li>
              );
            })}
          </ul>
        ))}
      </div>
      <div>
        <Button type="submit">확인</Button>
      </div> */}
    </div>
  );
}

export default Keypad;
