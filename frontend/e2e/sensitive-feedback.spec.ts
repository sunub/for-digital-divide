import { expect, type Locator, type Page, test } from "@playwright/test";
import { writeEvidence } from "./support/report";

/**
 * 민감 단계(SMS 인증번호) 피드백 검증.
 * - 만료·불일치 시 오류가 화면과 보조기기 양쪽에 즉시 전달되는가
 * - 시간 연장 시 오류가 해제되어 다시 진행할 수 있는가
 * - 인증번호 알림에서 번호가 강조되고, 스크린리더에 자동으로 전달되는가
 */

const EXPIRED_MESSAGE: string =
  "인증번호의 유효기간이 지나서 잘못되었습니다. 다시 요청해주세요.";
const MISMATCH_MESSAGE: string =
  "인증번호가 일치하지 않습니다. 다시 확인해 주세요.";
const OTP_TIME_LIMIT_MS: number = 180_000;

interface FeedbackCheck {
  name: string;
  passed: boolean;
  detail: string;
}

const checks: FeedbackCheck[] = [];

async function goToOtpStep(page: Page): Promise<Locator> {
  const main: Locator = page.locator("main").first();
  await page.goto("/onboarding");
  await main.getByText("휴대폰인증", { exact: true }).click();
  await main.getByRole("button", { name: "본인 정보 입력 완료" }).click();
  await expect(page).toHaveURL(/step=verify-otp/);
  return main;
}

async function readOtpFromNotification(page: Page): Promise<string> {
  const code: string | null = await page
    .locator("p", { hasText: "Web발신" })
    .locator("strong")
    .textContent();
  return (code ?? "").trim();
}

test.describe.configure({ mode: "serial" });

test("인증번호가 만료되면 오류를 즉시 알리고, 시간 연장 시 해제한다", async ({
  page,
}: {
  page: Page;
}) => {
  await page.clock.install();
  const main: Locator = await goToOtpStep(page);
  const input: Locator = main.getByRole("textbox", {
    name: "인증번호 6자리 입력",
  });

  await page.clock.runFor(OTP_TIME_LIMIT_MS + 1_000);

  const alert: Locator = main.getByRole("alert").filter({
    hasText: EXPIRED_MESSAGE,
  });
  await expect(alert).toBeVisible();
  await expect(input).toHaveAttribute("aria-invalid", "true");
  const describedBy: string =
    (await input.getAttribute("aria-describedby")) ?? "";
  const alertId: string = (await alert.getAttribute("id")) ?? "";
  expect(alertId.length > 0 && describedBy.split(" ").includes(alertId)).toBe(
    true,
  );
  await expect(main.getByRole("button", { name: "인증하기" })).toBeDisabled();
  checks.push({
    name: "otp-expired-announced",
    passed: true,
    detail:
      "만료 시 role=alert 오류 노출, 입력창 aria-invalid=true · aria-describedby 연결, 인증하기 비활성화",
  });

  await main.getByRole("button", { name: "시간 연장" }).click();
  await expect(alert).toHaveCount(0);
  await expect(input).not.toHaveAttribute("aria-invalid", "true");
  checks.push({
    name: "otp-expired-recoverable",
    passed: true,
    detail: "시간 연장 시 오류 해제, aria-invalid 해제",
  });
});

test("잘못된 인증번호는 오류로 알리고, 올바른 번호로 다시 진행할 수 있다", async ({
  page,
}: {
  page: Page;
}) => {
  const main: Locator = await goToOtpStep(page);
  const input: Locator = main.getByRole("textbox", {
    name: "인증번호 6자리 입력",
  });
  const code: string = await readOtpFromNotification(page);
  expect(code).toMatch(/^\d{6}$/);
  const wrongCode: string = code === "000000" ? "111111" : "000000";

  await input.fill(wrongCode);
  await main.getByRole("button", { name: "인증하기" }).click();
  await expect(
    main.getByRole("alert").filter({ hasText: MISMATCH_MESSAGE }),
  ).toBeVisible();
  await expect(input).toHaveAttribute("aria-invalid", "true");
  checks.push({
    name: "otp-mismatch-announced",
    passed: true,
    detail: "불일치 시 role=alert 오류 노출, aria-invalid=true",
  });

  await input.fill(code);
  await main.getByRole("button", { name: "인증하기" }).click();
  await expect(page).toHaveURL(/step=terms/);
  checks.push({
    name: "otp-mismatch-recoverable",
    passed: true,
    detail: "올바른 번호 재입력 시 다음 단계(약관 동의)로 진행",
  });
});

test("인증번호 알림에서 번호를 강조하고, 스크린리더에도 전달한다", async ({
  page,
}: {
  page: Page;
}) => {
  await goToOtpStep(page);
  const notification: Locator = page.locator("p", { hasText: "Web발신" });
  await expect(notification.locator("strong")).toHaveText(/^\d{6}$/);
  checks.push({
    name: "otp-code-highlighted",
    passed: true,
    detail: "인증번호 알림에서 6자리 번호를 <strong>으로 강조",
  });

  // 알림이 항상 렌더링되는 live region 안에 있어야 스크린리더가 자동으로 읽는다.
  const inLiveRegion: boolean = await notification.evaluate(
    (element: Element): boolean =>
      element.closest('[role="status"], [role="alert"], [aria-live]') !== null,
  );
  checks.push({
    name: "otp-notification-live-region",
    passed: inLiveRegion,
    detail: inLiveRegion
      ? "인증번호 알림이 live region 안에 있음"
      : "인증번호 알림이 live region 밖에 있어 스크린리더에 자동으로 읽히지 않음 (개선 필요)",
  });
  expect(inLiveRegion, "OTP notification must be inside a live region").toBe(
    true,
  );
});

test.afterAll(async () => {
  await writeEvidence("sensitive-feedback.json", {
    generatedAt: new Date().toISOString(),
    totals: {
      checks: checks.length,
      passed: checks.filter((check: FeedbackCheck) => check.passed).length,
    },
    checks,
  });
});
