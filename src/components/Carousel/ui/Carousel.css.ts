import { vars } from "@for-digital-divide/design-system/styles";
import { createVar, style } from "@vanilla-extract/css";

const slideHeightVar = createVar();
const slideSpacingVar = createVar();
const slideSizeVar = createVar();
const slideMaxWidthVar = createVar();

export const selectedSnapDisplay = style({
  display: "flex",
  paddingLeft: "1rem",
  gap: "0.5rem",
  justifyContent: "flex-start",
});

export const prevButton = style({});

export const nextButton = style({});

export const section = style({
  vars: {
    [slideHeightVar]: "19rem",
    [slideSpacingVar]: "1rem",
    [slideSizeVar]: "90cqw",
    [slideMaxWidthVar]: "100%",
  },
  color: vars.color.accent,
  width: "100%", // cqw 대신 % 사용
  maxWidth: "100%", // 자기 자신에게 cqw 사용 금지
  containerType: "inline-size",
});

export const viewport = style({
  overflow: "hidden",
});

export const container = style({
  display: "flex",
  touchAction: "pan-y pinch-zoom",
  paddingBottom: "1rem",
  paddingTop: "1rem",
});

export const slide = style({
  transform: "translate3d(0, 0, 0)",
  flex: `0 0 ${slideSizeVar}`,
  minWidth: 0,
  paddingLeft: slideSpacingVar,
  paddingRight: slideSpacingVar,
});
