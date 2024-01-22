"use client";

import React from "react";
import * as Styled from "./Form.styled";
import LoginInput from "./LoginInput";
import LoginButton from "./LoginButton";

function Form() {
  const [id, setId] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isValid, setIsValid] = React.useState({
    id: true,
    password: true,
  });

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
