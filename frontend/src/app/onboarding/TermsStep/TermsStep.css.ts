import { style } from "@vanilla-extract/css";

export const layoutContainer = style({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  backgroundColor: "#f9f9f9",
  position: "relative",
  overflow: "hidden",
});

export const scrollContent = style({
  padding: "3cqh 3cqw",
  msOverflowStyle: "none",
  scrollbarWidth: "none",
  "::-webkit-scrollbar": {
    display: "none",
  },
});

export const headerTitle = style({
  fontSize: "4.5cqw",
  lineHeight: "1.4",
  fontWeight: "400",
  color: "#1a1c1c",
  marginBottom: "3cqh",
  marginTop: "1cqh",
});

export const sectionCard = style({
  border: "1px solid #e2e2e2",
  borderRadius: "3cqw",
  marginBottom: "2.5cqh",
  backgroundColor: "#ffffff",
  overflow: "hidden",
});

export const sectionHeader = style({
  borderBottom: "1px solid #e2e2e2",
  padding: "16px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  cursor: "pointer",
  transition: "background-color 0.2s",
  selectors: {
    "&:hover": {
      backgroundColor: "#f3f3f3",
    },
  },
});

export const sectionContent = style({
  padding: "16px",
  display: "flex",
  flexDirection: "column",
  gap: "16px",
});

export const itemRow = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
});

export const itemRowGroup = style({
  display: "flex",
  flexDirection: "column",
  width: "100%",
});

export const itemRowGroupHeader = style({
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  width: "100%",
});

export const itemGroupHeaderChevron = style({
  color: "#7b7485",
  fontSize: "20px",
  cursor: "pointer",
  marginTop: "4px",
});

export const subItemContainer = style({
  marginLeft: "32px",
  marginTop: "8px",
  display: "flex",
  flexDirection: "column",
  gap: "8px",
});

export const subItemContainerBordered = style({
  marginLeft: "6cqw",
  marginTop: "16px",
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  borderLeft: "2px solid #e8e8e8",
  paddingLeft: "3cqw",
  paddingTop: "8px",
  paddingBottom: "8px",
});

export const chevronIcon = style({
  color: "#7b7485",
  fontSize: "20px",
  cursor: "pointer",
});

export const textGray = style({
  color: "#4a4453",
  fontSize: "16px",
});

export const textSmallGray = style({
  color: "#7b7485",
  fontSize: "12px",
  fontWeight: 500,
});

export const footer = style({
  position: "sticky",
  bottom: "0px",
  padding: "3cqh 5cqw",
  backgroundColor: "#ffffff",
  borderTop: "1px solid #e2e2e2",
});

// Extracted Wrappers for removing inline styles
export const allAgreementWrapper = style({
  marginBottom: "3cqh",
});

export const marketingHeaderWrapper = style({
  marginBottom: "1.5cqh",
});

export const personalInfoProvisionWrapper = style({
  marginTop: "2cqh",
  display: "flex",
  alignItems: "center",
});

export const optionalSectionGuide = style({
  fontSize: "12px",
  color: "#7b7485",
  marginTop: "8px",
  marginBottom: "16px",
  marginLeft: "8px",
  fontWeight: 500,
});
