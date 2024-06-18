'use client';

import React from 'react';

interface Dot {
  x: number;
  y: number;
  radius: number;
  isFocus: boolean;
}

type Dots = Dot[][];

function resize(canvas: HTMLCanvasElement) {
  const stageWidth = canvas.clientWidth;
  const stageHeight = canvas.clientHeight;

  const pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

  canvas.width = stageWidth * pixelRatio;
  canvas.height = stageHeight * pixelRatio;
}

function createDots(canvas: HTMLCanvasElement, radius: number) {
  const stageWidth = canvas.clientWidth;
  const stageHeight = canvas.clientHeight;

  const centerX = Math.floor(stageWidth / 2);
  const centerY = Math.floor(stageHeight / 2);

  let dist = 115;
  const dots = [];
  for (let i = 0; i < 3; i++) {
    dots.push(
      Array.from({ length: 3 }, (_, j) => ({
        x: centerX - (j - 1) * dist,
        y: centerY + (i - 1) * dist,
        radius,
        isFocus: false,
      })),
    );
  }
  return dots;
}

function Lock() {
  const ref = React.useRef<HTMLCanvasElement>(null);
  const [hover, setHover] = React.useState(false);
  const [dots, setDots] = React.useState<Dots>([]);
  const [isMouseDown, setIsMouseDown] = React.useState(false);
  const [currDots, setcurrDots] = React.useState<Dot[]>([]);
  const [prevDots, setPrevDots] = React.useState<Dot[]>([]);
  const radius = 10;

  function drawDots(canvas: HTMLCanvasElement) {
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

  function updateDots(clientX: number, clientY: number) {
    const newDots = dots.map((row) => {
      return row.map((dot) => {
        const distance = Math.sqrt(
          (clientX - dot.x) * (clientX - dot.x) +
            (clientY - dot.y) * (clientY - dot.y),
        );

        if (distance < dot.radius) {
          setIsMouseDown(true);
          return { ...dot, isFocus: !dot.isFocus };
        }
        return dot;
      });
    });
    setDots(newDots);
  }

  function checkIsHover(clientX: number, clientY: number) {
    for (let i = 0; i < dots.length; i++) {
      for (let j = 0; j < dots[i].length; j++) {
        const { x, y, radius } = dots[i][j];
        const distance = Math.sqrt(
          (clientX - x) * (clientX - x) + (clientY - y) * (clientY - y),
        );
        if (distance < radius) {
          return true;
        }
      }
    }
    return false;
  }

  React.useEffect(() => {
    if (!ref.current) return;
    setDots(createDots(ref.current, radius));
  }, []);

  React.useEffect(() => {
    if (!ref.current) return;

    resize(ref.current);
    window.addEventListener('resize', () => resize(ref.current!));

    return () => {
      window.removeEventListener('resize', () => resize(ref.current!));
    };
  }, []);

  React.useEffect(() => {
    if (dots.length === 0 || !ref.current) return;
    const canvas = ref.current;
    drawDots(canvas);
  }, [dots]);

  React.useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (!ref.current || !dots.length) return;

      const canvas = ref.current;
      const box = canvas.getBoundingClientRect();

      const clientX = e.clientX - box.left;
      const clientY = e.clientY - box.top;

      setDots((prev) => {
        return prev.map((row) => {
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
      });
    }

    window.addEventListener('mousedown', handleClick);

    return () => window.removeEventListener('mousedown', handleClick);
  }, [dots]);

  React.useEffect(() => {
    function handleMouseUp() {
      if (!ref.current || !dots.length) return;

      const updateDots = dots.map((row) => {
        return row.map((dot) => {
          return { ...dot, isFocus: false };
        });
      });

      setIsMouseDown(false);
      setDots(updateDots);
      setcurrDots([]);
      const canvas = ref.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    window.addEventListener('mouseup', handleMouseUp);
    return () => window.removeEventListener('mouseup', handleMouseUp);
  }, [dots]);

  React.useEffect(() => {
    console.log(dots);

    const flatDotts = dots.flat();
    const currDots = flatDotts.find((dot) => dot.isFocus);
    if (!currDots) return;
    setcurrDots((prev) => [...prev, currDots]);
  }, [dots]);

  React.useEffect(() => {
    function checkIsHover(clientX: number, clientY: number) {
      for (let i = 0; i < dots.length; i++) {
        for (let j = 0; j < dots[i].length; j++) {
          const { x, y, radius } = dots[i][j];
          const distance = Math.sqrt(
            (clientX - x) * (clientX - x) + (clientY - y) * (clientY - y),
          );
          if (distance < radius) {
            return true;
          }
        }
      }
      return false;
    }

    function handleMouseMove(e: MouseEvent) {
      if (!ref.current || !currDots) return;
      if (!isMouseDown) return;

      const canvas = ref.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const box = canvas.getBoundingClientRect();
      const [clientX, clientY] = [e.clientX - box.left, e.clientY - box.top];

      if (checkIsHover(clientX, clientY)) {
        updateDots(clientX, clientY);
      }

      if (checkIsHover(clientX, clientY)) {
      }
      checkIsHover(clientX, clientY) ? updateDots(clientX, clientY) : null;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawDots(canvas);

      // ctx.lineWidth = 6;
      // ctx.strokeStyle = 'rgba(255,255,255,1)';
      // ctx.beginPath();
      // ctx.lineTo(currDots[0].x, currDots[0].y);

      // if (currDots.length > 1) {
      //   for (let i = 0; i < currDots.length; i++) {
      //     const { x, y } = currDots[i];
      //     ctx.lineTo(x, y);
      //   }
      //   ctx.stroke();
      //   ctx.beginPath();
      //   ctx.lineTo(
      //     currDots[currDots.length - 1].x,
      //     currDots[currDots.length - 1].y,
      //   );
      // }
      // ctx.lineTo(clientX, clientY);
      // ctx.stroke();
    }

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isMouseDown, currDots]);

  return (
    <div className="w-full h-full">
      {hover ? <div className="absolute top-0 left-0">Hover</div> : null}
      <canvas ref={ref} className="w-full h-full" />
    </div>
  );
}

export default Lock;
