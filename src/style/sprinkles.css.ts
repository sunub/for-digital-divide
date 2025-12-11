import { createSprinkles, defineProperties } from "@vanilla-extract/sprinkles";
import { vars } from "./theme.css";

// 1. 반응형 조건 정의 (모바일, 태블릿, 데스크탑 등)
const responsiveProperties = defineProperties({
  conditions: {
    mobile: { "@media": "screen and (min-width: 360px)" }, // 기본값
    tablet: { "@media": "screen and (min-width: 900px)" },
    desktop: { "@media": "screen and (min-width: 1035px)" },
  },
  defaultCondition: "desktop",
  properties: {
    display: ["none", "flex", "block", "inline", "grid"],
    flexDirection: ["row", "column"],
    alignItems: ["stretch", "flex-start", "center", "flex-end"],
    justifyContent: [
      "stretch",
      "flex-start",
      "center",
      "flex-end",
      "space-between",
    ],
    placeContent: [
      "stretch",
      "flex-start",
      "center",
      "flex-end",
      "space-between",
    ],
    size: vars.size,
    gap: vars.space,
    padding: vars.space,
    paddingTop: vars.space,
    paddingBottom: vars.space,
    paddingLeft: vars.space,
    paddingRight: vars.space,
    margin: vars.space,
    marginTop: vars.space,
    marginBottom: vars.space,
    marginLeft: vars.space,
    marginRight: vars.space,
    backgroundColor: vars.color,
    color: vars.color,
    borderRadius: vars.borderRadius,
  },
  shorthands: {
    p: ["padding"],
    px: ["paddingLeft", "paddingRight"],
    py: ["paddingTop", "paddingBottom"],
    m: ["margin"],
    mx: ["marginLeft", "marginRight"],
    my: ["marginTop", "marginBottom"],
    bg: ["backgroundColor"],
  },
});

export const sprinkles = createSprinkles(responsiveProperties);

export type Sprinkles = Parameters<typeof sprinkles>[0];
