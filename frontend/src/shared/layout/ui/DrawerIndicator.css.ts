import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const container = recipe({
  base: {
    position: "absolute",
    bottom: "2.5rem",

    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    color: "oklch(63.93% 0.206 288.34)",
    pointerEvents: "none",
    userSelect: "none",
  },
  variants: {
    isDrawer: {
      true: {
        opacity: 0,
        visibility: "hidden",
      },
      false: {
        opacity: 1,
        visibility: "visible",
      },
    },
  },
});

export const svgContainer = style({
  animation: "upAndDown 1.5s ease-in-out infinite",
});
