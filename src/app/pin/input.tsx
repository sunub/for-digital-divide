'use client';

import VisuallyHidden from '@/components/VisuallyHidden';
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  pinNumber: string;
  setPinNumber: React.Dispatch<React.SetStateAction<string>>;
}

function Input({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <React.Fragment>
      <label htmlFor={id}>
        <VisuallyHidden>
          {id === 'pin-pattern-input' ? '보안 키 입력' : '보안 키 확인'}
        </VisuallyHidden>
      </label>
      {children}
    </React.Fragment>
  );
}

Input.TextField = React.forwardRef(
  (props: InputProps, ref: React.Ref<HTMLInputElement>) => {
    return (
      <input
        ref={ref}
        {...props}
        type="password"
        required
        aria-label="pin-pattern-input"
        value={props.pinNumber}
        onChange={(e) => props.setPinNumber(e.target.value)}
      />
    );
  },
);

export default Input;
