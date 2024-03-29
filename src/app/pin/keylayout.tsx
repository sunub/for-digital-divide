'use client';

import React from 'react';
import Input from './input';

function KeyLayout({ children }: { children: React.ReactNode }) {
  const [pinNumber, setPinNumber] = React.useState('');
  const [isOpen, setOpen] = React.useState(false);

  const pinInputProps = {
    pinNumber,
    onFocus: () => {
      setOpen(true);
    },
    onBlur: () => {
      setOpen(false);
    },
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      setPinNumber(e.target.value);
    },
  };

  React.useEffect(() => {
    console.log(isOpen);
  }, [isOpen]);

  return (
    <div>
      <div>
        <Input htmlFor="pin-pattern-input">
          <Input.TextField
            id="pin-pattern-input"
            autoComplete={'new-password'}
            {...pinInputProps}
          />
        </Input>
        {isOpen && children}
      </div>
    </div>
  );
}

export default KeyLayout;
