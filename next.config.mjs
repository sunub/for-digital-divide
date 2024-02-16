/** @type {import('next').NextConfig} */

const nextConfig = {
  basePath: "",
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  images: {
    formats: ["image/avif", "image/webp"],
  },
  compiler: {
    styledComponents: true,
  },
  output: "standalone",

  headers: async () => {
    return [
      {
        source: "/(.*)",
        headers: SecurityHeaders,
      },
    ];
  },
};

const SecurityHeaders = [
  {
    key: "X-Requested-With",
    value: "XMLHttpRequest",
  },
];

export default nextConfig;
