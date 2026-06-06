"use client";

import { type AnimationPlaybackControls, useAnimate } from "motion/react";
import { useRef } from "react";

export function useBallAnimation() {
  const [scope, animate] = useAnimate();
  // 실행 중인 애니메이션 객체를 저장할 ref
  const controlsRef = useRef<AnimationPlaybackControls | null>(null);

  const play = () => {
    if (!scope.current) {
      return;
    }

    controlsRef.current = animate(
      [
        [
          "span#upper-dot-pending",
          { y: -57, scale: 1.25 },
          {
            type: "spring",
            duration: 2,
            damping: 10,
            stiffness: 100,
            at: 0.25,
          },
        ],
        [
          "span#lower-dot-pending",
          { y: -27, scale: 0.75 },
          {
            type: "spring",
            duration: 2,
            damping: 10,
            stiffness: 100,
            at: 0.25,
          },
        ],
      ],
      {
        repeat: Infinity,
        repeatType: "loop",
      },
    );
  };

  const cancel = () => {
    if (controlsRef.current) {
      controlsRef.current.cancel();
    }
  };

  return { scope, play, cancel };
}
