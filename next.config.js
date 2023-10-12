/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")({
  dest: "public",
  disableDevLogs: true,
});
const nextConfig = {
  reactStrictMode: true,
};

module.exports = nextConfig;
