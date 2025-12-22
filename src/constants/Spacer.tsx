import { assignInlineVars } from "@vanilla-extract/dynamic";
import clsx from "clsx";
import { heightVar, spacerStyle, widthVar } from "./Spacer.css";

interface SpacerProps extends React.HTMLAttributes<HTMLSpanElement> {
  axis: DIR;
  size: number;
  ref?: React.Ref<HTMLSpanElement>;
}

type DIR = "horizontal" | "vertical";

function getWidth(axis: DIR, size: number) {
  return axis === "vertical" ? 1 : size;
}
function getHeight(axis: DIR, size: number) {
  return axis === "horizontal" ? 1 : size;
}

export default function Spacer({
  axis,
  size,
  className,
  ref,
  ...props
}: SpacerProps) {
  const width = getWidth(axis, size);
  const height = getHeight(axis, size);

  const mergedStyle = {
    ...assignInlineVars({
      [widthVar]: `${width}px`,
      [heightVar]: `${height}px`,
    }),
    ...props.style,
  };

  return (
    <span
      ref={ref}
      className={clsx(spacerStyle, className)}
      style={mergedStyle}
      {...props}
    />
  );
}
