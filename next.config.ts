import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    unoptimized: true, // For serverless functions
  },
  typescript: {
    ignoreBuildErrors: false, // Strict type checking
  },
};

export default nextConfig;
