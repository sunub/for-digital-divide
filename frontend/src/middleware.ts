import { jwtDecrypt } from "jose";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {
  DeviceIdSchema,
  SessionCookieSchema,
} from "@/entities/cookies/cookies.model";
import { REDIRECT_REASONS } from "@/shared/constants";

const NEED_TO_AUTHENTICATE_PATHS = ["/dashboard"];

const isMobile = (userAgent: string | null) => {
  return (
    /Android/i.test(userAgent as string) ||
    /iPhone/i.test(userAgent as string) ||
    /iPad/i.test(userAgent as string) ||
    /iPod/i.test(userAgent as string)
  );
};

const redirectResponse = (url: URL) => {
  const response = NextResponse.redirect(url);
  const location = response.headers.get("Location");
  if (
    location &&
    (url.hostname === "localhost" || url.hostname === "127.0.0.1")
  ) {
    response.headers.set("Location", location.replace(/^https:/i, "http:"));
  }
  return response;
};

// 미들웨어 전용 경량 JWT 복호화 함수
async function decryptCookie(tokenValue: string | undefined) {
  if (!tokenValue) return null;
  const secretKey = process.env.JWT_SECRET;
  if (!secretKey) return null;
  try {
    const buf = Buffer.from(secretKey, "base64");
    const { payload } = await jwtDecrypt(tokenValue, buf);
    return payload;
  } catch (_error) {
    return null;
  }
}

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const userAgent = req.headers.get("user-agent");

  // 미들웨어 환경에서 안전하게 요청 객체에서 쿠키 동기 획득
  const sessionToken = req.cookies.get("en_session")?.value;
  const deviceToken = req.cookies.get("en_device")?.value;

  const sessionCookie = await decryptCookie(sessionToken);
  const deviceCookie = await decryptCookie(deviceToken);

  if (isMobile(userAgent)) {
    const url = req.nextUrl.clone();
    url.pathname = "/mobile";
    return redirectResponse(url);
  }

  if (pathname === "/onboarding") {
    const method = req.nextUrl.searchParams.get("method");
    const isDefaultMethod =
      method === null || method === "default" || method === "";

    const parsedDevice = DeviceIdSchema.safeParse(deviceCookie);
    const hasDeviceId = parsedDevice.success && parsedDevice.data.device_id;

    if (method === "pin" && !hasDeviceId) {
      const url = req.nextUrl.clone();
      url.searchParams.delete("method");
      url.searchParams.set("reason", REDIRECT_REASONS.PIN_NOT_VERIFIED);
      return redirectResponse(url);
    }

    if (isDefaultMethod && hasDeviceId && req.method === "GET") {
      const url = req.nextUrl.clone();
      url.searchParams.set("reason", REDIRECT_REASONS.EXIST_DEVICE_ID);
      url.searchParams.set("method", "pin");
      return redirectResponse(url);
    }
  }

  if (
    NEED_TO_AUTHENTICATE_PATHS.some(
      (path) => pathname === path || pathname.startsWith(`${path}/`),
    )
  ) {
    const parsedSession = SessionCookieSchema.safeParse(sessionCookie);
    if (!parsedSession.success) {
      const url = req.nextUrl.clone();
      url.pathname = "/onboarding";
      return redirectResponse(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/sign-up/register-user", "/onboarding"],
};
