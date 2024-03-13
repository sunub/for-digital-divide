/** @type {import('next').NextConfig} */

const nextConfig = {
  basePath: '',
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  compiler: {
    styledComponents: true,
  },
  output: 'standalone',

  headers: async () => {
    return [
      {
        source: '/(.*)',
        headers: SecurityHeaders,
      },
    ];
  },
};

const ContentSecurityPolicy = `
    default-src 'self' 'unsafe-inline' 'unsafe-eval';
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
    font-src 'self' data: https://fonts.gstatic.com;
    script-src 'self' 'unsafe-eval' 'unsafe-inline';
    img-src * blob: data:;
    media-src 'none';
    connect-src *;
`;

const SecurityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy.replace(/\n/g, ''),
  },
  {
    key: 'X-Requested-With',
    value: 'XMLHttpRequest',
  },
];

export default nextConfig;
