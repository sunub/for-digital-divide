'use client';

import React from 'react';

interface Dot {
  id: string;
  x: number;
  y: number;
  radius: number;
  isFocus: boolean;
}

type Dots = Dot[][];

function createDots(stageWidth: number, stageHeight: number, radius: number) {
  const centerX = Math.floor(stageWidth / 2);
  const centerY = Math.floor(stageHeight / 2);

  let dist = Math.floor(stageWidth / 5);
  const dots = [];
  for (let i = 0; i < 3; i++) {
    dots.push(
      Array.from({ length: 3 }, (_, j) => ({
        id: `${i}${j}`,
        x: centerX - (j - 1) * dist,
        y: centerY + (i - 1) * dist,
        radius,
        isFocus: false,
      })),
    );
  }
  return dots;
}
function drawDots(canvas: HTMLCanvasElement, dots: Dots) {
  const ctx = canvas.getContext('2d')!;

  for (let i = 0; i < dots.length; i++) {
    for (let j = 0; j < dots[i].length; j++) {
      const dot = dots[i][j];
      ctx.beginPath();
      ctx.arc(dot.x, dot.y, dot.radius, 0, 2 * Math.PI);
      ctx.fillStyle = 'black';
      ctx.fill();
    }
  }
}

const bounce = function (pos: number) {
  const n1 = 7.5625;
  const d1 = 2.75;

  if (pos < 1 / d1) {
    return n1 * pos * pos;
  } else if (pos < 2 / d1) {
    return n1 * (pos -= 1.5 / d1) * pos + 0.75;
  } else if (pos < 2.5 / d1) {
    return n1 * (pos -= 2.25 / d1) * pos + 0.9375;
  } else {
    return n1 * (pos -= 2.625 / d1) * pos + 0.984375;
  }
};

const buildKeyframes = (
  easing: (pos: number) => number,
  delat: number,
  points = 50,
) => {
  const result = [...new Array(points + 1)]
    .map((_, i) => easing(i * (1 / points)))
    .map((value) => value * delat);
  return result;
};

const getBounceKeyframes = () => {
  const startScale = 5;
  const targetScale = 10;
  const delatValue = targetScale - startScale;

  const result = buildKeyframes(bounce, delatValue);
  return result;
};

const KEYFRAMES = getBounceKeyframes();
const RADIUS = 10;
const DOT_STATE = {
  id: '',
  x: 0,
  y: 0,
  radius: 0,
  isFocus: false,
};

