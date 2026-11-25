# UX 설계 검증 근거 (for-digital-divide)

> 자동 생성 파일입니다. `pnpm e2e` 실행 후 `pnpm e2e:report` 로 다시 만듭니다.
> 측정: guide-sync 2026-11-12T00:06:55.538Z · sensitive-feedback 2026-11-12T00:07:04.332Z
> 환경: 로컬 PostgreSQL, Next.js dev 서버, Desktop Chrome 1440×900

## 0. 수정 전후 비교

| 지표 | 수정 전 (2026-11-11) | 수정 후 (2026-11-12) |
|---|---|---|
| axe 위반 규칙 종류 | 5종 | **0종** |
| axe 위반 요소 수 | 204개 | **0개** |
| 위반이 있는 화면 | 18/18 | **0/18** |
| 민감 단계 피드백 검사 | 5/6 | **6/6** |
| 안내가 "단계 안내" 랜드마크 안에 있음 | 측정 안 함 (랜드마크 없음) | **18/18** |

> 측정 방식 차이: 수정 후 측정은 axe 검사 전에 진행 중인 애니메이션이 끝나기를 기다립니다. 수정 전 위반 요소 중 일부(토스트가 나타나거나 사라지는 중의 반투명 글자)는 이 차이 때문에 함께 집계되었습니다.
> 수정 전 원본: `reports/ux-evidence/baseline/`

### 수정 전 axe 위반 규칙

| 규칙 | 영향도 | 위반 화면 수 | 위반 요소 수 | 설명 |
|---|---|---|---|---|
| `color-contrast` | serious | 18 | 143 | Elements must meet minimum color contrast ratio thresholds |
| `document-title` | serious | 18 | 18 | Documents must have <title> element to aid in navigation |
| `scrollable-region-focusable` | serious | 7 | 7 | Scrollable region must have keyboard access |
| `button-name` | critical | 5 | 29 | Buttons must have discernible text |
| `label-content-name-mismatch` | serious | 4 | 7 | Elements must have their visible text as part of their accessible name |

## 1. 요약

| 항목 | 결과 | 근거 |
|---|---|---|
| 실제로 진행한 사용자 여정 화면 | **18개** (온보딩 → 로그인 → PIN 등록 → 대시보드 → 송금) | `e2e/guide-sync.spec.ts` |
| 조작은 프레임 안, 설명은 프레임 밖 | **18/18** 화면 | 레이아웃 박스 측정 |
| 안내가 "단계 안내" 랜드마크(aside) 안에 있음 | **18/18** 화면 | 접근성 트리 조회 |
| 단계가 바뀔 때 안내도 바뀜 | **16/17** 전환 (나머지는 가입→로그인 의도적 공유) | 안내 제목 비교 |
| 안내에 "왜" 소제목 포함 | 10/18 화면 | 안내 소제목 수집 |
| 민감 단계(OTP) 피드백 검사 | **6/6** 통과 | `e2e/sensitive-feedback.spec.ts` |
| WCAG 2.1 AA 자동 검사(axe) | **위반 0종 · 0개 요소 · 0/18 화면** | `wcag2a, wcag2aa, wcag21a, wcag21aa` |

## 2. 화면별 결과

