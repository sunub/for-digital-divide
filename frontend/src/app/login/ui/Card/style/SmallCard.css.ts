import { recipe } from "@vanilla-extract/recipes";

export const smallCard = recipe({
  base: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100px",
    height: "116px",
    borderRadius: "1rem",
    zIndex: 1,
    opacity: 0.5,
    transition: "opacity 300ms ease",
    selectors: {
      "&:hover": {
        opacity: 1,
      },
    },
  },
  variants: {
    hasDeviceId: {
      true: {
        backgroundImage: `radial-gradient(
          300px circle at var(--mx, 0px) var(--my, 0px),
          var(--color-background),
          color-mix(in oklch, oklch(63.93% 0.206 288.34) 70%, transparent 30%)
        )`,
      },
      false: {
        backgroundImage: `radial-gradient(
          300px circle at var(--mx, 0px) var(--my, 0px),
          var(--foreground-destructive),
          color-mix(in oklch, oklch(63.93% 0.206 288.34) 70%, transparent 30%)
        )`,
      },
    },
  },
});
