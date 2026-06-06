import { createVar, style } from "@vanilla-extract/css";

export const trendIndicatorColorVar = createVar();

export const summaryPanel = style({
  maxWidth: "80cqw",
  width: "100%",
  marginLeft: "auto",
  marginRight: "auto",
  flex: "0 0 200px",
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

export const trendIndicatorContainer = style({
  minWidth: "1rem",
});

export const trendIndicator = style({
  display: "flex",
  alignItems: "center",
  gap: "6px",
  fontSize: "0.9rem",
});

export const trendIndicatorSign = style({
  color: trendIndicatorColorVar,
  fontWeight: "bold",
  display: "flex",
  alignItems: "center",
  gap: "2px",
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

export const periodButton = style({
  padding: "6px 12px",
  borderRadius: "16px",
  border: "1px solid #ddd",
  backgroundColor: "white",
  fontSize: "0.8rem",
  cursor: "pointer",
  transition: "all 0.2s",
  userSelect: "none", // 텍스트 드래그 방지
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
