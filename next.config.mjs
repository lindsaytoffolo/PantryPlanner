/** @type {import('next').NextConfig} */

const nextConfig = {
    experimental: {
        ppr: "incremental",
        serverActions: {
            bodySizeLimit: "5mb",
        },
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "ycbvtsutucecgrqb.public.blob.vercel-storage.com",
                port: "",
            },
        ],
    },
};

export default nextConfig;
