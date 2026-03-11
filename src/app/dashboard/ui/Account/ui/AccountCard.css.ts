import { style } from "@vanilla-extract/css";
import { vars } from "@for-digital-divide/design-system/styles";

export const accountHeader = style({
  userSelect: "none",
});

export const accountNumber = style({
  color: vars.color.thumb,
});

export const hideNumberButton = style({
  fontWeight: vars.fontWeight.normal,
  borderRadius: vars.buttonPrimitive.radius.sm,
  border: `${vars.space[0.5]} solid ${vars.color.drawer}`,
  transition: "transform 0.2s ease-in-out",
  willChange: "transform",

  selectors: {
    "&:hover": {
      transform: "scale(1.1)",
      color: vars.color.accentForeground,
      fontWeight: vars.fontWeight.medium,
    },
  },
});

export const accountBalance = style({
  minHeight: vars.buttonPrimitive.height.md,
});

export const transferButton = style({
  width: "100%",
  fontWeight: vars.fontWeight.normal,
  borderRadius: vars.buttonPrimitive.radius.sm,
  backgroundColor:
    "color-mix(in oklch, #007bff 33%, oklch(76.64% 0.1304 292.01 / 14%))",
});

export const moreOptionsButton = style({
  transition: "transform 0.2s ease-in-out",
  willChange: "transform",

  selectors: {
    "&:hover": {
      transform: "scale(1.1)",
      color: vars.color.accentForeground,
    },
  },
});
