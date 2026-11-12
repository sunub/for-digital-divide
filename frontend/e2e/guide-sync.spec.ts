import { expect, type Locator, type Page, test } from "@playwright/test";
import {
  type ScreenEvidence,
  type ScreenSpec,
  verifyScreen,
  WCAG_TAGS,
} from "./support/checkpoint";
import { pressSecurePin } from "./support/pin";
import { writeEvidence } from "./support/report";

/**
 * 사용자 여정 전체(온보딩 → 로그인 → PIN 등록 → 대시보드 → 송금)를 실제로 진행하면서
 * 화면마다 "조작은 모바일 프레임 안 / 설명은 프레임 밖 / 설명은 현재 단계용" 을 검증한다.
 */

const PIN: string = "135792";
const PASSWORD: string = "E2eTest!2345";

const SCREENS: Readonly<Record<string, ScreenSpec>> = {
  verifySelection: {
    id: "verify-selection",
    label: "본인 확인 방식 선택",
    flow: "onboarding",
    url: /\/onboarding(\?step=verify-selection)?$/,
    guideHeading: /본인 확인 방식을 선택해 주세요/,
    frameControl: (main: Locator) =>
      main.getByText("휴대폰인증", { exact: true }),
  },
  verifyInfo: {
    id: "verify-info",
    label: "본인인증 정보 입력",
    flow: "onboarding",
    url: /step=verify-info/,
    guideHeading: /개인 정보를 입력해 주세요/,
    frameControl: (main: Locator) =>
      main.getByRole("button", { name: "본인 정보 입력 완료" }),
  },
  verifyOtp: {
    id: "verify-otp",
    label: "SMS 인증번호 입력",
    flow: "onboarding",
    url: /step=verify-otp/,
    guideHeading: /인증번호 6자리를 입력해 주세요/,
    frameControl: (main: Locator) =>
      main.getByRole("textbox", { name: "인증번호 6자리 입력" }),
  },
  terms: {
    id: "terms",
    label: "약관 동의",
    flow: "onboarding",
    url: /step=terms/,
    guideHeading: /필수 약관에 동의해 주세요/,
    frameControl: (main: Locator) => main.getByRole("button", { name: "다음" }),
  },
  idCardSelection: {
    id: "id-card-selection",
    label: "신분증 유형 선택",
    flow: "onboarding",
    url: /step=id-card-selection/,
    guideHeading: /신분증 확인이 필요합니다/,
    frameControl: (main: Locator) =>
      main.getByRole("button", { name: "신분증 인증" }),
  },
  idCardInfo: {
    id: "id-card-info",
    label: "신분증 정보 확인",
    flow: "onboarding",
    url: /step=id-card-info/,
    guideHeading: /신분증 정보가\s*맞는지 확인해 주세요/,
    frameControl: (main: Locator) => main.getByRole("button", { name: "다음" }),
  },
  loginSelection: {
    id: "login-selection",
    label: "로그인 방식 선택",
    flow: "login",
    url: /\/onboarding\/login-selection$/,
    guideHeading: /가장 편리한 방법으로\s*로그인을 시작하세요/,
    frameControl: (main: Locator) =>
      main.locator('a[href*="method=email&step=register"]'),
  },
  emailRegister: {
    id: "email-register",
    label: "이메일 회원가입",
    flow: "login",
    url: /method=email&step=register/,
    guideHeading: /가입하신 정보로\s*안전하게 로그인/,
    frameControl: (main: Locator) => main.getByRole("button", { name: "확인" }),
  },
  emailLogin: {
    id: "email-login",
    label: "이메일 로그인",
    flow: "login",
    url: /method=email&step=login/,
    guideHeading: /가입하신 정보로\s*안전하게 로그인/,
    frameControl: (main: Locator) => main.getByRole("button", { name: "확인" }),
    sharesGuideWithPrevious: true,
  },
  pinRegister: {
    id: "pin-register",
    label: "PIN 등록 1/2",
    flow: "pin-register",
    url: /\/register-pin$/,
    guideHeading: /비밀번호를\s*설정해 주세요/,
    frameControl: (main: Locator) => main.getByRole("button", { name: "확인" }),
  },
  pinConfirm: {
    id: "pin-confirm",
    label: "PIN 등록 2/2",
    flow: "pin-register",
    url: /\/register-pin\?phase=confirm/,
    guideHeading: /다시 한번 확인합니다/,
    frameControl: (main: Locator) => main.getByRole("button", { name: "확인" }),
  },
  dashboard: {
    id: "dashboard",
    label: "대시보드",
    flow: "dashboard",
    url: /\/dashboard$/,
    guideHeading: /이체를 시작해 주세요/,
    frameControl: (main: Locator) =>
      main.getByRole("link", { name: "이체" }).first(),
  },
  recipientSelection: {
    id: "recipient-selection",
    label: "받는 사람 선택",
    flow: "transfer",
    url: /\/dashboard\/transfer(\?step=recipient-selection)?$/,
    guideHeading: /받을 사람을\s*선택해 주세요/,
    frameControl: (main: Locator) =>
      main.getByRole("button", { name: /^직접 입력/ }),
  },
  recipientInput: {
    id: "recipient-input",
    label: "계좌번호 직접 입력",
    flow: "transfer",
    url: /step=recipient-input/,
    guideHeading: /계좌번호를\s*정확히 입력해 주세요/,
    frameControl: (main: Locator) =>
      main.getByRole("textbox", { name: "계좌번호" }),
  },
  amountInput: {
    id: "amount-input",
    label: "금액 입력",
    flow: "transfer",
    url: /step=amount-input/,
    guideHeading: /보낼 금액을\s*입력해 주세요/,
    frameControl: (main: Locator) => main.getByRole("button", { name: "완료" }),
  },
  summary: {
    id: "summary",
    label: "최종 확인",
    flow: "transfer",
    url: /step=summary/,
    guideHeading: /최종 확인해 주세요/,
    frameControl: (main: Locator) => main.getByRole("button", { name: "다음" }),
  },
  confirmPin: {
    id: "confirm-pin",
    label: "간편 비밀번호 인증",
    flow: "transfer",
    url: /step=confirm-pin/,
    guideHeading: /이체를 인증해 주세요/,
    frameControl: (main: Locator) =>
      main.getByRole("button", { name: /님에게 이체$/ }),
  },
  success: {
    id: "success",
    label: "이체 완료",
    flow: "transfer",
    url: /step=success/,
    guideHeading: /교육이 완료되었습니다/,
    frameControl: (main: Locator) =>
      main.getByRole("button", { name: "대시보드로 돌아가기" }),
  },
};

