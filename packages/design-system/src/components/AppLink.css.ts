import {
  createVar,
  globalStyle,
  style,
  styleVariants,
} from "@vanilla-extract/css";
import { vars } from "../tokens/theme.css";

export const standoutTextColorVar = createVar();
export const standoutUnderlineColorVar = createVar();
export const standoutHoverColorVar = createVar();

export const linkBase = style({
  display: "inline-block",
  width: "fit-content",
  textDecoration: "none",
  cursor: "pointer",
  transition: "color 180ms ease",
});

export const linkLabel = style({
  display: "inline-block",
});

export const linkVariant = styleVariants({
  inline: {
    color: vars.color.button,
    textDecoration: "underline",
    textUnderlineOffset: "0.18em",
    textDecorationThickness: "2px",
  },
  standout: {
    position: "relative",
    color: standoutTextColorVar,
    paddingBottom: vars.space[3],
    selectors: {
      "&::before": {
        content: "",
        position: "absolute",
        top: "100%",
        left: 0,
        width: "100%",
        height: "5px",
        borderRadius: vars.borderRadius.full,
        background: standoutUnderlineColorVar,
        pointerEvents: "none",
        transform: "scale3d(1, 1, 1)",
        transformOrigin: "center",
        transition:
          "transform 0.2s, opacity 0.2s cubic-bezier(0.2, 0.57, 0.67, 1.53)",
      },
    },
  },
});

export const standoutLabel = style({
  transform: "translate3d(0, 0.12rem, 0)",
  transition: "transform 0.2s 0.05s cubic-bezier(0.2, 0.57, 0.67, 1.53)",
});

export const standoutInteraction = style({
  selectors: {
    "&:hover": {
      color: standoutHoverColorVar,
    },
    "&:focus-visible": {
      color: standoutHoverColorVar,
      outline: "none",
    },
  },
});

globalStyle(`${standoutInteraction}:hover::before`, {
  transform: "scale3d(1.2, 0.1, 1)",
  transition: "transform 0.4s cubic-bezier(0.8, 0, 0.1, 1)",
  opacity: 1,
});

globalStyle(`${standoutInteraction}:hover .${standoutLabel}`, {
  transform: "translate3d(0, 0, 0)",
  transition: "transform 400ms cubic-bezier(0.8, 0, 0.1, 1)",
  transitionDelay: "0s",
});

globalStyle(`${standoutInteraction}:focus-visible::before`, {
  transform: "scale3d(1.2, 0.1, 1)",
  transition: "transform 0.4s cubic-bezier(0.8, 0, 0.1, 1)",
  opacity: 1,
});

globalStyle(`${standoutInteraction}:focus-visible .${standoutLabel}`, {
  transform: "translate3d(0, 0, 0)",
  transition: "transform 400ms cubic-bezier(0.8, 0, 0.1, 1)",
  transitionDelay: "0s",
});
