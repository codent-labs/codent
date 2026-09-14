import type { NextConfig } from "next"

const isDev = process.env.NODE_ENV === "development"

// Trusted Types: enforced in production only, allowing the policy Next.js
// itself creates (`nextjs`). `trusted-types 'none'` forbids every policy —
// including Next's own — so the Turbopack HMR client's script-injection sink
// and React's dev eval() sink both throw (see issue #26). In dev, TT is
// omitted entirely because the dev toolchain relies on those sinks.
const trustedTypesHeader = isDev
  ? ""
  : "require-trusted-types-for 'script'; trusted-types nextjs;"

const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""};
    ${trustedTypesHeader}
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data:;
    font-src 'self' data:;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    connect-src 'self';
    upgrade-insecure-requests;
`

const securityHeaders = [
  {
    key: "Cache-Control",
    value: "public, max-age=0, s-maxage=86400, stale-while-revalidate=59",
  },
  {
    key: "Content-Security-Policy",
    value: cspHeader.replace(/\s{2,}/g, " ").trim(),
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "Cross-Origin-Opener-Policy",
    value: "same-origin",
  },
  {
    key: "Cross-Origin-Resource-Policy",
    value: "same-origin",
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
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
]

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ]
  },
}

export default nextConfig