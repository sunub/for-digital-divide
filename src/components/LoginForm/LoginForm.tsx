"use client";

import React from "react";
import * as Styled from "./LoginForm.styled";
import FormHeader from "./FormHeader";
import { createUserInfo } from "@/lib/action";
import LoginInput from "./Form/LoginInput";
import LoginButton from "./Form/LoginButton";
import Form from "./Form/Form";

function LoginForm() {
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
      <FormHeader />
      <Form />
    </Styled.Form>
  );
}

export default LoginForm;
