"use client";

import styled from "styled-components";

export const RootWrapper = styled.div`
  display: grid;
  grid-template-rows:
    [title] 30cqh
    [resize-start] 2cqh
    [resize-font] 12cqh
    [resize-font-end] 2cqh
    [resize-font-slider] 5cqh;

  grid-template-columns:
    [fullbleed-start] 2cqw
    [main-start] auto
    [main-end] 1cqw
    [fullbleed-end];

  align-items: center;
  justify-items: center;
`;

export const Title = styled.div`
  grid-area: title / fullbleed;
  text-align: center;
  & > h1 {
    font-size: 36px;
    line-height: 66px;
  }
`;

export const ResizeWrapper = styled.div`
  grid-area: resize-font / main;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  height: 100%;

  width: 100%;
  height: fit-content;
  text-align: end;
  border-bottom: 3px solid var(--color-transparent);
  /* padding-top: 24px;
  padding-bottom: 24px; */
`;
