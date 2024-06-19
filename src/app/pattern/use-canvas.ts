'use client';

import React from 'react';

function useCanvas(): [
  React.MutableRefObject<HTMLCanvasElement | null>,
  React.MutableRefObject<CanvasRenderingContext2D | null>,
] {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const ctxRef = React.useRef<CanvasRenderingContext2D | null>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctxRef.current = ctx;
    }
  }, []);

  return [canvasRef, ctxRef];
}

export { useCanvas };
