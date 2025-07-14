'use client';

import styled from 'styled-components';

export function DashboardContent({ children }: { children?: React.ReactNode }) {
  return <DashboardRootContainer>{children}</DashboardRootContainer>;
}

const DashboardRootContainer = styled.div`
  grid-area: dashboard-content / 1;
`;
