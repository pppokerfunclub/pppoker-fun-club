import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["app.d1zz.xyz", "*.d1zz.xyz"],
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "app.d1zz.xyz",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
