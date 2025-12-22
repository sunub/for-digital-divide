import { style } from "@vanilla-extract/css";

export const chartRootContainer = style({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  height: "100%",
  minHeight: "300px",
  gap: "20px",
  padding: "20px",
  boxSizing: "border-box",
  overflow: "hidden",
  "@media": {
    "screen and (max-width: 768px)": {
      flexDirection: "column",
    },
  },
});

export const summaryPanel = style({
  flex: "0 0 200px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  gap: "12px",
  zIndex: 1,
  "@media": {
    "screen and (max-width: 768px)": {
      flex: "auto",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
  },
});

export const summaryHeader = style({
  display: "flex",
  flexDirection: "column",
});

export const summaryLabel = style({
  fontSize: "0.875rem",
  color: "#666",
});

export const totalAmount = style({
  fontSize: "1.5rem",
  fontWeight: "bold",
  color: "#333",
  margin: "4px 0",
});

export const trendIndicator = style({
  display: "flex",
  alignItems: "center",
  gap: "6px",
  fontSize: "0.9rem",
});

export const trendLabel = style({
  color: "#888",
  fontSize: "0.8rem",
});

export const chartControls = style({
  marginTop: "auto",
  display: "flex",
  gap: "8px",
  "@media": {
    "screen and (max-width: 768px)": {
      marginTop: 0,
    },
  },
});

// [수정] button 태그 대신 div를 사용할 것이므로 button 스타일 유지하되 cursor 등 명시
export const periodButton = style({
  padding: "6px 12px",
  borderRadius: "16px",
  border: "1px solid #ddd",
  backgroundColor: "white",
  fontSize: "0.8rem",
  cursor: "pointer",
  transition: "all 0.2s",
  userSelect: "none",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  ":hover": {
    backgroundColor: "#f5f5f5",
  },
});

export const activePeriodButton = style({
  backgroundColor: "#333",
  color: "white",
  borderColor: "#333",
  fontWeight: 600,
  ":hover": {
    backgroundColor: "#333",
  },
});

// [핵심 수정] 무한 루프 방지를 위한 절대 위치 컨테이너 설정
export const chartGraphWrapper = style({
  flex: 1,
  position: "relative",
  width: "100%",
  height: "100%",
  minWidth: 0,
  minHeight: 0,
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

export const tooltipContainer = style({
  position: "absolute",
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
