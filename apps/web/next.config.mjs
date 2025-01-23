// next-intl
import createNextIntlPlugin from "next-intl/plugin";
const withNextIntl = createNextIntlPlugin("./config/i18n/request.ts");

// Velite
const isDev = process.argv.indexOf("dev") !== -1;
const isBuild = process.argv.indexOf("build") !== -1;

if (!process.env.VELITE_STARTED && (isDev || isBuild)) {
  process.env.VELITE_STARTED = "1";
  const { build } = await import("velite");
  await build({ watch: isDev, clean: !isDev });
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  trailingSlash: false,
  experimental: {
    reactCompiler: false,
  },
  transpilePackages: ["@repo/ui"],
};

export default withNextIntl(nextConfig);
