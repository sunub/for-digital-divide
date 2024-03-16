import React, { useEffect } from 'react';
import KeypadInput from './KeyPadInput';
import styled from 'styled-components';
import { FocusContext } from '@/context/FocusContext';
import Spacer from '../Spacer';
import PadLayout from './layout/PadLayout';

interface KeypadProps {
  uses: string;
  label: string;
  text: string;
  triggerState: {
    trigger: boolean;
    setTrigger: React.Dispatch<React.SetStateAction<boolean>>;
  };
}

export default function Keypad({
  uses,
  label,
  text,
  triggerState,
}: KeypadProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const contextValue = React.useContext(FocusContext);
  const keypad = contextValue.data;

  const id =
    uses === 'insert' ? 'keypad__insert--input' : 'keypad__confirm--input';

  return (
    <>
      <KeypadInput
        label={label}
        id={id}
        bottomText={keypad.focusing[uses] ? text : ''}
      >
        <KeypadInput.TextField
          id={id}
          triggerState={triggerState}
          ref={inputRef}
        />
      </KeypadInput>
      <Spacer axis="vertical" size={24} />
      {/* <Pads uses={uses} keypad={keypad} triggerState={triggerState} inputRef={inputRef} /> */}
      {keypad.focusing[uses] ? (
        <PadLayout
          uses={uses}
          inputRef={inputRef}
          triggerState={triggerState}
        />
      ) : null}
    </>
  );
}
