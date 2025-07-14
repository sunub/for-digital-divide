'use client';

import styled from 'styled-components';

export const FlexDiv = styled.div`
  display: flex;
`;

export const FlexRowDiv = styled(FlexDiv)`
  flex-direction: row;
`;

export const FlexCenterDiv = styled(FlexDiv)`
  justify-content: center;
  align-items: center;
`;

export const FlexDivideDiv = styled(FlexDiv)`
  justify-content: space-between;
  align-items: center;
`;

export const GirdDiv = styled.div`
  display: grid;
`;

export const GirdCenterDiv = styled(GirdDiv)`
  place-content: center;
`;
