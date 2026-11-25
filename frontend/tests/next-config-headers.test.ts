import { afterEach, describe, expect, it } from "vitest";
import nextConfig from "../next.config";

const ORIGINAL_NODE_ENV = process.env.NODE_ENV;
const ORIGINAL_ALLOW_LOCAL_HTTP = process.env.ALLOW_LOCAL_HTTP;

async function readRootHeaders(): Promise<Record<string, string>> {
  const headersFn = nextConfig.headers;
  expect(headersFn).toBeDefined();
  const rules = await headersFn?.();
  const rootRule = rules?.find((rule) => rule.source === "/:path*");
  expect(rootRule).toBeDefined();

  return Object.fromEntries(
    (rootRule?.headers ?? []).map((header) => [header.key, header.value]),
  );
}

describe("next.config security headers", () => {
  afterEach(() => {
    (process.env as Record<string, string | undefined>).NODE_ENV =
      ORIGINAL_NODE_ENV;
    if (ORIGINAL_ALLOW_LOCAL_HTTP === undefined) {
      delete process.env.ALLOW_LOCAL_HTTP;
    } else {
      process.env.ALLOW_LOCAL_HTTP = ORIGINAL_ALLOW_LOCAL_HTTP;
    }
  });

  it("X-Powered-By 헤더를 비활성화한다", () => {
    expect(nextConfig.poweredByHeader).toBe(false);
  });

  it("프로덕션 환경 CSP 에서 unsafe-eval 을 제거하고 OWASP 보안 헤더를 설정한다", async () => {
    (process.env as Record<string, string | undefined>).NODE_ENV = "production";
    delete process.env.ALLOW_LOCAL_HTTP;

    const headers = await readRootHeaders();

    expect(headers["Content-Security-Policy"]).not.toContain("'unsafe-eval'");
    expect(headers["Content-Security-Policy"]).toContain(
      "frame-ancestors 'none'",
    );
    expect(headers["Content-Security-Policy"]).toContain(
      "upgrade-insecure-requests",
    );
    expect(headers["X-Frame-Options"]).toBe("DENY");
    expect(headers["X-Content-Type-Options"]).toBe("nosniff");
    expect(headers["Referrer-Policy"]).toBe("strict-origin-when-cross-origin");
    expect(headers["Permissions-Policy"]).toContain("camera=()");
    expect(headers["Strict-Transport-Security"]).toContain("max-age=63072000");
  });

  it("개발 환경 CSP 에서만 unsafe-eval 을 허용하고 로컬 HTTP 테스트를 막지 않는다", async () => {
    (process.env as Record<string, string | undefined>).NODE_ENV =
      "development";

    const headers = await readRootHeaders();

    expect(headers["Content-Security-Policy"]).toContain("'unsafe-eval'");
    expect(headers["Content-Security-Policy"]).not.toContain(
      "upgrade-insecure-requests",
    );
  });
});
