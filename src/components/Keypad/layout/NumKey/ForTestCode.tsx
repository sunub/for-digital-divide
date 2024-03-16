'use client';

import React from 'react';
import styled from 'styled-components';
import { SVG_HTMLS } from '@/constants/constants';
import { FocusContext } from '@/context/FocusContext';

interface NumKeypadProps {
  keypad: Keypad;
  inputRef: React.MutableRefObject<HTMLInputElement>;
  triggerState: {
    trigger: boolean;
    setTrigger: React.Dispatch<React.SetStateAction<boolean>>;
  };
  coords: {
    data: any[];
    setter: React.Dispatch<React.SetStateAction<any[]>>;
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

export default function ForTestCode({
  coords,
  keypad,
  inputRef,
  triggerState,
}: NumKeypadProps) {
  let padPositionIndex = -1;
  const [padNumber, setPadNumber] = React.useState<any[]>(
    Array.from({ length: 12 }, () => 0),
  );
  const buttons = keypad.svgGrid;
  const contextValue = React.useContext(FocusContext);

  React.useEffect(() => {
    if (buttons) {
      const shuffledSVG = buttons.flat(1);

      SVG_HTMLS.map((svg, value) => {
        for (let i = 0; i < shuffledSVG.length; i++) {
          if (svg === shuffledSVG[i]) {
            padNumber[i] = value + 1;
            break;
          }
        }
      });

      setPadNumber(padNumber);
    }
  }, [buttons]);

  return (
    <NumpadLayout>
      <tbody>
        {buttons
          ? buttons.map((col) => {
              return (
                <PadLayout key={Math.random() * Number.MAX_VALUE}>
                  {col.map((svg) => {
                    padPositionIndex += 1;
                    return (
                      <NumpadButtons
                        coords={coords}
                        key={Math.random() * Number.MAX_VALUE}
                        svg={svg}
                        inputRef={inputRef}
                        positionIndex={padPositionIndex}
                        padButtonNumbers={padNumber}
                        triggerState={{
                          trigger: triggerState.trigger,
                          setTrigger: triggerState.setTrigger,
                        }}
                        contextValue={contextValue}
                      />
                    );
                  })}
                </PadLayout>
              );
            })
          : null}
      </tbody>
    </NumpadLayout>
  );
}

interface NumpadButtonsProps {
  svg: string;
  inputRef: React.MutableRefObject<HTMLInputElement>;
  positionIndex: number;
  padButtonNumbers: any[];
  triggerState: {
    trigger: boolean;
    setTrigger: React.Dispatch<React.SetStateAction<boolean>>;
  };
  contextValue: ContextValueSetting;
  coords: {
    data: any[];
    setter: React.Dispatch<React.SetStateAction<any[]>>;
  };
}

function NumpadButtons({
  coords,
  svg,
  inputRef,
  positionIndex,
  padButtonNumbers,
  triggerState,
  contextValue,
}: NumpadButtonsProps) {
  return (
    <ButtonContainer className={`key-pad-buttons`} key={Math.random()}>
      <Buttons
        onMouseDown={() => {
          const row = Math.floor(positionIndex / 3);
          const col = Math.floor(positionIndex % 3);

          if (contextValue.data.length < 6) {
            let inputValue: any = 0;
            switch (padButtonNumbers[positionIndex]) {
              case 10:
                inputValue = 0;
                break;
              case 11:
                inputValue = 'shuffle';
                break;
              case 12:
                inputValue = 'blank';
                break;
              default:
                inputValue = padButtonNumbers[positionIndex];
                break;
            }
            if (typeof inputValue !== 'string') {
              inputRef.current.value += inputValue;

              contextValue.setter((value) => {
                value.length += 1;
                return value;
              });

              coords.setter((coord) => {
                const currCoord = {
                  x: row,
                  y: col,
                };

                const newCoord = [...coord, currCoord];
                return newCoord;
              });
            } else if (inputValue === 'shuffle') {
              triggerState.setTrigger(!triggerState.trigger);
            }
          }
        }}
        key={Math.random()}
        dangerouslySetInnerHTML={{ __html: svg }}
      />
    </ButtonContainer>
  );
}
