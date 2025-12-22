import { createVar, style } from "@vanilla-extract/css";

export const cardSpacerVar = createVar();
export const cardWidthVar = createVar();
export const cardHeightVar = createVar();

export const cardLayoutRootContainer = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  width: "100%",
  userSelect: "none",
  gap: "1rem",
  cursor: "pointer",
});

export const graph = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minWidth: "100px",
});

export const chartTitle = style({
  fontSize: "1rem",
  fontWeight: "600",
  textAlign: "center",
  color:
    "color-mix(in oklch, oklch(63.93% 0.206 288.34) 90%, oklch(0.7 0.1825 239.69) 20%)",
});
