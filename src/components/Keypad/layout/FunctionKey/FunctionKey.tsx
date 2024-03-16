'use client';

import React from 'react';
import { FocusContext } from '@/context/FocusContext';

interface FunctionPadProps {
  uses: string;
  uid: string;
  inputRef: React.RefObject<HTMLInputElement>;
  triggerState: {
    trigger: boolean;
    setTrigger: React.Dispatch<React.SetStateAction<boolean>>;
  };
  coords: {
    data: number[][];
    setter: React.Dispatch<React.SetStateAction<number[][]>>;
  };
}

export default function FunctionKeypad({
  uid,
  uses,
  inputRef,
  triggerState,
  coords,
}: FunctionPadProps) {
  const keypad = React.useContext(FocusContext);

  return (
    <div>
      <button
        onClick={() => {
          if (keypad.data.length < 6) {
            inputRef.current.value = '';
          }
          if (keypad.data.length === 6) {
            keypad.setter((value: any) => {
              value.inputResult[uses].uid = uid;
              value.inputResult[uses].coords = coords.data;
              return value;
            });
          }

          keypad.setter((value: any) => {
            value.length = 0;
            value.focusing[uses] = false;
            return value;
          });

          console.log(keypad.data.inputResult);

          coords.setter([]);
          triggerState.setTrigger(!triggerState.trigger);
        }}
      >
        확인
      </button>
      <button>삭제</button>
      <button>
        <span
          onClick={() => {
            if (inputRef.current) {
              let curr = inputRef.current.value;
              curr = curr.slice(0, curr.length - 1);
              inputRef.current.value = curr;
            }
          }}
          className="material-symbols-outlined"
        >
          backspace
        </span>
      </button>
      <button
        onClick={() => {
          inputRef.current.value = '';
          keypad.setter((value: any) => {
            value.length = 0;
            return value;
          });
        }}
      >
        전체삭제
      </button>
    </div>
  );
}
