import { vars } from "@internal/design-system/tokens";
import { style } from "@vanilla-extract/css";

const emphasisTint = `color-mix(in oklch, ${vars.color.button} 10%, ${vars.color.white})`;
const subtleBorder = `color-mix(in oklch, ${vars.color.border} 32%, transparent)`;
const softShadow = `0px 4px 20px color-mix(in oklch, ${vars.color.button} 10%, transparent)`;
const warningSurface = `color-mix(in oklch, ${vars.color.destructive} 18%, ${vars.color.white})`;

export const panelContainer = style({
  gap: vars.space[6],
  padding: vars.space[6],
  maxWidth: "80%",
  width: vars.layout.full,
  justifySelf: "flex-end",
  textAlign: "center",
  maxHeight: vars.layout.fullVh,
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
  backgroundColor: vars.color.white,
  boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.05)",
  color: vars.color.button,
  padding: `${vars.space[2]} ${vars.space[4]}`,
  borderRadius: vars.borderRadius.full,
  width: "fit-content",
  fontWeight: vars.fontWeight.semibold,
  fontSize: vars.fontSize["0.95rem"],
  lineHeight: vars.space[5],
  margin: "0 auto",
  "@media": {
    "screen and (min-width: 1024px)": {
      margin: "0",
    },
  },
});

export const title = style({
  fontSize: vars.fontSize["3rem"],
  lineHeight: vars.space[14],
  fontWeight: vars.fontWeight.bold,
  letterSpacing: "-0.02em",
  color: vars.color.text,
  margin: 0,
});

export const titleHighlight = style({
  color: vars.color.button,
});

export const description = style({
  fontSize: vars.fontSize["1rem"],
  lineHeight: vars.space[6],
  fontWeight: vars.fontWeight.normal,
  color: vars.color.descriptionText,
  maxWidth: "480px",
  margin: "0 auto",
  "@media": {
    "screen and (min-width: 1024px)": {
      margin: "0",
    },
  },
});

export const infoGrid = style({
  marginTop: vars.space[2],
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: vars.space[4],
  maxWidth: "500px",
  margin: "0 auto",
  textAlign: "left",
  "@media": {
    "screen and (min-width: 1024px)": {
      margin: "0",
    },
  },
});

export const infoBox = style({
  backgroundColor: vars.color.white,
  padding: vars.space[4],
  borderRadius: vars.borderRadius.md,
  boxShadow: softShadow,
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: vars.space[3],
  border: `${vars.space.px} solid ${subtleBorder}`,
});

export const infoIconContainer = style({
  backgroundColor: emphasisTint,
  color: vars.color.button,
  padding: vars.space[2],
  borderRadius: vars.borderRadius.sm,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const infoTitle = style({
  fontSize: vars.fontSize["1rem"],
  fontWeight: vars.fontWeight.bold,
  color: vars.color.text,
  marginBottom: vars.space[1],
});

export const infoDescription = style({
  fontSize: vars.fontSize["0.95rem"],
  fontWeight: vars.fontWeight.medium,
  color: vars.color.descriptionText,
  lineHeight: vars.space[5],
});

export const sectionContainer = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space[3],
  marginTop: vars.space[2],
  textAlign: "left",
  maxWidth: "500px",
  margin: "0 auto",
  width: vars.layout.full,
  "@media": {
    "screen and (min-width: 1024px)": {
      margin: "0",
    },
  },
});

export const sectionTitle = style({
  fontSize: vars.fontSize["1rem"],
  fontWeight: vars.fontWeight.bold,
  color: vars.color.text,
  display: "flex",
  alignItems: "center",
  gap: vars.space[2],
  margin: 0,
});

export const stepList = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space[2],
  padding: 0,
  margin: 0,
  listStyle: "none",
});

export const stepItem = style({
  display: "flex",
  alignItems: "flex-start",
  gap: vars.space[2],
  fontSize: vars.fontSize["0.95rem"],
  lineHeight: vars.space[5],
  color: vars.color.descriptionText,
});

export const stepNumber = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minWidth: vars.space[5],
  height: vars.space[5],
  borderRadius: vars.borderRadius.full,
  backgroundColor: emphasisTint,
  color: vars.color.button,
  fontSize: vars.fontSize["0.75rem"],
  fontWeight: vars.fontWeight.bold,
  flexShrink: 0,
});

export const warningList = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space[2],
  padding: vars.space[4],
  margin: 0,
  listStyle: "none",
  backgroundColor: warningSurface,
  borderRadius: vars.borderRadius.sm,
});

export const warningItem = style({
  display: "flex",
  alignItems: "flex-start",
  gap: vars.space[2],
  fontSize: vars.fontSize["0.75rem"],
  lineHeight: vars.space[4],
  color: vars.color.destructive,
});
