'use client';

import { useCallback, useRef, useState } from 'react';
import VisuallyHidden from '@/components/VisuallyHidden';
import { InputContainer, InputRootContainer, InputWrapper, IconWrapper, Placeholder, Input } from '../style';

interface UsernameInputProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string;
  name: string;
  inputContent: string;
  labelContent: string;
  autoComplete: string;
  children?: React.ReactNode;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  validateAction?: (value: unknown) => boolean;
}

export function LeadingIconInput({ id, name, inputContent, labelContent, autoComplete, ...props }: UsernameInputProps) {
  const { children, style, validateAction, ...rest } = props;
  const [value, setValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => {
    setIsFocused(false);
    if (validateAction) {
      const validateResult = validateAction(value);
      setIsValid(validateResult);
    }
  };
  const handleOnChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;
      setValue(inputValue);
      if (props.onChange) {
        props.onChange(e);
      }
    },
    [value]
  );

  return (
    <InputRootContainer key={id} id={`${id}-container`}>
      <InputContainer>
        <InputWrapper $isFocused={isFocused} $isValid={isValid} style={style}>
          <VisuallyHidden>{labelContent}</VisuallyHidden>
          <IconWrapper $isTyping={value.length > 0}>{children}</IconWrapper>
          <Input
            ref={inputRef}
            onFocus={handleFocus}
            onBlur={handleBlur}
            value={value}
            onChange={handleOnChange}
            autoComplete={autoComplete}
            id={id}
            type={'text'}
            name={name}
            {...rest}
          />
          {value.length > 0 ? null : (
            <Placeholder $isFocus={isFocused}>
              <span>{inputContent}</span>
            </Placeholder>
          )}
        </InputWrapper>
      </InputContainer>
    </InputRootContainer>
  );
}
