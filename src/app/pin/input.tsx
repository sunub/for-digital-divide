'use client';

import VisuallyHidden from '@/components/VisuallyHidden';
import React, { InputHTMLAttributes } from 'react';

interface InputTextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  pinNumber: string;
}

function Input({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <React.Fragment>
      <label htmlFor={id}>
        <h1>
          {id === 'pin-pattern-input' ? '보안 PIN 입력' : '보안 PIN 확인'}
        </h1>
      </label>
      {children}
    </React.Fragment>
  );
}

Input.TextField = React.forwardRef<HTMLInputElement, InputTextFieldProps>(
  (props, ref) => {
    const { pinNumber, ...rest } = props;

    return <input ref={ref} {...rest} type="password" />;
  },
);

Input.TextField.displayName = 'Input TextField';

export default Input;
