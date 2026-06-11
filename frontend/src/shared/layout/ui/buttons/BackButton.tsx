"use client";

import { Button } from "@internal/design-system/components";
import { useRouter } from "next/navigation";
import { memo } from "react";
import VisuallyHidden from "@/components/VisuallyHidden";
import { useHistory } from "@/shared/hooks/useHistory";
import * as styles from "../../style/layout.css";

export const BackButton = memo(() => {
  const router = useRouter();
  const { goBack, canGoPrev, currentItem } = useHistory();

  const onClick = () => {
    if (!canGoPrev) {
      return;
    }
    const prevHistory = goBack();
    if (prevHistory) {
      router.push(currentItem ? currentItem : prevHistory);
    }
  };

  return (
    <Button
      className={styles.gestureButton}
      type={"button"}
      variant={"transparent"}
      aria-label="뒤로가기 버튼"
      onClick={onClick}
    >
      <svg
        width="56"
        height="56"
        viewBox="0 0 68 68"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>뒤로가기 버튼</title>
        <circle
          className={styles.gestureCircle}
          cx="34"
          cy="34"
          r="30"
          fill="none"
          stroke="none"
        />
        <path
          d="M34 24L26.1213 31.8787C24.9497 33.0503 24.9497 34.9497 26.1213 36.1213L34 44"
          stroke="color-mix(in oklch, oklch(42.44% 0.011 17.58), transparent)"
          strokeWidth={"2"}
          strokeLinecap="round"
        />
      </svg>
      <VisuallyHidden>뒤로가기 버튼</VisuallyHidden>
    </Button>
  );
});
