# 대시보드 금융 데이터 누락 및 잔액 불일치 정밀 진단 보고서

이 보고서는 데모 데이터가 시딩 완료되었음에도 대시보드에서 거래내역 및 잔액이 모두 `0`으로 노출되고, 카드와 그래프 잔액이 일치하지 않았던 결함에 대한 원인 분석과 기술적 배경을 상세히 다룹니다.

---

## 1. 개요 및 결함 현상
* **결함 1 (데이터 미노출)**: 데모 데이터 시딩 과정에서 `368건의 거래가 생성 및 반영 완료`되었다는 로그가 나타났으나, 실제 대시보드에서는 수입, 지출, 잔액이 모두 **0원**으로 초기화되는 현상이 발생했습니다.
* **결함 2 (잔액 불일치)**: 상단 계좌 카드에 표시되는 실제 잔액과 하단 그래프의 끝부분 잔액이 싱크되지 않고 전혀 다른 숫자로 렌더링되었습니다.

---

## 2. 결함의 핵심 원인 분석

### 📌 원인 A: 데이터베이스 기본키(PK) 속성과 Prisma `skipDuplicates` 충돌 (데이터 적재 실패)
* **데이터베이스의 속성**: PostgreSQL 데이터베이스의 `transactions` 테이블은 `transaction_id` 컬럼을 기본 키(Primary Key)로 사용하며, `@id @default(autoincrement())` 속성이 부여되어 있습니다.
* **사용자 코드의 문제**: 데모 데이터 생성기([generateTransactions.ts](file:///Users/sunub/workspace/for-digital-divide/frontend/scripts/generateTransactions.ts))에서 각 거래 데이터의 `transaction_id`를 `1`부터 1씩 순차적으로 증가시키며 강제 부여했습니다.
* **Prisma의 동작과 충돌**: 기존 데이터베이스에는 이미 이전 유저의 시드 데이터로 인해 `transaction_id` `1 ~ 600`이 선점되어 있었습니다. Prisma의 `createMany` 메서드는 `skipDuplicates: true` 옵션이 적용되어 있어, 기본 키 중복 충돌이 발생한 368건의 새 데이터를 **에러 출력 없이 조용히 무시(Skip)**하고 삽입 절차를 끝내버렸습니다.
* **결과**: `user_id: 3` 사용자의 계좌에는 단 한 건의 거래 데이터도 실제로 저장되지 않았습니다.

### 📌 원인 B: 쿼리 Select 필드 누락과 Zod 런타임 유효성 검사 충돌 (데이터 파싱 실패)
* **사용자 코드의 문제**: 데이터베이스 리포지토리 파일인 [transaction.repository.ts](file:///Users/sunub/workspace/for-digital-divide/frontend/src/entities/transactions/transaction.repository.ts)의 `findByAccountNumber` 메서드에서 성능 및 최적화를 목적으로 `select` 문을 작성할 때, `description`과 `counterparty_account_number`를 명기하지 않았습니다.
* **Zod 검증과의 충돌**: 서버 라우트 API는 쿼리 결과를 프론트엔드로 보내기 전에 [parseTransaction](file:///Users/sunub/workspace/for-digital-divide/frontend/src/entities/transactions/transaction.model.ts#L65)을 거쳐 유효성을 검사합니다. Zod 스키마 상에서 두 필드는 `optional`이지만, 쿼리 응답에서 키 자체가 완전히 누락되어 검증 엔진이 이를 **유효하지 않은 데이터**로 판단하고 필터링해 버렸습니다.
* **결과**: 기존에 로드될 수 있었던 데이터들조차 검증에 탈락해 프론트엔드에는 **빈 배열(`[]`)**이 수신되었습니다.

### 📌 원인 C: 프론트엔드 데이터 흐름(Props) 누락 (잔액 불일치)
* **사용자 코드의 문제**: [TransactionHistory.tsx](file:///Users/sunub/workspace/for-digital-divide/frontend/src/app/dashboard/ui/Dashboard/ui/TransactionChart/TransactionHistory.tsx)에서 `<TransactionChart />` 컴포넌트를 렌더링할 때 계좌의 실시간 잔액인 `currentBalance` prop을 넘겨주지 않았습니다.
* **결과**: 차트가 기본값인 `0`을 현재 잔액의 기준으로 인지하여 일별 데이터 역산을 수행하면서 카드에 기재된 금액과 차트의 파형이 완전히 다르게 그려졌습니다.

---

## 3. 문제를 파악하기 위해 필요한 핵심 지식

### 💡 1. BigInt와 Number 정밀도
* **정의**: **BigInt**는 자바스크립트의 표준 `Number` 타입이 안전하게 표현할 수 있는 최대 정수 범위를 초과하는 아주 큰 정수를 오차 없이 다루기 위한 타입입니다.
* **중요성**: 데이터베이스의 계좌번호나 순차 증가 ID는 자바스크립트의 53비트 정수 범위를 쉽게 넘어설 수 있으므로, 데이터베이스와의 데이터 교환 시 타입 불일치가 나지 않도록 `BigInt(value)` 또는 소수점/문자열 변환을 정확히 처리해야 합니다.

### 💡 2. ORM (Object-Relational Mapping)과 Prisma
* **정의**: **ORM**은 데이터베이스의 테이블들을 자바스크립트/타입스크립트의 객체(Object)와 자동으로 연결해 주어, SQL 쿼리를 직접 작성하지 않고도 코드로 데이터를 쉽게 다룰 수 있게 해주는 도구입니다.
* **주의점**: Prisma ORM은 타입을 엄격하게 강제합니다. 특히 `createMany` 단계에서 기본키(PK)가 수동으로 들어가고 중복 시 이를 무시하도록 설정(`skipDuplicates: true`)되면 데이터가 들어가지 않아도 조용히 성공을 반환하여 원인을 찾기 어렵게 만듭니다.

### 💡 3. Zod 스키마와 런타임 타입 세이프티
* **정의**: **Zod 스키마**는 컴파일 시점뿐만 아니라 실제 서비스가 구동되는 **런타임(Runtime)** 시점에 서버나 API로부터 전송된 데이터가 사전에 정의한 규격(타입, 제한 사항)을 올바르게 충족하는지 엄격히 검증하는 검증 라이브러리입니다.
* **영향**: 타입스크립트는 빌드 시점의 타입만 체크하지만, Zod는 런타임에 필드가 하나라도 어긋나거나 누락되면 데이터 자체를 차단하여 시스템의 비정상 작동을 막습니다. 쿼리 select 문을 변경할 때는 항상 Zod 스키마의 규격도 함께 고려해야 합니다.

---

## 4. 해결 조치 사항 및 개선 효과

| 수정 영역 | 수정한 파일 | 개선 효과 |
| :--- | :--- | :--- |
| **시드 인서트 차단 해제** | [seed.ts](file:///Users/sunub/workspace/for-digital-divide/frontend/prisma/seed.ts) | 배치 삽입 데이터에서 `transaction_id`를 제외하여 DB의 자동 증가 시스템 작동 유도 (중복 충돌 해결) |
| **리포지토리 쿼리 정상화** | [transaction.repository.ts](file:///Users/sunub/workspace/for-digital-divide/frontend/src/entities/transactions/transaction.repository.ts) | `select` 문에 누락된 필드들을 완벽히 추가하고 BigInt 캐스팅을 보강해 Zod 검증 오류 예방 |
| **차트 컴포넌트 실시간 연동** | [TransactionHistory.tsx](file:///Users/sunub/workspace/for-digital-divide/frontend/src/app/dashboard/ui/Dashboard/ui/TransactionChart/TransactionHistory.tsx) | 현재 선택된 카드의 실제 잔액(`account.balance`)을 주입하여 카드와 그래프의 잔액 수치 100% 일치화 완료 |
