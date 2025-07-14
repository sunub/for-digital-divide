'use client';

import { css } from 'styled-components';

export const Grid = css`
  display: grid;
`;

export const GridCenter = css`
  ${Grid};
  width: 100%;
  height: 100%;
  place-items: center;
`;
