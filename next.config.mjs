/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['zwin.io'],
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
