'use client';

import VisuallyHidden from '@/components/VisuallyHidden';
import React, { InputHTMLAttributes, LabelHTMLAttributes } from 'react';
import { useNumpadStore, useSubmitNumpadStroe } from './KeypadProvider';
import styled from 'styled-components';

interface InputTextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  uses: string;
  setter: React.Dispatch<React.SetStateAction<boolean>>;
}

interface InputLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
}

interface Numpads {
  isUsed: boolean;
}

function Input(props: InputLabelProps) {
  const { htmlFor, children, ...rest } = props;

  return (
    <React.Fragment>
      <label htmlFor={htmlFor} className="flex h-fit w-fit" {...rest}>
        <h1>
          {htmlFor === 'pin-pattern-input' ? '보안 PIN 입력' : '보안 PIN 확인'}
        </h1>
      </label>
      {children}
    </React.Fragment>
  );
}

Input.TextField = React.forwardRef<HTMLInputElement, InputTextFieldProps>(
  (props, ref) => {
    const { numpad } =
      props.uses === 'register'
        ? useNumpadStore((state) => state)
        : useSubmitNumpadStroe((state) => state);

    const [numpads, updateNumpads] = React.useState<Numpads[]>(
      Array.from({ length: 4 }, () => ({
        isUsed: false,
      })),
    );

    const validNumpadLength = 4;
    const { setter, ...rest } = props;

    React.useEffect(() => {
      if (numpad.length <= validNumpadLength) {
        updateNumpads((prev) => {
          return prev.map((_, index) => {
            if (index < numpad.length) {
              return { isUsed: true };
            } else {
              return { isUsed: false };
            }
          });
        });
      }
    }, [numpad]);

    return (
      <React.Fragment>
        <div
          className="flex flex-row justify-around align-middle w-32 h-2"
          onClick={() => setter(true)}
        >
          {numpads.map(({ isUsed }, index) => (
            <Dot key={`${index}th-dot-text`} $isUsed={isUsed} />
          ))}
        </div>
        <input
          id="pin-pattern-input"
          name="pinNumbers"
          ref={ref}
          readOnly
          {...rest}
          type="password"
          className="visually-hidden"
          value={numpad}
        />
      </React.Fragment>
    );
  },
);

Input.TextField.displayName = 'Input TextField';

const Dot = styled.div<{ $isUsed: boolean }>`
  content: '';
  width: 0.75rem;
  height: 0.75rem;
  display: block;
  background-color: ${({ $isUsed }) =>
    $isUsed
      ? 'var(--color-button)'
      : 'color-mix(in oklch, var(--color-text), transparent)'};
  border-radius: 50%;
  aspect-ratio: 1 / 1;
`;

export default Input;
