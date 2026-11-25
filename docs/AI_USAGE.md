# AI 협업 워크플로우 및 검증 규율 (AI Usage & Verification)

이 문서는 `for-digital-divide` 개발 과정에서 **사람이 직접 설계·소유한 경계**와 **AI 에이전트에 위임한 영역**, 에이전트 컨텍스트 구조화 방식, 그리고 자동·수동 검사로 **AI 산출물의 실제 결함을 포착·수정한 기록**을 정리합니다.

---

## 1. 책임 경계: 인간 설계 계약 vs AI 위임 영역

| 영역 | 직접 설계·소유 (Human-Owned Spec) | AI 에이전트 위임 범위 | 근거 문서 |
|---|---|---|---|
| **도메인·UX 원칙** | 18개 금융 교육 여정, 조작/설명 분리(`Action-Explanation Split`), 단계 동기화 안내(`Flow-Synced Guidance`), 민감 단계 피드백(`Sensitive-Step Feedback`) | 단계별 안내 문구 초안, 반복 가이드 레이아웃 조립 | [`CONTEXT.md`](../CONTEXT.md), [`docs/superpowers/specs/`](./superpowers/specs/) |
| **데이터 계약 & 상태 경계** | Zod v4 런타임 스키마(`HistoryStoreSchema`, `PinNumberFormSchema`, `SessionCookieSchema`), 서버 상태(TanStack Query v5) vs UI 상태(Zustand) 분리, `TransferService` 비관적 락(`SELECT ... FOR UPDATE`) | 폼 유효성 핸들러, 타입 안전한 스토어 슬라이스 보일러플레이트 | [`docs/adr/0002-pessimistic-locking-for-transfers.md`](./adr/0002-pessimistic-locking-for-transfers.md) |
| **디자인 시스템 & CSS 계층** | OKLCH 색상 토큰 및 대비 기준(4.5:1 이상), `@layer` 우선순위(`reset < design-system < app < utilities`), `appStyle` 래퍼, Container Query 단위 | Primitives(`Box`, `Flex`) + Sprinkles 조합 UI, Storybook 문서 | [`packages/design-system/context.md`](../packages/design-system/context.md), [`AGENTS.md`](../AGENTS.md) |
| **보안·품질 게이트** | `A256GCM` 암호화 `httpOnly` 쿠키 정책, 프로덕션 CSP, WCAG 2.2 AA & 24×24 CSS px 타깃 기준, CI 통과 조건 | 회귀 테스트 케이스 초안, E2E 리포트 생성 스크립트 | [`.github/workflows/ci.yml`](../.github/workflows/ci.yml) |

> **참고 (진행 중 마이그레이션 경계):** `CONTEXT.md`에 등재된 `API Contracts Package`(`packages/contracts`)와 Nest.js `backend/`는 [`docs/adr/0003`](./adr/0003-shared-api-contracts-for-backend-migration.md)·[`0004`](./adr/0004-db-backed-opaque-session-cookie.md) 기반의 백엔드 분리 마이그레이션 계획 항목이며, 현재 동작 중인 프로덕션 프론트엔드는 Next.js App Router + Server Actions + 로컬 Zod v4 스키마로 경계를 검증합니다.

---

## 2. 에이전트 컨텍스트 구조화 및 자동 검증 루프

일회성 채팅 프롬프팅 대신, 저장소 내부의 계층화된 컨텍스트와 커스텀 MCP 서버로 에이전트 출력의 일관성을 강제합니다.

1. **계층 컨텍스트 문서 (`AGENTS.md` → `CONTEXT.md` → 패키지별 `context.md`)**
   - `AGENTS.md`에서 하드코딩된 `px`/`hex` 금지, `Primitives-First`, `appStyle` 사용, 커밋 규격을 명시합니다.
   - `CONTEXT.md`의 유비쿼터스 언어(`_Avoid_` 목록 포함)로 프롬프트와 코드 리뷰 간 용어 드리프트를 방지합니다.
