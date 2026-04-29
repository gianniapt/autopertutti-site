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
      {
        protocol: "https",
        hostname: "pub-dc57e1b601e3496ab59998f51d38fb11.r2.dev",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
