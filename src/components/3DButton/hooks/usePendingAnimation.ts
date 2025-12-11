import { useAnimate } from "motion/react";
import { useEffect } from "react";
import type { Status } from "@/store/pinnumber-store";
import { useBallAnimation } from "./useBallAnimation";

export function usePendingAnimation(status: Status) {
  const {
    scope: ballAnimationScope,
    play: playBallAnimation,
    cancel: cancelBallAnimation,
  } = useBallAnimation();

  const [textAnimationScope, textAnimate] = useAnimate();

  useEffect(() => {
    if (!textAnimationScope.current) {
      return;
    }

    if (status === "pending") {
      playBallAnimation();
      textAnimate(textAnimationScope.current, { opacity: 0, scale: 0.5 });
    } else {
      cancelBallAnimation();
      textAnimate(textAnimationScope.current, { opacity: 1, scale: 1 });
    }
  }, [
    status,
    textAnimate,
    textAnimationScope,
    playBallAnimation,
    cancelBallAnimation,
  ]);

  return {
    textAnimationScope,
    ballAnimationScope,
  };
}
