import { globalStyle, style } from "@vanilla-extract/css";
import { borderBottomVar, borderRadiusVar } from "./TextField.css";

export const textFieldGroup = style({
  display: "flex",
  flexDirection: "column",
  width: "100%",
});

globalStyle(`${textFieldGroup} > :first-child:not(:last-child)`, {
  vars: {
    [borderRadiusVar]: "12px 12px 0 0",
    [borderBottomVar]: "none",
  },
});

globalStyle(`${textFieldGroup} > :not(:first-child):not(:last-child)`, {
  vars: {
    [borderRadiusVar]: "0",
    [borderBottomVar]: "none",
  },
});

globalStyle(`${textFieldGroup} > :last-child:not(:first-child)`, {
  vars: {
    [borderRadiusVar]: "0 0 12px 12px",
  },
});
