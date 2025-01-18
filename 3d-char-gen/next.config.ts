import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	reactStrictMode: true,
	swcMinify: true,
};

module.exports = {
	distDir: 'build',
}

export default nextConfig;
