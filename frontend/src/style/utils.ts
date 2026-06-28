import { style as veStyle, type StyleRule } from "@vanilla-extract/css";

export function appStyle(rule: StyleRule) {
  return veStyle({
    "@layer": {
      app: rule,
    },
  });
}
