import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./lib/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Export statique → aucune fonction serveur, aucun middleware Edge.
  // Tout est pré-rendu en HTML/CSS/JS et servi en CDN. Élimine les bugs
  // runtime Vercel (__dirname en Edge runtime, etc.) et accélère le site.
  output: 'export',
  // Slash final → Netlify résout /fr/contact/ en servant fr/contact/index.html
  // (au lieu de 404 quand l'URL est /fr/contact sans slash).
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
