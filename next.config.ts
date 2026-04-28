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
        hostname: "autopertutti-images.8d408178f36654003d003f5b4ba83a1.r2.cloudflarestorage.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
