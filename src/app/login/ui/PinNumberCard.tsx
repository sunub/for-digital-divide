'use client';

import styled from 'styled-components';
import { GridIcon, Grid2X2PlusIcon } from 'lucide-react';
import { useRef, useState } from 'react';
import { CardSkeleton } from './CardSkeleton';
import { CardContent } from './CardContent';
import { HoveringTextField } from './HoveringTextField';
import { CardLayout } from './CardLayout';
import { useAnimationOnce } from '../hooks/useAnimationOnce';
import { useDeviceId } from '../hooks/useDeviceId';

export function PinNumberCard() {
  const [isHover, setIsHover] = useState(false);
  const skeletonRef = useRef<HTMLDivElement>(null);
  const { isLoading: isDataLoading, hasDeviceId } = useDeviceId();
  const isAnimationComplete = useAnimationOnce(skeletonRef);
  if (isDataLoading || !isAnimationComplete) {
    return <CardSkeleton skeletonRef={skeletonRef} />;
  }

  return (
    <CardLayout>
      <CardContent
        pinPath={'/login?method=pin'}
        hasDeviceId={hasDeviceId}
        setIsHovering={setIsHover}
        header={hasDeviceId ? <GridIcon /> : <Grid2X2PlusIcon />}
        footer="핀번호"
      />
      <SmallCard $hasDeviceId={hasDeviceId} />
      <HoveringTextField hasDeviceId={hasDeviceId} isHovering={isHover} />
    </CardLayout>
  );
}

const SmallCard = styled.div<{ $hasDeviceId: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100px;
  height: 116px;
  border-radius: 1rem;
  z-index: 1;

  background-image: radial-gradient(
    300px circle at var(--mx, 0px) var(--my, 0px),
    ${({ $hasDeviceId }) => ($hasDeviceId ? 'var(--color-background)' : 'var(--foreground-destructive)')},
    color-mix(in oklch, oklch(63.93% 0.206 288.34) 70%, transparent 30%)
  );

  opacity: 0.5;

  &:hover {
    opacity: 1;
  }
`;
