'use client';

import { useState } from 'react';
import styled from 'styled-components';
import { CardLayout } from './CardLayout';
import { CardContent } from './CardContent';
import { CircleUserIcon } from 'lucide-react';
import { HoveringTextField } from './HoveringTextField';

export function EmailCard() {
  const [isHover, setIsHover] = useState(false);

  return (
    <CardLayout href={'/login?method=email'}>
      <CardContent setIsHovering={setIsHover} header={<CircleUserIcon />} footer="로그인" />
      <SmallCard className="small-card" />
      <HoveringTextField isHovering={isHover} />
    </CardLayout>
  );
}

const SmallCard = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100px;
  height: 116px;
  border-radius: 1rem;
  z-index: 1;

  background-image: radial-gradient(
    300px circle at var(--mx, 0px) var(--my, 0px),
    var(--color-background),
    color-mix(in oklch, oklch(63.93% 0.206 288.34) 70%, transparent 30%)
  );

  opacity: 0.5;

  &:hover {
    opacity: 1;
  }
`;
