import { keyframes, style } from "@vanilla-extract/css";
import { vars } from "../tokens/theme.css";

export const pulseGlowAnimation = keyframes({
  "0%": {
    boxShadow: `0 0 0 0px color-mix(in srgb, ${vars.color.button} 30%, transparent), 
                0 0 0 0px color-mix(in srgb, ${vars.color.emphasis} 15%, transparent),
                0 0 0 0px transparent`,
  },
  "50%": {
    boxShadow: `0 0 0 3px color-mix(in srgb, ${vars.color.button} 85%, transparent), 
                0 0 14px 6px color-mix(in srgb, ${vars.color.emphasis} 80%, transparent),
                0 0 28px 12px color-mix(in srgb, ${vars.color.button} 45%, transparent)`,
  },
  "100%": {
    boxShadow: `0 0 0 0px color-mix(in srgb, ${vars.color.button} 30%, transparent), 
                0 0 0 0px color-mix(in srgb, ${vars.color.emphasis} 15%, transparent),
                0 0 0 0px transparent`,
  },
});

export const actionNextStepGlow = style({
  animation: `${pulseGlowAnimation} 2s infinite cubic-bezier(0.4, 0, 0.2, 1)`,
  transition: "all 0.3s ease",
  willChange: "box-shadow",

  selectors: {
    "&:hover, &:focus-within": {
      animation: "none",
      boxShadow: `0 0 0 4px color-mix(in srgb, ${vars.color.button} 95%, transparent), 
                  0 0 20px 8px color-mix(in srgb, ${vars.color.emphasis} 90%, transparent),
                  0 0 36px 16px color-mix(in srgb, ${vars.color.button} 55%, transparent) !important`,
    },
  },
});
