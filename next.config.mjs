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
};

export default nextConfig;
