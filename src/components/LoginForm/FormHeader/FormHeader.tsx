import React from 'react';
import VisuallyHidden from '@compo/VisuallyHidden';
import * as Styled from './FormHeader.styled';

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
