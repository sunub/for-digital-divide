'use client';

import { FocusContext } from '@/context/FocusContext';
import React, { HTMLAttributes, useEffect, useState } from 'react';
import styled from 'styled-components';

interface LabelProps extends HTMLAttributes<HTMLLabelElement> {
  id: string;
  label: string;
  children: React.ReactElement;
  bottomText: string;
}

const Label = styled.label``;

export default function KeypadInput({
  id,
  label,
  children,
  bottomText,
}: LabelProps) {
  const Child = React.cloneElement(children);

  return (
    <>
      <Label htmlFor={id}>{label}</Label>
      {Child}
      {bottomText !== null ? <p>{bottomText}</p> : null}
    </>
  );
}

interface InputProps extends HTMLAttributes<HTMLInputElement> {
  error?: boolean;
  triggerState: {
    trigger: boolean;
    setTrigger: React.Dispatch<React.SetStateAction<boolean>>;
  };
}

const PasswordInput = styled.input`
  font-size: 1.5rem;
  padding: 1rem;
`;

KeypadInput.TextField = React.forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {
    const [keynum, setKeynum] = useState('');
    const uses = props.id?.includes('insert') ? 'insert' : 'confirm';
    const otherUses = uses === 'insert' ? 'confirm' : 'insert';
    const keypad = React.useContext(FocusContext);

    return (
      <PasswordInput
        ref={ref}
        onKeyDown={(e) => {
          if (e.code === 'Backspace') {
            let currValue = e.currentTarget.value;
            const currLength = keypad.data.length;
            const deletedValue = currValue.slice(0, currValue.length - 1);
            currValue = deletedValue;
            currLength > 0
              ? keypad.setter((value: any) => {
                  value.length -= 1;
                  return value;
                })
              : null;
          }
        }}
        readOnly
        id={props.id}
        onFocus={() => {
          const currOpen = keypad.data.focusing[uses];
          const otherOpen = keypad.data.focusing[otherUses];

          if (!currOpen && !otherOpen) {
            keypad.setter((value: any) => {
              value.focusing[uses] = !currOpen;
              return value;
            });
            props.triggerState.setTrigger(!props.triggerState.trigger);
          } else if (!currOpen) {
            keypad.setter((value: any) => {
              value.focusing[uses] = !currOpen;
              value.focusing[otherUses] = !otherOpen;
              value.length = 0;
              return value;
            });
            props.triggerState.setTrigger(!props.triggerState.trigger);
          }
        }}
      />
    );
  },
);
