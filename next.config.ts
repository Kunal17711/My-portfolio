import type { NextConfig } from "next";

const securityHeaders = [
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "Content-Security-Policy",
    value:
      "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: blob: https:; media-src 'self' blob:; connect-src 'self' https:; frame-ancestors 'none'; base-uri 'self'; form-action 'self' mailto:; upgrade-insecure-requests;",
  },
];

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/who-is-kunal-builds",
        destination: "/who-is-kunal",
        permanent: true,
      },
      {
        source: "/about-kunal",
        destination: "/who-is-kunal",
        permanent: true,
      },
      {
        source: "/kunal-builds",
        destination: "/who-is-kunal",
        permanent: true,
      },
      {
        source: "/kunal-dev",
        destination: "/who-is-kunal",
        permanent: true,
      },
      {
        source: "/kunal17711",
        destination: "/who-is-kunal",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
