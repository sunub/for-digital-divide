"use client";

import React from "react";
import * as Styled from "../Form.styled";
import VisuallyHidden from "@/compo/VisuallyHidden";
import useToggle from "@/hooks/use-toggle";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

function Password({
  setPassword,
}: {
  setPassword: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [value, setValue] = React.useState("");
  const [isFocused, toggleIsFocused] = useToggle(false);
  const [isShown, toggleIsShown] = useToggle(false);
  const passwordRef = React.useRef<HTMLInputElement>(null);

  return (
    <Styled.InputWrapper
      key={"password-wrapper"}
      $isUpper={false}
      $isLower={true}
    >
      <label htmlFor="password">
        <VisuallyHidden>비밀번호</VisuallyHidden>
      </label>
      <GoogleIcon name="lock" isFocused={isFocused} />
      <Input
        ref={passwordRef}
        value={value}
        onChange={(e) => {
          const currValue = e.target.value;
          setValue(() => currValue);
          setPassword(() => currValue);
        }}
        onFocus={toggleIsFocused}
        onBlur={toggleIsFocused}
      />
      <Styled.VisbilityButton
        type="button"
        onClick={() => {
          if (!passwordRef.current) return;

          if (isShown) passwordRef.current.type = "password";
          else passwordRef.current.type = "text";
          toggleIsShown();
        }}
      >
        <VisbilityIcon isShown={isShown} />
      </Styled.VisbilityButton>
      <Styled.Placeholder $isFocus={isFocused}>
        <span>{value.length > 0 ? "" : "비밀번호를 입력해주세요"}</span>
      </Styled.Placeholder>
    </Styled.InputWrapper>
  );
}

const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return (
    <Styled.Input
      ref={ref}
      id="password"
      type="password"
      name="password"
      required
      autoComplete={"current-password"}
      aria-labelledby="insert-user-password"
      minLength={8}
      {...props}
    />
  );
});

Input.displayName = "PasswordInput";

const VisbilityIcon = ({ isShown }: { isShown: boolean }) => {
  const color = isShown
    ? "oklch(16.73% 0.005 83 / 80%)"
    : "oklch(16.73% 0.005 83 / 20%)";

  return (
    <span className="material-icons" style={{ color }}>
      {isShown ? "visibility_off" : "visibility"}
    </span>
  );
};

const GoogleIcon = ({
  name,
  isFocused,
  ...delegated
}: {
  name: string;
  isFocused: boolean;
}) => {
  const color = isFocused
    ? "oklch(16.73% 0.005 83 / 80%)"
    : "oklch(16.73% 0.005 83 / 20%)";

  return (
    <span className="material-icons" {...delegated} style={{ color }}>
      {name}
    </span>
  );
};
export default React.memo(Password);
