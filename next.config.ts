import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images:{
    remotePatterns:[
      new URL("https://api.jasonsaji.wasikahmed.com/**"), // Example for Cloudinary
      {
        protocol:'https',
        hostname:'https://api.jasonsaji.wasikahmed.com',
        port:'',
        pathname:'/**'
      }
    ]
  }
};

export default nextConfig;
