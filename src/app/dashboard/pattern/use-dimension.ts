'use client';

import React from 'react';

function useDimension(canvas: HTMLCanvasElement) {
  const [clientWidth, setClientWidth] = React.useState<number>(0);
  const [clientHeight, setClientHeight] = React.useState<number>(0);

  React.useEffect(() => {
    const resize = () => {
      if (!canvas) return;
      const pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;
      setClientWidth(canvas.clientWidth);
      setClientHeight(canvas.clientHeight);
    };

    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [canvas]);

  React.useEffect(() => {
    if (canvas) {
      const pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;
      canvas.width = clientWidth * pixelRatio;
      canvas.height = clientHeight * pixelRatio;
    }
  }, [canvas, clientWidth, clientHeight]);

  return [clientWidth, clientHeight];
}

export { useDimension };
