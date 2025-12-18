import { globalStyle, style } from "@vanilla-extract/css";

import {
  contentHeightVar,
  drawerAnimationVar,
  drawerContainerSizeVar,
  drawerContentDisplayVar,
  drawerHeightVar,
  frame,
} from "@/shared/layout/style/layout.css";

export const form = style({
  position: "relative",

  display: "grid",
  transition: "grid 500ms cubic-bezier(0.17, 1.48, 0.24, 1)",
  width: "100cqw",
  height: "100cqh",
  gridTemplateRows: ` [content-device] ${contentHeightVar} [drawer-device] ${drawerHeightVar}`,
});

globalStyle(`${frame}&[data-view='content']`, {
  vars: {
    [drawerContentDisplayVar]: "none",
    [contentHeightVar]: "20fr",
    [drawerHeightVar]: "1fr",
  },
});

globalStyle(`${frame}&[data-view='drawer']`, {
  vars: {
    [contentHeightVar]: "3fr",
    [drawerHeightVar]: "4fr",
    [drawerAnimationVar]: "bounce-drawer-box",
    [drawerContainerSizeVar]: "100%",
  },
});

globalStyle(`${form} > div#drawer-container`, {
  width: drawerContainerSizeVar,
});
