'use client';

import React from 'react';
import Input from './Input';
import Keypad from './Keypad';
import { KeypadInfo } from '@/utils/keypad';
import submitHandler from './submit';
import { baseurl } from '@/constants/constants';

function KeyLayout({ padInfo }: { padInfo: KeypadInfo }) {
  const [isOpen, setOpen] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const containerRef = React.useRef<HTMLFormElement>(null);

  const keypadProps = {
    keypad: padInfo.keypad,
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
    <form
      ref={containerRef}
      id="pin-pattern-form"
      action={async (formData: FormData) => {
        submitHandler();
      }}
    >
      <div>
        <Input htmlFor="pin-pattern-input" onClick={() => setOpen(true)}>
          <Input.TextField
            ref={inputRef}
            id="pin-pattern-input"
            autoComplete={'new-password'}
            setter={setOpen}
          />
        </Input>
        <div>{isOpen && <Keypad props={keypadProps} />}</div>
      </div>
    </form>
  );
}

export default KeyLayout;
