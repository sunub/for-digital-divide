"use client";

import React from "react";
import * as Styled from "../../Form/Form.styled";
import VisuallyHidden from "@compo/VisuallyHidden";
import useToggle from "@hooks/use-toggle";

function Password() {
  const [value, setValue] = React.useState("");
  const [isFocused, toggleIsFocused] = useToggle(false);
  const [isShown, toggleIsShown] = useToggle(false);

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
      <Styled.Input
        id="password"
        type={isShown ? "text" : "password"}
        name="password"
        required
        autoComplete={"current-password"}
        aria-label="비밀번호 입력"
        aria-labelledby="비밀번호 입력"
        minLength={8}
        value={value}
        onChange={(e) => {
          const currValue = e.target.value;
          setValue(() => currValue);
        }}
        onFocus={toggleIsFocused}
        onBlur={toggleIsFocused}
      />
      <Styled.VisbilityButton type="button" onClick={toggleIsShown}>
        <VisbilityIcon isShown={isShown} />
      </Styled.VisbilityButton>
      <Styled.Placeholder $isFocus={isFocused}>
        <span>{value.length > 0 ? "" : "비밀번호를 입력해주세요"}</span>
      </Styled.Placeholder>
    </Styled.InputWrapper>
  );
}

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