| # | 흐름 | 화면 | 안내 제목 | 안내 소제목 | 조작/설명 분리 | 단계 전환 시 안내 변경 | axe 위반 규칙 수 |
|---|---|---|---|---|---|---|---|
| 1 | onboarding | 본인 확인 방식 선택 | 안전한 금융 거래를 위해 본인 확인 방식을 선택해 주세요 | 왜 필요한가요? / 어떤 방식이 있나요? | ✅ | 시작 | 0 |
| 2 | onboarding | 본인인증 정보 입력 | 정확한 본인 확인을 위해 개인 정보를 입력해 주세요 | 왜 이 정보가 필요한가요? / 무엇을 주의해야 하나요? | ✅ | ✅ | 0 |
| 3 | onboarding | SMS 인증번호 입력 | 문자로 발송된 인증번호 6자리를 입력해 주세요 | 인증번호가 오지 않나요? / 시간이 초과되었다면? | ✅ | ✅ | 0 |
| 4 | onboarding | 약관 동의 | 서비스 이용을 위해 필수 약관에 동의해 주세요 | 왜 필요한가요? / 무엇을 확인해야 하나요? | ✅ | ✅ | 0 |
| 5 | onboarding | 신분증 유형 선택 | 안전한 금융 거래를 위해 신분증 확인이 필요합니다 | 빛 반사 주의 / 정확한 영역 확인 | ✅ | ✅ | 0 |
| 6 | onboarding | 신분증 정보 확인 | 인식된 신분증 정보가 맞는지 확인해 주세요 | 왜 꼼꼼히 봐야 하나요? / 수정은 어떻게 하나요? | ✅ | ✅ | 0 |
| 7 | login | 로그인 방식 선택 | 가장 편리한 방법으로 로그인을 시작하세요 | 어떤 로그인 방법이 좋은가요? | ✅ | ✅ | 0 |
| 8 | login | 이메일 회원가입 | 가입하신 정보로 안전하게 로그인 | 안전한 사용을 위한 보안 수칙 | ✅ | ✅ | 0 |
| 9 | login | 이메일 로그인 | 가입하신 정보로 안전하게 로그인 | 안전한 사용을 위한 보안 수칙 | ✅ | 공유(의도) | 0 |
| 10 | pin-register | PIN 등록 1/2 | 안전하고 간편한 비밀번호를 설정해 주세요 | 어떤 번호가 좋은가요? / 주의할 점 | ✅ | ✅ | 0 |
| 11 | pin-register | PIN 등록 2/2 | 입력하신 비밀번호를 다시 한번 확인합니다 | 왜 한 번 더 입력하나요? / 틀리면 어떻게 되나요? | ✅ | ✅ | 0 |
| 12 | dashboard | 대시보드 | 계좌를 확인한 뒤 이체를 시작해 주세요 | 먼저 무엇을 확인하나요? / 어디로 이동하나요? | ✅ | ✅ | 0 |
| 13 | transfer | 받는 사람 선택 | 먼저 받을 사람을 선택해 주세요 | 왜 필요한가요? / 무엇을 해야 하나요? | ✅ | ✅ | 0 |
| 14 | transfer | 계좌번호 직접 입력 | 은행과 계좌번호를 정확히 입력해 주세요 | 왜 필요한가요? / 무엇을 해야 하나요? / 테스트용 가상 계좌 | ✅ | ✅ | 0 |
| 15 | transfer | 금액 입력 | 보낼 금액을 입력해 주세요 | 왜 필요한가요? / 무엇을 해야 하나요? | ✅ | ✅ | 0 |
| 16 | transfer | 최종 확인 | 보내기 전에 최종 확인해 주세요 | 왜 필요한가요? / 무엇을 해야 하나요? | ✅ | ✅ | 0 |
| 17 | transfer | 간편 비밀번호 인증 | 간편 비밀번호로 이체를 인증해 주세요 | 왜 필요한가요? / 무엇을 해야 하나요? | ✅ | ✅ | 0 |
| 18 | transfer | 이체 완료 | 고생하셨습니다 교육이 완료되었습니다 | 무엇을 마쳤나요? / 이제 무엇을 하면 되나요? | ✅ | ✅ | 0 |

## 3. 민감 단계 피드백

| 검사 | 결과 | 내용 |
|---|---|---|
| `otp-expired-announced` | ✅ | 만료 시 role=alert 오류 노출, 입력창 aria-invalid=true · aria-describedby 연결, 인증하기 비활성화 |
| `otp-expired-recoverable` | ✅ | 시간 연장 시 오류 해제, aria-invalid 해제 |
| `otp-mismatch-announced` | ✅ | 불일치 시 role=alert 오류 노출, aria-invalid=true |
| `otp-mismatch-recoverable` | ✅ | 올바른 번호 재입력 시 다음 단계(약관 동의)로 진행 |
| `otp-code-highlighted` | ✅ | 인증번호 알림에서 6자리 번호를 <strong>으로 강조 |
| `otp-notification-live-region` | ✅ | 인증번호 알림이 live region 안에 있음 |

## 4. 접근성 자동 검사 (axe, WCAG 2.1 AA)

위반 없음 (모든 화면 0건)

## 5. 관찰값

- 송금 단계 간 잔액 표시: 금액 입력 7,819,057원 / 최종 확인 7,819,057원 → 일치
