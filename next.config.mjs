/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['lostmanagementcities.com'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
            },
        ],
    },
};

export default nextConfig;
