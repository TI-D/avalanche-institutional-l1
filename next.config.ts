import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "127.0.0.1",
    "localhost",
    "*.localhost",
    "*.cursor.sh",
    "*.cursor.com",
  ],
};

export default nextConfig;
