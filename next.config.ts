import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Dev-time cross-origin access for LAN/HTTPS
  allowedDevOrigins: [
    "https://localhost:3000",
    "https://192.168.252.64:3000",
  ],
  compress: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  poweredByHeader: false,
  reactStrictMode: true,
};

export default nextConfig;
