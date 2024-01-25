"use client";

import React from "react";
import styled from "styled-components";

const RootWrapper = styled.div`
  display: grid;
  grid-area: primary-nav / fullbleed-start / system-gesture / fullbleed-end;
`;

function ClientExample({ children }: { children: React.ReactNode }) {
  return <RootWrapper>{children}</RootWrapper>;
}

export default ClientExample;
