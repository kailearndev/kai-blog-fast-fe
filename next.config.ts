import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: "jhygflbinqdrcnqyxvvn.supabase.co" },
      { hostname: "i.pravatar.cc" },
      { hostname: "media.tenor.com" },
    ],
  },
  /* config options here */
};

export default nextConfig;
