import { globalStyle, style } from "@vanilla-extract/css";

export const iconContainer = style({
  gap: "0.5rem",
  color: "var(--color-button)",
  transition: "transform 0.3s ease-in-out, opacity 0.3s ease-in-out",
  willChange: "transform, opacity",
  opacity: 0.3,
  paddingBottom: "0.5rem",
});

export const inputContainer = style({});

globalStyle(`${inputContainer}:hover .${iconContainer}:not(:hover)`, {
  transform: "translateY(4px) scale(1.1)",
  opacity: 1,
});

globalStyle(`${inputContainer}:focus-within .${iconContainer}:not(:focus)`, {
  transform: "translateY(4px) scale(1.1)",
  opacity: 1,
});
