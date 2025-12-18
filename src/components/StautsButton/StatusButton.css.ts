import { createVar, globalStyle, style } from "@vanilla-extract/css";

export const pendingBlockBackgorund = createVar();
export const pendingBlockDelay = createVar();
export const padding = createVar();
export const cursor = createVar();

export const pendingWrapper = style({
  position: "relative",
  display: "inline-flex",
  flexDirection: "row",
  height: "100%",
  minHeight: "41px",
  cursor: "progress",
  pointerEvents: "none",
});

globalStyle(`${pendingWrapper} :first-child`, {
  borderTopLeftRadius: "16px",
  borderBottomLeftRadius: "18px",
});

globalStyle(`${pendingWrapper} :nth-child(5)`, {
  borderTopRightRadius: "16px",
  borderBottomRightRadius: "18px",
});

export const pendingBtm = style({
  position: "absolute",
  zIndex: 1,
  top: "2px",
  left: "-1px",
  width: "102px",
  height: "60px",

  borderTopLeftRadius: "20px",
  borderTopRightRadius: "20px",
  borderBottomRightRadius: "18px",
  borderBottomLeftRadius: "18px",

  background: `linear-gradient(
    90deg,
    oklch(76.64% 0.13 292.01) 0%,
    oklch(87.45% 0.0646 286.931) 6%,
    oklch(87.45% 0.0646 286.931) 91%,
    oklch(76.64% 0.13 292.01) 100%
  )`,
});

export const pendingBlock = style({
  position: "relative",
  zIndex: 2,

  display: "block",
  height: "100%",
  minHeight: "45px",
  width: "20px",
  willChange: "background-color, box-shadow",
  animation: "pending 1.5s ease-in infinite",
  animationDelay: pendingBlockDelay,
  transform: "translate3d(0, 0, 0)",

  selectors: {
    "&::before": {
      content: "''",
      width: "8px",
      height: "8px",
      borderRadius: "50%",
      aspectRatio: "1 / 1",
      backgroundColor: pendingBlockBackgorund,

      position: "absolute",
      top: "calc(50% - 4px)",
      left: "calc(50% - 4px)",
    },
  },
});

export const test = style({
  position: "relative",
  zIndex: 2,

  display: "block",
  height: "100%",
  minHeight: "45px",
  width: "20px",
  willChange: "background-color, box-shadow",
  animation: "pending 1.5s ease-in infinite",
  transform: "translate3d(0, 0, 0)",

  selectors: {
    "&::before": {
      content: "''",
      width: "8px",
      height: "8px",
      borderRadius: "50%",
      aspectRatio: "1 / 1",

      position: "absolute",
      top: "calc(50% - 4px)",
      left: "calc(50% - 4px)",
    },
  },
});
