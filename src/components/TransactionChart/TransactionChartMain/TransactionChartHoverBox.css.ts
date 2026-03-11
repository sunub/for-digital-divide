import { createVar, style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { vars } from "@for-digital-divide/design-system/styles";

export const xVar = createVar();
export const yVar = createVar();

export const container = style({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  pointerEvents: "none",
  zIndex: 10,
});

export const cursorLine = style({
  position: "absolute",
  top: 0,
  bottom: 0,
  width: "1px",
  backgroundColor: vars.color.grid,
  borderRight: `1px dashed ${vars.color.thumb}`,
  transform: `translateX(${xVar})`,
  willChange: "transform",
});

export const point = recipe({
  base: {
    position: "absolute",
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    backgroundColor: vars.color.white,
    transform: `translate(calc(${xVar} - 50%), calc(${yVar} - 50%))`,
    boxShadow: `0 ${vars.space[0.5]} ${vars.space[1]} ${vars.color.shadowOutline}`,
    zIndex: 10,
    willChange: "transform",
  },
  variants: {
    variant: {
      balance: { border: `${vars.space[0.5]} solid ${vars.color.balance}` },
      income: { border: `${vars.space[0.5]} solid ${vars.color.income}` },
      expense: { border: `${vars.space[0.5]} solid ${vars.color.expense}` },
    },
  },
});

export const tooltipContainer = style({
  position: "absolute",
  top: "10%",
  left: 0,
  padding: `${vars.space[2]} ${vars.space[3]}`,
  backgroundColor: "rgba(255, 255, 255, 0.95)",
  border: `1px solid ${vars.color.grid}`,
  borderRadius: vars.borderRadius.sm,
  boxShadow: `0 ${vars.space[1]} ${vars.space[1.5]} ${vars.color.shadowOutline}`,
  pointerEvents: "none",
  zIndex: 10,
  fontSize: vars.fontSize["0.75rem"],
  lineHeight: "1.4",
  transition: "opacity 0.2s ease",
  minWidth: "140px",
  willChange: "transform",
});

export const tooltipLeft = style({
  transform: `translateX(calc(${xVar} + 15px))`,
});

export const tooltipRight = style({
  transform: `translateX(calc(${xVar} - 100% - 15px))`,
});

export const tooltipDate = style({
  color: vars.color.thumb,
  marginBottom: vars.space[1],
});

export const tooltipLabel = style({
  fontWeight: vars.fontWeight.medium,
});

export const tooltipValue = style({
  fontWeight: vars.fontWeight.bold,
  fontVariantNumeric: "tabular-nums",
});

export const separator = style({
  margin: `${vars.space[1.5]} 0`,
  borderTop: `1px solid ${vars.color.grid}`,
});
