import { style } from "@vanilla-extract/css";

export const mockAccountList = style({
  listStyle: "none",
  padding: 0,
  margin: 0,
  display: "flex",
  flexDirection: "column",
  gap: "var(--space-2)",
});

export const mockAccountItem = style({
  padding: "var(--space-4)",
  backgroundColor: "var(--color-card)",
  border: "1px solid var(--color-border)",
  borderRadius: "var(--radius-md)",
  width: "100%",
  justifyContent: "flex-start",
  textAlign: "left",
});

export const directInputButton = style({
  padding: "var(--space-4)",
  border: "1px solid var(--color-border)",
  borderRadius: "var(--radius-md)",
  backgroundColor: "var(--color-background)",
  textAlign: "left",
  width: "100%",
  justifyContent: "flex-start",
});
