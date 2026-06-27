import { layer, globalLayer } from "@vanilla-extract/css";

globalLayer("reset");
export const designSystemLayer = layer("design-system");
globalLayer("app");
