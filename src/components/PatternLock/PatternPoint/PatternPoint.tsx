'use client';

import React from 'react';

interface PatternPointProps {
  onMouseDown: (e: React.MouseEvent) => void;
  onMouseOver: (i: number) => void;
  id: number;
}

function PatternPoint(props: PatternPointProps) {
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

    id,
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
  }, []);

  // function mouseMove() {
  //   const { left, top, width, height } = state;
  //   if (
  //     pageX > left &&
  //     pageY > top &&
  //     pageX < left + width &&
  //     pageY < top + height
  //   ) {
  //     onMouseOver(id);
  //   }
  // }
  return (
    <div
      ref={ref}
      className="flex items-center justify-center w-33% min-h-33% flex-1-33 flex-wrap"
      id={`${id}`}
    >
      <div
        className="p-3"
        onMouseDown={(e) => onMouseDown(e)}
        onMouseOver={() => onMouseOver(id)}
      >
        <div className="w-2 h-2 rounded-50 aspect-[1/1] bg-slate-500 cursor-pointer" />
      </div>
    </div>
  );
}

export default PatternPoint;

// const mouseMove = React.useMemo(() => {
//   const { left, top, width, height } = state;
//   return () => {
//     if (
//       pageX > left &&
//       pageY > top &&
//       pageX < left + width &&
//       pageY < top + height
//     ) {
//       onMouseOver(id);
//     }
//   };
// }, [state]);
