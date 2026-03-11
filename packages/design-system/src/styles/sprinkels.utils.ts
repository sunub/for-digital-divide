import type { BaseStyle } from "./sprinkles.css";
import { baseStyles } from "./sprinkles.css";

export const sprinklePropNames = new Set(baseStyles.properties);

export function splitProps<T extends Record<string, unknown>>(props: T) {
  const atomProps: Record<string, unknown> = {};
  const nativeProps: Record<string, unknown> = {};

  for (const key in props) {
    if (sprinklePropNames.has(key as keyof BaseStyle)) {
      atomProps[key] = props[key];
      continue;
    }

    nativeProps[key] = props[key];
  }

  return {
    atomProps: atomProps as BaseStyle,
    nativeProps,
  };
}
