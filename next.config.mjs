/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
                port: '',
            },
        ],
    },
    webpack: (config, { isServer }) => {
        // Handle canvas dependency for pdfjs-dist
        if (isServer) {
            config.externals.push('canvas');
        } else {
            config.resolve.fallback = {
                ...config.resolve.fallback,
                canvas: false,
                fs: false,
            };
        }
        return config;
    },
};



export default nextConfig;
