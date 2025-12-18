import { keyframes, style } from "@vanilla-extract/css";

const panAnimation = keyframes({
  "0%": { backgroundPosition: "0% 0%" },
  "100%": { backgroundPosition: "100% 100%" },
});

export const container = style({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100dvw",
  height: "100dvh",
  backgroundImage:
    "radial-gradient(circle, oklch(88.45% 0.059 18.33), oklch(71.42% 0.059 18.33))",
  zIndex: 50,
});

export const patternWrapper = style({
  backgroundColor: "#fecaca",
  backgroundImage: 'url("/error_page.svg")',
  backgroundSize: "10%",
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  animation: `${panAnimation} 20s linear infinite`,
});

export const card = style({
  backgroundColor: "#f1f5f9",
  padding: "3rem",
  display: "flex",
  flexDirection: "column",
  borderRadius: "0.75rem",
  justifyContent: "center",
  width: "100%",
  height: "fit-content",
  maxWidth: "600px",
});

export const heading = style({
  fontSize: "1.5rem",
  fontWeight: "bold",
  lineHeight: 1.625,
});

export const detailsContainer = style({
  marginTop: "1.25rem",
  marginBottom: "2.5rem",
});

export const codeBlock = style({
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  width: "100%",
  fontFamily: "monospace",
});

export const buttonGroup = style({
  display: "flex",
  flexDirection: "row",
  gap: "0.5rem",
});
