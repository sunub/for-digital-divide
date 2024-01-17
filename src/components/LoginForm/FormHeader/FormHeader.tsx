import React from "react";
import * as Styled from "./FormHeader.styled";
import VisuallyHidden from "@compo/VisuallyHidden";

function FormHeader() {
  return (
    <Styled.Wrapper>
      <Styled.Header>
        <VisuallyHidden>사이트 로그인 페이지</VisuallyHidden>
        <Styled.Title>로그인</Styled.Title>
      </Styled.Header>
    </Styled.Wrapper>
  );
}

export default FormHeader;
