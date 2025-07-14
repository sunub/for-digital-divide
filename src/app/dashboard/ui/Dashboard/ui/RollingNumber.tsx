'use client';

import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const NUM_REGEX = /[0-9]/;

export function RollingNumberList({ value, length = 4 }: { value: number | string; length?: number }) {
  const digits = String(value).padStart(length, '0').split('');
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (!wrapperRef.current) return;
    function transitionEndHandler() {
      if (!isValid) {
        setIsValid(true);
      }
    }

    const wrapper = wrapperRef.current;
    wrapper.addEventListener('transitionend', transitionEndHandler);

    return () => {
      wrapper.removeEventListener('transitionend', transitionEndHandler);
    };
  }, []);

  return (
    <Wrapper ref={wrapperRef}>
      {digits.map((digit, index) => {
        if (!NUM_REGEX.test(digit)) {
          return (
            <Divider $isValid={isValid} key={`rolling-number-${index}`} $length={digits.length}>
              {digit}
            </Divider>
          );
        }
        return <RollingNumber key={`rolling-number-${index}`} digit={digit} length={digits.length} />;
      })}
    </Wrapper>
  );
}

export function RollingNumber({ digit, length }: { digit: string; length: number }) {
  const [translateY, setTranslateY] = useState(0);

  useEffect(() => {
    const newTranslateY = digit.trim() === '' ? 0 : -((20 - (parseInt(digit, 10) + 1)) * 37);
    setTranslateY(newTranslateY);
  }, [digit]);

  return (
    <RollingNumberWrapper $translateY={translateY} $length={length}>
      <Number>&nbsp;</Number>
      {Array.from({ length: 10 }, (_, i) => (
        <Number key={`rolling-number-content-${i}`}>{i}</Number>
      ))}
      {Array.from({ length: 9 }, (_, i) => (
        <Number key={`rolling-number-content-${i}-behind`}>{8 - i}</Number>
      ))}
      <Number>&nbsp;</Number>
    </RollingNumberWrapper>
  );
}

const RollingNumberWrapper = styled.div<{ $translateY: number; $length: number }>`
  transform: translateY(${props => props.$translateY}px);
  transition: transform 2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  font-size: ${props => (props.$length > 4 ? '1.25rem' : '2rem')};
`;

const Number = styled.div`
  line-height: 37px;
  height: 37px;
`;

const Divider = styled.div<{ $isValid: boolean; $length: number }>`
  font-size: ${props => (props.$length > 4 ? '1.25rem' : '2rem')};
  line-height: 37px;
  height: 37px;
  opacity: ${props => (props.$isValid ? 1 : 0)};
  transition: opacity 0.5s ease-in-out;
`;

const Wrapper = styled.div`
  display: flex;
  height: 37px;
  overflow: hidden;
`;
