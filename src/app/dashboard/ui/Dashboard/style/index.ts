'use client';

import styled from 'styled-components';
import { fullSize } from '@/shared/style/css/size';

export const DashboardRootContainer = styled.div`
  display: grid;
  grid:
    [dashboard-header] 68px
    [dashboard-content] 1fr / 1fr;
  overflow-x: hidden;
  overflow-y: scroll;
  ${fullSize}

  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const DashboardContentContainer = styled.div`
  grid-area: dashboard-content / 1;
`;
