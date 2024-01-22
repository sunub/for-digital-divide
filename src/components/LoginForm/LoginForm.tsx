"use client";

import React from "react";
import * as Styled from "./LoginForm.styled";
import FormHeader from "./FormHeader";
import { createUserInfo, authenticate } from "@/lib/action";
import LoginInput from "./Form/LoginInput";
import LoginButton from "./Form/LoginButton";
import Form from "./Form/Form";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createPortal } from "react-dom";
import InvalidMessage from "../InvalidMessage";

type LoginAction = {
  type: "wrongId" | "wrongPassword" | "wrongLengthID" | "wrongLengthPassword";
};

type ErrorMessage = {
  message: string;
};

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
  const [id, setId] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isValid, setIsValid] = React.useState({
    id: true,
    password: true,
  });

  const [errorMessage, dispatch] = React.useReducer(reducer, { message: "" });
  const portalRef = React.useRef<HTMLDivElement>(null);

  const InputProps = {
    setId,
    setPassword,
    isValid,
  };

  const ButtonProps = {
    id,
    password,
    setIsValid,
  };

  React.useEffect(() => {
    if (!isValid.id) {
      dispatch({
        type: "wrongLengthID",
      });
    } else if (!isValid.password) {
      dispatch({
        type: "wrongLengthPassword",
      });
    }
  }, [isValid]);

  return (
    <React.Suspense fallback={<div>loading...</div>}>
      <form
        style={{
          gridArea:
            "primary-nav / fullbleed-start / system-gesture / fullbleed-end",
        }}
        method="post"
        action={"/login"}
        onSubmit={async (e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const loginResult = await authenticate(formData);

          if (loginResult && !loginResult.success) {
            dispatch({ type: loginResult.type as LoginAction["type"] });
          }
        }}
      >
        <FormHeader />
        <Styled.MainWrapper>
          <LoginInput props={InputProps} />
          <div id="login-error__portal" ref={portalRef} />
          {errorMessage.message.length > 0
            ? createPortal(
                <InvalidMessage message={errorMessage.message} />,
                portalRef.current as HTMLDivElement
              )
            : null}
        </Styled.MainWrapper>
        <Styled.FooterWrapper>
          <LoginButton props={ButtonProps} />
        </Styled.FooterWrapper>
      </form>
    </React.Suspense>
  );
}

export default LoginForm;
