import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    unoptimized: true, // For serverless functions
  },
  typescript: {
    ignoreBuildErrors: false, // Strict type checking
  },
  swcMinify: true, // SWC minification for faster builds
};

export default nextConfig;
