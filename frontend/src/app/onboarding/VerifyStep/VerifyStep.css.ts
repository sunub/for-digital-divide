import { vars } from "@internal/design-system/style";
import { style } from "@vanilla-extract/css";

export const methodOptionInput = style({
  position: "absolute",
  opacity: 0,
  width: "1px",
  height: "1px",
  pointerEvents: "none",
});

export const methodOptionLabel = style({
  cursor: "pointer",
  transition: "all 0.2s ease",
  selectors: {
    "&:hover": {
      borderColor: vars.color.button,
      transform: "translateY(-1px)",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
    },
    [`${methodOptionInput}:focus-visible + &`]: {
      outline: `2px solid ${vars.color.button}`,
      outlineOffset: "2px",
    },
  },
});

export const methodOptionLabelSelected = style({
  borderColor: vars.color.button,
  backgroundColor: vars.color.emphasis,
});
