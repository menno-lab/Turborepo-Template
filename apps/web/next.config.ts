import { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@repo/ui", "@repo/db", "@repo/api"],
};

export default nextConfig;
