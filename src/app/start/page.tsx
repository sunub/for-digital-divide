"use client";

import styled from "styled-components";
import Device from "@/components/Device";

const Grid = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: [column-1] 20ch [column-2] 1fr;
  background: oklch(50% none none / 25%);
  padding: 1rem;
`;

const SubGrid = styled.div`
  grid-column: span 2;

  display: grid;
  grid-template-columns: subgrid; /* 20ch 1fr */
`;

function StartPage() {
  return (
    <div>
      <h1>Start Page</h1>
      <Device />
    </div>
  );
}

export default StartPage;
