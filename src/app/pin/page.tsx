'use client';

import React from 'react';
import Input from './input';

function Page() {
  const [pinNumber, setPinNumber] = React.useState('');

  return (
    <div>
      <div>
        <h2>보안 핀 번호 입력</h2>
      </div>

      <div>
        <Input id="pin-pattern-input">
          <Input.TextField
            id="pin-pattern-input"
            autoComplete={'new-password'}
            pinNumber={pinNumber}
            setPinNumber={setPinNumber}
          />
        </Input>
      </div>
    </div>
  );
}

export default Page;
