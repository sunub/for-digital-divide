import { useState, useCallback, useEffect } from 'react';

const SPACING = 8;

interface Position {
  top: number;
  left: number;
  triangleTop: number;
}

export function useTooltipPosition(rootContainerRef: React.RefObject<HTMLElement | null>): Position {
  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(0);
  const [triangleTop, setTriangleTop] = useState(SPACING);

  const updatePosition = useCallback(() => {
    if (!rootContainerRef.current) {
      return;
    }

    const triggerElement = rootContainerRef.current;
    const box = triggerElement.getBoundingClientRect();

    const newLeft = box.left + box.width / 2;
    const newTop = box.bottom + SPACING;
    const newTriangleTop = -SPACING;

    setLeft(newLeft);
    setTop(newTop);
    setTriangleTop(newTriangleTop);

    document.documentElement.style.setProperty('--tooltip-triangle-width', `${SPACING * 2}px`);
    document.documentElement.style.setProperty('--tooltip-triangle-height', `${SPACING}px`);
  }, [rootContainerRef]);

  useEffect(() => {
    updatePosition();
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition);
    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition);
    };
  }, [updatePosition]);

  return {
    top,
    left,
    triangleTop,
  };
}
