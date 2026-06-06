import { vars } from "@for-digital-divide/design-system/styles";
import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const infoBox = recipe({
  base: {
    backdropFilter: `blur(${vars.surface.interactiveCard.backdropBlur})`,
    WebkitBackdropFilter: `blur(${vars.surface.interactiveCard.backdropBlur})`,
    boxShadow: `0 8px 16px 0 color-mix(in oklch, ${vars.color.primary}, transparent 95%)`,
    borderRadius: vars.surface.interactiveCard.radius, // 1rem
    padding: "4cqw",
    display: "flex",
    alignItems: "flex-start",
    gap: "3cqw",
    boxSizing: "border-box",
    width: "100%",
  },
  variants: {
    tone: {
      primary: {
        backgroundColor: `color-mix(in oklch, ${vars.color.button} 10%, transparent)`,
        border: `1px solid color-mix(in oklch, ${vars.color.button} 20%, transparent)`,
      },
      success: {
        backgroundColor: `color-mix(in oklch, ${vars.color.confirm} 10%, transparent)`,
        border: `1px solid color-mix(in oklch, ${vars.color.confirm} 20%, transparent)`,
      },
      destructive: {
        backgroundColor: `color-mix(in oklch, ${vars.color.destructive} 10%, transparent)`,
        border: `1px solid color-mix(in oklch, ${vars.color.destructive} 20%, transparent)`,
      },
      neutral: {
        backgroundColor: `color-mix(in oklch, ${vars.color.grid} 10%, transparent)`,
        border: `1px solid color-mix(in oklch, ${vars.color.grid} 20%, transparent)`,
      },
    },
  },
  defaultVariants: {
    tone: "primary",
  },
});

export const infoContent = style({
  display: "flex",
  flexDirection: "column",
  gap: "1.5cqw",
  width: "100%",
});

export const infoIcon = recipe({
  base: {
    fontSize: "18px",
    width: "18px",
    height: "18px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    lineHeight: 1,
    flexShrink: 0,
    marginTop: "2px",
  },
  variants: {
    tone: {
      primary: { color: vars.color.button },
      success: { color: vars.color.confirm },
      destructive: { color: vars.color.destructive },
      neutral: { color: vars.color.descriptionText },
    },
  },
  defaultVariants: {
    tone: "primary",
  },
});

export const infoIconWrapper = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "18px",
  height: "18px",
  flexShrink: 0,
  marginTop: "2px",
  color: "inherit",
});

export const infoTitle = style({
  fontFamily: "Manrope, sans-serif",
  fontSize: "clamp(14px, 4cqw, 16px)",
  fontWeight: 600,
  color: vars.color.text,
  margin: 0,
});

export const infoText = style({
  fontFamily: "Manrope, sans-serif",
  fontSize: "clamp(12px, 3.5cqw, 14px)",
  lineHeight: "1.4",
  fontWeight: 400,
  color: vars.color.descriptionText,
  margin: 0,
});
