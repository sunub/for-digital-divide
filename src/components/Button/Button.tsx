import useToggle from "@/hooks/use-toggle";
import * as Styled from "./Button.style";
import React from "react";

function Button() {
  const [isClick, toggleClick] = useToggle(false);

  return (
    <Styled.RootContainer>
      <Styled.Btn aria-pressed={true} onClick={toggleClick} $isClick={isClick}>
        <Styled.Shadow />
        <Styled.Edge $isClick={isClick} />
        <Styled.Front $isClick={isClick}>
          {isClick ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 -960 960 960"
              width="24"
              fill="oklch(100% 0 146.94)"
            >
              <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
            </svg>
          ) : (
            "확인"
          )}
        </Styled.Front>
      </Styled.Btn>
    </Styled.RootContainer>
  );
}

function ConfirmText() {
  return (
    <Styled.ConfirmFont className="material-icons">done</Styled.ConfirmFont>
  );
}

export default Button;
