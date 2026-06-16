"use client";
import { memo } from "react";
import * as style from "./style/CardSkeleton.css";

const CardContent = memo(() => {
  return (
    <div className={style.linkWrapper}>
      <div id={`login-selection-pin-number`} className={style.linkWrapper} />
    </div>
  );
});

export function CardSkeleton({
  skeletonRef,
}: {
  skeletonRef: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <div className={style.rootContainer} ref={skeletonRef}>
      <div className={style.pendingIndicator} />
      <CardContent />
      <div className={style.smallCard} />
    </div>
  );
}
