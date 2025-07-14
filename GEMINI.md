# GEMINI.md

이 문서는 AI 에이전트 Gemini가 `for-digital-divide` 프로젝트를 이해하고 원활하게 협업하기 위한 가이드입니다.

## 1. 프로젝트 개요

- **프로젝트명:** for-digital-divide
- **목적:** 디지털 소외 계층(고령층 등)이 쉽고 안전하게 금융 서비스를 이용할 수 있도록 돕는 간편 송금 및 자산 관리 웹 애플리케이션 개발.
- **주요 기능:**
  - 간편 로그인 (패턴, PIN)
  - 계좌 잔액 및 거래 내역 조회
  - 연락처 기반 간편 송금
  - 피싱 방지 및 보안 알림 기능
- **대상 사용자:** 스마트폰 및 복잡한 UI에 익숙하지 않은 사용자.

## 2. 핵심 명령어

- **의존성 설치:** `pnpm install`
- **개발 서버 실행:** `pnpm dev`
- **프로덕션 빌드:** `pnpm build`
- **프로덕션 서버 시작:** `pnpm start`
- **코드 스타일 검사 (Lint):** `pnpm lint`
- **코드 포맷팅:** `pnpm format`

## 3. 기술 스택 및 아키텍처

- **프레임워크:** Next.js (App Router)
- **언어:** TypeScript
- **데이터베이스 / ORM:** PostgreSQL, Prisma
- **스타일링:** Tailwind CSS, Styled Components
- **상태 관리:** Jotai, Zustand
- **인증:** NextAuth.js (Credentials, FIDO/WebAuthn)
- **테스팅:** Jest, React Testing Library
- **아키텍처:**
  - `src/app`을 중심으로 한 App Router 기반 라우팅.
  - 서버 컴포넌트와 클라이언트 컴포넌트를 적절히 활용.
  - 데이터 페칭 및 변경은 주로 서버 액션(Server Actions)을 통해 처리.
  - 재사용 가능한 UI는 `src/components`에 Atomic Design 패턴을 일부 차용하여 관리.

## 4. 코딩 컨벤션 및 스타일

- **네이밍:**
  - 컴포넌트: `PascalCase` (e.g., `TransactionHistory.tsx`)
  - 함수/변수: `camelCase` (e.g., `fetchUserAccounts`)
  - 파일: `kebab-case` (e.g., `user-profile.ts`)
- **커밋 메시지:** Conventional Commits 규칙을 따르는 것을 권장. (e.g., `feat: Add money transfer feature`)
- **API 엔드포인트:** `src/app/api/` 내에 기능별로 라우트 핸들러를 작성.

## 5. 폴더 구조

- `prisma/`: Prisma 스키마(`schema.prisma`) 및 데이터베이스 마이그레이션 파일.
- `src/app/`: 페이지 및 레이아웃 (App Router).
- `src/app/api/`: 백엔드 API 라우트 핸들러.
- `src/components/`: 재사용 가능한 React 컴포넌트.
- `src/lib/`: 인증, 데이터베이스 로직, 유틸리티 함수 등.
- `src/hooks/`: 커스텀 React 훅.
- `src/store/`: Jotai/Zustand 상태 관리 관련 코드.
