/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // sob https domain allow
      },
      {
        protocol: "http",
        hostname: "**", // sob http domain allow
      },
    ],
  },
};

export default nextConfig;
