'use client';

import useToggle from '@/hooks/use-toggle';
import React from 'react';
import styled from 'styled-components';

const getDistance = (x1, x2, y1, y2) =>
  Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

const getAngle = (x1, x2, y1, y2) =>
  (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI;

const getLineData = (start, end, width) => {
  let x1 = ((((start - 1) % 3) * 33.3333 + 16.66666) * width) / 100;
  let y1 = ((Math.floor((start - 1) / 3) * 33.3333 + 16.6666) * width) / 100;
  let x2, y2;
  if (typeof end === 'number') {
    x2 = ((((end - 1) % 3) * 33.3333 + 16.66666) * width) / 100;
    y2 = ((Math.floor((end - 1) / 3) * 33.3333 + 16.6666) * width) / 100;
  } else {
    x2 = end.x;
    y2 = end.y;
  }
  return {
    x: x1,
    y: y1,
    distance: getDistance(x1, x2, y1, y2),
    angle: getAngle(x1, x2, y1, y2),
  };
};

function Point({ onMouseDown }) {
  return (
    <div className="flex items-center justify-center w-33% min-h-33% flex-1-33 flex-wrap">
      <div className="p-5" onMouseDown={onMouseDown}>
        <div className="w-3 h-3 rounded-50 aspect-[1/1] bg-slate-500 cursor-pointer" />
      </div>
    </div>
  );
}

function Pattern() {
  const containerRef = React.useRef(null);
  const [isMouseDown, toggleMouseDown] = useToggle(false);
  const [state, setState] = React.useState({
    animate: 0,
    path: [],
    width: 0,
    mouseX: 0,
    mouseY: 0,
    timeout: 0,
    timeout2: 0,
    error: false,
    errorText: false,
    errorMessage: 'Wrong pattern',
  });

  React.useEffect(() => {
    if (!isMouseDown) return;
    function handleMouseMove(e) {
      const { clientX, clientY } = e;
      setState((prev) => ({
        ...prev,
        mouseX: clientX,
        mouseY: clientY,
      }));
    }
    function handleMouseUp() {
      toggleMouseDown();
      console.log('mouse up');
    }

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isMouseDown]);

  React.useEffect(() => {
    setState((prev) => ({
      ...prev,
      width: containerRef.current.getBoundingClientRect().width,
    }));
  }, []);

  // React.useEffect(() => {
  //   if (isMouseDown) return;
  //   function handleMouseUp() {
  //     toggleMouseDown();
  //     console.log('mouse up');
  //   }
  //   document.addEventListener('mouseup', handleMouseUp);
  //   return () => document.removeEventListener('mouseup', handleMouseUp);
  // }, []);
  const points = Array.from({ length: 9 }, () => (
    <Point onMouseDown={toggleMouseDown} />
  ));

  const pos = containerRef.current
    ? containerRef.current.getBoundingClientRect()
    : { width: 0, height: 0 };
  console.log(pos);
  const { x, y, distance, angle } = getLineData(0, state.mouseY, state.width);

  return (
    <div className="flex flex-col items-center w-full h-full">
      <div
        ref={containerRef}
        style={{ height: '400px' }}
        className="relative max-w-400px max-h-400px w-full flex flex-wrap justify-around"
      >
        <React.Fragment>
          {points.map((point, i) => (
            <React.Fragment key={i}>{point}</React.Fragment>
          ))}
        </React.Fragment>
        <Path
          style={{
            top: `${y}px`,
            left: `${x}px`,
            transform: `rotate(${angle}deg)`,
            width: `${distance}px`,
          }}
        />
      </div>
      <div
        style={{
          position: 'absolute',
          top: '107px',
          left: '519px',
          width: '10px',
          height: '10px',
          background: 'black',
        }}
      />
    </div>
  );
}

const Path = styled.div`
  position: absolute;
  background: var(--color-text);
  height: 2px;
`;

export default Pattern;
