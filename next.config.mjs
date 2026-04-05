/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizeCss: false, // Required for Tailwind v4 + Vercel compatibility
  },
  images: {
    unoptimized: false,
  },
};

export default nextConfig;
