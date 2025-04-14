import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: "export",
    /* config options here */
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "s.gravatar.com",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "cdn.auth0.com",
                pathname: "/**",
            },
        ],
        unoptimized: true,
    },
    // Trailing slash for better S3/CloudFront compatibility
    // This setting ensures consistency with our CloudFront Function's URL handling
    // which adds trailing slashes and appends index.html for SPA routing
    trailingSlash: true,
    
    // ESLint configuration
    eslint: {
        // Only run ESLint on these directories during builds
        dirs: ['src/app', 'src/components', 'src/features', 'src/utils', 'src/store'],
    },
};

export default nextConfig;
