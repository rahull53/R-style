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
    minimumCacheTTL: 3600, // Increased to 1 hour
    qualities: [65, 75, 85, 100],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'react-bootstrap', 'framer-motion'],
  },
  poweredByHeader: false,
  reactStrictMode: true,
};

export default nextConfig;
