import { globalStyle, style } from "@vanilla-extract/css";
import { vars } from "../tokens/theme.css";
import { designSystemLayer } from "../styles/layers.css";

export const root = style({
  "@layer": {
    [designSystemLayer]: {
      position: "relative",
      width: "100%",
      height: "100%",
      userSelect: "none",
    },
  },
});

export const shell = style({
  "@layer": {
    [designSystemLayer]: {
      position: "relative",
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: vars.surface.interactiveCard.radius,
      zIndex: 2,
      boxShadow: vars.surface.interactiveCard.shadow,
      backdropFilter: `blur(${vars.surface.interactiveCard.backdropBlur})`,
      padding: vars.surface.interactiveCard.borderPadding,
      background: vars.surface.interactiveCard.background,
      transition: "box-shadow 300ms ease, transform 100ms ease",
      selectors: {
        "&:hover": {
          boxShadow: vars.surface.interactiveCard.hoverShadow,
          outline: vars.surface.interactiveCard.hoverOutline,
        },
      },
    },
  },
});

export const content = style({
  "@layer": {
    [designSystemLayer]: {
      pointerEvents: "auto",
      display: "grid",
      alignItems: "center",
      color: vars.surface.interactiveCard.foreground,
      width: "100%",
      height: "100%",
      padding: vars.space[4],
      transition: "background 350ms ease",
      touchAction: "manipulation",
      animation: "fadeIn 500ms ease-in-out",
    },
  },
});

export const spotlight = style({
  "@layer": {
    [designSystemLayer]: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: vars.surface.interactiveCard.radius,
      zIndex: 1,
      backgroundImage: `radial-gradient(300px circle at var(--interactive-card-x, 0px) var(--interactive-card-y, 0px), ${vars.color.background}, ${vars.surface.interactiveCard.spotlight})`,
      opacity: 0.5,
      selectors: {
        "&:hover": {
          opacity: 1,
        },
      },
    },
  },
});

export const hint = style({
  "@layer": {
    [designSystemLayer]: {
      position: "absolute",
      left: "50%",
      transform: "translateX(-50%)",
      transition: "opacity 300ms ease",
      background: vars.surface.interactiveCard.hintBackground,
      color: vars.color.text,
      textShadow: `0 0 ${vars.space[1]} ${vars.color.white}`,
      padding: `${vars.space[1]} ${vars.space[4]}`,
      marginTop: "0.35rem",
      borderRadius: vars.surface.interactiveCard.radius,
      width: "max-content",
      fontSize: vars.fontSize["1rem"],
      opacity: 0,
    },
  },
});

globalStyle(`${shell}:hover ~ ${hint}`, {
  "@layer": {
    [designSystemLayer]: {
      opacity: 1,
    },
  },
});
