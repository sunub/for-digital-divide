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
  borderRadius: "50%",
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
  borderRadius: "50%",
});

// Safe & Secure 뱃지
export const secureBadge = style({
  marginTop: "16px",
  display: "inline-flex",
  alignItems: "center",
  padding: "6px 12px",
  backgroundColor: "oklch(88.53% 0 0)", // surface-container-high
  borderRadius: "9999px",
  gap: "6px",
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
  gap: "12px",
  padding: "16px",
  borderRadius: "16px",
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
  padding: "24px",
  paddingTop: "48px",
  height: "100%",
  boxSizing: "border-box",
  justifyContent: "space-between",
  gap: "24px",
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
  marginTop: "8px",
});

// 액션 버튼 스타일 (평면의 Premium 느낌 재현)
export const primaryButton = style({
  width: "100%",
  backgroundColor: vars.color.button,
  color: vars.color.white,
  fontWeight: "600",
  fontSize: "15px",
  padding: "16px",
  borderRadius: "16px",
  border: "none",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
  boxShadow: "0 10px 20px rgba(108, 62, 198, 0.15)",
  transition: "all 0.2s ease",
  selectors: {
    "&:hover": {
      backgroundColor: "oklch(52.06% 0.041 294.47)",
      transform: "translateY(-1px)",
    },
    "&:active": {
      transform: "translateY(0)",
    },
  },
});

export const secondaryButton = style({
  width: "100%",
  backgroundColor: "transparent",
  color: vars.color.descriptionText,
  fontWeight: "500",
  fontSize: "13px",
  textAlign: "center",
  border: "none",
  cursor: "pointer",
  padding: "4px 0",
  transition: "color 0.2s ease",
  selectors: {
    "&:hover": {
      color: vars.color.button,
    },
  },
});

export const featureList = style({
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  width: "100%",
});

export const actionArea = style({
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  width: "100%",
});
