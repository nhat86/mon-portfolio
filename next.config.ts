/** @type {import('next').NextConfig} */
const nextConfig = {
 /* config options here */
 images: {
   remotePatterns: [
     {
       protocol: 'https',
       hostname: 'placehold.co',
     },
     {
       protocol: 'https',
       hostname: 'oc-static.imgix.net',
     },
   ],
 },
};

export default nextConfig;