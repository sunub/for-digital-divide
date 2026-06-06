import { style } from "@vanilla-extract/css";

export const rootContainer = style({
  position: "relative",
  width: "100px",
  height: "100px",
});

export const wrapper = style({
  position: "relative",
  width: "100px",
  height: "116px",
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
    "&:active": {
      transform: "scale(0.9)",
    },
  },
});

export const linkWrapper = style({
  color:
    "color-mix(in oklch, oklch(63.93% 0.206 288.34) 90%, oklch(0.7 0.1825 239.69) 20%)",
  height: "100%",
  padding: "1rem",
  transition: "background 350ms ease",
  touchAction: "manipulation",
});

export const smallCard = style({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100px",
  height: "116px",
  borderRadius: "1rem",
  zIndex: 1,
  backgroundImage:
    "radial-gradient(300px circle at var(--mx, 0px) var(--my, 0px), var(--color-background), color-mix(in oklch, oklch(63.93% 0.206 288.34) 70%, transparent 30%))",
  opacity: 0.5,
  selectors: {
    "&:hover": {
      opacity: 1,
    },
  },
});

export const pendingIndicator = style({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100px",
  height: "116px",
  borderRadius: "1rem",
  background:
    "radial-gradient(closest-side, oklch(63.93% 0.206 288.34 / 90%), transparent) no-repeat center",
  animation: "radialPending 1.5s ease-out infinite",
  zIndex: 3,
});
