import { vars } from "@internal/design-system/style";
import { keyframes, style } from "@vanilla-extract/css";

const shimmer = keyframes({
  "0%": {
    transform: "translateX(-100%)",
  },
  "100%": {
    transform: "translateX(100%)",
  },
});

export const chartRootContainer = style({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  height: "100%",
  minHeight: "300px",
  gap: "20px",
  padding: "20px",
  boxSizing: "border-box",
  overflow: "hidden",
  "@media": {
    "screen and (max-width: 768px)": {
      flexDirection: "column",
    },
  },
});

export const summaryPanel = style({
  flex: "0 0 200px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  gap: "12px",
  zIndex: 1,
  "@media": {
    "screen and (max-width: 768px)": {
      flex: "auto",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
  },
});

export const summaryHeader = style({
  display: "flex",
  flexDirection: "column",
});

export const summaryLabel = style({
  fontSize: "0.875rem",
  color: "#666",
});

export const totalAmount = style({
  fontSize: "1.5rem",
  fontWeight: "bold",
  color: "#333",
  margin: "4px 0",
});

export const trendIndicator = style({
  display: "flex",
  alignItems: "center",
  gap: "6px",
  fontSize: "0.9rem",
});

export const trendLabel = style({
  color: "#888",
  fontSize: "0.8rem",
});

export const chartControls = style({
  marginTop: "auto",
  display: "flex",
  gap: "8px",
  "@media": {
    "screen and (max-width: 768px)": {
      marginTop: 0,
    },
  },
});

// [수정] button 태그 대신 div를 사용할 것이므로 button 스타일 유지하되 cursor 등 명시
export const periodButton = style({
  padding: "6px 12px",
  borderRadius: "16px",
  border: "1px solid #ddd",
  backgroundColor: "white",
  fontSize: "0.8rem",
  cursor: "pointer",
  transition: "all 0.2s",
  userSelect: "none",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  ":hover": {
    backgroundColor: "#f5f5f5",
  },
});

export const activePeriodButton = style({
  backgroundColor: "#333",
  color: "white",
  borderColor: "#333",
  fontWeight: 600,
  ":hover": {
    backgroundColor: "#333",
  },
});

// [핵심 수정] 무한 루프 방지를 위한 절대 위치 컨테이너 설정
export const chartGraphWrapper = style({
  flex: 1,
  position: "relative",
  width: "100%",
  height: "100%",
  minWidth: 0,
  minHeight: 0,
  overflow: "hidden",
});

export const emptyState = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  color: "#aaa",
});

// 기존 호환성 유지
export const chartPeriodSelectContainer = style({});
export const chartPeriodLabel = style({});
export const chartPeriodRange = style({});
export const chartGraphContainer = style({});

export const tooltipContainer = style({
  position: "absolute",
  padding: "8px 12px",
  backgroundColor: "rgba(255, 255, 255, 0.95)",
  border: "1px solid #eee",
  borderRadius: "8px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  pointerEvents: "none",
  zIndex: 10,
  fontSize: "0.8rem",
  lineHeight: "1.4",
  transition: "opacity 0.2s ease",
  minWidth: "140px",
});

export const tooltipDate = style({
  color: "#666",
  fontSize: "0.75rem",
  marginBottom: "4px",
});

export const tooltipRow = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "12px",
});

export const tooltipLabel = style({
  fontWeight: 500,
});

export const tooltipValue = style({
  fontWeight: "bold",
  fontVariantNumeric: "tabular-nums",
});

// [추가] 마우스 호버 시 나타나는 수직선
export const cursorLine = style({
  position: "absolute",
  top: 0,
  bottom: 0,
  width: "1px",
  backgroundColor: "#ccc",
  pointerEvents: "none",
  borderRight: "1px dashed #999",
  zIndex: 5,
});

export const statusContainer = style({
  position: "relative",
  width: "100%",
  height: "100%",
});

export const statusBadge = style({
  position: "absolute",
  top: "20px",
  right: "20px",
  zIndex: 3,
  padding: "6px 10px",
  borderRadius: "999px",
  backgroundColor:
    "color-mix(in oklch, var(--color-background) 92%, transparent)",
  border: `1px solid color-mix(in oklch, ${vars.color.border}, transparent 32%)`,
  color: vars.color.descriptionText,
  fontSize: vars.fontSize["0.75rem"],
  fontWeight: vars.fontWeight.semibold,
  boxShadow: `0 10px 30px color-mix(in oklch, ${vars.color.shadowOutline}, transparent 70%)`,
  backdropFilter: "blur(12px)",
});

export const statusErrorBadge = style([
  statusBadge,
  {
    left: "20px",
    right: "auto",
    color: vars.color.destructive,
    backgroundColor:
      "color-mix(in oklch, var(--color-destructive) 14%, var(--color-background))",
    border: `1px solid color-mix(in oklch, ${vars.color.destructive}, transparent 70%)`,
  },
]);

export const statePanel = style({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  height: "100%",
  minHeight: "300px",
  gap: "20px",
  padding: "20px",
  boxSizing: "border-box",
});

