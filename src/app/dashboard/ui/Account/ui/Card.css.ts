import { globalStyle, style } from "@vanilla-extract/css";

export const cardContentContainer = style({
  position: "relative",
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "1rem",
  zIndex: 2,
  boxShadow: "0 8px 16px rgba(0, 0, 0, 0.12)",
  backdropFilter: "blur(10px)",
  padding: "2px",
  background: "rgba(255, 255, 255, 0.15)",
  transition: "box-shadow 300ms ease, transform 100ms ease",
  "@media": {
    "screen and (max-width: 320px)": {
      width: "120px",
    },
  },
  selectors: {
    "&:hover": {
      boxShadow: "var(--long-shadow)",
      outline:
        "4px solid color-mix(in oklch, oklch(63.93% 0.206 288.34) 15%, transparent)",
    },
  },
});

export const cardContent = style({
  pointerEvents: "auto",
  display: "grid",
  alignItems: "center",
  color:
    "color-mix(in oklch, oklch(63.93% 0.206 288.34) 90%, oklch(0.7 0.1825 239.69) 20%)",
  width: "100%",
  height: "100%",
  padding: "1rem",
  transition: "background 350ms ease",
  touchAction: "manipulation",
  animation: "fadeIn 500ms ease-in-out",
});

export const rootContainer = style({
  position: "relative",
  width: "100%",
  height: "100%",
  userSelect: "none",
});

export const smallCard = style({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  borderRadius: "1rem",
  zIndex: 1,
  backgroundImage:
    "radial-gradient(300px circle at var(--mx, 0px) var(--my, 0px), var(--color-background), color-mix(in oklch, oklch(63.93% 0.206 288.34) 28%, transparent 30%))",
  opacity: 0.5,
  selectors: {
    "&:hover": {
      opacity: 1,
    },
  },
});

export const hoveringText = style({
  position: "absolute",
  left: "50%",
  transform: "translateX(-50%)",
  transition: "opacity 300ms ease",
  background:
    "linear-gradient(to bottom, color-mix(in oklch, oklch(63.93% 0.206 288.34), transparent 15%), transparent)",
  color: "var(--color-text)",
  textShadow: "0 0 5px white",
  padding: "0.25rem 1rem",
  marginTop: "0.35rem",
  borderRadius: "1rem",
  width: "max-content",
  fontSize: "1rem",
  opacity: 0,
});

globalStyle(`${cardContentContainer}:hover ~ ${hoveringText}`, {
  opacity: 1,
});
