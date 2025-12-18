import { createVar, style } from "@vanilla-extract/css";

export const widthVar = createVar();
export const heightVar = createVar();

export const spacerStyle = style({
  display: "block",
  width: widthVar,
  minWidth: widthVar,
  height: heightVar,
  minHeight: heightVar,
});
