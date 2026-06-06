import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { REDIRECT_REASONS } from "@/shared/constants";
import { getPermanentCookieStorage } from "@/utils/cookies/permanentCookieStorage";
import { getSessionCookieStorage } from "@/utils/cookies/sessionCookieStorage";

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

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const userAgent = req.headers.get("user-agent");
  const sessionCookie = await getSessionCookieStorage("en_session");
  const deviceCookie = await getPermanentCookieStorage("en_device");

  if (isMobile(userAgent)) {
    const url = req.nextUrl.clone();
    url.pathname = "/mobile";
    return redirectResponse(url);
  }

  if (pathname === "/login") {
    const method = req.nextUrl.searchParams.get("method");
    const isDefaultMethod =
      method === null || method === "default" || method === "";

    if (method === "pin" && !deviceCookie?.device_id) {
      const url = req.nextUrl.clone();
      url.searchParams.delete("method");
      url.searchParams.set("reason", REDIRECT_REASONS.PIN_NOT_VERIFIED);
      return redirectResponse(url);
    }

    if (isDefaultMethod && deviceCookie?.device_id && req.method === "GET") {
      const url = req.nextUrl.clone();
      url.searchParams.set("reason", REDIRECT_REASONS.EXIST_DEVICE_ID);
      url.searchParams.set("method", "pin");
      return redirectResponse(url);
    }
  }

  if (NEED_TO_AUTHENTICATE_PATHS.includes(pathname)) {
    if (!sessionCookie) {
      const url = req.nextUrl.clone();
      url.pathname = "/login";
      return redirectResponse(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/sign-up/register-user", "/login"],
};
