import { appStyle } from "@/style/utils";

export const scrollContent = appStyle({
  padding: "3cqh 3cqw",
  msOverflowStyle: "none",
  scrollbarWidth: "none",
  "::-webkit-scrollbar": {
    display: "none",
  },
});

export const headerTitle = appStyle({
  fontSize: "4.5cqw",
  lineHeight: "1.4",
  fontWeight: "400",
  color: "#1a1c1c",
  marginBottom: "3cqh",
  marginTop: "1cqh",
});

export const sectionCard = appStyle({
  border: "1px solid #e2e2e2",
  borderRadius: "3cqw",
  marginBottom: "2.5cqh",
  backgroundColor: "#ffffff",
  overflow: "hidden",
});

export const sectionHeader = appStyle({
  borderBottom: "1px solid #e2e2e2",
  cursor: "pointer",
  transition: "background-color 0.2s",
  selectors: {
    "&:hover": {
      backgroundColor: "#f3f3f3",
    },
  },
});

export const itemGroupHeaderChevron = appStyle({
  color: "#7b7485",
  fontSize: "20px",
  cursor: "pointer",
  marginTop: "4px",
});

export const subItemContainerBordered = appStyle({
  marginLeft: "6cqw",
  borderLeft: "2px solid #e8e8e8",
  paddingLeft: "3cqw",
});

export const chevronIcon = appStyle({
  color: "#7b7485",
  fontSize: "20px",
  cursor: "pointer",
});

export const textGray = appStyle({
  color: "#4a4453",
  fontSize: "16px",
});

export const textSmallGray = appStyle({
  color: "#7b7485",
  fontSize: "12px",
  fontWeight: 500,
});

export const footer = appStyle({
  position: "sticky",
  bottom: "0px",
  padding: "3cqh 5cqw",
  backgroundColor: "#ffffff",
  borderTop: "1px solid #e2e2e2",
  zIndex: 10,
});

export const optionalSectionGuide = appStyle({
  fontSize: "12px",
  color: "#7b7485",
  marginTop: "8px",
  marginBottom: "16px",
  marginLeft: "8px",
  fontWeight: 500,
});
