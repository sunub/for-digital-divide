"use client";

import { TextField } from "@internal/design-system/components";
import { EyeClosedIcon, EyeIcon, KeySquare } from "lucide-react";
import { useRef, useState } from "react";

interface PasswordInputProps extends React.HTMLAttributes<HTMLInputElement> {
  id?: string;
  autoCompletes?: React.InputHTMLAttributes<HTMLInputElement>["autoComplete"];
  validateAction?: (value: unknown) => boolean;
  errorMessage?: string;
}

export function PasswordInput(props: PasswordInputProps) {
  const [value, setValue] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [_isFocused, setIsFocused] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
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
      isError={!isValid}
      errorMessage={props.errorMessage ?? undefined}
      ref={inputRef}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      autoComplete={props.autoCompletes || "new-password"}
      id={props.id || "sign-up_new-password"}
      type={passwordVisible ? "text" : "password"}
      labelContent="비밀번호 입력 란"
      leftElement={<KeySquare size={16} />}
      rightElement={
        <button
          type="button"
          onClick={() => setPasswordVisible(!passwordVisible)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            color: "inherit",
          }}
        >
          {passwordVisible ? (
            <EyeIcon size={16} />
          ) : (
            <EyeClosedIcon size={16} />
          )}
        </button>
      }
    />
  );
}
