"use client";

import { createPortal } from "react-dom";
import InvalidMessage from "@/components/InvalidMessage";
import Helper from "../Helper";
import Id from "./Id";
import Password from "./Password";
import * as Styled from "../Form.styled";
import React from "react";

interface LoginInputProps {
  setId: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  isValid: {
    id: boolean;
    password: boolean;
  };
}

function LoginInput({ props }: { props: LoginInputProps }) {
  const { setId, setPassword } = props;

  return (
    <>
      <Styled.InputGroup>
        <Id setId={setId} />
        <Password setPassword={setPassword} />
      </Styled.InputGroup>
      <Helper />
    </>
  );
}

export default LoginInput;

// {isIdValid.id ? null : (
//   <InvalidMessage message={"아이디 입력이 잘못되었습니다."} />
// )}
// {isIdValid.password ? null : (
//   <InvalidMessage message={"비밀번호 입력이 잘못되었습니다."} />
// )}
