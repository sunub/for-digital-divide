import { vars } from "@internal/design-system/style";
import { style } from "@vanilla-extract/css";

export const certButton = style({
  border: "1px solid rgba(0, 0, 0, 0.08)",
  cursor: "pointer",
  textAlign: "left",
  minHeight: "80px",
});

export const methodRow = style({
  border: "1px solid rgba(0, 0, 0, 0.08)",
  cursor: "pointer",
  transition: "all 0.2s ease",
  boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.05)",
  selectors: {
    "&:hover": {
      borderColor: vars.color.button,
      backgroundColor: "rgba(108, 62, 198, 0.02)",
      boxShadow: "0px 4px 12px rgba(108, 62, 198, 0.05)",
    },
    "&:active": {
      transform: "scale(0.99)",
    },
  },
});
