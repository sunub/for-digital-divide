import React from "react";
import * as Styled from "./FormHeader.styled";
import VisuallyHidden from "@compo/VisuallyHidden";

function FormHeader({ title }: { title: string }) {
  return (
    <Styled.Wrapper>
      <Styled.Header>
        <VisuallyHidden>사이트 로그인 페이지</VisuallyHidden>
        <Styled.Title>{title}</Styled.Title>
      </Styled.Header>
    </Styled.Wrapper>
  );
}

export default FormHeader;
