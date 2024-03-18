/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'lostmanagementcities.com',
                port: '',
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;
