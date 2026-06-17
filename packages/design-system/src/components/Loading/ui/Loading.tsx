import clsx from "clsx";
import type { HTMLAttributes } from "react";
import { gridCenter } from "../../../styles";
import { LoadingAnimation } from "./LoadingAnimation";

interface LoadingProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
  radius?: string;
}

export function Loading({ size = 5, radius = "1rem", ...props }: LoadingProps) {
  return (
    <div
      className={clsx(gridCenter)}
      style={{ width: "100%", height: "100%", ...props.style }}
      {...props}
    >
      <LoadingAnimation size={size} radius={radius} />
    </div>
  );
}
