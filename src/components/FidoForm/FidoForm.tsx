"use client";

import React from "react";
import * as S from "./FidoForm.style";
import LoginButton from "../LoginForm/LoginButton";
import FormHeader from "../LoginForm/FormHeader";
import InvalidMessage from "../InvalidMessage";
import useToggle from "@/hooks/use-toggle";
import LoadingAnimation from "../LoadingAnimation";
import { authenticate } from "@/lib/credentials";

function generateErrorMsg(type: string): string {
  switch (type) {
    case "wrongId":
      return "아이디가 존재하지 않습니다.";
    case "wrongPassword":
      return "비밀번호가 틀렸습니다.";
    case "wrongLengthID":
      return "아이디는 1자 이상으로 입력해주세요.";
    case "wrongLengthPassword":
      return "비밀번호는 3자 이상으로 입력해주세요.";
    default:
      return "";
  }
}

export const base64url = {
  encode: function (buffer: Uint8Array) {
    const base64 = window.btoa(String.fromCharCode(...new Uint8Array(buffer)));
    return base64.replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
  },
  decode: function (base64url: string) {
    const base64 = base64url.replace(/-/g, "+").replace(/_/g, "/");
    const binStr = window.atob(base64);
    const bin = new Uint8Array(binStr.length);
    for (let i = 0; i < binStr.length; i++) {
      bin[i] = binStr.charCodeAt(i);
    }
    return bin.buffer;
  },
};

function FidoForm({
  children,
  type,
  action,
  redirect,
}: {
  children: React.ReactNode;
  type: "username" | "password";
  action?: (formData: FormData) => Promise<void>;
  redirect?: () => void;
}) {
  const portalRef = React.useRef<HTMLDivElement>(null);
  const [isPending, togglePending] = useToggle(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  return (
    <S.Form
      action={async (formData: FormData) => {
        const username = "username webauthn";
        let loginResult;

        if (formData.get(username) === null && type === "username") {
          setErrorMessage(generateErrorMsg("wrongLengthID"));
        } else if (formData.get("password") === null && type === "password") {
          setErrorMessage(generateErrorMsg("wrongLengthPassword"));
        } else if (formData.get(username) === "") {
          setErrorMessage(generateErrorMsg("wrongId"));
        } else if (formData.get(username)?.toString().length! < 4) {
          setErrorMessage(generateErrorMsg("wrongLengthID"));
        } else if (formData.get("password") === "") {
          setErrorMessage(generateErrorMsg("wrongPassword"));
        } else if (formData.get("password")?.toString().length! < 3) {
          setErrorMessage(generateErrorMsg("wrongLengthPassword"));
        } else {
          setErrorMessage("");
          loginResult = action && (await action(formData));
        }

        if (loginResult !== null) {
          redirect && redirect();
        }
        togglePending();
      }}
    >
      <FormHeader title="FIDO Login" />

      <S.MainWrapper>
        <S.InputGroup>{children}</S.InputGroup>
        <div id="login-form__warning-portal" ref={portalRef} />
        <S.MessageWrapper>
          {isPending ? <LoadingAnimation /> : null}
          {isPending ? null : <InvalidMessage message={errorMessage} />}
        </S.MessageWrapper>
        <S.FooterWrapper>
          <LoginButton togglePending={togglePending} />
        </S.FooterWrapper>
      </S.MainWrapper>
    </S.Form>
  );
}

export default FidoForm;
