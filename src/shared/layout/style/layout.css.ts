import {
  createVar,
  fallbackVar,
  globalStyle,
  style,
} from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { gridCenter } from "@/style/Grid.css";
import { fullSize } from "@/style/Size.css";
import { vars } from "@/style/theme.css";

export const hideScaleVar = createVar();
export const contentHeightVar = createVar();
export const drawerHeightVar = createVar();
export const drawerAnimationVar = createVar();
export const drawerContainerSizeVar = createVar();
export const drawerContentDisplayVar = createVar();
export const drawerContentZVar = createVar();
export const drawerContentVar = createVar();
export const drawerOpenerVar = createVar();
export const translateYValVar = createVar();
export const drawerBtmRadiusVar = createVar();

export const drawerBorderRadiusVar = createVar();
const drawerContenPaddingVar = createVar();

export const placeCenter = recipe({
  base: {
    display: "grid",
    placeItems: "center",
  },
  variants: {
    type: {
      home: { gridArea: "home" },
      back: { gridArea: "back" },
    },
  },
});

export const deviceFooterContainer = style({
  gridArea: "device-main-footer/ 1",
  display: "grid",
  width: "100%",
  height: "68px",
  gridTemplateColumns: "[empty] 1fr [home] 1fr [back] 1fr",
  gridTemplateRows: "1fr",
});

export const contentRootWrapper = style({
  gridArea: "device-main-content / 1",
  position: "relative",
  width: "100%",
  height: "100%",
});

export const openr = style({
  vars: {
    [hideScaleVar]: "1",
  },
});

globalStyle(`${openr}::before`, {
  content: "'x'",
  display: "inline-flex",
  placeContent: "center",
  alignItems: "center",
  position: "absolute",
  top: "1rem",
  left: "1rem",
  width: "1.25rem",
  height: "1.25rem",
  background: vars.color.primary,
  color: vars.color.onPrimary,
  fontWeight: 900,
  borderRadius: "50%",
  aspectRatio: "1 / 1",
  cursor: "pointer",
  transform: `scale(${hideScaleVar})`,
  transition: "transform 300ms cubic-bezier(0.17, 1.48, 0.24, 1)",
});

export const contentContainer = style({
  container: "device-content / size",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  height: "100%",
});

export const container = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "45cqw",
  height: "75cqh",
  borderRadius: "50px",
  overflow: "hidden",
  zIndex: 100,
});

export const frame = style([
  fullSize,
  gridCenter,
  {
    container: "device / size",
    gridTemplateRows: `
      [device-main-content] 1fr
      [device-main-footer] 68px
    `,
    position: "relative",
    backgroundColor: vars.color.background,
    border: `6px solid ${vars.color.border}`,
    borderRadius: vars.borderRadius.xl,
    boxShadow: `
      0px 0.1px 1.3px rgba(0, 0, 0, 0.024),
      0.1px 0.2px 2.9px rgba(0, 0, 0, 0.035),
      0.2px 0.4px 5px rgba(0, 0, 0, 0.043),
      0.3px 0.6px 8px rgba(0, 0, 0, 0.05),
      0.4px 1px 12.4px rgba(0, 0, 0, 0.057),
      0.6px 1.5px 19.3px rgba(0, 0, 0, 0.065),
      1px 2.5px 32px rgba(0, 0, 0, 0.076),
      2px 5px 64px rgba(0, 0, 0, 0.1)
    `,
    transition: "grid 500ms cubic-bezier(0.17, 1.48, 0.24, 1)",
    selectors: {
      "&[data-view='content']": {
        vars: {
          [drawerContentDisplayVar]: "none",
          [contentHeightVar]: "20fr",
          [drawerHeightVar]: "1fr",
        },
      },
      "&[data-view='drawer']": {
        vars: {
          [contentHeightVar]: "3fr",
          [drawerHeightVar]: "4fr",
          [drawerAnimationVar]: "bounce-drawer-box",
          [drawerContainerSizeVar]: "100%",
        },
      },
    },
  },
]);

