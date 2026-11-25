import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

interface StoredCookie {
  value: string;
  options: Record<string, unknown>;
}

const cookieJar = new Map<string, StoredCookie>();

const mockCookies = {
  get: vi.fn((name: string) => {
    const entry = cookieJar.get(name);
    return entry ? { name, value: entry.value } : undefined;
  }),
  has: vi.fn((name: string) => cookieJar.has(name)),
  set: vi.fn(
    (name: string, value: string, options: Record<string, unknown>) => {
      cookieJar.set(name, { value, options });
    },
  ),
  delete: vi.fn((name: string) => {
    cookieJar.delete(name);
  }),
};

vi.mock("next/headers", () => ({
  cookies: vi.fn(async () => mockCookies),
}));

import { createCookieStorage, getCookieStorage } from "./createCookieStorage";

const TEST_SECRET = Buffer.alloc(32, 7).toString("base64");
const ORIGINAL_NODE_ENV = process.env.NODE_ENV;
const ORIGINAL_JWT_SECRET = process.env.JWT_SECRET;

describe("createCookieStorage", () => {
  beforeEach(() => {
    cookieJar.clear();
    vi.clearAllMocks();
    process.env.JWT_SECRET = TEST_SECRET;
  });

  afterEach(() => {
    (process.env as Record<string, string | undefined>).NODE_ENV =
      ORIGINAL_NODE_ENV;
    if (ORIGINAL_JWT_SECRET === undefined) {
      delete process.env.JWT_SECRET;
    } else {
      process.env.JWT_SECRET = ORIGINAL_JWT_SECRET;
    }
  });

  it("NODE_ENV=production 일 때 secure=true, httpOnly=true, sameSite=lax 로 암호화 쿠키를 저장한다", async () => {
    (process.env as Record<string, string | undefined>).NODE_ENV = "production";

    await createCookieStorage(
      { user_id: 42, provider_uid: "abc" },
      { name: "rg_token" },
    );

    const saved = cookieJar.get("rg_token");
    expect(saved).toBeDefined();
    expect(saved?.options).toMatchObject({
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
    });

    const decrypted = await getCookieStorage("rg_token");
    expect(decrypted).toMatchObject({ user_id: 42, provider_uid: "abc" });
  });

  it("개발/테스트 환경에서는 기본값으로 secure=false 를 사용한다", async () => {
    (process.env as Record<string, string | undefined>).NODE_ENV =
      "development";

    await createCookieStorage({ user_id: 7 }, { name: "rg_token" });

    const saved = cookieJar.get("rg_token");
    expect(saved?.options).toMatchObject({
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });
  });

  it("쿠키 이름이 없으면 예외를 던진다", async () => {
    await expect(createCookieStorage({ user_id: 1 })).rejects.toThrow(
      "Cookie name is required",
    );
  });
});
