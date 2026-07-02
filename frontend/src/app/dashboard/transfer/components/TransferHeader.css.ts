import { appStyle } from "@/style/utils";

export const backwardButton = appStyle({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "transform 200ms ease-in",
  ":hover": {
    transform: "translateX(-5%)",
    opacity: 0.75,
  },
});
