import type { NextConfig } from "next";

/**
 * Sicherheits-Header (Sicherheitspruefung 11/2026).
 * Netlify-Header aus netlify.toml/_headers gelten nicht fuer Antworten der Next-Funktion, darum hier.
 * CSP nur in Produktion: `next dev` braucht 'unsafe-eval'. HSTS setzt Netlify (nicht doppelt setzen).
 * Externe Quellen (Inventar): nur der Google-Maps-iframe auf /contact (www.google.com/maps/embed).
 * Schriften kommen ueber next/font aus dem eigenen Hosting, Bilder lokal, das Kontaktformular sendet an
 * Netlify Forms auf derselben Domain. Neue externe Dienste (Analytics, Videos usw.) muessen hier freigegeben werden.
 */
const CONTENT_SECURITY_POLICY = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "connect-src 'self'",
  "frame-src 'self' https://www.google.com https://maps.google.com",
  "media-src 'self' blob:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
  "upgrade-insecure-requests",
].join("; ");

const BASIS_HEADER = [
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()" },
];

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,

  async headers() {
    if (process.env.NODE_ENV !== "production") return [];
    return [
      {
        source: "/((?!keystatic|api/).*)",
        headers: [{ key: "Content-Security-Policy", value: CONTENT_SECURITY_POLICY }, ...BASIS_HEADER],
      },
      {
        // CMS-Admin: keine CSP (braucht die GitHub-API), aber nicht einbettbar und nicht indexierbar
        source: "/keystatic/:path*",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" },
          { key: "X-Content-Type-Options", value: "nosniff" },
        ],
      },
      {
        source: "/api/:path*",
        headers: [
          { key: "Cache-Control", value: "no-store" },
          { key: "X-Content-Type-Options", value: "nosniff" },
        ],
      },
    ];
  },
};

export default nextConfig;
