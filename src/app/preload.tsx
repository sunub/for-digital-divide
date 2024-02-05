"use client";

import { preload } from "react-dom";

export function PreloadResources() {
  // @ts-expect-error
  preload("sprite.svg", { as: "image" });
  return null;
}
