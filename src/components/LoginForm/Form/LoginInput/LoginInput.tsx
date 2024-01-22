import Helper from "../Helper";
import Id from "./Id";
import Password from "./Password";
import * as Styled from "../Form.styled";
import React from "react";

function LoginInput() {
  return (
    <>
      <Styled.InputGroup>
        <Id />
        <Password />
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
