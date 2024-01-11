"use client";

import styled from "styled-components";

export const RootWrapper = styled.div`
  position: relative;
  margin-left: auto;
  margin-right: auto;

  padding-left: 64px;
  padding-right: 64px;

  width: 100%;
  height: 88px;
  background: oklch(96.88% 0.015 294.47);
`;

export const IconWrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Button = styled.button`
  padding: 0;
`;
