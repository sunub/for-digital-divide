import { style } from "@vanilla-extract/css";

export const cardContainer = style({
  aspectRatio: "1.6 / 1",
  backgroundColor: "rgba(108, 62, 198, 0.1)", // Light primary
  borderRadius: "12px",
  overflow: "hidden",
  border: "1px solid rgba(108, 62, 198, 0.2)",
});

export const zIndex10 = style({
  zIndex: 10,
});

export const cardPhoto = style({
  width: "80px",
  height: "96px",
  backgroundColor: "rgba(255, 255, 255, 0.4)",
  backdropFilter: "blur(4px)",
  borderRadius: "8px",
  overflow: "hidden",
  border: "1px solid rgba(255, 255, 255, 0.6)",
  boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
});

export const cardSeal = style({
  width: "32px",
  height: "32px",
  borderRadius: "50%",
  backgroundColor: "rgba(108, 62, 198, 0.1)",
  border: "1px solid rgba(108, 62, 198, 0.2)",
  backdropFilter: "blur(4px)",
});
