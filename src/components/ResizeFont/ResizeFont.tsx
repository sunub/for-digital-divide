'use client';

import React from 'react';
import Slider from '@/components/Slider';
import * as Styled from './ResizeFont.style';

function ResizeFont() {
  const [fonstSize, setFontSize] = React.useState(16);

  React.useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--text-size', `${fonstSize}px`);
  }, [fonstSize]);

  return (
    <Styled.RootWrapper>
      <Styled.Title>
        <h1>시작하기 전 글씨 크기를 조절 해주세요</h1>
      </Styled.Title>
      <Styled.ResizeWrapper>
        이 글씨가 잘 보이게끔 크기를 조절 해주세요.
      </Styled.ResizeWrapper>
      <div></div>
      <div
        style={{
          gridArea: 'resize-font-slider / main',
        }}
      >
        <Slider fontSize={fonstSize} setFontSize={setFontSize} />
      </div>
    </Styled.RootWrapper>
  );
}

export default ResizeFont;