2. **커스텀 디자인 시스템 MCP 서버 (`packages/mcp`) + 스타일 린터 (`packages/design-system-linter`)**
   - `packages/design-system/scripts/build-mcp-data.ts`가 TypeScript Compiler API로 컴포넌트 props·기본값·토큰을 추출해 `dist/mcp-components.json`, `dist/mcp-tokens.json`을 생성합니다.
   - `packages/mcp`는 5개 도구(`get_theme_tokens`, `search_components`, `get_component_detail`, `suggest_sprinkles_match`, `refresh_mcp_data`)와 Progressive Fallback([`ADR-0001`](./adr/0001-progressive-fallback-for-mcp-queries.md))을 제공합니다.
   - 오프라인 벤치마크(`scripts/eval/mcp-benchmark.mjs`, 124개 화면 기준)에서 사용 항목 충족률을 `77.5% → 93.0%`, 화면당 토큰 비용을 `5,602 → 2,563`(-54.2%), 타입 검사 실패 스타일 제안을 `101/142 → 0/142`로 개선했습니다.
3. **자동 검증 게이트 (`.github/workflows/ci.yml`)**
   - 모든 변경은 `Biome CI` → `tsc --noEmit` → `Vitest` → `next build` → `pnpm audit --prod --audit-level=high` → `Playwright E2E (WCAG 2.2 AA + 24×24px + OTP live region)` → `Lighthouse CI` 순으로 검증됩니다.

---

## 3. AI 산출물 및 구현 결함 포착·수정 사례

### 사례 1. 약관 동의 화면 중첩 `<label>` HTML 스펙 위반 (수동 DOM·인터랙션 검토)
- **결함:** 선택 약관 영역에서 하위 `<Checkbox>`를 상위 `<Checkbox>`의 `children`으로 중첩해 `<label>` 안에 `<label>`과 `<input>`이 렌더링되었습니다. 하위 체크박스 클릭 시 이벤트가 상위 `<label>`로 버블링되어 부모 상태가 꼬이고, `alignItems: "center"` 때문에 부모 체크박스 정렬이 중앙으로 무너졌습니다.
- **조치:** 설계 명세([`2026-06-16-terms-step-refactoring-design.md`](./superpowers/specs/2026-06-16-terms-step-refactoring-design.md))를 먼저 작성해 Container-Presenter 구조로 분리하고, 중첩 DOM을 형제(Sibling) 컨테이너 + Container Query(`cqw`/`cqh`) 들여쓰기로 평탄화했습니다.

### 사례 2. 18개 화면 WCAG 2.1 AA 204개 요소 위반 & OTP Live Region 누락 (Playwright + axe 자동 검사)
- **결함:** UI 구현 이후 전 여정 18개 화면에 Playwright + `@axe-core/playwright` 자동 검사를 도입한 결과, 18/18 화면에서 5종 규칙·204개 요소 위반(`color-contrast` 143, `button-name` 29, `document-title` 18, `scrollable-region-focusable` 7, `label-content-name-mismatch` 7)과 OTP 알림 토스트의 live region 누락(`5/6`)을 포착했습니다.
- **조치 (커밋 `c59fdeb`, `a6bddb6`):**
  - 글자 전용 OKLCH 대비 토큰(`accentText`, `destructiveText`, `successText`, `warningText`, `descriptionText` 88%) 도입으로 명도 대비 4.5:1 이상 확보.
  - 모든 단계 안내 패널을 `<aside aria-label="단계 안내">` 랜드마크로 전환하고 스크롤 영역에 키보드 접근(`tabIndex={0}`) 부여.
  - PIN 키패드·캐러셀·비밀번호 토글에 접근 가능한 이름 부여 및 토스트 컨테이너에 `role="status" aria-live="polite"` 지정.
