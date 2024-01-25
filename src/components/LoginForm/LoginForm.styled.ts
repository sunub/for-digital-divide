"use client";

import styled from "styled-components";

export const RootWrapper = styled.div`
  display: grid;
  grid-area: primary-nav / fullbleed-start / system-gesture / fullbleed-end;
`;

export const Form = styled.form`
  display: grid;
  justify-items: center;
  grid-template-rows: [system-status] 3.5rem [primary-nav] 3rem [primary-header] 4rem [main] auto [footer] 4rem [system-gesture] 3rem;

  padding-left: 1rem;
  padding-right: 1rem;
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
  display: grid;
  width: 75cqw;
  grid-area: footer / fullbleed;
`;