globalStyle(`${frame}[data-view='content'] ${openr}`, {
  vars: {
    [hideScaleVar]: "0",
  },
});

globalStyle(`${frame} > div#drawer-container`, {
  width: drawerContainerSizeVar,
});

globalStyle(`${frame}::after`, {
  content: "''",
  position: "absolute",
  top: "15px",
  left: "calc(50% - 50px)",
  width: "100px",
  height: "20px",
  justifySelf: "center",
  background: `color-mix(in oklch, ${vars.color.emphasis}, transparent)`,
  backdropFilter: `blur(${vars.space[2]})`,
  borderRadius: vars.borderRadius.full,
  zIndex: vars.zIndex.drawer,
});

export const drawerContent = style({
  display: drawerContentDisplayVar,
  flexDirection: "column",
  gap: vars.space[9],
  alignItems: "center",
  zIndex: drawerContentZVar,
});

globalStyle(`${frame}&[data-view='drawer'] ${drawerContent}`, {
  vars: {
    [drawerContentDisplayVar]: "none",
  },
});

export const input = style({
  position: "absolute",
  top: "-1px",
  left: "-1px",
  width: "1px",
  height: "1px",
  visibility: "hidden",
});

export const drawerContainer = style({
  vars: {
    [drawerContentVar]: "1px",
    [drawerOpenerVar]: "1fr",
    [translateYValVar]: "50%",
    [drawerBorderRadiusVar]: "16px",
    [drawerContentZVar]: "-1",
  },
  gridArea: "drawer-device / 1",
  display: "grid",
  gridTemplateRows: `[opener] ${drawerOpenerVar} [drawer-content] ${drawerContentVar}`,
  width: "100cqw",
  alignItems: "center",
  placeContent: "center",
  overflow: "hidden",
  position: "relative",
  marginLeft: "auto",
  marginRight: "auto",
  backgroundColor: "oklch(86.46% 0.073 293.45)",
  borderRadius: "16px",
  padding: fallbackVar(drawerContenPaddingVar, "none"),
});

globalStyle(`${frame}[data-view='drawer'] ${drawerContainer}`, {
  vars: {
    [drawerContentVar]: "10fr",
    [drawerOpenerVar]: "1fr",
    [translateYValVar]: "0%",
    [drawerContentZVar]: "0",
    [drawerContenPaddingVar]: vars.fontSize["1rem"],
  },
});

globalStyle(`${frame}&[data-view='drawer'] ${drawerContainer}::before`, {
  animation: `emphasis 1.5s cubic-bezier(0.165, 0.84, 0.44, 1) infinite`,
});

globalStyle(`${drawerContainer} > div#drawer-content`, {
  transform: `translateY(var(${translateYValVar}))`,
});

export const drawerOpener = style({
  position: "relative",
  height: "3cqh",
  width: "100cqw",
  transition: "transform 100ms cubic-bezier(0.39, 0.575, 0.565, 1)",
  outlineOffset: "4px",
  cursor: "pointer",
});

globalStyle(`${drawerOpener}::before`, {
  content: "''",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translateX(-50%) translateX(-50%)",
  width: "6px",
  height: "6px",
  borderRadius: "50%",
  aspectRatio: "1 / 1",
  backgroundColor: `color-mix(in oklch, ${vars.color.onPrimary}, transparent 20%)`,
});

export const rootWrapper = style({
  position: "relative",
  width: "50cqw",
  height: "100%",
  maxWidth: "900px",
  maxHeight: "1564px",
  border: `6px solid ${vars.color.deviceBorder}`,
  outline: `8px solid ${vars.color.deviceOutline}`,
  borderRadius: "4cqh",
});

export const outerShadow = style({
  width: "100%",
  height: "100%",
  border: `18px solid ${vars.color.black}`,
  outline: `4px solid ${vars.color.shadowOutline}`,
  background: `${vars.color.white}`,
  borderRadius: "4cqh",
});