- **결과:** axe 위반 `204개 → 0개` (0/18 화면), 민감 단계 피드백 `5/6 → 6/6` 통과 (`frontend/reports/ux-evidence/README.md`). 이후 `checkpoint.ts`를 `wcag22aa` 태그 및 24×24 CSS px 타깃 크기 검사(SC 2.5.8)로 확장했습니다.

### 사례 3. `<Flex as="form" onSubmit>` 다형성 타입 제약 포착 (MCP 에이전트 평가)
- **결함:** 커스텀 MCP 에이전트 평가(`scripts/eval/mcp-agent-eval.mjs`, Sonnet, 조건당 12회)에서 개선 후 MCP 서버가 2건 실패(`10/12`)했습니다. 두 실패 모두 에이전트가 `<Flex as="form" onSubmit={...}>`을 작성했으나, `BoxProps`의 네이티브 HTML prop 타입이 `ComponentPropsWithoutRef<"div">`로 고정되어 `HTMLFormElement` 전용 이벤트/속성을 수용하지 못한 문제였습니다.
- **트레이드오프 판단 및 조치:** `Box`를 단순 제네릭 `<T extends ElementType = "div">`으로 변경하면 `ComponentProps<typeof Box>`를 상속하는 12개 이상 래퍼 컴포넌트(`Surface`, `Badge`, `ButtonGroup`, `InstructionList` 등)에서 `as` prop이 `"div"`로 좁혀져 연쇄 타입 오류를 유발합니다. 디자인 시스템에는 `FormHTMLAttributes<HTMLFormElement>`와 Sprinkles를 결합한 전용 프리미티브 [`BaseForm`](../packages/design-system/src/primitives/BaseForm.tsx)이 이미 존재하므로, `Box`를 무리하게 변경하지 않고 이 제약을 문서화하고 MCP 응답 개선 과제로 명시했습니다.

### 사례 4. 쿠키 `secure` 환경변수 오기 및 프로덕션 CSP `'unsafe-eval'` 잔존 (보안 코드 감사)
- **결함:** `createCookieStorage.ts`가 표준 `process.env.NODE_ENV === "production"` 대신 비표준 `process.env.PRODUCTION === "true"`를 검사해 프로덕션에서 `secure` 플래그가 `false`로 떨어지는 결함과, `next.config.ts` 프로덕션 CSP에 `'unsafe-eval'`이 잔존하고 보안 헤더(`X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, `HSTS`)가 누락된 문제를 발견했습니다.
- **조치:** `NODE_ENV === "production"` 분기 수정, 프로덕션 CSP에서 `'unsafe-eval'` 제거 및 OWASP 보안 헤더·`poweredByHeader: false` 적용, 회귀 방지를 위한 Vitest 단위 테스트(`createCookieStorage.test.ts`, `next-config-headers.test.ts`) 추가.

---

## 4. 측정 조건 및 한계의 투명한 명시

- **로컬·시뮬레이션 기준:** 본 저장소의 E2E·axe·차트 벤치마크·MCP 평가는 실서비스 트래픽(RUM)이 아닌 로컬 PostgreSQL, Next.js 서버, Node CPU 마이크로벤치마크, 오프라인/소표본 LLM 평가 결과입니다.
- **MCP 에이전트 평가 한계 (`scripts/eval/README.md`):** 과제 4개·단일 모델(Sonnet) 기준이며 통과 여부는 타입 검사·import·컴포넌트 사용만 판정합니다. 시각적 완성도와 접근성은 별도의 Playwright + axe E2E 스위트가 검증합니다.
- **axe 전후 비교 주의사항:** 수정 후 측정(`2026-11-12`)은 진행 중인 애니메이션 종료 후 axe를 실행하므로, 수정 전(`2026-11-11`) 위반 요소 중 반투명 토스트 전환 프레임에 걸린 일부 항목이 측정 방식 차이에 포함됩니다.
