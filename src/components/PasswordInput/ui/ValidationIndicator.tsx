'use client';

import { FlexCenterDiv } from '@/shared/style/component/div';
import { memo } from 'react';
import styled from 'styled-components';

export const ValidationIndicator = memo(({ issues = Array.from({ length: 4 }, () => '') }: { issues: string[] }) => {
  return (
    <IndicatorContainer>
      {issues.map((issue, index) => (
        <Indicator key={index}>{issue}</Indicator>
      ))}
    </IndicatorContainer>
  );
});

const IndicatorContainer = styled(FlexCenterDiv)``;

const Indicator = styled.span`
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  aspect-ratio: 1;
  background-color: var(--color-button);
`;
