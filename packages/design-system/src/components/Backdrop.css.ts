import { styleVariants } from "@vanilla-extract/css";
import { designSystemLayer } from "../styles/layers.css";

export const backdropBlur = styleVariants({
  none: {},
  soft: {
    "@layer": {
      [designSystemLayer]: {
        backdropFilter: "blur(20px)",
      },
    },
  },
});
