import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.dealerk.it",
        pathname: "/dealer/datafiles/vehicle/images/**",
      },
      {
        protocol: "https",
        hostname: "cdn-datak.motork.net",
        pathname: "/configurator-icon/cars/**",
      },
      {
        protocol: "https",
        hostname: "worldvectorlogo.com",
        pathname: "/svg/**",
      },
    ],
  },
};

export default nextConfig;
