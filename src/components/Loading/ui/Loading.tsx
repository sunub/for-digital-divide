import { gridCenter } from "@for-digital-divide/design-system";
import clsx from "clsx";
import type { HTMLAttributes } from "react";
import { fullSize } from "@/style/Size.css";
import { LoadingAnimation } from "./LoadingAnimation";

interface LoadingProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
  radius?: string;
}

export function Loading({ size = 5, radius = "1rem", ...props }: LoadingProps) {
  return (
    <div className={clsx(gridCenter, fullSize)} {...props}>
      <LoadingAnimation size={size} radius={radius} />
    </div>
  );
}
