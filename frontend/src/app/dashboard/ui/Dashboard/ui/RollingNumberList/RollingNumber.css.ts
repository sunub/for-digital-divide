import { createVar, fallbackVar, style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

const HEIGHT = 37;
export const translateYValueVar = createVar();
export const rollingNumberFontsizeVar = createVar();

export const wrapper = style({
  display: "flex",
  height: HEIGHT,
  overflow: "hidden",
  justifyContent: "flex-end",
});

export const number = style({
  lineHeight: `${HEIGHT}px`,
  height: HEIGHT,
});

export const rollingNumberWrapper = style({
  transform: translateYValueVar,
  transition: "transform 2s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
  fontSize: fallbackVar(rollingNumberFontsizeVar, "2rem"),
});

export const divider = recipe({
  base: {
    lineHeight: `${HEIGHT}px`,
    height: HEIGHT,
    transition: "opacity 0.5s ease-in-out",
    fontSize: fallbackVar(rollingNumberFontsizeVar, "2rem"),
  },
  variants: {
    isValid: {
      true: { opacity: 1 },
      false: { opacity: 0 },
    },
  },
});
