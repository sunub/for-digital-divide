'use client';

import React from 'react';

interface PatternPathProps {
  path: number[];
  width: number;
  mouseX: number;
  mouseY: number;
  elemPos: {
    x: number;
    y: number;
  };
  error: boolean;
  mouseUpEvent: () => void;
}

interface PathData {
  x: number;
  y: number;
  distance: number;
  angle: number;
}

const getDistance = (x1: number, x2: number, y1: number, y2: number) =>
  Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

const getAngle = (x1: number, x2: number, y1: number, y2: number) =>
  (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI;

// const getLineData = (
//   start: number,
//   end: number | { x: number; y: number },
//   width: number,
// ) => {
//   let x1 = (start % 3) * (width / 3) + width / 6;
//   let y1 = Math.floor(start / 3) * (width / 3) + width / 6;
//   // let x1 = ((((start - 1) % 3) * 33.3333 + 16.66666) * width) / 100;
//   // let y1 = ((Math.floor((start - 1) / 3) * 33.3333 + 16.6666) * width) / 100;
//   let x2, y2;
//   if (typeof end === 'number') {
//     x2 = (end % 3) * (width / 3) + width / 6;
//     y2 = Math.floor(end / 3) * (width / 3) + width / 6;
//   } else {
//     x2 = end.x;
//     y2 = end.y;
//   }
//   return {
//     x: x1,
//     y: y1,
//     distance: getDistance(x1, x2, y1, y2),
//     angle: getAngle(x1, x2, y1, y2),
//   };
// };

const Line = ({ x, y, distance, angle }: PathData) => {
  return (
    <div
      className="absolute h-2px bg-slate-500"
      style={{
        top: `calc(${y}px)`,
        left: `calc(${x}px)`,
        width: `${distance}px`,
        transform: `rotate(${angle}deg)`,
        transformOrigin: '0',
      }}
    />
  );
};

function PatternPath(props: PatternPathProps) {
  const { path, width, mouseX, mouseY, elemPos, error, mouseUpEvent } = props;
  const [lines, setLines] = React.useState<React.ReactNode[]>([]);

  const getLineData = React.useCallback(
    (start: number, end: number | { x: number; y: number }, width: number) => {
      let x1 = (start % 3) * (width / 3) + width / 6;
      let y1 = Math.floor(start / 3) * (width / 3) + width / 6;
      let x2, y2;
      if (typeof end === 'number') {
        x2 = (end % 3) * (width / 3) + width / 6;
        y2 = Math.floor(end / 3) * (width / 3) + width / 6;
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
    },
    [width],
  );

  React.useEffect(() => {
    if (!path.length) {
      setLines([]);
      mouseUpEvent();
    }
  }, [path]);

  React.useEffect(() => {
    if (!path.length) return;
    const newLines = [];

    if (path.length === 0) {
      console.log('path is empty');
      setLines([]);
      return;
    }

    if (path.length >= 2) {
      let l = path.length - 1;
      for (let i = 0; i < l; i++) {
        let lineData = getLineData(path[i], path[i + 1], width);
        newLines.push(<Line key={crypto.randomUUID()} {...lineData} />);
      }
    }

    if (!error) {
      let lineData = getLineData(
        path[path.length - 1],
        {
          x: mouseX - elemPos.x,
          y: mouseY - elemPos.y,
        },
        width,
      );
      newLines.push(<Line key={crypto.randomUUID()} {...lineData} />);
    }

    setLines(newLines);
  }, [mouseX]);

  return (
    <div
      className={`absolute top-0 left-0 w-full pointer-events-none h-full`}
      style={{ transform: 'scale(1) translateY(0)' }}
    >
      {lines.map((line) => line)}
    </div>
  );
}

export default PatternPath;
