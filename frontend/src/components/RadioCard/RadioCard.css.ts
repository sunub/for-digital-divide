import { vars } from "@internal/design-system/tokens";
import { style } from "@vanilla-extract/css";

const brandViolet = "#9367ef";
const brandVioletLight = "#f4effe";
const outlineVariant = "#ccc3d6";
const surfaceContainerLowest = "#ffffff";
const onSurface = "#1a1c1c";

export const visuallyHidden = style({
  position: "absolute",
  width: "1px",
  height: "1px",
  padding: 0,
  margin: "-1px",
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  border: 0,
});

export const labelContainer = style({
  display: "block",
  position: "relative",
  width: "100%",
  cursor: "pointer",
});

export const labelDisabled = style({
  cursor: "not-allowed",
});

export const card = style({
  width: "100%",
  padding: vars.space[6],
  borderRadius: "12px",
  border: `1px solid ${outlineVariant}`,
  backgroundColor: surfaceContainerLowest,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  transition: "all 0.2s ease",
  selectors: {
    [`${labelContainer}:hover &`]: {
      borderColor: `color-mix(in srgb, ${brandViolet} 50%, transparent)`,
    },
    [`${visuallyHidden}:focus-visible + &`]: {
      outline: `2px solid ${brandViolet}`,
      outlineOffset: "2px",
    },
    [`${visuallyHidden}:checked + &`]: {
      borderColor: brandViolet,
      backgroundColor: `color-mix(in srgb, ${brandVioletLight} 50%, transparent)`,
    },
    [`${visuallyHidden}:disabled + &`]: {
      opacity: 0.6,
    },
    [`${labelDisabled}:hover &`]: {
      borderColor: outlineVariant,
    },
  },
});

export const text = style({
  display: "inline-flex",
  alignItems: "center",
  color: onSurface,
  fontWeight: vars.fontWeight.medium,
  lineHeight: "24px",
  fontSize: "16px",
});

export const indicator = style({
  position: "relative",
  width: "24px",
  height: "24px",
  borderRadius: "50%",
  border: `2px solid ${outlineVariant}`,
  flexShrink: 0,
  transition: "border-color 0.2s ease, background-color 0.2s ease",
  selectors: {
    [`${visuallyHidden}:checked + ${card} &`]: {
      borderColor: brandViolet,
      backgroundColor: brandViolet,
    },
    [`${visuallyHidden}:checked + ${card} &::after`]: {
      content: '""',
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "8px",
      height: "8px",
      borderRadius: "50%",
      backgroundColor: surfaceContainerLowest,
    },
  },
});
