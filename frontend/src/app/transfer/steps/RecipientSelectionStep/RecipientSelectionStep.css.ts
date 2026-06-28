import { style, styleVariants } from "@vanilla-extract/css";

export const directInputButton = style({
  padding: "var(--space-4)",
  backgroundColor: "var(--color-card)",
  border: "1px solid color-mix(in srgb, var(--color-border) 30%, transparent)",
  borderRadius: "var(--radius-md)",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  marginTop: "var(--space-2)",
  transition: "border-color 0.2s, background-color 0.2s",
  ":hover": {
    borderColor: "var(--color-primary)",
  },
});

export const chevronIcon = style({
  color: "var(--color-border)",
  fontSize: "24px",
});

export const mockAccountList = style({
  listStyle: "none",
  padding: 0,
  margin: 0,
  display: "flex",
  flexDirection: "column",
  gap: "var(--space-1)", // 4px
});

export const mockAccountItem = style({
  display: "flex",
  alignItems: "center",
  gap: "var(--space-4)",
  padding: "var(--space-4)",
  borderRadius: "var(--radius-md)",
  width: "100%",
  textAlign: "left",
  transition: "background-color 0.2s, transform 0.2s",
  ":hover": {
    backgroundColor:
      "color-mix(in srgb, var(--color-foreground) 5%, transparent)",
  },
});

export const avatarContainer = style({
  width: "48px",
  height: "48px",
  borderRadius: "9999px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  transition: "transform 0.2s",
  selectors: {
    [`${mockAccountItem}:hover &`]: {
      transform: "scale(1.05)",
    },
  },
});

export const avatarVariants = styleVariants({
  hana: {
    backgroundColor: "rgba(0, 149, 145, 0.1)",
    color: "#009591",
  },
  kb: {
    backgroundColor: "rgba(255, 204, 0, 0.1)",
    color: "#7b5500",
  },
  ibk: {
    backgroundColor: "rgba(0, 91, 170, 0.1)",
    color: "#005baa",
  },
  default: {
    backgroundColor:
      "color-mix(in srgb, var(--color-primary) 10%, transparent)",
    color: "var(--color-primary)",
  },
});

export const textLabelContainer = style({
  display: "flex",
  flexDirection: "column",
  flex: 1,
  gap: "2px",
});
