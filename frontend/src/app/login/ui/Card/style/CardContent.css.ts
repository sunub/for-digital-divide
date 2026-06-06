import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const cardContentWrapper = recipe({
  base: {
    position: "relative",
    width: "100px",
    height: "116px",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "1rem",

    zIndex: 2,
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.12)",
    backdropFilter: "blur(10px)",
    padding: "2px",
    background: "rgba(255, 255, 255, 0.15)",
    transition: "box-shadow 300ms ease, transform 100ms ease",
    selectors: {
      "&:hover": {
        boxShadow: "var(--long-shadow)",
        outline:
          "4px solid color-mix(in oklch, oklch(63.93% 0.206 288.34) 15%, transparent)",
      },
      "&:active": {
        transform: "scale(0.9)",
      },
    },
  },
  variants: {
    hasDeviceId: {
      true: {
        cursor: "pointer",
      },
      false: {
        cursor: "not-allowed",
      },
    },
  },
});

export const headerStyle = style({
  gridArea: "card-header",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginLeft: "var(--size4)",
  textAlign: "left",
  wordBreak: "break-all",
  fontWeight: 700,

  "@media": {
    "(max-width: 768px)": {
      flexDirection: "column",
    },
  },
});

export const footerStyle = style({
  gridArea: "card-footer",
  fontSize: "0.85rem",
  fontWeight: 500,
  wordBreak: "break-all",
  userSelect: "none",
  justifySelf: "center",
});

export const cardContentLinkWrapper = recipe({
  base: {
    display: "grid",
    alignItems: "center",
    gridTemplateAreas: `
      "card-icon"
      "card-header"
      "card-footer"
    `,
    gridTemplateRows: "0.2fr minmax(1ch, 1fr) 15px",
    gridTemplateColumns: "1fr",
    height: "100%",
    padding: "1rem",
    transition: "background 350ms ease",
    cursor: "pointer",
    touchAction: "manipulation",
    animation: "fadeIn 500ms ease-in-out",
  },
  variants: {
    hasDeviceId: {
      true: {
        pointerEvents: "auto",
        color:
          "color-mix(in oklch, oklch(63.93% 0.206 288.34) 90%, oklch(0.7 0.1825 239.69) 20%)",
      },
      false: {
        pointerEvents: "none",
        color:
          "color-mix(in oklch, var(--foreground-destructive) 90%, oklch(0.7 0.1825 239.69) 20%)",
      },
    },
  },
});
