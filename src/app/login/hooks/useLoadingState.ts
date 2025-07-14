import { useEffect, useState } from 'react';

export function useLoadingState(skeletonRef: React.RefObject<HTMLDivElement | null>, isLoading: boolean) {
  const [isChanging, setIsChanging] = useState(true);

  useEffect(() => {
    if (!skeletonRef.current) return;
    const pendingIndicator = skeletonRef.current;

    function handleAnimationIteration() {
      if (!isLoading) {
        setIsChanging(false);
      }
    }

    pendingIndicator.addEventListener('animationiteration', handleAnimationIteration);
    return () => {
      pendingIndicator.removeEventListener('animationiteration', handleAnimationIteration);
    };
  }, [isLoading]);

  return { isChanging };
}
