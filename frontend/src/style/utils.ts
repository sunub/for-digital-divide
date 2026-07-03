import { appLayer } from "@internal/design-system/style/layers.css";
import { type StyleRule, style as veStyle } from "@vanilla-extract/css";

export function appStyle(rule: StyleRule) {
  return veStyle({
    "@layer": {
      [appLayer]: rule,
    },
  });
}
