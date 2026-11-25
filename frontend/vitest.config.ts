import path from "node:path";
import { configDefaults, defineConfig } from "vitest/config";

const runDbTests = process.env.RUN_DB_TESTS === "true";

export default defineConfig({
  test: {
    // e2e/ 와 *.spec.ts 는 Playwright 로 실행한다 (pnpm e2e).
    // DB 통합 테스트(transfer.service.test.ts)는 RUN_DB_TESTS=true (pnpm test:integration) 에서만 실행한다.
    exclude: [
      ...configDefaults.exclude,
      "e2e/**",
      "**/*.spec.ts",
      ...(runDbTests
        ? []
        : ["src/entities/transactions/transfer.service.test.ts"]),
    ],
    environment: "node",
    setupFiles: ["./tests/setup.ts"],
    globals: true,
    testTimeout: 30_000,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@root": path.resolve(__dirname, "./"),
    },
  },
});
