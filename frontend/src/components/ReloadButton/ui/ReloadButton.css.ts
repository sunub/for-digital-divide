import { style } from "@vanilla-extract/css";

export const reloadButton = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "2rem",
  height: "2rem",
  borderRadius: "9999px",
  backgroundColor: "#475569",
  color: "#f1f5f9",
  position: "absolute",
  top: "1rem",
  right: "1rem",
  transitionProperty: "background-color",
  transitionDuration: "150ms",
  padding: "0.5rem",
  selectors: {
    "&:hover": {
      backgroundColor: "#64748b",
    },
  },
});
