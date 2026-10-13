import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  agentRules: false,
  images: {
    // Brand logos are local files in /public/logos. Add a remote pattern here
    // if you later serve logos from a CDN.
    remotePatterns: [],
  },
};

export default nextConfig;
