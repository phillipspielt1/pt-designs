import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // OpenNext / Cloudflare provides `cloudflare:email` as a built-in module of
  // the Workers runtime. Webpack can't resolve `cloudflare:` URIs at build
  // time, so we externalize them and let the runtime do the import.
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals = [
        ...(Array.isArray(config.externals) ? config.externals : []),
        {
          "cloudflare:email": "commonjs cloudflare:email",
          "cloudflare:workers": "commonjs cloudflare:workers",
        },
      ];
    }
    return config;
  },
};

export default nextConfig;
