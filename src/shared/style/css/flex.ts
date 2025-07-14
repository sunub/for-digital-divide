'use client';

import { css } from 'styled-components';

export const Flex = css`
  display: flex;
`;

export const FlexRow = css`
  ${Flex}
  flex-direction: row;
`;

export const FlexCenter = css`
  ${Flex}
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;
