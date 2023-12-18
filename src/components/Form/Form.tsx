"use client";

import React from "react";
import * as Styled from "./Form.styled";
import Id from "./Id";
import Password from "./Password";
import Helper from "./Helper";

function Form() {
  const [id, setId] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    console.log(id, password);
  }
  return (
    <form method={"post"} onSubmit={handleSubmit}>
      <Styled.InputGroup>
        <Id setId={setId} />
        <Password setPassword={setPassword} />
      </Styled.InputGroup>
      <Helper />
      <Styled.Button type="submit">로그인</Styled.Button>
    </form>
  );
}

export default Form;
