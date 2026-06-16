import { vars } from "@internal/design-system/tokens";
import { globalStyle, style } from "@vanilla-extract/css";

// --- Checkbox 단일 컴포넌트 스타일 ---
export const labelContainer = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space[3],
  cursor: "pointer",
  userSelect: "none",
});

// 웹 접근성을 위한 숨김 처리 (기존 appearance: none 대체)
export const visuallyHidden = style({
  position: "absolute",
  width: "1px",
  height: "1px",
  padding: 0,
  margin: "-1px",
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  border: 0,
});

// 커스텀 체크박스 박스 디자인
export const control = style({
  width: vars.space[6],
  height: vars.space[6],
  border: `1px solid ${vars.color.border}`,
  borderRadius: "4px",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: vars.color.white,
  transition: "all 0.2s",
  flexShrink: 0,
  // 체크되었을 때의 부모(input) 상태를 감지
  selectors: {
    [`${visuallyHidden}:checked + &`]: {
      backgroundColor: vars.color.primary,
      borderColor: vars.color.primary,
    },
  },
});

// 체크 아이콘 (react-icons)
export const iconStyle = style({
  color: vars.color.white,
  fontSize: "18px",
  opacity: 0,
  transition: "opacity 0.2s",
  selectors: {
    [`${visuallyHidden}:checked + ${control} > &`]: {
      opacity: 1,
    },
  },
});

// 텍스트 기본 스타일
export const textStyle = style({
  fontFamily: "'Manrope', sans-serif",
  fontSize: vars.fontSize["1rem"],
  lineHeight: "24px",
  transition: "color 0.2s",
});

// 텍스트 변형 (전체 동의용 Bold / 일반 항목용 Normal)
export const textBold = style({
  fontWeight: vars.fontWeight.bold,
  color: vars.color.text, // text-on-surface
});

export const textNormal = style({
  fontWeight: vars.fontWeight.normal,
  color: vars.color.descriptionText, // text-on-surface-variant
  selectors: {
    [`${labelContainer}:hover &`]: {
      color: vars.color.text,
    },
  },
});

// --- Checkbox 트리/그룹 스타일 ---
export const checkboxGroup = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.space[4],
});

// 핵심 요구사항: Group이 중첩될 경우 CSS 선택자를 통해 누적 패딩 부여
globalStyle(`${checkboxGroup} ${checkboxGroup}`, {
  paddingLeft: vars.space[6],
  marginTop: vars.space[1], // 부모-자식 간의 추가적인 미세 간격 조정
});
