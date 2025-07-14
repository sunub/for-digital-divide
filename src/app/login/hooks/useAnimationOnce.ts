// useAnimationOnce.ts 수정 제안
import { useEffect, useState } from 'react';

export function useAnimationOnce(skeletonRef: React.RefObject<HTMLDivElement | null>) {
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);

  useEffect(() => {
    const skeletonElement = skeletonRef.current;
    if (!skeletonElement || isAnimationComplete) return; // 이미 완료되었으면 실행 안 함

    const handleAnimationIteration = () => {
      // isChanging 조건 없이 바로 상태 변경
      setIsAnimationComplete(true);
    };

    skeletonElement.addEventListener('animationiteration', handleAnimationIteration, { once: true }); // once: true 옵션으로 자동 제거

    return () => {
      // 컴포넌트 언마운트 시 안전하게 제거
      skeletonElement.removeEventListener('animationiteration', handleAnimationIteration);
    };
  }, [skeletonRef.current]); // ref의 current 값이 설정되면 이펙트 실행

  return isAnimationComplete;
}
