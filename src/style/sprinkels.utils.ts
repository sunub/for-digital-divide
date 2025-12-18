import type { BaseStyle } from "./sprinkles.css";
import { baseStyles } from "./sprinkles.css";

export const sprinklePropNames = new Set(baseStyles.properties);

/** bioem  */
export function splitProps<T extends Record<string, unknown>>(props: T) {
  const atomProps: Record<string, unknown> = {};
  const nativeProps: Record<string, unknown> = {};

  for (const key in props) {
    if (sprinklePropNames.has(key as keyof BaseStyle)) {
      atomProps[key] = props[key];
    } else {
      nativeProps[key] = props[key];
    }
  }

  return {
    atomProps: atomProps as BaseStyle,
    nativeProps,
  };
}
