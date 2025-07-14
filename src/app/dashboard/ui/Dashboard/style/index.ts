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

  /* Firefox */
  scrollbar-width: none;

  /* Chrome, Safari, Edge, Opera */
  &::-webkit-scrollbar {
    display: none;
  }
`;
