'use client';

import React from 'react';
import Input from './Input';
import Keypad from './Keypad';
import { create } from 'zustand';
import { number } from 'valibot';
import { KeypadInfo } from '@/utils/keypad';

function KeyLayout({ padInfo }: { padInfo: KeypadInfo }) {
  const [pinNumber, setPinNumber] = React.useState('');
  const [isOpen, setOpen] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const containerRef = React.useRef<HTMLFormElement>(null);

  const pinInputProps = {
    pinNumber,
    onFocus: () => {
      setOpen(true);
    },
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      setPinNumber(e.target.value);
    },
  };

  const keypadProps = {
    keypad: padInfo.keypad,
    setPinNumber,
  };

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    window.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <form ref={containerRef}>
      <div>
        <Input htmlFor="pin-pattern-input">
          <Input.TextField
            ref={inputRef}
            id="pin-pattern-input"
            autoComplete={'new-password'}
            {...pinInputProps}
          />
        </Input>
        <div>{isOpen && <Keypad props={keypadProps} />}</div>
      </div>
    </form>
  );
}

export default KeyLayout;
