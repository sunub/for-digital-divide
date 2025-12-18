import { assignInlineVars } from "@vanilla-extract/dynamic";
import { heightVar, spacerStyle, widthVar } from "./Spacer.css";

type DIR = "horizontal" | "vertical";

function getWidth(axis: DIR, size: number) {
  return axis === "vertical" ? 1 : size;
}
function getHeight(axis: DIR, size: number) {
  return axis === "horizontal" ? 1 : size;
}

export default function Spacer({ axis, size }: { axis: DIR; size: number }) {
  const width = getWidth(axis, size);
  const height = getHeight(axis, size);

  return (
    <span
      className={spacerStyle}
      style={assignInlineVars({
        [widthVar]: `${width}px`,
        [heightVar]: `${height}px`,
      })}
    />
  );
}
