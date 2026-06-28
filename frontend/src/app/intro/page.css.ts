import { vars } from "@internal/design-system/style";
import { globalStyle, keyframes } from "@vanilla-extract/css";
import { appStyle } from "@/style/utils";

// --- IntroGuide Styles (Migrated from PhoneVerificationGuide) ---

export const guideBadge = appStyle({
  backgroundColor: "#ffffff",
  boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.05)",
  color: vars.color.button,
  borderRadius: "9999px",
  fontWeight: vars.fontWeight.semibold,
  fontSize: "14px",
  lineHeight: "20px",
  "@media": {
    "screen and (max-width: 1023px)": {
      margin: "0 auto",
    },
  },
});

export const guideTitle = appStyle({
  fontSize: "48px",
  lineHeight: "56px",
  fontWeight: vars.fontWeight.bold,
  letterSpacing: "-0.02em",
  color: "#1a1c1c", // onSurface
  margin: 0,
});

export const guideTitleHighlight = appStyle({
  color: vars.color.button, // brandViolet
});

export const guideInfoGrid = appStyle({
  maxWidth: "500px",
  margin: "0 auto",
  width: "100%",
  textAlign: "left",
  marginTop: vars.space[2],
  "@media": {
    "screen and (min-width: 1024px)": {
      margin: "0",
    },
  },
});

export const guideInfoBox = appStyle({
  backgroundColor: "#ffffff",
  borderRadius: "16px",
  boxShadow: "0px 4px 20px rgba(147, 103, 239, 0.08)",
  border: `1px solid color-mix(in srgb, #e2e2e2 50%, transparent)`,
});

export const guideInfoIconContainer = appStyle({
  backgroundColor: "#f4effe",
  color: vars.color.button, // brandViolet
  borderRadius: "12px",
});

export const guideInfoTitle = appStyle({
  fontSize: "16px",
  fontWeight: vars.fontWeight.bold,
  color: "#1a1c1c",
  marginBottom: vars.space[1],
});

export const guideInfoDescription = appStyle({
  fontSize: "14px",
  fontWeight: vars.fontWeight.medium,
  color: "#4a4453",
  lineHeight: "20px",
});

export const guideSectionContainer = appStyle({
  maxWidth: "500px",
  margin: "0 auto",
  width: "100%",
  textAlign: "left",
  marginTop: vars.space[2],
  "@media": {
    "screen and (min-width: 1024px)": {
      margin: "0",
    },
  },
});

export const guideSectionTitle = appStyle({
  fontSize: "16px",
  fontWeight: vars.fontWeight.bold,
  color: "#1a1c1c",
  margin: 0,
});

export const guideStepList = appStyle({
  padding: 0,
  margin: 0,
  listStyle: "none",
});

export const guideStepItem = appStyle({
  fontSize: "14px",
  lineHeight: "20px",
  color: "#4a4453",
});

export const guideStepNumber = appStyle({
  minWidth: "20px",
  height: "20px",
  borderRadius: "50%",
  backgroundColor: "#f4effe",
  color: vars.color.button,
  fontSize: "12px",
  fontWeight: vars.fontWeight.bold,
  flexShrink: 0,
});

export const guidePanelContainer = appStyle({
  maxWidth: "80%",
  justifySelf: "flex-end",
  maxHeight: "100vh",
  overflowY: "auto",
  boxSizing: "border-box",
  textAlign: "center",
  "@media": {
    "screen and (min-width: 1024px)": {
      textAlign: "left",
      paddingRight: vars.space[8],
    },
  },
});

// --- Phone Frame Styles ---

export const title = appStyle({
  fontFamily: "var(--gugi-font-family)",
  willChange: "transform",
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
