import { style } from "@vanilla-extract/css";

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
