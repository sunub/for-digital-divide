import { style } from "@vanilla-extract/css";

export const chartGraphWrapper = style({
  flex: 1,
  maxWidth: "80cqw",
  marginLeft: "auto",
  marginRight: "auto",
  position: "relative",
  width: "100%",
  height: "100%",
  minWidth: 0,
  minHeight: "326px",
  overflow: "hidden",
});

export const emptyState = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  color: "#aaa",
});

// 기존 호환성 유지
export const chartPeriodSelectContainer = style({});
export const chartPeriodLabel = style({});
export const chartPeriodRange = style({});
export const chartGraphContainer = style({});

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

// [추가] 마우스 호버 시 나타나는 수직선
export const cursorLine = style({
  position: "absolute",
  top: 0,
  bottom: 0,
  width: "1px",
  backgroundColor: "#ccc",
  pointerEvents: "none",
  borderRight: "1px dashed #999",
  zIndex: 5,
});
