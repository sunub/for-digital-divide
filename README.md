# For-Digital-Divide

- **Live Demo (Vercel):** https://for-digital-divide.vercel.app/

모바일 금융 앱 조작에 어려움을 겪는 **디지털 취약 금융 사용자**가 큰 웹 화면에서 본인인증·로그인·PIN 등록·계좌 조회·송금까지 전 과정을 단계별 안내와 함께 연습할 수 있는 금융 교육 웹 서비스입니다.

---

## 1. 문제 정의 및 설계 원칙

작은 모바일 화면의 고밀도 UI와 전문 용어는 디지털 취약 계층이 인증·송금 도중 이탈하거나 오작동하는 원인이 됩니다. 반면 기존 PC 뱅킹 UI로 화면을 완전히 바꾸면 실제 스마트폰 앱으로 돌아갔을 때 학습 전이가 일어나지 않습니다.

이를 해결하기 위해 18개 전체 여정 화면에 다음 설계 원칙을 적용했습니다([`CONTEXT.md`](./CONTEXT.md)):

- **Mobile Interaction Anchor & Action-Explanation Split:** 실제 조작 요소는 중앙의 모바일 디바이스 프레임(`main`) 안에 유지하고, 행동 이유와 주의사항은 바깥쪽 단계 안내 랜드마크(`aside[aria-label="단계 안내"]`)로 분리합니다.
- **Flow-Synced Guidance:** 온보딩 → 로그인 → PIN 등록 → 대시보드 → 송금 단계가 바뀔 때마다 좌측 안내 패널이 현재 단계에 맞춰 동기화됩니다.
- **Sensitive-Step Feedback:** SMS 인증번호(OTP) 만료·불일치, 보안 키패드 PIN 입력 등 민감 단계에서 시각적 오류와 보조기기(`role="alert"`, `aria-invalid`, `aria-describedby`, `role="status"` live region) 피드백을 즉시 제공합니다.

---

## 2. 검증된 정량 성과 요약

> 모든 수치는 실서비스 트래픽(RUM)이 아닌 **로컬·CI·마이크로벤치마크·오프라인 평가 환경**에서 측정한 결과이며, 측정 조건과 한계를 함께 표기합니다.

| 영역 | 지표 | Before | After | 측정 도구 및 조건 | 근거 |
|---|---|---:|---:|---|---|
| **접근성 (18개 여정 화면)** | axe 위반 규칙 / 요소 수 / 위반 화면 | 5종 / 204개 / 18/18 | **0종 / 0개 / 0/18** | Playwright + `@axe-core/playwright` (`wcag2a..21aa`), 로컬 PG + Next dev, Chrome 1440×900 *(주1)* | [`ux-evidence/README.md`](./frontend/reports/ux-evidence/README.md) |
| **구조·UX 동기화** | 조작/설명 분리 · 단계 안내 랜드마크 · 전환 동기화 | 랜드마크 미구현 | **18/18 · 18/18 · 16/17** *(주2)* | `frontend/e2e/guide-sync.spec.ts` (레이아웃 박스 + 접근성 트리 검증) | [`guide-sync.spec.ts`](./frontend/e2e/guide-sync.spec.ts) |
| **민감 단계(OTP) 피드백** | 만료·불일치·복구·강조·live region 검사 | 5/6 | **6/6 통과** | `frontend/e2e/sensitive-feedback.spec.ts` (Playwright fake clock, 로컬 환경) | [`sensitive-feedback.spec.ts`](./frontend/e2e/sensitive-feedback.spec.ts) |
| **차트 데이터 집계·호버 CPU** | 5,000건 거래 일별 축소율 (1/3/6개월) · 집계 p95 | 5,000건 원본 | **99.36% / 98.14% / 96.34%**<br>p95 **5.25 / 5.58 / 5.21 ms** | Node CPU 마이크로벤치마크 (`seed=42`, 150회 반복, 브라우저 페인트 FPS 아님) | [`transaction-chart-benchmark.json`](./frontend/reports/transaction-chart-benchmark.json) |
| **차트 인터랙션 효율** | 12,000회 호버 탐색 p95 · 중복 상태 쓰기 억제 | 12,000회 원시 이벤트 | p95 **0.0009 ms** (60fps 예산 0.006%)<br>억제 **98.48%** (11,817/12,000) | `pnpm --filter frontend run benchmark:transaction-chart` | [`benchmark-transaction-chart.ts`](./frontend/scripts/benchmark-transaction-chart.ts) |
| **디자인 시스템 MCP (오프라인)** | 124개 화면 충족률 · 화면당 토큰 · 스타일 제안 타입 오류 | 77.5% · 5,602토큰 · 101/142 | **93.0% · 2,563토큰(-54.2%) · 0/142** | `scripts/eval/mcp-benchmark.mjs` (TS 타입 검사기 + 스타일 소스 대조) *(주3)* | [`scripts/eval/README.md`](./scripts/eval/README.md) |
| **프로덕션 번들 크기** | 공용 First Load JS / 주요 경로 (`/`, `/onboarding`, `/dashboard`) | - | **102 kB** / 200 · 235 · 272 kB | Next.js 15.5.9 로컬 프로덕션 빌드 (`pnpm --filter frontend run build`) | CI 빌드 출력 |

