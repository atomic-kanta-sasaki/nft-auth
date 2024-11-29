/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: '/api/controller/:path*',
            },
        ];
    },
};

export default nextConfig;
