import { vars } from "@internal/design-system/style";
import { globalStyle, keyframes } from "@vanilla-extract/css";
import { appStyle } from "@/style/utils";

export const title = appStyle({
  fontFamily: "var(--gugi-font-family)",
  willChange: "transform",
});

export const panelContainer = appStyle({
  gap: vars.space[6],
  padding: vars.space[6],
  maxWidth: "80%",
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

globalStyle(`${title} > svg`, {
  "@layer": {
    app: {
      transform: "scale(1.25) rotate(-90deg)",
    },
  },
});

const pulseSoftKeyframes = keyframes({
  "0%, 100%": { opacity: 1, transform: "scale(1)" },
  "50%": { opacity: 0.8, transform: "scale(0.96)" },
});

export const pulseCircle = appStyle({
  width: "128px",
  height: "128px",
  borderRadius: vars.borderRadius.full,
  backgroundColor: "rgba(108, 62, 198, 0.05)",
  position: "relative",
  animation: `${pulseSoftKeyframes} 3s ease-in-out infinite`,
});

export const dashedBorder = appStyle({
  position: "absolute",
  inset: 0,
  border: `2px dashed rgba(108, 62, 198, 0.2)`,
  borderRadius: vars.borderRadius.full,
});

export const secureBadge = appStyle({
  backgroundColor: vars.color.deviceOutline,
  borderRadius: vars.borderRadius.full,
});

export const secureBadgeText = appStyle({
  fontSize: "11px",
  fontWeight: "600",
  color: vars.color.button,
  textTransform: "uppercase",
  letterSpacing: "0.05em",
});

export const featureCard = appStyle({
  borderRadius: vars.borderRadius.md,
  backgroundColor: vars.color.white,
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
  border: `1px solid rgba(0, 0, 0, 0.05)`,
  boxSizing: "border-box",
});

export const featureText = appStyle({
  fontSize: "13px",
  fontWeight: "600",
  color: vars.color.text,
});

export const phoneContentLayout = appStyle({
  paddingTop: "48px",
  boxSizing: "border-box",
});

export const phoneTitle = appStyle({
  fontSize: "28px",
  fontWeight: "700",
  lineHeight: "1.25",
  color: vars.color.button,
  letterSpacing: "-0.01em",
  textAlign: "left",
});

export const phoneSubtitle = appStyle({
  fontSize: "14px",
  fontWeight: "400",
  lineHeight: "1.5",
  color: vars.color.descriptionText,
  textAlign: "left",
  marginTop: vars.space[2],
});

export const secondaryButton = appStyle({
  width: "100%",
  minHeight: vars.buttonPrimitive.height.lg,
  color: vars.color.descriptionText,
  fontWeight: vars.fontWeight.medium,
  fontSize: vars.buttonPrimitive.fontSize.sm,
  textAlign: "center",
  borderRadius: vars.buttonPrimitive.radius.md,
  padding: `${vars.space[1]} 0`,
  selectors: {
    "&:hover": {
      color: vars.color.button,
    },
    "&:focus-visible": {
      color: vars.color.button,
    },
  },
});
