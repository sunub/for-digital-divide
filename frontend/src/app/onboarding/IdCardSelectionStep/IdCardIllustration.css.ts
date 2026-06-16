import { vars } from "@internal/design-system/tokens";
import { style } from "@vanilla-extract/css";

const brandViolet = "#9367ef";
const brandVioletLight = "#f4effe";

export const wrapper = style({
  display: "flex",
  justifyContent: "center",
  marginBottom: vars.space[8],
  marginTop: vars.space[4],
});

export const card = style({
  width: "220px",
  height: "140px",
  backgroundColor: brandVioletLight,
  borderRadius: "16px",
  border: `1px solid color-mix(in srgb, ${brandViolet} 20%, transparent)`,
  position: "relative",
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
  padding: "20px",
  boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
});

export const row = style({
  display: "flex",
  gap: vars.space[4],
});

export const avatar = style({
  width: "48px",
  height: "64px",
  backgroundColor: `color-mix(in srgb, ${brandViolet} 20%, transparent)`,
  borderRadius: "8px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
});

export const avatarIcon = style({
  color: brandViolet,
});

export const lines = style({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  marginTop: "4px",
});

export const line = style({
  height: "10px",
  borderRadius: "9999px",
  backgroundColor: `color-mix(in srgb, ${brandViolet} 20%, transparent)`,
});

export const lineStrong = style({
  backgroundColor: `color-mix(in srgb, ${brandViolet} 30%, transparent)`,
});

export const lineFull = style({
  width: "100%",
});

export const lineTwoThirds = style({
  width: "66.666667%",
});

export const lineFourFifths = style({
  width: "80%",
});

export const chipRow = style({
  position: "absolute",
  bottom: "20px",
  right: "20px",
  display: "flex",
  gap: "8px",
});

export const chipCircle = style({
  width: "24px",
  height: "24px",
  backgroundColor: `color-mix(in srgb, ${brandViolet} 10%, transparent)`,
  borderRadius: "9999px",
  border: `1px solid color-mix(in srgb, ${brandViolet} 30%, transparent)`,
});

export const chipRect = style({
  width: "48px",
  height: "24px",
  backgroundColor: `color-mix(in srgb, ${brandViolet} 20%, transparent)`,
  borderRadius: "6px",
});

export const glow = style({
  position: "absolute",
  top: 0,
  right: 0,
  width: "96px",
  height: "96px",
  backgroundColor: `color-mix(in srgb, ${brandViolet} 5%, transparent)`,
  borderRadius: "9999px",
  filter: "blur(24px)",
  transform: "translate(50%, -50%)",
});
