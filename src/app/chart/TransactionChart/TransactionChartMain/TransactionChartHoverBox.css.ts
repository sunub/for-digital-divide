import { createVar, style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { COLORS } from "../constants/colors";

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
  backgroundColor: "#ccc",
  borderRight: "1px dashed #999",
  transform: `translateX(${xVar})`,
  willChange: "transform",
});

export const point = recipe({
  base: {
    position: "absolute",
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    backgroundColor: "white",
    transform: `translate(calc(${xVar} - 50%), calc(${yVar} - 50%))`,
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    zIndex: 10,
    willChange: "transform",
  },
  variants: {
    variant: {
      balance: { border: `2px solid ${COLORS.balance}` },
      income: { border: `2px solid ${COLORS.income}` },
      expense: { border: `2px solid ${COLORS.expense}` },
    },
  },
});

export const tooltipContainer = style({
  position: "absolute",
  top: "10%",
  left: 0,
  padding: "8px 12px",
  backgroundColor: "rgba(255, 255, 255, 0.95)",
  border: "1px solid #eee",
  borderRadius: "8px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  pointerEvents: "none",
  zIndex: 10,
  fontSize: "0.8rem",
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
  color: "#666",
  fontSize: "0.75rem",
  marginBottom: "4px",
});

export const tooltipRow = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "12px",
});

export const tooltipLabel = style({
  fontWeight: 500,
});

export const tooltipValue = style({
  fontWeight: "bold",
  fontVariantNumeric: "tabular-nums",
});