- *(주1) 측정 방식 차이 및 WCAG 2.2 확장:* 수정 후(`2026-11-12`) 측정은 진행 중인 애니메이션 종료 후 axe를 실행하므로 수정 전(`2026-11-11`) 반투명 토스트 프레임 위반 일부가 측정 차이에 포함됩니다. 이후 `e2e/support/checkpoint.ts`에 `wcag22aa` 태그와 **WCAG 2.2 SC 2.5.8 (24×24 CSS px 타깃 크기)** 자동 검증을 추가해 CI에 연동했습니다.
- *(주2) 전환 동기화 16/17:* 이메일 회원가입 → 이메일 로그인 구간 1건은 의도적으로 동일 안내를 공유합니다.
- *(주3) MCP 에이전트 평가 한계:* 소표본 LLM 평가(`scripts/eval/mcp-agent-eval.mjs`, Sonnet, 과제 4개×3회=12회/조건)에서는 요약 문서 `0/12`, 소스 탐색 `9/12`(60,034토큰) 대비 MCP `12/12`(개선 전, 21,748토큰)·`10/12`(개선 후, 18,480토큰)을 기록했습니다. 개선 후 실패 2건은 `<Flex as="form" onSubmit>`에서 `Box` DOM prop 타입이 `div`로 고정된 디자인 시스템 제약 때문이며, 세부 원인과 `<BaseForm>` 대안은 [`docs/AI_USAGE.md`](./docs/AI_USAGE.md)에 정리했습니다.

---

## 3. 기술 스택 및 아키텍처 트레이드오프

| 영역 | 사용 기술 | 채택 이유 및 트레이드오프 |
|---|---|---|
| **Framework & Language** | Next.js 15 App Router, React 19, TypeScript (`strict`), Turborepo + pnpm | App Router Server Actions·미들웨어 인증 경계 활용, 모노레포에서 `frontend`와 `packages/*` 타입 공유 |
| **Styling & Design System** | Vanilla Extract, OKLCH 토큰, `@layer` (`reset < design-system < app < utilities`), Container Query (`cqw`/`cqh`) | 제로 런타임 CSS로 스타일 오버헤드 제거, 모바일 디바이스 프레임 내부 비례 스케일링을 뷰포트가 아닌 컨테이너 단위로 제어 |
| **State & Data Contract** | TanStack Query v5, Zustand (`sessionStorage` persist), Zod v4 | 서버 진실(계좌 잔액·거래 내역)은 TanStack Query가 소유하고 Zustand 송금 스토어에서 잔액을 제거해 단계 간 잔액 불일치 차단; 스토리지·쿠키·폼 경계 모두 Zod v4로 런타임 검증 |
| **Visualization** | D3.js (`TransactionChartController` 패턴) | 고빈도 마우스 호버 좌표 계산과 SVG 갱신을 명령형 클래스에 캡슐화해 React 리렌더링 병목과 레이아웃 시프트 차단 |
| **Data & Integrity** | PostgreSQL, Prisma 7, `TransferService` (`SELECT ... FOR UPDATE`) | 송금 시 계좌 PK 오름차순 락으로 데드락과 동시성 Lost Update 방지([`ADR-0002`](./docs/adr/0002-pessimistic-locking-for-transfers.md)) |
| **Security (OWASP UI Boundary)** | `jose` (`A256GCM` 암호화 `httpOnly`/`SameSite=lax` 쿠키), 프로덕션 CSP, OWASP 응답 헤더 | 프로덕션 CSP에서 `'unsafe-eval'` 제거, `X-Frame-Options: DENY`·`nosniff`·`Referrer-Policy`·`Permissions-Policy`·HSTS·`poweredByHeader: false` 적용, CI `pnpm audit --prod --audit-level=high` |
| **Quality & AI Tooling** | Custom DS MCP Server (`packages/mcp`), Style Linter (`packages/design-system-linter`), Vitest, Playwright + `@axe-core/playwright`, Lighthouse CI, Biome | AST/TS 타입 체커 기반 디자인 시스템 메타데이터를 AI에 공급하고, CI에서 린트·타입·단위 테스트·WCAG 2.2 AA E2E·LCP/CLS/A11y 예산을 자동 검증 |

---

## 4. 프로젝트 구조

