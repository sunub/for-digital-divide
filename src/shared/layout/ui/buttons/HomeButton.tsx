import Link from "next/link";
import { memo } from "react";
import VisuallyHidden from "@/components/VisuallyHidden";
import * as styles from "../../style/layout.css";
import { Button } from "@for-digital-divide/design-system";

export const HomeButton = memo(({ href }: { href: string }) => {
  return (
    <Button asChild className={styles.gestureButton} variant={"transparent"}>
      <Link href={href}>
        <svg
          width="68"
          height="68"
          viewBox="0 0 68 68"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>홈 버튼</title>
          <circle
            className={styles.gestureCircle}
            cx="34"
            cy="34"
            r="30"
            fill="none"
            stroke="none"
          />
          <rect
            x="24.5"
            y="24.5"
            width="19"
            height="19"
            rx="3.5"
            stroke="color-mix(in oklch, oklch(42.44% 0.011 17.58), transparent)"
            strokeWidth={"2"}
          />
        </svg>
        <VisuallyHidden>홈 버튼</VisuallyHidden>
      </Link>
    </Button>
  );
});
