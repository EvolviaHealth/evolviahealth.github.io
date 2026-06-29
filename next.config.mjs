import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./lib/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Export statique → aucune fonction serveur, aucun middleware Edge.
  // Tout est pré-rendu en HTML/CSS/JS et servi en CDN. Simple et robuste.
  output: 'export',
  // Slash final → l'hébergeur statique sert fr/contact/index.html pour /fr/contact/
  // (au lieu de 404 quand l'URL est sans slash final).
  trailingSlash: true,
  reactStrictMode: false,
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sanity.io' },
    ],
  },
  experimental: {
    optimizePackageImports: ['gsap', 'lenis'],
  },
  // Racine du projet pour Turbopack : le dossier courant (portable).
  turbopack: {
    root: process.cwd(),
  },
};

export default withNextIntl(nextConfig);
