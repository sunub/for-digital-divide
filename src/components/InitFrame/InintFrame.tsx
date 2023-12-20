"use client";

import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  background: oklch(96.88% 0.015 294.47);
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  padding-left: 64px;
  padding-right: 64px;
`;

function InitFrame({ children }: { children: React.ReactNode }) {
  return <Wrapper>{children}</Wrapper>;
}

export default InitFrame;
