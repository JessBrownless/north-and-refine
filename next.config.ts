import type { NextConfig } from "next";
import os from "os";
import path from "path";

const nextConfig: NextConfig = {
  // Use a temp distDir locally to avoid iCloud Drive corrupting webpack builds.
  // On Netlify (and CI), NETLIFY=true so we skip this and use the default .next dir.
  ...(process.env.NETLIFY ? {} : { distDir: path.join(os.tmpdir(), "north-and-refine-next") }),

  // The blog lived at /journal until 2026-07-07; 301 the old paths so any
  // existing links (and the index/post URLs) resolve to the new /blog home.
  async redirects() {
    return [
      { source: "/journal", destination: "/blog", permanent: true },
      { source: "/journal/:slug", destination: "/blog/:slug", permanent: true },
    ];
  },
};

export default nextConfig;
