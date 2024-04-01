'use client';

import React from 'react';
import { KeypadDetail } from '@/utils/keypad';
import { SvgGrid } from '@/utils/keypad';

interface Props {
  keypad: KeypadDetail;
  setPinNumber: React.Dispatch<React.SetStateAction<string>>;
}

function Keypad({ props }: { props: Props }) {
  const { keypad, setPinNumber } = props;
  const { svgGrid } = keypad;
  const functionKeyLine = svgGrid.pop();
  console.log(svgGrid);

  return (
    <React.Fragment>
      <p>보안 키를 입력해주세요</p>
      <p>4자리로 입력해주세요</p>
      <div
        className="flex flex-col justify-evenly border border-gray-500"
        style={{ width: '20cqw' }}
      >
        {svgGrid.map((row) => (
          <ul key={crypto.randomUUID()} className="flex flex-row">
            {row.map(({ x, y, num }: SvgGrid) => (
              <li key={crypto.randomUUID()}>
                <button>
                  <span className="w-numpad h-numpad block bg-numpad" />
                </button>
              </li>
            ))}
          </ul>
        ))}
      </div>
      <div>
        <button type="submit">확인</button>
      </div>
      <div className="w-numpad h-numpad">
        <span className="bg-numpad w-numpad h-numpad block" />
      </div>
    </React.Fragment>
  );
}

export default Keypad;
