const nextConfig = {
  /* config options here */
  experimental: {
    inlineCss: true,
    useCache: true,
    clientSegmentCache: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'eu-west-2.graphassets.com',
      },
      {
        protocol: 'https',
        hostname: '**.graphassets.com',
      },
    ],
  },
};

export default nextConfig;
