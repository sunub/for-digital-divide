import { vars } from "@internal/design-system/tokens";
import { style } from "@vanilla-extract/css";

const brandViolet = "#9367ef";
const brandVioletLight = "#f4effe";
const surfaceContainerLowest = "#ffffff";
const onSurface = "#1a1c1c";
const onSurfaceVariant = "#4a4453";
const surfaceVariant = "#e2e2e2";

export const panelContainer = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space[6],
  padding: vars.space[6],
  maxWidth: "600px",
  width: "100%",
  justifySelf: "flex-end",
  textAlign: "center",
  maxHeight: "100vh",
  overflowY: "auto",
  boxSizing: "border-box",
  "@media": {
    "screen and (min-width: 1024px)": {
      textAlign: "left",
      paddingRight: vars.space[8],
    },
  },
});

export const badge = style({
  display: "inline-flex",
  alignItems: "center",
  gap: vars.space[2],
  backgroundColor: surfaceContainerLowest,
  boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.05)",
  color: brandViolet,
  padding: `${vars.space[2]} ${vars.space[4]}`,
  borderRadius: "9999px",
  width: "fit-content",
  fontWeight: vars.fontWeight.semibold,
  fontSize: "14px",
  lineHeight: "20px",
  margin: "0 auto",
  "@media": {
    "screen and (min-width: 1024px)": {
      margin: "0",
    },
  },
});

export const title = style({
  fontSize: "48px",
  lineHeight: "56px",
  fontWeight: vars.fontWeight.bold,
  letterSpacing: "-0.02em",
  color: onSurface,
  margin: 0,
});

export const titleHighlight = style({
  color: brandViolet,
});

export const description = style({
  fontSize: "18px",
  lineHeight: "28px",
  fontWeight: vars.fontWeight.normal,
  color: onSurfaceVariant,
  maxWidth: "480px",
  margin: "0 auto",
  "@media": {
    "screen and (min-width: 1024px)": {
      margin: "0",
    },
  },
});

export const infoGrid = style({
  marginTop: vars.space[6],
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: vars.space[4],
  maxWidth: "500px",
  margin: "0 auto",
  "@media": {
    "screen and (min-width: 640px)": {
      gridTemplateColumns: "repeat(2, 1fr)",
    },
    "screen and (min-width: 1024px)": {
      margin: "0",
    },
  },
});

export const infoBox = style({
  backgroundColor: surfaceContainerLowest,
  padding: vars.space[4],
  borderRadius: "16px",
  boxShadow: "0px 4px 20px rgba(147, 103, 239, 0.08)",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: vars.space[4],
  border: `1px solid color-mix(in srgb, ${surfaceVariant} 50%, transparent)`,
});

export const infoIconContainer = style({
  backgroundColor: brandVioletLight,
  color: brandViolet,
  padding: vars.space[2],
  borderRadius: "12px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const infoTitle = style({
  fontSize: "14px",
  fontWeight: vars.fontWeight.semibold,
  color: onSurface,
  marginBottom: vars.space[1],
});

export const infoDescription = style({
  fontSize: "12px",
  fontWeight: vars.fontWeight.medium,
  color: onSurfaceVariant,
  lineHeight: "16px",
});
