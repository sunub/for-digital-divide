import { vars } from "@for-digital-divide/design-system/styles";
import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const badge = recipe({
  base: {
    display: "inline-flex",
    alignItems: "center",
    gap: vars.space[2], // 8px
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    padding: `${vars.space[2]} ${vars.space[4]}`, // 8px 16px
    borderRadius: "9999px",
    boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    width: "fit-content",
    boxSizing: "border-box",
  },
  variants: {
    tone: {
      primary: {
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        border: "1px solid rgba(255, 255, 255, 0.6)",
        color: vars.color.button,
      },
      success: {
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        border: "1px solid rgba(255, 255, 255, 0.6)",
        color: vars.color.confirm,
      },
      destructive: {
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        border: "1px solid rgba(255, 255, 255, 0.6)",
        color: vars.color.destructive,
      },
      neutral: {
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        border: "1px solid rgba(255, 255, 255, 0.6)",
        color: vars.color.descriptionText,
      },
    },
  },
  defaultVariants: {
    tone: "primary",
  },
});

export const badgeIcon = style({
  fontSize: "18px",
  width: "18px",
  height: "18px",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  lineHeight: 1,
  flexShrink: 0,
  color: "inherit",
});

export const badgeIconWrapper = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "18px",
  height: "18px",
  flexShrink: 0,
  color: "inherit",
});

export const badgeText = style({
  fontFamily: "Manrope, sans-serif",
  fontSize: "14px",
  fontWeight: 600,
  letterSpacing: "0.01em",
  color: "inherit",
  lineHeight: 1,
});
