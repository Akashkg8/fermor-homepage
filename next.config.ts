import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // One small stylesheet: inlining it removes the render-blocking request
  // that delayed the hero text (LCP) on throttled mobile.
  experimental: {
    inlineCss: true,
  },
  poweredByHeader: false,
};

export default nextConfig;
