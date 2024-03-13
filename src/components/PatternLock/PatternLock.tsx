'use client';

import React from 'react';
import PatternPath from './PatternPath';
import PatterPoints from './PatternPoint';
import { _decodeClientDataJSONInternals } from '@simplewebauthn/server/esm/helpers/decodeClientDataJSON';

const JUMPING_COMBS = [
  [0, 1, 2],
  [0, 4, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 4, 6],
  [2, 5, 8],
  [3, 4, 5],
  [6, 7, 8],
];
interface PatternState {
  animate: number;
  path: number[];
  width: number;
  mouseX: number;
  mouseY: number;
  timeout: any;
  timeout2: any;
  error: boolean;
  errorText: boolean;
  errorMessage: string;
}

function PatternLock({ correctPattern }: { correctPattern: number[] }) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [isMouseDown, setMouseDown] = React.useState(false);
  const [rectInfo, setRectInfo] = React.useState<DOMRect | null>(null);
  const [state, setState] = React.useState<PatternState>({
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

  const handleMouseDown = (e: React.MouseEvent) => {
    const curr = e.currentTarget as HTMLDivElement;
    setMouseDown(true);

    const currId = parseInt(curr.parentElement?.id as string, 10);
    setState((prev) => ({
      ...prev,
      path: [currId],
    }));
  };

  const handleMouseOver = (i: number) => {
    if (state.path.indexOf(i) > -1 || !isMouseDown) return;

    let newPath = [...state.path];
    const jump = checkJumping(i);
    if (jump) newPath.push(jump);
    newPath.push(i);

    setState((prev) => ({
      ...prev,
      path: newPath,
    }));
  };

  const checkJumping = (nextPoint: number) => {
    let lastPoint = state.path[state.path.length - 1];
    for (const [x, jumpy, y] of JUMPING_COMBS) {
      if (
        (x === nextPoint && y === lastPoint) ||
        (x === lastPoint && y === nextPoint)
      ) {
        return jumpy;
      }
    }
    return false;
  };

  const mouseUpEvent = () => {
    let isLengthCorrect = state.path.length > 3;

    if (state.path.length > 0) {
      if (isLengthCorrect) {
      } else {
        setState((prev) => ({
          ...prev,
          path: [],
          error: true,
          errorMessage: isLengthCorrect ? 'Wrong pattern' : 'Pattern too short',
          timeout: setTimeout(() => {
            setState((prev) => ({
              ...prev,
              error: false,
            }));
          }, 1000),
          timeout2: setTimeout(() => {
            setState((prev) => ({
              ...prev,
              errorText: false,
            }));
          }, 2000),
        }));
      }
    }
  };

  React.useEffect(() => {
    if (!isMouseDown) return;
    function handleMouseMove(e: MouseEvent) {
      const { clientX, clientY } = e;
      setState((prev) => ({
        ...prev,
        mouseX: clientX,
        mouseY: clientY,
      }));
    }

    function handleMouseUp() {
      setMouseDown(false);

      let isLengthCorrect = state.path.length > 3;

      if (state.path.length > 0) {
        if (isLengthCorrect) {
        } else {
          setState((prev) => ({
            ...prev,
            error: true,
            errorMessage: isLengthCorrect
              ? 'Wrong pattern'
              : 'Pattern too short',
            timeout: setTimeout(() => {
              setState((prev) => ({
                ...prev,
                error: false,
                path: [],
              }));
            }, 1000),
            timeout2: setTimeout(() => {
              setState((prev) => ({
                ...prev,
                errorText: false,
              }));
            }, 2000),
          }));
        }
      }
    }

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isMouseDown]);

  React.useEffect(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setRectInfo(rect);

    setState((prev) => ({
      ...prev,
      width: rect.width,
    }));
  }, []);

  const points = Array.from({ length: 9 }, (_, i) => (
    <PatterPoints
      key={i}
      id={i}
      onMouseDown={handleMouseDown}
      onMouseOver={handleMouseOver}
    />
  ));

  return (
    <div className="flex flex-col items-center w-full h-full">
      <div
        ref={containerRef}
        style={{ height: '400px' }}
        className="relative max-w-400px max-h-400px w-full flex flex-wrap justify-around"
      >
        {points.map((point) => point)}
        <PatternPath
          path={state.path}
          width={state.width}
          mouseX={state.mouseX}
          mouseY={state.mouseY}
          elemPos={{
            x: rectInfo ? rectInfo.x : 0,
            y: rectInfo ? rectInfo.y : 0,
          }}
          error={state.error}
          mouseUpEvent={mouseUpEvent}
        />
      </div>
    </div>
  );
}

export default PatternLock;
