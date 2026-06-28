'use client';

import { Link } from '@/lib/i18n/routing';
import { useTranslations } from 'next-intl';

/**
 * Footer clair premium. Utilise le logo OFFICIEL exact de la charte
 * (evolvia-logo-transparent@4x.png, conçu pour fond clair) : sur fond sombre,
 * aucune des variantes n'était fidèle au fichier envoyé par Cassiopée.
 * Liseré dégradé bleu→vert en signature colorée.
 */
export function Footer() {
  const t = useTranslations('footer');
  const nav = useTranslations('nav');
  const year = 2026;

  const cols: { title: string; links: { href: '/about' | '/services' | '/use-cases' | '/approach' | '/founder' | '/insights' | '/temoignages' | '/contact'; label: string }[] }[] = [
    {
      title: t('exploreTitle'),
      links: [
        { href: '/about', label: nav('about') },
        { href: '/services', label: nav('services') },
        { href: '/approach', label: nav('approach') },
        { href: '/use-cases', label: nav('useCases') },
      ],
    },
    {
      title: t('moreTitle'),
      links: [
        { href: '/founder', label: nav('founder') },
        { href: '/insights', label: nav('insights') },
        { href: '/temoignages', label: nav('testimonials') },
        { href: '/contact', label: nav('contact') },
      ],
    },
  ];

  return (
    <footer className="relative bg-sand overflow-hidden">
      {/* Liseré signature bleu → teal → vert */}
      <div className="h-1.5 bg-gradient-to-r from-azure-500 via-teal-500 to-sage-500" />

      {/* Halo doux */}
      <div
        className="absolute -top-1/4 right-0 w-[45vw] h-[45vw] rounded-full opacity-50 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(31,156,135,0.14) 0%, transparent 65%)' }}
      />

      <div className="container-fluid relative">
        {/* Bloc accroche */}
        <div className="py-16 md:py-24 border-b border-ink-900/10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
          <div>
            {/* Logo officiel exact (fichier envoyé par Cassiopée) */}
            <img
              src="/brand/evolvia-logo-transparent@4x.png"
              alt="EvolvIA Health"
              className="h-14 md:h-16 w-auto mb-8"
              draggable={false}
            />
            <p className="font-display text-3xl md:text-4xl leading-[1.12] text-ink-900 max-w-xl">
              {t('tagline')}
            </p>
          </div>
          <div className="lg:justify-self-end">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 bg-teal-500 text-white px-8 py-4 rounded-full text-base font-semibold hover:bg-teal-600 transition-colors shadow-soft"
            >
              {t('cta')}
              <svg width="16" height="16" viewBox="0 0 14 14" fill="none" className="transition-transform group-hover:translate-x-1">
                <path d="M1 7H13M13 7L7 1M13 7L7 13" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Colonnes */}
        <div className="py-14 grid grid-cols-2 md:grid-cols-4 gap-10">
          {cols.map((col) => (
            <div key={col.title}>
              <div className="text-[11px] uppercase tracking-[0.2em] text-teal-700 font-semibold mb-5">
                {col.title}
              </div>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-ink-600 hover:text-teal-700 transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="col-span-2">
            <div className="text-[11px] uppercase tracking-[0.2em] text-teal-700 font-semibold mb-5">
              {t('contactTitle')}
            </div>
            <a
              href="mailto:evolviahealth@outlook.fr"
              className="font-display text-2xl md:text-3xl text-ink-900 hover:text-teal-700 transition-colors break-all"
            >
              evolviahealth@outlook.fr
            </a>
            <p className="text-ink-500 text-sm mt-4 max-w-sm leading-relaxed">
              {t('contactNote')}
            </p>
          </div>
        </div>

        {/* Barre légale */}
        <div className="py-8 border-t border-ink-900/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-ink-400">
          <span>© {year} EvolvIA Health. {t('rights')}.</span>
          <div className="flex items-center gap-5">
            <Link href="/mentions-legales" className="hover:text-teal-700 transition-colors">
              Mentions légales
            </Link>
            <Link href="/confidentialite" className="hover:text-teal-700 transition-colors">
              Confidentialité
            </Link>
          </div>
          <span>{t('madeIn')}</span>
        </div>
      </div>
    </footer>
  );
}