```text
for-digital-divide/
├── frontend/                  # Next.js 15 App Router 금융 교육 웹 애플리케이션
│   ├── src/app/               # 온보딩 · 로그인 · PIN 등록 · 대시보드 · 송금 라우트
│   ├── src/components/        # D3 TransactionChart, 모바일 프레임, 보안 키패드, Instruction 패널
│   ├── src/entities/          # Zod 모델, 서비스(TransferService), 서버 액션
│   ├── src/store/             # Zustand 스토어 (history, onboarding, pin, transfer)
│   ├── e2e/                   # 18화면 여정·WCAG 2.2 AA·24×24px 타깃·OTP 피드백 Playwright 테스트
│   ├── reports/               # UX/접근성 검증 근거 및 차트 벤치마크 JSON
│   └── lighthouserc.json      # Lighthouse CI 성능·접근성 예산 설정 (LCP ≤ 2.5s, CLS ≤ 0.1, A11y ≥ 0.95)
├── packages/
│   ├── design-system/         # Vanilla Extract + OKLCH + Radix 기반 공용 컴포넌트 & MCP 메타데이터 빌더
│   ├── design-system-linter/  # CSS 선언 → Sprinkles 토큰 변환 및 감사 엔진
│   └── mcp/                   # AI 에이전트용 디자인 시스템 MCP 서버
├── docs/
│   ├── AI_USAGE.md            # AI 협업 경계, 커스텀 MCP 워크플로우, 결함 포착 사례
│   └── adr/                   # 아키텍처 의사결정 기록 (MCP Fallback, Pessimistic Lock 등)
└── .github/workflows/ci.yml   # Biome · tsc · Vitest · Build · Audit · Playwright WCAG 2.2 · Lighthouse CI
```

---

## 5. AI 협업 경계 및 검증 루프

이 저장소는 AI를 단순 코드 생성기가 아니라 **명세와 자동 검증 게이트 안에서 동작하는 구현 보조 도구**로 운영합니다.

- **인간 소유:** 도메인 UX 분리 원칙, Zod 데이터 계약, OKLCH 대비 토큰, DB 트랜잭션 락 정책, 보안·접근성 통과 기준
- **AI 위임:** 명세 기반 프레젠테이션 컴포넌트·안내 패널·테스트 초안 작성 (커스텀 MCP 서버로 토큰·prop 환각 차단)
- **검증 사례:** 중첩 `<label>` HTML 스펙 위반 수정, 18개 화면 axe 위반 `204 → 0` 해소, MCP 평가에서 `<Flex as="form">` 제약 포착, 보안 헤더·쿠키 `secure` 버그 수정 및 단위 테스트 잠금

자세한 사례와 한계는 [`docs/AI_USAGE.md`](./docs/AI_USAGE.md)를 참고하세요.

---

## 6. 빠른 시작 및 로컬 검증

### 사전 요구사항

- Node.js `24` (`.nvmrc`) · `pnpm` (`corepack enable`)
- 인증·계좌·송금 등 전체 플로우 실행 시 PostgreSQL(`DATABASE_URL`)과 32바이트 Base64 `JWT_SECRET` 필요
- E2E 테스트는 데이터 오염 방지를 위해 로컬 PostgreSQL(`E2E_DATABASE_URL`, `localhost`/`127.0.0.1`만 허용)에서만 실행되도록 가드되어 있습니다.

### 설치 및 실행

```bash
pnpm install

# 환경 변수 설정 (frontend/.env)
# DATABASE_URL="postgresql://<user>@localhost:5432/for_digital_divide"
# JWT_SECRET="<32-byte base64 string>"   # 예: openssl rand -base64 32

pnpm --filter frontend run dev
```

### 품질 검증 명령어

```bash
# 1. Biome 린트 및 포맷 검사
pnpm run ci

# 2. TypeScript strict 타입 검사
pnpm --filter frontend run typecheck

# 3. Vitest 단위·보안 헤더·차트 성능 테스트
pnpm --filter frontend run test

# 4. D3 차트 5,000건 CPU 마이크로벤치마크
pnpm --filter frontend run benchmark:transaction-chart

# 5. Next.js 프로덕션 빌드
pnpm --filter frontend run build

# 6. 18화면 E2E + WCAG 2.2 AA + 24×24px 타깃 크기 + OTP 피드백 (로컬 Postgres 필요)
pnpm --filter frontend run e2e:db
pnpm --filter frontend run e2e
pnpm --filter frontend run e2e:report
```

---

## 7. 배포 및 환경 참고

- 프론트엔드 정적 빌드(`pnpm --filter frontend run build`)는 외부 DB 연결 없이도 완료되지만, 런타임 회원가입·세션·PIN·송금 기능은 PostgreSQL 데이터베이스(`DATABASE_URL`)와 `JWT_SECRET` 환경 변수가 연결된 환경(예: Vercel + Neon PostgreSQL)을 전제로 동작합니다.
- Nest.js 백엔드 분리 및 공용 계약 패키지(`packages/contracts`)는 [`docs/adr/0003`](./docs/adr/0003-shared-api-contracts-for-backend-migration.md)·[`0004`](./docs/adr/0004-db-backed-opaque-session-cookie.md)에 기록된 진행 중 작업이며, 현재 메인 사용자 플로우는 `frontend/`에서 완결됩니다.
