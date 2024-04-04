'use client';

import VisuallyHidden from '@/components/VisuallyHidden';
import React, { InputHTMLAttributes, LabelHTMLAttributes } from 'react';
import { useNumpadStore } from './KeypadProvider';
import styled from 'styled-components';

interface InputTextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  setter: React.Dispatch<React.SetStateAction<boolean>>;
}

interface InputLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
}

interface Numpads {
  number: string;
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
    const tmpPinValue = [];
    const { numpad } = useNumpadStore((state) => state);
    const [pinnums, updatePinnums] = React.useState<string[]>([]);
    const [numpads, updateNumpads] = React.useState<Numpads[]>(
      Array.from({ length: 4 }, () => ({
        number: '',
        isUsed: false,
      })),
    );

    const validNumpadLength = 4;
    const { setter, ...rest } = props;

    React.useEffect(() => {
      updateNumpads((prevNumpads) => {
        if (numpad.length <= 0 || numpad.length > validNumpadLength)
          return prevNumpads;
        const newNumpads = [...prevNumpads];
        const index = numpad.length - 1;
        newNumpads[index] = {
          number: numpad[index],
          isUsed: true,
        };
        return newNumpads;
      });
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
          ref={ref}
          readOnly
          {...rest}
          type="password"
          className="visually-hidden"
          value={pinnums}
        />
      </React.Fragment>
    );
  },
);

Input.TextField.displayName = 'Input TextField';

const Dot = styled.div<{ $isUsed: boolean }>`
  content: '';
  width: 0.5rem;
  height: 0.5rem;
  display: block;
  background-color: ${({ $isUsed }) => ($isUsed ? 'black' : 'white')};
  border-radius: 50%;
  aspect-ratio: 1 / 1;
  border: 1px solid black;
`;

export default Input;
