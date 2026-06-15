import { vars } from "@internal/design-system/style";
import { globalStyle, keyframes, style } from "@vanilla-extract/css";

export const title = style({
  fontFamily: "var(--gugi-font-family)",
  willChange: "transform",
});

export const gridStyle = style({
  display: "grid",
  placeItems: "center",
  width: "100%",
  height: "100%",
  gridTemplateColumns: "1fr .65fr",
  gridTemplateRows: "1fr",
});

globalStyle(`${title} > svg`, {
  transform: "scale(1.25) rotate(-90deg)",
});

// 펄스 애니메이션 키프레임 정의
const pulseSoftKeyframes = keyframes({
  "0%, 100%": { opacity: 1, transform: "scale(1)" },
  "50%": { opacity: 0.8, transform: "scale(0.96)" },
});

// 펄스 애니메이션이 적용되는 원형 그래픽
export const pulseCircle = style({
  width: "128px",
  height: "128px",
  borderRadius: vars.borderRadius.full,
  backgroundColor: "rgba(108, 62, 198, 0.05)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  animation: `${pulseSoftKeyframes} 3s ease-in-out infinite`,
});

// 점선 테두리
export const dashedBorder = style({
  position: "absolute",
  inset: 0,
  border: `2px dashed rgba(108, 62, 198, 0.2)`,
  borderRadius: vars.borderRadius.full,
});

// Safe & Secure 뱃지
export const secureBadge = style({
  marginTop: vars.space[4],
  display: "inline-flex",
  alignItems: "center",
  padding: `${vars.space["1.5"]} ${vars.space[3]}`,
  backgroundColor: vars.color.deviceOutline,
  borderRadius: vars.borderRadius.full,
  gap: vars.space["1.5"],
});

export const secureBadgeText = style({
  fontSize: "11px",
  fontWeight: "600",
  color: vars.color.button,
  textTransform: "uppercase",
  letterSpacing: "0.05em",
});

// 기능 리스트 아이템 카드
export const featureCard = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space[3],
  padding: vars.space[4],
  borderRadius: vars.borderRadius.md,
  backgroundColor: vars.color.white,
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
  border: `1px solid rgba(0, 0, 0, 0.05)`,
  width: "100%",
  boxSizing: "border-box",
});

export const featureText = style({
  fontSize: "13px",
  fontWeight: "600",
  color: vars.color.text,
});

// 폰 내부 컨텐츠 영역 레이아웃
export const phoneContentLayout = style({
  display: "flex",
  flexDirection: "column",
  padding: vars.space[6],
  paddingTop: "48px",
  height: "100%",
  boxSizing: "border-box",
  justifyContent: "space-between",
  gap: vars.space[6],
});

export const phoneTitle = style({
  fontSize: "28px",
  fontWeight: "700",
  lineHeight: "1.25",
  color: vars.color.button,
  letterSpacing: "-0.01em",
  textAlign: "left",
});

export const phoneSubtitle = style({
  fontSize: "14px",
  fontWeight: "400",
  lineHeight: "1.5",
  color: vars.color.descriptionText,
  textAlign: "left",
  marginTop: vars.space[2],
});

// 디자인 시스템 Button의 색상/상태 스타일을 유지하고 레이아웃만 보정
export const primaryButton = style({
  width: "100%",
  minHeight: vars.buttonPrimitive.height.lg,
  gap: vars.space[2],
  boxShadow: "0 10px 20px rgba(108, 62, 198, 0.15)",
});

export const secondaryButton = style({
  width: "100%",
  minHeight: vars.buttonPrimitive.height.lg,
  color: vars.color.descriptionText,
  fontWeight: vars.fontWeight.medium,
  fontSize: vars.buttonPrimitive.fontSize.sm,
  textAlign: "center",
  borderRadius: vars.buttonPrimitive.radius.md,
  padding: `${vars.space[1]} 0`,
  selectors: {
    "&:hover": {
      color: vars.color.button,
    },
    "&:focus-visible": {
      color: vars.color.button,
    },
  },
});

export const featureList = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space[2],
  width: "100%",
});

export const actionArea = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space[3],
  width: "100%",
});