interface BalanceObservation {
  amountInputStep: string | null;
  summaryStep: string | null;
  consistent: boolean;
}

async function readBalanceText(main: Locator): Promise<string | null> {
  const text: string | null = await main
    .getByText(/잔액:\s*[\d,]+\s*원/)
    .first()
    .textContent();
  const match: RegExpMatchArray | null = text?.match(/([\d,]+)\s*원/) ?? null;
  return match ? match[1] : null;
}

test("단계별 안내가 현재 단계와 동기화되고, 조작/설명 영역이 분리된다", async ({
  page,
}: {
  page: Page;
}) => {
  const evidence: ScreenEvidence[] = [];
  let previousHeading: string | null = null;
  const main: Locator = page.locator("main").first();

  const checkpoint = async (spec: ScreenSpec): Promise<void> => {
    await test.step(`${spec.id}: ${spec.label}`, async () => {
      const result: ScreenEvidence = await verifyScreen(
        page,
        spec,
        previousHeading,
      );
      evidence.push(result);
      previousHeading = result.guideHeading;
    });
  };

  // ── 온보딩 퍼널 ─────────────────────────────────────────────
  await page.goto("/onboarding");
  await checkpoint(SCREENS.verifySelection);
  await main.getByText("휴대폰인증", { exact: true }).click();

  await checkpoint(SCREENS.verifyInfo);
  await main.getByRole("button", { name: "본인 정보 입력 완료" }).click();

  await checkpoint(SCREENS.verifyOtp);
  const otpCode: string = (
    (await page
      .locator("p", { hasText: "Web발신" })
      .locator("strong")
      .textContent()) ?? ""
  ).trim();
  expect(otpCode).toMatch(/^\d{6}$/);
  await main
    .getByRole("textbox", { name: "인증번호 6자리 입력" })
    .fill(otpCode);
  await main.getByRole("button", { name: "인증하기" }).click();

  await checkpoint(SCREENS.terms);
  await main.getByText("전체동의 (선택 동의 포함)", { exact: true }).click();
  await main.getByRole("button", { name: "다음" }).click();

  await checkpoint(SCREENS.idCardSelection);
  await main.getByRole("button", { name: "신분증 인증" }).click();

  await checkpoint(SCREENS.idCardInfo);
  await main.getByRole("button", { name: "다음" }).click();

  // ── 로그인 방식 선택 · 이메일 가입/로그인 ─────────────────────
  await checkpoint(SCREENS.loginSelection);
  await main.locator('a[href*="method=email&step=register"]').click();

  const email: string = `e2e-${Date.now()}@example.test`;
  await checkpoint(SCREENS.emailRegister);
  await main
    .getByRole("textbox", { name: "사용자 이름을 입력해주세요" })
    .fill("Etester");
  await main
    .getByRole("textbox", { name: "이메일을 입력해주세요" })
    .fill(email);
  await main
    .getByRole("textbox", { name: "비밀번호를 입력해주세요" })
    .fill(PASSWORD);
  await main.getByRole("button", { name: "확인" }).click();

  await checkpoint(SCREENS.emailLogin);
  await main
    .getByRole("textbox", { name: "이메일을 입력해주세요" })
    .fill(email);
  await main
    .getByRole("textbox", { name: "비밀번호를 입력해주세요" })
    .fill(PASSWORD);
  await main.getByRole("button", { name: "확인" }).click();

  // ── PIN 등록 ────────────────────────────────────────────────
  await page.waitForURL(/\/register-pin/, { timeout: 60_000 });
  await checkpoint(SCREENS.pinRegister);
  await pressSecurePin(page, PIN);
  await main.getByRole("button", { name: "확인" }).click();

  await checkpoint(SCREENS.pinConfirm);
  await pressSecurePin(page, PIN);
  await main.getByRole("button", { name: "확인" }).click();

  // ── 대시보드 → 송금 ─────────────────────────────────────────
  await page.waitForURL(/\/dashboard$/, { timeout: 60_000 });
  await checkpoint(SCREENS.dashboard);
  await main.getByRole("link", { name: "이체" }).first().click();

  await checkpoint(SCREENS.recipientSelection);
  await main.getByRole("button", { name: /^직접 입력/ }).click();

  await checkpoint(SCREENS.recipientInput);
  await main.getByRole("textbox", { name: "계좌번호" }).fill("35791012345607");
  await main.getByRole("button", { name: "은행 또는 증권사 선택" }).click();
  await main.getByRole("button", { name: "하나은행" }).click();
  await main.getByRole("button", { name: "확인" }).click();
  await expect(
    main.getByRole("textbox", { name: "확인된 예금주" }),
  ).toHaveValue("김하나");
  await main.getByRole("button", { name: "다음" }).click();

  await checkpoint(SCREENS.amountInput);
  const amountStepBalance: string | null = await readBalanceText(main);
  for (const key of ["1 버튼", "0 버튼", "00 버튼", "00 버튼"]) {
    await main.getByRole("button", { name: key, exact: true }).click();
  }
  await main.getByRole("button", { name: "완료" }).click();

  await checkpoint(SCREENS.summary);
  const summaryStepBalance: string | null = await readBalanceText(main);
  await main.getByRole("button", { name: "다음" }).click();

  await checkpoint(SCREENS.confirmPin);
  await main.getByRole("button", { name: /님에게 이체$/ }).click();
  await pressSecurePin(page, PIN);
  await main.getByRole("button", { name: "확인" }).click();

  await checkpoint(SCREENS.success);

  // 같은 출금 계좌인데 단계마다 다른 잔액을 보여주면 사용자는 혼란을 겪는다. (관찰값으로만 기록)
  const balance: BalanceObservation = {
    amountInputStep: amountStepBalance,
    summaryStep: summaryStepBalance,
    consistent: amountStepBalance === summaryStepBalance,
  };

  await writeEvidence("guide-sync.json", {
    generatedAt: new Date().toISOString(),
    axeTags: WCAG_TAGS,
    totals: {
      screens: evidence.length,
      guideOutsideFrame: evidence.filter((e) => e.guideOutsideFrame).length,
      frameControlInsideFrame: evidence.filter((e) => e.frameControlInsideFrame)
        .length,
      guideInLandmark: evidence.filter((e) => e.guideInLandmark).length,
      guideChangedOnStepChange: evidence.filter(
        (e) => e.guideChangedFromPrevious === true,
      ).length,
      screensWithWhySection: evidence.filter((e) => e.hasWhySection).length,
      screensWithAxeViolations: evidence.filter((e) => e.axe.violationCount > 0)
        .length,
    },
    balanceObservation: balance,
    screens: evidence,
  });
});