export const skeletonStatusRow = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  maxWidth: "80cqw",
  marginLeft: "auto",
  marginRight: "auto",
  gap: "12px",
  flexWrap: "wrap",
});

export const skeletonStatusBadge = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "6px 12px",
  borderRadius: "999px",
  backgroundColor:
    "color-mix(in oklch, var(--color-background) 88%, var(--color-emphasis))",
  border: `1px solid color-mix(in oklch, ${vars.color.border}, transparent 34%)`,
  color: vars.color.foreground,
  fontSize: vars.fontSize["0.75rem"],
  fontWeight: vars.fontWeight.semibold,
});

export const skeletonStatusDescription = style({
  margin: 0,
  color: vars.color.descriptionText,
});

export const stateSummaryPanel = style({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  maxWidth: "80cqw",
  marginLeft: "auto",
  marginRight: "auto",
  gap: "14px",
});

export const skeletonRow = style({
  display: "flex",
  flexWrap: "wrap",
  gap: "8px",
});

export const skeletonCard = style({
  position: "relative",
  overflow: "hidden",
  borderRadius: "18px",
  background: `linear-gradient(180deg,
    color-mix(in oklch, ${vars.color.device} 78%, white) 0%,
    color-mix(in oklch, ${vars.color.background} 64%, ${vars.color.emphasis}) 100%)`,
});

export const skeletonBlock = style([
  skeletonCard,
  {
    selectors: {
      "&::after": {
        content: '""',
        position: "absolute",
        inset: 0,
        background:
          "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.62) 50%, transparent 100%)",
        animation: `${shimmer} 1.8s ease-in-out infinite`,
      },
    },
  },
]);

export const skeletonToggle = style([
  skeletonBlock,
  {
    width: "88px",
    height: "36px",
    borderRadius: "999px",
  },
]);

export const skeletonLabel = style([
  skeletonBlock,
  {
    width: "132px",
    height: "14px",
  },
]);

export const skeletonAmount = style([
  skeletonBlock,
  {
    width: "220px",
    maxWidth: "100%",
    height: "40px",
  },
]);

export const skeletonTrend = style([
  skeletonBlock,
  {
    width: "168px",
    maxWidth: "100%",
    height: "16px",
  },
]);

export const skeletonPeriod = style([
  skeletonBlock,
  {
    width: "92px",
    height: "32px",
    borderRadius: "999px",
  },
]);

export const skeletonChartSurface = style([
  skeletonCard,
  {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "space-between",
    width: "100%",
    maxWidth: "80cqw",
    minHeight: "326px",
    height: "100%",
    marginLeft: "auto",
    marginRight: "auto",
    padding: "28px 28px 24px",
    gap: "12px",
    selectors: {
      "&::before": {
        content: '""',
        position: "absolute",
        inset: 0,
        background: `repeating-linear-gradient(180deg,
          color-mix(in oklch, ${vars.color.grid}, transparent 74%) 0px,
          color-mix(in oklch, ${vars.color.grid}, transparent 74%) 1px,
          transparent 1px,
          transparent 64px)`,
      },
      "&::after": {
        content: '""',
        position: "absolute",
        inset: 0,
        background:
          "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.58) 50%, transparent 100%)",
        animation: `${shimmer} 2.1s ease-in-out infinite`,
      },
    },
  },
]);

export const skeletonChartBar = style({
  position: "relative",
  zIndex: 1,
  flex: 1,
  minWidth: "18px",
  borderRadius: "999px 999px 16px 16px",
  background: `linear-gradient(180deg,
    color-mix(in oklch, ${vars.color.emphasis}, white 34%) 0%,
    color-mix(in oklch, ${vars.color.primary}, ${vars.color.thumb} 28%) 100%)`,
});

export const errorPanel = style([
  skeletonCard,
  {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    maxWidth: "80cqw",
    minHeight: "326px",
    height: "100%",
    marginLeft: "auto",
    marginRight: "auto",
    padding: "32px",
    gap: "12px",
    textAlign: "center",
    background: `linear-gradient(180deg,
      color-mix(in oklch, ${vars.color.background} 94%, white) 0%,
      color-mix(in oklch, ${vars.color.destructive} 10%, ${vars.color.background}) 100%)`,
    border: `1px solid color-mix(in oklch, ${vars.color.destructive}, transparent 68%)`,
    boxShadow: `0 16px 40px color-mix(in oklch, ${vars.color.destructive}, transparent 88%)`,
  },
]);

export const errorTitle = style({
  margin: 0,
  fontSize: vars.fontSize["1.25rem"],
  fontWeight: vars.fontWeight.black,
  color: vars.color.foreground,
});

export const errorDescription = style({
  margin: 0,
  color: vars.color.descriptionText,
  lineHeight: 1.5,
});

export const errorAccent = style({
  width: "52px",
  height: "52px",
  borderRadius: "999px",
  background: `radial-gradient(circle at 30% 30%,
    color-mix(in oklch, ${vars.color.destructiveForeground}, white 10%) 0%,
    ${vars.color.destructive} 100%)`,
  boxShadow: `0 16px 36px color-mix(in oklch, ${vars.color.destructive}, transparent 76%)`,
});
