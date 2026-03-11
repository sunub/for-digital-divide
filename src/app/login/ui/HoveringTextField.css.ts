import { globalStyle } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const hoveringText = recipe({
  base: {
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)",
    transition: "opacity 300ms ease",
    color: "var(--color-text)",
    textShadow: "0 0 5px white",
    padding: "0.25rem .5rem",
    marginTop: "1rem",
    borderRadius: "1rem",
    width: "36px",
    height: "4px",
    background: "transparent",
    opacity: 0,
    pointerEvents: "none",
  },
  variants: {
    hasDeviceId: {
      true: {
        background:
          "linear-gradient(to bottom, oklch(63.93% 0.206 288.34), transparent)",
      },
      false: {
        background:
          "linear-gradient(to bottom, var(--foreground-destructive), transparent)",
      },
    },
  },
  defaultVariants: {
    hasDeviceId: false,
  },
});

globalStyle(`.card-link-wrapper:hover ${hoveringText.classNames.base}`, {
  opacity: 1,
});
