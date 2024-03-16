'use client';

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { SVG_HTMLS } from '@/constants/constants';

type FunctionPad = {
  shuffle: string[];
  blank: string[];
};

interface NumKeypadProps {
  buttons: {
    numpad: string[][];
    functionpad: FunctionPad;
  };
  inputRef: React.MutableRefObject<HTMLInputElement>;
  triggerState: {
    trigger: boolean;
    setTrigger: React.Dispatch<React.SetStateAction<boolean>>;
  };
  insertDataState: {
    data: number;
    setter: React.Dispatch<React.SetStateAction<number>>;
  };
}

const NumpadLayout = styled.table`
  border-collapse: collapse;
  width: 100%;
  max-width: 390px;
  margin: 0 auto;
  table-layout: fixed;
  position: relative;
`;
const PadLayout = styled.tr``;

const ButtonContainer = styled.td`
  position: relative;
  margin: 0;
  padding: 0;
`;

const Buttons = styled.button`
  display: block;
  width: 100%;
  height: 45px;
  cursor: pointer;

  & > svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    width: 20px;
    height: 25px;

    cursor: none;
    pointer-events: none;
  }
`;

export default function NumKeypad({
  buttons,
  insertDataState,
  inputRef,
  triggerState,
}: NumKeypadProps) {
  const [padPosition, setPadPosition] = React.useState<any[]>(
    Array.from({ length: 12 }, () => 0),
  );

  useEffect(() => {
    document.querySelectorAll('.key-pad-buttons').forEach((button) => {
      const svg: any = button.childNodes[0];

      let index = svg.attributes[3].nodeValue;
      switch (index) {
        case 'shuffle':
          index = 10;
          break;

        case 'blank':
          index = 11;
          break;
        default:
          index = Number(index);
          break;
      }
      padPosition[index] = button.getClientRects()[0];
      setPadPosition([...padPosition]);
    });
  }, [insertDataState.data]);

  return (
    <NumpadLayout>
      <tbody>
        {buttons.numpad.map((col) => {
          return (
            <PadLayout key={Math.random() * Number.MAX_VALUE}>
              {col.map((svg) => {
                return (
                  <NumpadButtons
                    key={Math.random() * Number.MAX_VALUE}
                    svg={svg}
                    inputRef={inputRef}
                    padPositionState={{
                      positions: padPosition,
                      setter: setPadPosition,
                    }}
                    insertDataState={{
                      data: insertDataState.data,
                      setter: insertDataState.setter,
                    }}
                  />
                );
              })}
            </PadLayout>
          );
        })}
      </tbody>
    </NumpadLayout>
  );
}

interface NumpadButtonsProps {
  svg: string;
  inputRef: React.MutableRefObject<HTMLInputElement>;
  padPositionState: {
    positions: any;
    setter: React.Dispatch<React.SetStateAction<any[]>>;
  };
  insertDataState: {
    data: number;
    setter: React.Dispatch<React.SetStateAction<number>>;
  };
}

function NumpadButtons({
  svg,
  inputRef,
  insertDataState,
  padPositionState,
}: NumpadButtonsProps) {
  return (
    <ButtonContainer key={Math.random() * Number.MAX_VALUE}>
      <Buttons
        className="key-pad-buttons"
        key={Math.random() * Number.MAX_VALUE}
        dangerouslySetInnerHTML={{ __html: svg }}
        onMouseDown={(e) => {
          const currTarget = e.target as HTMLElement;

          const DOMRect = currTarget.getClientRects()[0];

          const currX = DOMRect.x;
          const currY = DOMRect.y;

          padPositionState.positions.map((pad: any, value: any) => {
            const padX = pad.x;
            const padY = pad.y;

            if (padX === currX && padY === currY) {
              if (inputRef.current) {
                inputRef.current.value += `${value}`;
              }
            }
          });
          insertDataState.setter((insertDataState.data += 1));
          inputRef.current.focus();
        }}
      />
    </ButtonContainer>
  );
}
