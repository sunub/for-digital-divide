'use client';

import React from 'react';
import styled from 'styled-components';
import { Button } from '@/components/ui/status-button';
import { goToHome } from '@/utils/revalidate';
import errorSvg from '../../public/error_page.svg';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Wrapper>
      <WarningPattern className="bg-red-200" $url={errorSvg.src}>
        <div className="bg-slate-100 p-12 flex flex-col w-2/4 rounded-xl">
          <h1 className="text-4xl font-bold ring-offset-1 leading-relaxed">
            {error.message}
          </h1>
          <div className="mt-5 mb-10">
            <pre>{error.stack?.split('\n')[0]}</pre>
            <p>{error.digest}</p>
          </div>
          <div className="flex flex-row gap-2 justify-end">
            <Button variant={'destructive'} onClick={() => goToHome()}>
              홈으로 돌아가기
            </Button>
            <Button onClick={reset}>다시 시도해주세요</Button>
          </div>
        </div>
      </WarningPattern>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: absolute;
  left: 0px;
  top: 0px;

  width: 100dvw;
  height: 100dvh;
  background: radial-gradient(
    rgb(var(--light-gold-rgb)),
    rgb(var(--dark-gold-rgb))
  );
`;

const WarningPattern = styled.div<{ $url: string }>`
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.$url});
  background-size: 10%;

  display: grid;
  place-items: center;

  animation: pan 180s linear infinite;
  @keyframes pan {
    0% {
      background-position: 0% 0%;
    }
    100% {
      background-position: 100% 0%;
    }
  }
`;
