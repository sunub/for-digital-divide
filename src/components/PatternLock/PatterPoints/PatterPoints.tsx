'use client';

import React from 'react';

interface PatternPointsProps {
  onMouseDown: (i: number) => void;
  onMouseOver: (i: number) => void;
  animate: number;
  error: boolean;
  path: number[];
  id: number;
  pageX: number;
  pageY: number;
  animated: number;
}

function PatternPoints(props: PatternPointsProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [state, setState] = React.useState({
    elem: null,
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  });
  const {
    onMouseDown,
    onMouseOver,
    animate,
    error,
    path,
    id,
    pageX,
    pageY,
    animated,
  } = props;

  React.useEffect(() => {
    if (!ref.current) return;

    function handleResize() {
      if (!ref.current) return;

      let { top, left } = ref.current.getBoundingClientRect();

      setState((prev) => ({
        ...prev,
        top,
        left,
        width: ref.current?.offsetWidth ? ref.current.offsetWidth : 0,
        height: ref.current?.offsetHeight ? ref.current.offsetHeight : 0,
      }));
    }

    window.addEventListener('resize', handleResize);

    return () => window.addEventListener('resize', handleResize);
  }, []);

  function mouseMove() {
    const { left, top, width, height } = state;
    if (
      pageX > left &&
      pageY > top &&
      pageX < left + width &&
      pageY < top + height
    ) {
      onMouseOver(id);
    }
  }

  mouseMove();

  return (
    <div
      ref={ref}
      className="flex items-center justify-center w-4/12 min-h-4/12 flex-wrap flex-1-33"
      onMouseDown={() => onMouseDown(id)}
      onMouseOver={() => onMouseOver(id)}
      onTouchStart={() => onMouseDown(id)}
    >
      <div className="w-4 h-4 bg-slate-300 rounded-full aspect-[1/1] p-2 select-none" />
    </div>
  );
}

export default PatternPoints;
