"use client";

import React from "react";
import * as Styled from "./LoginForm.styled";
import FormHeader from "./FormHeader";
import { createUserInfo } from "@/lib/action";
import LoginInput from "./Form/LoginInput";
import LoginButton from "./Form/LoginButton";

function LoginForm() {
  const [id, setId] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isIdValid, setIsIdValid] = React.useState({
    id: true,
    password: true,
  });

  const InputProps = {
    setId,
    setPassword,
    isIdValid,
  };

  const ButtonProps = {
    id,
    password,
    setIsIdValid,
  };

  return (
    <Styled.Form
      method="post"
      action={"/login"}
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        createUserInfo(formData);
      }}
    >
      <Styled.HeaderWrapper>
        <FormHeader />
      </Styled.HeaderWrapper>
      <Styled.MainWrapper>
        <LoginInput props={InputProps} />
      </Styled.MainWrapper>
      <Styled.FooterWrapper>
        <LoginButton props={ButtonProps} />
      </Styled.FooterWrapper>
    </Styled.Form>
  );
}

export default LoginForm;
