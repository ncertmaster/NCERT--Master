/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizeCss: false, // ← Tailwind v4 + Vercel combo mein yeh ZAROOR chahiye
  },
  // Agar images external source se hain toh
  images: {
    unoptimized: false,
  },
};

export default nextConfig;
