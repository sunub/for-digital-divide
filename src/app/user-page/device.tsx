'use client';

import * as Styled from '@compo/Device/Device.style';
import React from 'react';

export default function Device({ children }: { children: React.ReactNode }) {
  return (
    <Styled.RootWrapper>
      <Styled.OuterShadow>
        <Styled.InnerWindow>{children}</Styled.InnerWindow>
      </Styled.OuterShadow>
    </Styled.RootWrapper>
  );
}
