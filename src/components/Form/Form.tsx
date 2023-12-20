"use client";

import React from "react";
import * as Styled from "./Form.styled";
import Id from "./Id";
import Password from "./Password";
import Helper from "./Helper";
import InvalidMessage from "../InvalidMessage";

function Form() {
  const [id, setId] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isIdValid, setIsIdValid] = React.useState({
    id: true,
    password: true,
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (id.length < 6 || id.length > 20) {
      setIsIdValid((prev) => ({ ...prev, id: false }));
    } else if (password.length < 8) {
      setIsIdValid((prev) => ({ ...prev, password: false }));
    }
  }
  return (
    <form method={"post"} onSubmit={handleSubmit}>
      <Styled.InputGroup>
        <Id setId={setId} />
        <Password setPassword={setPassword} />
      </Styled.InputGroup>
      <Helper />
      {isIdValid.id ? null : (
        <InvalidMessage message={"아이디 입력이 잘못되었습니다."} />
      )}
      {isIdValid.password ? null : (
        <InvalidMessage message={"비밀번호 입력이 잘못되었습니다."} />
      )}
      <Styled.Button
        id={"submit-id-pwd-btn"}
        type="submit"
        onClick={() => {
          if (id.length >= 6 && id.length <= 20) {
            setIsIdValid((prev) => ({ ...prev, id: true }));
          }
          if (password.length >= 8) {
            setIsIdValid((prev) => ({ ...prev, password: true }));
          }

          if (id.length < 6 || id.length > 20) {
            setIsIdValid((prev) => ({ ...prev, id: false }));
          } else if (password.length < 8) {
            setIsIdValid((prev) => ({ ...prev, password: false }));
          }
        }}
      >
        로그인
      </Styled.Button>
    </form>
  );
}

export default Form;
