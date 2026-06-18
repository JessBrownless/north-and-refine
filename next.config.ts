import type { NextConfig } from "next";
import os from "os";
import path from "path";

const nextConfig: NextConfig = {
  // Use a temp distDir locally to avoid iCloud Drive corrupting webpack builds.
  // On Netlify (and CI), NETLIFY=true so we skip this and use the default .next dir.
  ...(process.env.NETLIFY ? {} : { distDir: path.join(os.tmpdir(), "north-and-refine-next") }),
};

export default nextConfig;
