/** @type {import('next').NextConfig} */
const nextConfig = {
	reactCompiler: true,
	experimental: {
		ppr: false,
		inlineCss: true,
	},
	images: {
		formats: ["image/avif", "image/webp"],
		remotePatterns: [
			{
				protocol: "https",
				hostname: "images.unsplash.com",
				pathname: "/**",
			},
		],
		minimumCacheTTL: 60,
	},
	compress: true,
	poweredByHeader: false,
};

export default nextConfig;
