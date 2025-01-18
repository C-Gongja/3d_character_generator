import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	distDir: "build", // Set custom build directory
	compiler: {
		styledComponents: true, // Enable styled-components support
	},
};

export default nextConfig;
