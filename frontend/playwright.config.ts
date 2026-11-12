import { userInfo } from "node:os";
import { defineConfig, devices } from "@playwright/test";

const E2E_PORT: number = Number(process.env.E2E_PORT ?? "3100");
const E2E_DATABASE_URL: string =
  process.env.E2E_DATABASE_URL ??
  `postgresql://${userInfo().username}@localhost:5432/for_digital_divide_e2e`;

// E2E 는 회원가입·세션·송금으로 DB 에 쓰기를 하므로 로컬 DB 에서만 실행한다.
const dbHost: string = new URL(E2E_DATABASE_URL).hostname;
if (!["localhost", "127.0.0.1", "::1"].includes(dbHost)) {
  throw new Error(
    `E2E_DATABASE_URL must point to a local database (got host: ${dbHost})`,
  );
}

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: false,
  workers: 1,
  retries: 0,
  timeout: 180_000,
  expect: { timeout: 15_000 },
  reporter: [["list"]],
  use: {
    baseURL: `http://localhost:${E2E_PORT}`,
    // 모바일 UA 는 미들웨어가 /mobile 로 보내므로 데스크톱 환경으로 고정한다.
    ...devices["Desktop Chrome"],
    viewport: { width: 1440, height: 900 },
    actionTimeout: 15_000,
    navigationTimeout: 60_000,
    trace: "retain-on-failure",
  },
  webServer: {
    command: `pnpm exec next dev -p ${E2E_PORT}`,
    url: `http://localhost:${E2E_PORT}/onboarding`,
    reuseExistingServer: true,
    timeout: 180_000,
    env: { DATABASE_URL: E2E_DATABASE_URL },
  },
});
