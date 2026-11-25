import path from "node:path";
import { createVanillaExtractPlugin } from "@vanilla-extract/next-plugin";
import type { NextConfig } from "next";

const withVanillaExtract = createVanillaExtractPlugin();

const nextConfig: NextConfig = {
  basePath: "",
  poweredByHeader: false,
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  transpilePackages: ["@internal/design-system"],
  images: {
    formats: ["image/avif", "image/webp"],
  },
  turbopack: {
    root: path.join(__dirname, ".."),
  },
  compiler: {
    styledComponents: true,
  },
  async headers() {
    const isProduction = process.env.NODE_ENV === "production";
    const includeUpgradeInsecure =
      isProduction && process.env.ALLOW_LOCAL_HTTP !== "true";
    const scriptSrc = isProduction
      ? "script-src 'self' 'unsafe-inline';"
      : "script-src 'self' 'unsafe-eval' 'unsafe-inline';";
    const cspDirectives = [
      "default-src 'self';",
      scriptSrc,
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;",
      "img-src 'self' blob: data:;",
      "font-src 'self' https://fonts.gstatic.com;",
      "object-src 'none';",
      "base-uri 'self';",
      "form-action 'self';",
      "frame-ancestors 'none';",
      ...(includeUpgradeInsecure ? ["upgrade-insecure-requests;"] : []),
    ];
    const cspHeader = cspDirectives.join(" ");

    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: cspHeader,
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value:
              "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
};

export default withVanillaExtract(nextConfig);
