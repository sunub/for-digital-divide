'use client';

import React from 'react';
import Input from './input';
import useToggle from '@/hooks/use-toggle';

function Page() {
  const [pinNumber, setPinNumber] = React.useState('');
  const [isOpen, toggleOpen] = useToggle(false);

  const pinInputProps = {
    pinNumber,
    onFocus: () => {
      toggleOpen();
    },
    onBlur: () => {
      toggleOpen();
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
        <Input id="pin-pattern-input">
          <Input.TextField
            id="pin-pattern-input"
            autoComplete={'new-password'}
            {...pinInputProps}
          />
        </Input>
        {isOpen && (
          <div>
            <p>보안 키를 입력해주세요</p>
            <p>4자리로 입력해주세요</p>
            {}
          </div>
        )}
      </div>
    </div>
  );
}

export default Page;
