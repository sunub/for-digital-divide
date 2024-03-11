'use client';

import React from 'react';
import PatterPoints from './PatterPoints';
import PatternPath from './PatternPath';

interface State {
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
  let mouseDown = false;
  const ref = React.useRef<HTMLDivElement>(null);
  const [state, setState] = React.useState<State>({
    animate: 0,
    // 사용자가 마우스로 지나친 점에 대한 정보를 저장한다.
    path: [],
    width: 0,
    mouseX: 0,
    mouseY: 0,
    timeout: null,
    timeout2: null,
    error: false,
    errorText: false,
    errorMessage: 'Wrong pattern, try again!',
  });

  /**
   * @description State path에는 웹 상의 점을 마우스가 지나친 점에 대한 인덱스에 대한 정보가 담겨 있고 CorrectPattern에는 초기에 설정한 정답에 대한 패턴이 담겨 있다. 이 두 가지를 비교하여 사용자가 그린 패턴이 맞는지 여부를 판단하는 함수이다.
   * @returns
   */
  const compare = () => {
    if (!correctPattern) return false;
    let path = state.path;
    let l =
      path.length > correctPattern.length ? path.length : correctPattern.length;
    for (let i = 0; i < l; i++) {
      if (path[i] !== correctPattern[1]) return false;
    }
    return true;
  };

  const handleMouseOver = (i: number) => {
    if (state.path.indexOf(i) > -1 || !mouseDown) return;
    let newPath = [...state.path];
    newPath.push(i);
    setState((prev) => ({
      ...prev,
      animate: i,
      path: newPath,
    }));
  };

  const pathStart = (i: number) => {
    setState((prev) => ({
      ...prev,
      path: [i],
    }));
  };

  React.useEffect(() => {
    function handleMouseMove(e: MouseEvent) {
      const { clientX, clientY } = e;
      setState((prev) => ({
        ...prev,
        mouseX: clientX,
        mouseY: clientY,
      }));
    }

    function handleTouchmove(e: TouchEvent) {
      const { touches } = e;
      setState((prev) => ({
        ...prev,
        mouseX: touches[0].pageX,
        mouseY: touches[0].pageY,
      }));
    }

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('touchmove', handleTouchmove);

    if (state.errorText) {
      setState((prev) => ({
        ...prev,
        error: false,
        errorText: false,
        path: [],
      }));
    }

    return () => {
      mouseDown = false;
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('touchmove', handleTouchmove);

      let withoutCompare = !Array.isArray(correctPattern);
      let isLengthCorrect = withoutCompare ? state.path.length > 3 : true;

      if (state.path.length > 0) {
        if (isLengthCorrect && (withoutCompare || compare())) {
          if (withoutCompare) return;

          setState((prev) => ({
            ...prev,
            done: true,
            path: [],
          }));
        }
      } else {
        setState((prev) => ({
          ...prev,
          error: true,
          errorText: true,
          errorMessage: isLengthCorrect
            ? '잘못된 패턴입니다! 다시 입력해주세요'
            : '4개의 점을 선택해주세요!',
          timeout: setTimeout(
            () =>
              setState((prev) => ({
                ...prev,
                error: false,
                path: [],
              })),
            3000,
          ),
          timeout2: setTimeout(
            () =>
              setState((prev) => ({
                ...prev,
                errorText: false,
              })),
            6000,
          ),
        }));
      }
    };
  }, []);

  React.useEffect(() => {
    if (!ref.current) return;

    setState((prev) => ({
      ...prev,
      width: ref.current?.offsetWidth ? ref.current.offsetWidth : 0,
    }));
  }, []);

  const patterPointsProps = {
    onMouseDown: pathStart,
    onMouseOver: handleMouseOver,
    animate: state.animate,
    error: state.error,
    path: state.path,
    id: 0,
    pageX: state.mouseX,
    pageY: state.mouseY,
    animated: state.animate,
  };

  const pos = ref.current && ref.current.getBoundingClientRect();

  return (
    <div ref={ref} style={{ width: '100cqw' }}>
      <div className="flex w-full max-w-400px max-h-400px flex-wrap justify-between relative">
        <PatterPoints {...patterPointsProps} />
        <PatternPath
          path={state.path}
          elemPos={{ x: pos?.x ? pos.x : 0, y: pos?.y ? pos.y : 0 }}
          mouseX={state.mouseX}
          mouseY={state.mouseY}
          width={state.width}
          error={state.error}
        />
      </div>
    </div>
  );
}

export default PatternLock;
