export const spaceOptions = [
  0,
  "px",
  0.5,
  1,
  1.5,
  2,
  3,
  4,
  5,
  6,
  8,
  9,
  10,
  12,
  13,
  14,
  16,
  17,
  18,
] as const;

export const colorOptions = [
  "background",
  "foreground",
  "device",
  "text",
  "button",
  "emphasis",
  "confirm",
  "highlight",
  "standOut",
  "transparent",
] as const;

export const borderRadiusOptions = ["sm", "md", "lg", "xl", "full"] as const;
export const displayOptions = [
  "block",
  "flex",
  "grid",
  "inline",
  "none",
] as const;
export const positionOptions = [
  "static",
  "relative",
  "absolute",
  "fixed",
  "sticky",
] as const;
export const directionOptions = ["row", "column"] as const;
export const flexWrapOptions = ["nowrap", "wrap", "wrap-reverse"] as const;
export const alignOptions = [
  "stretch",
  "flex-start",
  "center",
  "flex-end",
  "space-between",
  "space-around",
  "space-evenly",
] as const;
export const placeContentOptions = [
  "stretch",
  "flex-start",
  "center",
  "flex-end",
  "space-between",
] as const;
