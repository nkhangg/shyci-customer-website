/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            'zwin.io',
            'admin.vov.gov.vn',
            'media.techcity.cloud',
            '2sao.vietnamnetjsc.vn',
            'media.vov.vn',
            'localhost',
            'img.docnhanh.vn',
            'media.baoquangninh.vn',
            'media-cdn-v2.laodong.vn',
        ],
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
