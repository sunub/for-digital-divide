"use client";

import useToggle from "@hooks/use-toggle";
import * as Styled from "../../Form/Form.styled";
import VisuallyHidden from "@compo/VisuallyHidden";
import React, { HTMLAttributes } from "react";

function Id({
  minLength,
  maxLength,
}: {
  minLength: number;
  maxLength: number;
}) {
  const [value, setValue] = React.useState("");
  const [isFocused, toggleIsFocused] = useToggle(false);

  return (
    <>
      <Styled.InputWrapper key={"id-wrapper"} $isUpper={true} $isLower={false}>
        <label htmlFor="username">
          <VisuallyHidden>아이디</VisuallyHidden>
        </label>
        <GoogleIcon name="person" isFocused={isFocused} />
        <Styled.Input
          id="username"
          type="text"
          name="username"
          autoComplete={"email"}
          aria-label="아이디 입력"
          aria-labelledby="아이디 입력"
          onFocus={toggleIsFocused}
          onBlur={toggleIsFocused}
          minLength={minLength}
          maxLength={maxLength}
          value={value}
          onChange={(e) => {
            const currValue = e.target.value;
            setValue(() => currValue);
          }}
        />
        <Styled.Placeholder $isFocus={isFocused}>
          <span>{value.length > 0 ? "" : "아이디를 입력해주세요"}</span>
        </Styled.Placeholder>
      </Styled.InputWrapper>
    </>
  );
}

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

export default React.memo(Id);
