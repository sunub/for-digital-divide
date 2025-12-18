import { globalStyle, style } from "@vanilla-extract/css";

export const iconContainer = style({
  transition: "transform 0.3s ease-in-out, opacity 0.3s ease-in-out",
  willChange: "transform, opacity",
  opacity: 0.3,
});

globalStyle(`${iconContainer}:hover`, {
  transform: "translateY(4px) scale(1.1)",
  opacity: 1,
});

globalStyle(`${iconContainer}:focus`, {
  transform: "translateY(4px) scale(1.1)",
  opacity: 1,
});

// export const inputContainer = style({
//   selectors: {
//     [`&:hover ${iconContainer}:not(:hover)`]: {
//       transform: "translateY(4px) scale(1.1)",
//       opacity: 1,
//     },
//     [`&:focus-within ${iconContainer}:not(:focus)`]: {
//       transform: "translateY(4px) scale(1.1)",
//       opacity: 1,
//     },
//   },
// });