function Lock() {
  const ref = React.useRef<HTMLCanvasElement>(null);
  const [dots, setDots] = React.useState<Dots>([]);
  const [isMouseDown, setIsMouseDown] = React.useState(false);
  const [currDots, setcurrDots] = React.useState<Dot>(DOT_STATE);
  const [prevDots, setPrevDots] = React.useState<Map<string, Dot>>(new Map());
  const [clientWidth, setClientWidth] = React.useState<number>(0);
  const [clientHight, setClientHeight] = React.useState<number>(0);

  React.useEffect(() => {
    if (!ref.current) return;
    const canvas = ref.current;
    const stageWidth = canvas.clientWidth;
    const stageHeight = canvas.clientHeight;
    setDots(createDots(stageWidth, stageHeight, RADIUS));
  }, []);

  React.useEffect(() => {
    function resize(ref: React.RefObject<HTMLCanvasElement>) {
      if (!ref.current) return;
      const canvas = ref.current;
      const stageWidth = canvas.clientWidth;
      const stageHeight = canvas.clientHeight;
      setClientWidth(stageWidth);
      setClientHeight(stageHeight);

      const pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

      canvas.width = stageWidth * pixelRatio;
      canvas.height = stageHeight * pixelRatio;

      const ctx = canvas.getContext('2d')!;
      ctx.scale(pixelRatio, pixelRatio);
    }

    resize(ref);
    window.addEventListener('resize', () => resize(ref));

    return () => {
      window.removeEventListener('resize', () => resize(ref));
    };
  }, []);

  React.useEffect(() => {
    if (!ref.current) return;
    if (clientWidth == 0 && clientHight == 0) return;
    setDots(createDots(clientWidth, clientHight, RADIUS));
  }, [clientWidth, clientHight]);

  React.useEffect(() => {
    if (!ref.current) return;
    const canvas = ref.current;
    drawDots(canvas, dots);
  }, [dots]);

  React.useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (!ref.current || !dots.length) return;

      const canvas = ref.current;
      const box = canvas.getBoundingClientRect();

      const clientX = e.clientX - box.left;
      const clientY = e.clientY - box.top;

      const updatedDots = dots.map((row) => {
        return row.map((dot) => {
          const distance = Math.sqrt(
            (clientX - dot.x) * (clientX - dot.x) +
              (clientY - dot.y) * (clientY - dot.y),
          );

          if (distance < dot.radius) {
            return { ...dot, isFocus: !dot.isFocus };
          }
          return dot;
        });
      });

      const flatDots = updatedDots.flat();
      const focusDots = flatDots.filter((dot) => dot.isFocus);
      setcurrDots(focusDots[0]);
      setDots(updatedDots);
      setIsMouseDown(true);
    }

    window.addEventListener('mousedown', handleClick);

    return () => window.removeEventListener('mousedown', handleClick);
  }, [dots]);

  React.useEffect(() => {
    function reset() {
      if (!ref.current || !dots.length) return;
      const updateDots = dots.map((row) => {
        return row.map((dot) => {
          return { ...dot, isFocus: false };
        });
      });

      setIsMouseDown(false);
      setDots(updateDots);
      setcurrDots({ id: '', x: 0, y: 0, radius: 0, isFocus: false });
      setPrevDots(new Map());
      const canvas = ref.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    window.addEventListener('mouseup', reset);
    return () => window.removeEventListener('mouseup', reset);
  }, [dots]);

  React.useEffect(() => {
    function findLinkedDots(clientX: number, clientY: number) {
      for (let i = 0; i < dots.length; i++) {
        for (let j = 0; j < dots[i].length; j++) {
          const { id, x, y, radius } = dots[i][j];
          const distance = Math.sqrt(
            (clientX - x) * (clientX - x) + (clientY - y) * (clientY - y),
          );
          if (currDots.id !== id && distance < radius) {
            return dots[i][j];
          }
        }
      }
      return null;
    }

    function updateDotsState(clientX: number, clientY: number) {
      const newLinkedDot = findLinkedDots(clientX, clientY);
      if (newLinkedDot) {
        if (!prevDots.has(currDots.id)) {
          setPrevDots((prev) => new Map([...prev, [currDots.id, currDots]]));
        }
        if (!prevDots.has(newLinkedDot.id)) {
          setPrevDots(
            (prev) => new Map([...prev, [newLinkedDot.id, newLinkedDot]]),
          );
        }
        setcurrDots(newLinkedDot);
      }
    }

    function drawLinkedLine(ctx: CanvasRenderingContext2D) {
      if (prevDots.size > 1) {
        const prevDotArr = Array.from(prevDots.values());
        for (let i = 1; i < prevDotArr.length; i++) {
          const prevDot = prevDotArr[i - 1];
          const currDot = prevDotArr[i];

          ctx.beginPath();
          ctx.moveTo(prevDot.x, prevDot.y);
          ctx.lineTo(currDot.x, currDot.y);
          ctx.stroke();
        }
      }
    }

    function bouncingAnimation(
      clientWidth: number,
      clientHeight: number,
      ctx: CanvasRenderingContext2D,
    ) {
      for (let i = 0; i < dots.length; i++) {
        for (let j = 0; j < dots[i].length; j++) {
          const { x, y, radius } = dots[i][j];
          const distance = Math.sqrt(
            (clientWidth - x) * (clientWidth - x) +
              (clientHeight - y) * (clientHeight - y),
          );

          if (distance < radius) {
            console.log(32);
            setInterval(
              () => {
                ctx.beginPath();
                ctx.arc(x, y, KEYFRAMES[0], 0, 2 * Math.PI);
                ctx.fillStyle = 'black';
                ctx.fill();
              },
              100,
              KEYFRAMES,
            );
            return;
          }
        }
      }
    }

    function handleMouseMove(e: MouseEvent) {
      if (!ref.current || !currDots) return;
      const canvas = ref.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      const box = canvas.getBoundingClientRect();
      const [clientX, clientY] = [e.clientX - box.left, e.clientY - box.top];
      bouncingAnimation(clientX, clientY, ctx);

      if (!isMouseDown) return;
      updateDotsState(clientX, clientY);

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawDots(canvas, dots);

      ctx.strokeStyle = 'rgba(0,0,0,1)';
      ctx.lineWidth = 6;
      drawLinkedLine(ctx);

      ctx.beginPath();
      ctx.moveTo(currDots.x, currDots.y);
      ctx.lineTo(clientX, clientY);
      ctx.stroke();
    }

    window.addEventListener('mousemove', handleMouseMove);

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isMouseDown, currDots]);

  return (
    <div className="w-full h-full">
      <canvas ref={ref} className="w-full h-full" />
    </div>
  );
}

export default Lock;
