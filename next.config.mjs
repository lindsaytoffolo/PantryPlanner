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
            {
                protocol: "https",
                hostname: "nix-tag-images.s3.amazonaws.com",
                port: "",
            },
        ],
    },
};

export default nextConfig;
