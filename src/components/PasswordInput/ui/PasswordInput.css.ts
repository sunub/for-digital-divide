import { recipe } from "@vanilla-extract/recipes";

export const passwordVisibilityIconButton = recipe({
  base: {
    position: "absolute",
    right: "1rem",
    transition: "opacity 300ms ease-in-out",
  },
  variants: {
    isFocused: {
      true: { visibility: "visible", opacity: 1 },
      false: { visibility: "hidden", opacity: 0 },
    },
  },
  defaultVariants: {
    isFocused: false,
  },
});
