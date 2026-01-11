import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Dev-time cross-origin access for LAN/HTTPS
  allowedDevOrigins: [
    "https://localhost:3000",
    "https://192.168.252.64:3000",
  ],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;
