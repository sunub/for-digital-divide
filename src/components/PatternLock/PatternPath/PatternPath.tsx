'use client';

import React from 'react';
import styled from 'styled-components';

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
  Math.atan2(y2 - y1, x2 - x1);

const getLineData = (
  start: number,
  end: number | { x: number; y: number },
  width: number,
) => {
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

function PatternPath(props: PatternPathProps) {
  const { path, width, mouseX, mouseY, elemPos, error } = props;
  const [lines, setLines] = React.useState<React.ReactNode[]>([]);
  const [state, setState] = React.useState<PathData>({
    x: 0,
    y: 0,
    distance: 0,
    angle: 0,
  });

  React.useEffect(() => {
    if (!path.length) return;
    let l = path.length - 1;
    const newLines = [...lines];

    for (let i = 0; i < l; i++) {
      let { x, y, distance, angle } = getLineData(path[i], path[i + 1], width);
      setState({ x, y, distance, angle });
      // newLines.push(
      //   <div
      //     style={{
      //       top: `calc(${y}px)`,
      //       left: `calc(${x}px)`,
      //       width: `${distance}px`,
      //       transform: `rotate(${angle}deg)`,
      //     }}
      //   />,
      // );
    }

    if (!error) {
      let { x, y, distance, angle } = getLineData(
        path[path.length - 1],
        {
          x: mouseX - elemPos.x,
          y: mouseY - elemPos.y,
        },
        width,
      );
      setState({ x, y, distance, angle });

      // newLines.push(
      //   <div
      //     style={{
      //       top: `calc(${y}px)`,
      //       left: `calc(${x}px)`,
      //       width: `${distance}px`,
      //       transform: `rotate(${angle}deg)`,
      //     }}
      //   />,
      // );
    }

    setLines(newLines);
  }, []);

  // console.log(state);

  return (
    <div className={`path${error ? ' error' : ''}`}>
      <Path
        $x={state.x}
        $y={state.y}
        $distance={state.distance}
        $angle={state.angle}
      />
    </div>
  );
}

const Path = styled.div<{
  $x: number;
  $y: number;
  $distance: number;
  $angle: number;
}>`
  position: absolute;
  height: 2px;
  background-color: aliceblue;
  transform-origin: 0;

  top: ${({ $y }) => `${$y}px`};
  left: ${({ $x }) => `${$x}px`};
  width: ${({ $distance }) => `${$distance}px`};
  transform: ${({ $angle }) => `rotate(${$angle}deg)`};
`;

export default PatternPath;
