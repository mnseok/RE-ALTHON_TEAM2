import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // 모든 도메인 허용
      },
    ],
  },
};

export default nextConfig;
