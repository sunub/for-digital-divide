import { style } from "@vanilla-extract/css";

export const checkboxWrapper = style({
  display: "flex",
  alignItems: "center",
  gap: "16px",
  cursor: "pointer",
  flex: 1,
});

export const hiddenInput = style({
  appearance: "none",
  position: "absolute",
  width: 0,
  height: 0,
  opacity: 0,
});

export const checkboxBox = style({
  width: "24px",
  height: "24px",
  border: "1px solid #ccc3d6",
  borderRadius: "4px",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  transition: "all 0.2s",
  flexShrink: 0,
  backgroundColor: "white",
  selectors: {
    "input:checked + &": {
      backgroundColor: "#9367ef",
      borderColor: "#9367ef",
    },
  },
});

export const labelText = style({
  fontSize: "16px",
  fontWeight: "600",
  color: "#1a1c1c",
  userSelect: "none",
});

export const smallIcon = style({
  color: "#7b7485",
  fontSize: "18px",
  display: "inline-block",
  marginRight: "8px",
  verticalAlign: "middle",
});

export const smallIconChecked = style({
  color: "#9367ef",
});

export const checkSvg = style({
  width: "18px",
  height: "18px",
  fill: "none",
  stroke: "white",
  strokeWidth: 3,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  opacity: 0,
  selectors: {
    "input:checked + * > &": {
      opacity: 1,
    },
  },
});