export const innerWindow = style({
  width: "100%",
  height: "100%",
  borderRadius: "4cqh",
  background: vars.color.white,
  container: "device-frame / size",
});

export const appWrapper = style({
  gridArea: "primary-nav / fullbleed-start / system-gesture / fullbleed-end",
});

export const systemStatusBar = style({
  gridArea: "system-status / fullbleed-start / system-status / fullbleed-end",
  display: "grid",
  alignItems: "center",
  userSelect: "none",
});

globalStyle(`${systemStatusBar} > time`, {
  gridArea: "main",
  marginInline: "1rem",
});

globalStyle(`${systemStatusBar}::after`, {
  content: "''",
  gridArea: "system-status / main",
  justifySelf: "center",
  background: vars.color.black,
  blockSize: "40%",
  inlineSize: "100px",
  borderRadius: "1e5px",
});

export const header = style({
  gridArea: "primary-header / fullbleed",
  gridTemplateRows: "auto auto",
});

export const footer = style({
  gridArea: "footer / fullbleed",
  gridTemplateColumns: "repeat(3, 1fr)",
});

export const main = style({
  gridArea: "main / fullbleed",
  overflow: "auto",
});

export const systemGestureArea = style({
  display: "grid",
  gridArea: "system-gesture / fullbleed",
  gridTemplateColumns: "repeat(3, 1fr)",
});

export const center = style({
  display: "grid",
  placeItems: "center",
});

export const gesture = style([
  gridCenter,
  {
    fill: "none",
    stroke: "none",
    transition: "all 500ms ease",
  },
]);

export const gestureCircle = style({
  fill: "color-mix(in oklch, oklch(71.22% 0 0 / 0.3), transparent)",
  opacity: 0,
  stroke: "none",
  transition: "all 300ms ease",
  transform: "scale(0.3)",
  transformOrigin: "center",
});

export const gestureButton = style([
  gridCenter,
  {
    transition:
      "opacity, transform, fill 300ms cubic-bezier(0.17, 1.48, 0.24, 1)",
    selectors: {
      "&:hover": {},
      "&:active": {},
    },
  },
]);

globalStyle(`${gestureButton}:hover ${gestureCircle}`, {
  opacity: 1,
  transform: "scale(1.1)",
  fill: `color-mix(in oklch, ${vars.color.gestureBase}, transparent 50%)`,
});

globalStyle(`${gestureButton}:active ${gestureCircle}`, {
  opacity: 0.5,
  transform: "scale(0.55)",
});

export const deviceFrame = style({
  display: "grid",
  height: "100cqh",
  gridTemplateRows: `
    [system-status] 3.5rem
    [primary-nav] 3rem
    [primary-header] 4rem
    [main] auto
    [footer] 4rem
    [system-gesture] 3rem
  `,
  gridTemplateColumns: `
    [fullbleed-start] 1rem
    [main-start] auto
    [main-end] 1rem
    [fullbleed-end]
  `,
});

globalStyle(`${deviceFrame} > ${systemStatusBar}`, {
  display: "grid",
  grid: "subgrid / subgrid",
});

export const deviceMainWrapper = style({
  width: "100cqw",
  height: "calc(100cqh - 156px)",
  scrollbarWidth: "none",
  paddingBottom: "1rem",
});

export const contentWrapper = style({
  display: "grid",
  gridTemplateRows:
    "[main-header] 100px [main-content] 1fr [main-footer] 170px",
  gridTemplateColumns: "[main-column] 1fr",
  justifyItems: "center",
  paddingLeft: "32px",
  paddingRight: "32px",
  height: "100%",
});

export const headerContent = style({
  gridArea: "main-header / main-column",
  display: "flex",
  flexDirection: "column",
  flexWrap: "wrap",
  justifyContent: "center",
});

export const mainContent = style({
  gridArea: "main-content / main-column",
});

export const footerContent = style({
  gridArea: "main-footer / main-column",
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-end",
  alignItems: "center",
  gap: "24px",
  marginRight: "2rem",
});
