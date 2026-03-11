import { createVar, keyframes, style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { gridCenter } from "@for-digital-divide/design-system/styles";
import { fullSize } from "@/style/Size.css";

export const layerColorsVar = createVar();

const screenBrighter = keyframes({
  "0%": {
    fill: "oklch(37.76% 0.012 264.08 / 0.4)",
    filter: "brightness(1.5)",
  },
  "85%": {
    fill: "oklch(95% 0 188)",
    filter: "brightness(1.05)",
  },
  "100%": {
    fill: "oklch(37.76% 0.012 264.08 / 0.4)",
    filter: "brightness(1.5)",
  },
});

export const loadingContainer = style([
  fullSize,
  gridCenter,
  {
    position: "absolute",
    top: 0,
    left: 0,
  },
]);

export const phone = recipe({
  base: {
    width: "fit-content",
    background: "transparent",
    display: "grid",
    selectors: {
      "&:focus:not(:focus-visible)": {
        outline: "none",
      },
      "&:hover::before": {
        backgroundPosition: "100% 100%",
        transform: "scale(1.08, 1.03)",
      },
    },
  },
  variants: {
    isOpen: {
      true: {
        cursor: "default",
      },
      false: {
        cursor: "pointer",
      },
    },
  },
});

export const icon = recipe({
  base: {
    height: "var(--intro-phone-height)",
    aspectRatio: "1 / 2",
    transition: "box-shadow 200ms ease-in-out",
    boxShadow: `
      inset -0.5rem -0.3rem 0.1rem 0.2rem oklch(81.43% 0 0),
      inset -0.7rem -0.7rem 0.1rem 0.2rem oklch(81.43% 0 0),
      inset -10rem -1rem 0 0.4rem oklch(81.43% 0 0),
      ${layerColorsVar},
      2.75rem 2.75rem 6rem 10px oklch(32.3% 0.002 247.36 / 0.75),
      1rem 1rem 5rem 20px oklch(32.3% 0.002 247.36 / 0.2)
    `,
  },

  variants: {
    isOpen: {
      true: { borderRadius: "0px" },
      false: { borderRadius: "17px" },
    },
  },

  defaultVariants: {
    isOpen: false,
  },
});

export const screen = recipe({
  variants: {
    isOpen: {
      true: {
        filter: "none",
        animation: "none",
      },
      false: {
        filter: "brightness(0.8)",
        animation: `${screenBrighter} 2s infinite ease`,
      },
    },
  },
  defaultVariants: {
    isOpen: false,
  },
});
