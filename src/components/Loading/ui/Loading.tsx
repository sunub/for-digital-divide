import { HTMLAttributes } from 'react';
import LoadingAnimation from './LoadingAnimation';
import styled from 'styled-components';
import { GirdCenterDiv } from '@/shared/style/component/div';
import { fullSize } from '@/shared/style/css/size';

export function Loading({
  size = 5,
  radius = '1rem',
  ...props
}: {
  size?: number;
  radius?: string;
  props?: HTMLAttributes<HTMLDivElement>;
}) {
  return (
    <Container {...props}>
      <LoadingAnimation size={size} radius={radius} />
    </Container>
  );
}

const Container = styled(GirdCenterDiv)`
  ${fullSize};
`;
