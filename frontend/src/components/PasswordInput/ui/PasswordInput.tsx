"use client";

import { KeySquare } from "lucide-react";
import { useRef, useState } from "react";
import { TextField } from "@/components/TextField/TextField";

interface PasswordInputProps extends React.HTMLAttributes<HTMLInputElement> {
  id?: string;
  autoCompletes?: React.InputHTMLAttributes<HTMLInputElement>["autoComplete"];
  validateAction?: (value: unknown) => boolean;
}

export function PasswordInput(props: PasswordInputProps) {
  const [value, setValue] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [_isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => {
    setIsFocused(false);
    if (props.validateAction) {
      const validateResult = props.validateAction(value);
      setIsValid(validateResult);
    }
  };

  return (
    <TextField
      onFocus={handleFocus}
      onBlur={handleBlur}
      isError={isValid}
      ref={inputRef}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      autoComplete={props.autoCompletes || "new-password"}
      id={props.id || "sign-up_new-password"}
      labelContent="비밀번호 입력 란"
      leftIcon={<KeySquare size={16} />}
      passwordVisibility={true}
    />
  );
}
