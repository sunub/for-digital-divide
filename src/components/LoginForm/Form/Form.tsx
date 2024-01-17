"use client";

import React from "react";
import * as Styled from "./Form.styled";
import LoginInput from "./LoginInput";
import LoginButton from "./LoginButton";

function Form() {
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
    <React.Fragment>
      <Styled.MainWrapper>
        <LoginInput props={InputProps} />
      </Styled.MainWrapper>
      <Styled.FooterWrapper>
        <LoginButton props={ButtonProps} />
      </Styled.FooterWrapper>
    </React.Fragment>
  );
}

export default Form;
