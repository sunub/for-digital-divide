import { HTMLAttributes } from 'react';
import LoadingAnimation from './LoadingAnimation';
import styled from 'styled-components';
import { GirdCenterDiv } from '@/shared/style/component/div';
import { fullSize } from '@/shared/style/css/size';

export function Loading({ props }: { props?: HTMLAttributes<HTMLDivElement> }) {
  return (
    <Conatiner {...props}>
      <LoadingAnimation />
    </Conatiner>
  );
}

const Conatiner = styled(GirdCenterDiv)`
  ${fullSize};
`;
