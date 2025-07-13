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

    const rootContainer = rootContainerRef.current;
    const box = rootContainer.getBoundingClientRect();

    const newLeft = box.left + box.width / 2;
    const newTop = box.top + box.height + SPACING * 2;
    const newTriangleTop = -Math.floor(Math.floor(box.height) / 2) + 1;

    setLeft(newLeft);
    setTop(newTop);
    setTriangleTop(newTriangleTop);

    document.documentElement.style.setProperty('--tooltip-triangle-width', `${SPACING * 2}px`);
    document.documentElement.style.setProperty('--tooltip-triangle-height', `${SPACING}px`);
  }, [rootContainerRef]);

  useEffect(() => {
    updatePosition();
    window.addEventListener('resize', updatePosition);
    return () => {
      window.removeEventListener('resize', updatePosition);
    };
  }, []);

  return {
    top,
    left,
    triangleTop,
  };
}
