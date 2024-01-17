"use client";

import styled from "styled-components";

export const Form = styled.form`
  grid-area: primary-nav / fullbleed-start / system-gesture / fullbleed-end;
`;

export const Wrapper = styled.div`
  display: grid;
  place-content: center;
  height: 100%;
`;

export const HeaderWrapper = styled.div`
  grid-area: primary-header / fullbleed;
`;

export const MainWrapper = styled.div`
  grid-area: main / main-start / footer / main-end;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const FooterWrapper = styled.div`
  grid-area: footer / fullbleed;
`;
