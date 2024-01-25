"use client";

import React from "react";
import * as Styled from "./LoginForm.styled";
import FormHeader from "./FormHeader";
import { authenticate, createUserInfo } from "@/lib/action";
import LoginInput from "./LoginInput";
import LoginButton from "./LoginButton";
import { createPortal } from "react-dom";
import InvalidMessage from "../InvalidMessage";

function reducer(errorMessage: ErrorMessage, action: LoginAction) {
  switch (action.type) {
    case "wrongId":
      return {
        message: "아이디가 존재하지 않습니다.",
      };
    case "wrongPassword":
      return {
        message: "비밀번호 존재하지 않습니다.",
      };
    case "wrongLengthID":
      return {
        message: "아이디는 4자 이상 20자 이하로 입력해주세요.",
      };
    case "wrongLengthPassword":
      return {
        message: "비밀번호는 8자 이상 20자 이하로 입력해주세요.",
      };
    default:
      return {
        message: "",
      };
  }
}

function LoginForm() {
  const [isPending, setIsPending] = React.useState(false);
  const portalRef = React.useRef<HTMLDivElement>(null);
  const [errorMessage, dispatch] = React.useReducer(reducer, {
    message: "",
  });
  console.log("LoginForm Rendered");
  return (
    <React.Suspense fallback={<div>loading...</div>}>
      <Styled.Form
        onSubmit={() => setIsPending(() => true)}
        action={async (formData: FormData) => {
          const username = formData.get("username") as string;
          const password = formData.get("password") as string;

          if (username.length < 4 || username.length > 20) {
            dispatch({
              type: "wrongLengthID",
            });
            return;
          } else if (password.length < 8 || password.length > 20) {
            dispatch({
              type: "wrongLengthPassword",
            });
            return;
          }

          const loginResult = await authenticate(formData).then((res) => {
            setIsPending(() => false);
            return res;
          });

          if (loginResult) {
            dispatch({
              type: loginResult.type,
            });
          }
        }}
      >
        <FormHeader />
        <Styled.MainWrapper>
          <LoginInput />
          <div id="login-form__warning-portal" ref={portalRef} />
          <InvalidMessage message={errorMessage.message} />
          {isPending ? <div>loading...</div> : null}
        </Styled.MainWrapper>
        <Styled.FooterWrapper>
          <LoginButton />
        </Styled.FooterWrapper>
      </Styled.Form>
    </React.Suspense>
  );
}

export default LoginForm;
