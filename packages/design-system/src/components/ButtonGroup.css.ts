import { globalStyle, style } from "@vanilla-extract/css";
import { vars } from "../tokens/theme.css";
import { designSystemLayer } from "../styles/layers.css";

export const buttonGroup = style({
  "@layer": {
    [designSystemLayer]: {
      display: "flex",
      alignItems: "stretch",
      border: "none",
    },
  },
});

export const horizontalGroup = style({
  "@layer": {
    [designSystemLayer]: {},
  },
});
export const verticalGroup = style({
  "@layer": {
    [designSystemLayer]: {
      flexDirection: "column",
    },
  },
});

globalStyle(`${horizontalGroup} > *:not(:first-child)`, {
  "@layer": {
    [designSystemLayer]: {
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
      borderLeftWidth: 0,
    },
  },
});

globalStyle(`${horizontalGroup} > *:not(:last-child)`, {
  "@layer": {
    [designSystemLayer]: {
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
    },
  },
});

globalStyle(`${verticalGroup} > *:not(:first-child)`, {
  "@layer": {
    [designSystemLayer]: {
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
      borderTopWidth: 0,
    },
  },
});

globalStyle(`${verticalGroup} > *:not(:last-child)`, {
  "@layer": {
    [designSystemLayer]: {
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
    },
  },
});

globalStyle(`${buttonGroup} > *:focus-visible`, {
  "@layer": {
    [designSystemLayer]: {
      zIndex: vars.zIndex.drawer,
      position: "relative",
    },
  },
});

globalStyle(`${buttonGroup} :has([data-slot="button-group"])`, {
  "@layer": {
    [designSystemLayer]: {
      gap: vars.space[8],
    },
  },
});
