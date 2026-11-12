import path from "node:path";
import { configDefaults, defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    // e2e/ 는 Playwright 로 실행한다 (pnpm e2e)
    exclude: [...configDefaults.exclude, "e2e/**"],
    environment: "node",
    setupFiles: ["./tests/setup.ts"],
    globals: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@root": path.resolve(__dirname, "./"),
    },
  },
});
