# Design System Package Context

## 1. Role and Purpose
- **Design System Core**: This package is the centralized, monorepo-wide Design System for the "For-digital-divide" project. It is built using **Vanilla-Extract CSS** for type-safe styles, **Radix UI** for accessible primitives, and **motion** (Framer Motion) for highly interactive, polished micro-animations.
- **Mobile-to-PC Simulators**: Provides responsive styling primitives and layout wrappers designed to match mobile UI structures rendered within desktop frames.
- **AI-Agent & MCP Integration**: Houses the metadata compilation system. When running `pnpm build:mcp`, it parses token values and component stories using the TypeScript Compiler API (AST) to generate JSON datasets in the `dist/` directory:
  - `dist/mcp-tokens.json`: Compiled theme variables and Sprinkles utilities.
  - `dist/mcp-components.json`: Metadata for React components, including prop types, descriptions, import paths, and story examples.
  - These JSON outputs are dynamically loaded by the [MCP Server](file:///Users/sunub/workspace/for-digital-divide/packages/mcp/context.md) to answer design queries and suggest code mappings to AI agents.

---

## 2. Core Sub-domains

### [Tokens (src/tokens)](file:///Users/sunub/workspace/for-digital-divide/packages/design-system/src/tokens)
- Core brand foundations defining colors, spacing, typography sizes, shadows, border radii, and custom responsive breakpoints. Contains:
  - [theme.css.ts](file:///Users/sunub/workspace/for-digital-divide/packages/design-system/src/tokens/theme.css.ts): Vanilla-extract theme contract and standard variables (`vars`).

### [Styles & Layout Utilities (src/styles)](file:///Users/sunub/workspace/for-digital-divide/packages/design-system/src/styles)
- Type-safe, low-level layout constructs and styling utilities.
  - [sprinkles.css.ts](file:///Users/sunub/workspace/for-digital-divide/packages/design-system/src/styles/sprinkles.css.ts): atomic CSS classes (properties like color, padding, display, and shorthands).
  - [Flex.css.ts](file:///Users/sunub/workspace/for-digital-divide/packages/design-system/src/styles/Flex.css.ts) & [Grid.css.ts](file:///Users/sunub/workspace/for-digital-divide/packages/design-system/src/styles/Grid.css.ts): Style definitions for display layout primitives.

### [Primitives (src/primitives)](file:///Users/sunub/workspace/for-digital-divide/packages/design-system/src/primitives)
- Highly reusable semantic HTML foundations using vanilla-extract sprinkles.
  - [Box](file:///Users/sunub/workspace/for-digital-divide/packages/design-system/src/primitives/Box.tsx): The primary structural building block supporting polymorphism.
  - [Flex](file:///Users/sunub/workspace/for-digital-divide/packages/design-system/src/primitives/Flex.tsx): Flexbox layout wrapper.
  - [Grid](file:///Users/sunub/workspace/for-digital-divide/packages/design-system/src/primitives/Grid.tsx): Grid layout wrapper.

### [Components (src/components)](file:///Users/sunub/workspace/for-digital-divide/packages/design-system/src/components)
- Rich UI elements and complex interactives built on top of the primitives.
- Includes its own subfolder [context.md](file:///Users/sunub/workspace/for-digital-divide/packages/design-system/src/components/context.md) documenting details for individual components (`Button`, `ThreeDButton`, `InteractiveCard`, `AppLink`, `Badge`, `TextField`, etc.).

---

## 3. Shared Assets & Helpers

### Hooks (src/hooks/)
- `useIsMounted() => boolean`: Hook checking if the React component has safely mounted on the client-side to prevent hydration mismatches.

### Build Scripts
- [build.ts](file:///Users/sunub/workspace/for-digital-divide/packages/design-system/build.ts): Compiles and minifies CSS outputs using `lightningcss`.
- [scripts/build-mcp-data.ts](file:///Users/sunub/workspace/for-digital-divide/packages/design-system/scripts/build-mcp-data.ts): Parses TS AST to extract component properties, descriptions, and story patterns to export JSON files for MCP consumption.

---

## 4. Directory Structure (Max Depth 3)
```
packages/design-system/
├── package.json
├── tsconfig.json
├── tsup.config.ts
├── build.ts
├── scripts/
│   └── build-mcp-data.ts
├── dist/                          <- Generated compiled assets & JSON files
│   ├── mcp-tokens.json            <- Shared metadata for MCP server
│   └── mcp-components.json        <- Shared metadata for MCP server
└── src/
    ├── docs/
    ├── hooks/
    ├── tokens/
    ├── styles/
    ├── primitives/
    └── components/
```

---

## 5. Styling Priority Hierarchy & Principles

안전하고 예측 가능한 디자인 시스템을 위해 Vanilla-Extract CSS의 우선순위는 다음과 같은 레이어 계층을 따릅니다.
공용 컴포넌트의 형태를 앱에서 덮어쓰거나(Override), 특정 값만 주입해야 할 경우 이 원칙을 준수해야 합니다.

1. **`@layer reset`**: 브라우저 기본 스타일 초기화 (최하위 우선순위)
2. **`@layer design-system`**: 공용 컴포넌트(`Surface`, `Text`, `Button` 등)가 제공하는 기본 틀
3. **`@layer app`**: `frontend/` 등 프로덕트에서 작성하는 **Custom className** (컴포넌트의 기본 틀을 덮어씀)
4. **`@layer utilities`**: 디자인 시스템이 제공하는 **Sprinkles Props** (가장 높은 우선순위. 앱 레벨의 커스텀 클래스나 컴포넌트의 기본 틀보다 우선하여 특정 토큰 값을 주입함)

### 용어 정의
*   **Sprinkles Props**: `<Surface padding="16" />` 처럼 디자인 시스템의 토큰 범위 내에서 값을 주입하는 방식입니다. (`@layer utilities` 또는 unlayered로 강제 높은 우선순위 부여)
*   **Custom className**: `<Surface className={myCustomStyle} />` 처럼 컴포넌트를 사용하는 곳에서 별도로 작성한 `style()`을 넘기는 방식입니다. (`@layer app` 내부에 작성 권장)

### 설계 결의 사항 (Architectural Decisions)
*   **Custom Style Wrapper (`appStyle`)**: 개발자가 매번 `@layer app`을 작성하는 보일러플레이트와 휴먼 에러를 방지하기 위해, `frontend/` 영역에서는 Vanilla-Extract의 `style()` 함수를 직접 사용하지 않고, 내부적으로 `@layer app`을 감싸주는 커스텀 유틸리티(`appStyle`)를 만들어 사용합니다.
*   **검사 도구 통합 (Validation Strategy)**: 너무 엄격한 Git Hook은 개발 생산성을 저하시킵니다. 따라서 토큰 검사 로직(Core Business Logic)은 패키지 형태로 분리하여, **사람을 위해서는 Stylelint Custom Plugin**으로 IDE 경고를 제공하고, **AI를 위해서는 MCP Server**의 자동 교정(Auto-fix) 도구로 활용하는 투트랙(Two-track) 전략을 취합니다.
*   **UI 개발 패러다임 (Primitives & Sprinkles-First)**: 앱(`frontend/`)에서 화면을 그릴 때는 1순위로 디자인 시스템의 **Primitives(`Box`, `Flex` 등)**와 **Sprinkles(Props)**만을 조립하여 레이아웃과 간격을 구성합니다. 별도의 커스텀 CSS(`appStyle`) 파일은 애니메이션, 복잡한 가상 선택자(pseudo-selectors), 혹은 Sprinkles로 표현 불가능한 특수한 경우에만 제한적으로 생성하여 사용합니다. (Context-switching 최소화 및 타입 안정성 극대화)
