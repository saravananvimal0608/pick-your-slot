/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "13.233.178.43",
        port: "8080",
        pathname: "/api/service/rest/photos/**",
      },
      {
        protocol: "http",
        hostname: "13.233.178.43",
        port: "3000",
        pathname: "/api/service/rest/photos/**",
      },
      {
        protocol: "https",
        hostname: "pickyourslot.com",
        pathname: "/api/service/rest/photos/**",
      },
      {
        protocol: "https",
        hostname: "pickyourslot.com",
        port: "8080",
        pathname: "/api/service/rest/photos/**",
      },
    ],
  },
};

export default nextConfig;
