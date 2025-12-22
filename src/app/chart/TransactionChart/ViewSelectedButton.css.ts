import { createVar, style } from "@vanilla-extract/css";

export const boxShadowVar = createVar();
export const colorVar = createVar();
export const fontWeightVar = createVar();
export const backgroundColorVar = createVar();

export const viewSelectedButton = style({
  vars: {
    [boxShadowVar]: "0 1px 2px rgba(0,0,0,0.1)",
    [colorVar]: "#111",
    [fontWeightVar]: "500",
    [backgroundColorVar]: "transparent",
  },
  flex: 1,
  boxShadow: boxShadowVar,
  color: colorVar,
  fontWeight: fontWeightVar,
  borderRadius: "6px",
  cursor: "pointer",
  backgroundColor: backgroundColorVar,
  transition: "all 0.2s ease",
  border: "none",
  padding: "8px 0",
  fontSize: "0.75rem",
});

// flex: 1,
//           padding: "8px 0",
//           fontSize: "0.75rem",
//           borderRadius: "6px",
//           border: "none",
//           cursor: "pointer",
//           backgroundColor:
//             viewMode === mode ? "white" : "transparent",
//           color: viewMode === mode ? "#111" : "#888",
//           fontWeight: viewMode === mode ? "700" : "500",
//           boxShadow:
//             viewMode === mode ? "0 1px 2px rgba(0,0,0,0.1)" : "none",
//           transition: "all 0.2s ease",
