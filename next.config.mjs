/** @type {import('next').NextConfig} */
const nextConfig = {};

nextConfig.images = {
  dangerouslyAllowSVG: true,
  remotePatterns: [
    {
      protocol: "https",
      hostname: "**.public.blob.vercel-storage.com",
    },
    {
      protocol: "https",
      hostname: "picsum.photos",
    },
  ],
};

export default nextConfig;
