"use client";

import styled from "styled-components";

const Wrapper = styled.div`
  background: oklch(96.88% 0.015 294.47);
`;

function InitFrame({ children }: { children: React.ReactNode }) {
  return <Wrapper>{children}</Wrapper>;
}

export default InitFrame;
