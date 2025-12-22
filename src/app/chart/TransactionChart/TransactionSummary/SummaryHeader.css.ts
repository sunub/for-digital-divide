import { style } from "@vanilla-extract/css";

export const summaryHeader = style({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  alignItems: "center",
});

export const summaryLabel = style({
  alignItems: "center",
  fontSize: "0.875rem",
  color: "#666",
});

export const totalAmount = style({
  fontSize: "1.5rem",
  fontWeight: "bold",
  color: "#333",
  margin: "4px 0",
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

export const summaryDataInfo = style({
  display: "inline-flex",
  minHeight: "1.25rem",
});
