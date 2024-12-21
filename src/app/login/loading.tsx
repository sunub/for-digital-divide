import LoadingAnimation from '@/components/LoadingAnimation';
import { HTMLAttributes } from 'react';

function Loading({ props }: { props?: HTMLAttributes<HTMLDivElement> }) {
  return (
    <div
      className={`grid place-content-center absolute w-full h-full ${props ? props.className : ''}`}
      {...props}
    >
      <LoadingAnimation />
    </div>
  );
}

export default Loading;
