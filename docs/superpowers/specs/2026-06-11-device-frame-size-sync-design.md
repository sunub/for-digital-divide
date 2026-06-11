# 2026-06-11 Device Frame Size Sync Design Spec

## 1. 개요 및 목표
현재 서비스의 랜딩 페이지인 `/` (landing)의 `SmallPhone` 오픈 상태 크기와 내주 메인 흐름인 `/intro`, `/login`, `/dashboard` 등에서 사용되는 `DeviceFrame`의 디바이스 크기가 일치하지 않는 문제가 있습니다. 이로 인해 페이지 전환 시 레이아웃 시프트(CLS)가 발생하여 매끄러운 UX 제공에 방해가 됩니다.

본 설계의 목표는 다음과 같습니다:
1. `SmallPhone`의 오픈 크기와 `DeviceFrame`의 크기를 완전히 일치시킵니다.
2. 뷰포트 크기가 작아질 때(예: 높이 1035px 미만) 두 프레임 모두 유동적으로 축소되도록 반응형 구조를 공유합니다.
3. 단말기 크기가 축소되더라도 내부 컴포넌트들은 컨테이너 쿼리(Container Query)를 사용하여 자연스럽게 폰트 크기 및 여백이 줄어들게 만들어 인터랙션 접근성을 보장합니다.
4. 디자인 시스템(`packages/design-system`)의 공통 디자인 토큰을 활용하여 코드 수준의 일관성을 확보합니다.

## 2. 세부 변경 내역

### 2.1. 디자인 시스템 토큰 추가
`packages/design-system` 패키지의 공통 테마 토큰에 디바이스 가로/세로 변수를 설정합니다.

- **대상 파일**: [theme.css.ts](file:///Users/sunub/workspace/for-digital-divide/packages/design-system/src/tokens/theme.css.ts)
- **추가 내용**: `vars.size` 하위에 `deviceWidth`와 `deviceHeight` 추가

```typescript
// packages/design-system/src/tokens/theme.css.ts
size: {
  phone: "376px",
  numpad: "40px",
  button: "100px",
  deviceWidth: "var(--device-width, 437.5px)",
  deviceHeight: "var(--device-height, 875px)",
}
```

### 2.2. 글로벌 반응형 CSS 변수 선언
넥스트 앱의 전역 스타일시트에서 화면 높이에 따라 `--device-width` 및 `--device-height` 변수를 반응형으로 정의하고, 기존 `SmallPhone`에서 개별 사용하던 `--intro-phone-height` 변수도 이에 맞물려 자동으로 계산되도록 일원화합니다.

- **대상 파일**: [globals.css](file:///Users/sunub/workspace/for-digital-divide/frontend/src/app/globals.css)
- **상세 코드**:
```css
:root {
  /* ... */
  --device-width: 437.5px;
  --device-height: 875px;
  --intro-phone-height: calc(var(--device-height) / 2.5); /* = 350px */
}

@container devsite-content (height < 1035px) {
  :root {
    --device-width: 312.5px;
    --device-height: 625px;
  }
}
```

### 2.3. DeviceFrame 스타일 최적화
`DeviceFrame` 컴포넌트의 가로/세로 길이를 신규 디자인 시스템 토큰인 `vars.size.deviceWidth`, `vars.size.deviceHeight`를 사용하도록 수정하고 불필요한 기존 고정 사이즈 값을 제거합니다.

- **대상 파일**: [layout.css.ts](file:///Users/sunub/workspace/for-digital-divide/frontend/src/shared/layout/style/layout.css.ts)
- **상세 코드**:
```typescript
export const container = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: vars.size.deviceWidth,
  height: vars.size.deviceHeight,
  flexShrink: 0,
  borderRadius: "40px",
  overflow: "hidden",
  zIndex: 100,
});
```

## 3. 검증 계획

### 3.1. 자동화 빌드
- 패키지 빌드 실행: `pnpm --filter @internal/design-system build`
- 전체 모노레포 빌드: `pnpm build`

### 3.2. 수동 검증 시나리오
1. **해상도 기준 크기 일치 확인**:
   - 높이 1035px 이상의 일반 데스크톱 화면에서 `/` 페이지의 `SmallPhone` 오픈 상태와 `/login` 및 `/dashboard` 페이지의 단말기 가로/세로 크기가 정확히 일치하는지 개발자 도구로 요소 검사.
2. **짧은 화면 스케일 축소 확인**:
   - 브라우저 창 높이를 900px 이하로 축소한 뒤, 디바이스 프레임 크기가 312.5px &times; 625px로 반응형 변경되는지 확인.
   - 단말기가 줄어들었을 때 내부 텍스트, 버튼, PIN 인증 패드 등이 컨테이너 쿼리에 의해 레이아웃 깨짐 없이 올바르게 축소되는지 시각적/인터랙션 확인.
