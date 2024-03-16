'use client';

import React, { useEffect } from 'react';
import FunctionKeypad from './FunctionKey/FunctionKey';
import styled from 'styled-components';
import ForTestCode from './NumKey/ForTestCode';
import { createKeypad } from '@/utils/keypad';
import { FocusContext } from '@/context/FocusContext';

interface KeypadProps {
  uses: string;
  inputRef: React.RefObject<HTMLInputElement>;
  triggerState: {
    trigger: boolean;
    setTrigger: React.Dispatch<React.SetStateAction<boolean>>;
  };
}

const PadsContainer = styled.div`
  display: grid;

  grid-template-rows: [caution] 0.2fr [pads] 1fr;
  justify-content: center;
`;

const Caution = styled.p`
  grid-area: caution;
`;

const PadsLayout = styled.div`
  grid-area: pads;

  display: flex;
  flex-direction: column;
`;

export default function PadLayout({
  uses,
  triggerState,
  inputRef,
}: KeypadProps) {
  const [padButtons, setPadButtons] = React.useState<
    CreateKeypadResponse | any
  >(null);
  const [coords, setCoords] = React.useState<number[][]>([]);
  const [uid, setUid] = React.useState(null);
  const keypad = React.useContext(FocusContext);

  const id =
    uses === 'insert' ? 'keypad__insert--keypad' : 'keypad__confirm--keypad';

  useEffect(() => {
    (async () => {
      const responseKeypad = await createKeypad();

      setUid(responseKeypad['uid']);
      setPadButtons(responseKeypad);
    })();
  }, [triggerState.trigger]);

  useEffect(() => {
    if (coords.length > 0) {
      keypad.setter((v) => {
        v.inputResult[uses].uid = uid;
        v.inputResult[uses].coords = coords;
        return v;
      });
    }
  }, [coords]);

  return (
    <PadsContainer id={id}>
      <Caution>6자리로 입력해주세요</Caution>
      <PadsLayout>
        {padButtons ? (
          <>
            <ForTestCode
              keypad={padButtons.keypad}
              triggerState={triggerState}
              coords={{ data: coords, setter: setCoords }}
              inputRef={inputRef}
            />
            <FunctionKeypad
              uid={padButtons.uid}
              uses={uses}
              inputRef={inputRef}
              coords={{ data: coords, setter: setCoords }}
              triggerState={triggerState}
            />
          </>
        ) : null}

        {/* <NumKeypad
                    buttons={padButtons}
                    insertDataState={{ data: insertedData, setter: setInsertedData }}
                    triggerState={triggerState}
                    inputRef={inputRef} /> */}
      </PadsLayout>
    </PadsContainer>
  );
}
