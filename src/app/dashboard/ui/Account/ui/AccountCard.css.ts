import { style } from "@vanilla-extract/css";
import { vars } from "@/style/theme.css";

export const accountHeader = style({
  userSelect: "none",
  display: "flex",
  justifyContent: "space-between",
});

export const accountName = style({
  fontSize: "1.2rem",
  fontWeight: 900,
});

export const accountNumber = style({
  fontSize: "0.75rem",
  fontWeight: 500,
  color: "#666",
});

export const hideNumberButton = style({
  height: "fit-content",
  fontSize: "0.75rem",
  fontWeight: 300,
  padding: "5px 8px",
  borderRadius: "8px",
  border: "1.5px solid oklch(76.64% 0.1304 292.01)",
  transition: "transform 0.2s ease-in-out",
  willChange: "transform",

  selectors: {
    "&:hover": {
      transform: "scale(1.1)",
      color: vars.color.accentForeground,
      fontWeight: 500,
    },
  },
});

export const accountBalanceContainer = style({
  display: "flex",
  alignItems: "flex-start",
  width: "100%",
  paddingTop: "2rem",
  paddingBottom: "1.25rem",
});

export const accountBalanceWrapper = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "0.5rem",
});

export const accountBalance = style({
  display: "flex",
  alignItems: "center",
  gap: "0.25rem",
});

export const transferButton = style({
  width: "100%",
  fontSize: "1rem",
  fontWeight: 300,
  padding: "0.75rem 1rem",
  borderRadius: "8px",
  color: "var(--foreground-primary)",
  backgroundColor:
    "color-mix(in oklch, #007bff 33%, oklch(76.64% 0.1304 292.01 / 14%))",
});

export const moreOptionsButton = style({
  display: "grid",
  placeItems: "center",
  width: "2rem",
  height: "100%",
  transition: "transform 0.2s ease-in-out",
  willChange: "transform",

  selectors: {
    "&:hover": {
      transform: "scale(1.1)",
      color: vars.color.accentForeground,
    },
  },
});
