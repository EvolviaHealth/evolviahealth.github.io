'use client';

import { useTranslations } from 'next-intl';
import { RevealText } from '@/components/animations/RevealText';

type Sector = { name: string };

// Icônes de secteur (lignes fines, ton encre). Honnêtes et neutres : on
// présente les SECTEURS adressés, pas de faux logos de clients (cabinet récent).
const ICONS = [
  <path key="0" d="M9 3h6v4l4 9a3 3 0 0 1-3 4H8a3 3 0 0 1-3-4l4-9V3zM9 7h6M8.5 14h7" />, // flacon / pharma
  <path key="1" d="M7 4v6a5 5 0 0 0 10 0V4M7 4h10M12 15v5m-3 0h6" />, // biotech / molécule
  <path key="2" d="M4 21V9l8-5 8 5v12M9 21v-6h6v6M11 11h2" />, // hôpital
  <path key="3" d="M6 3h8l4 4v14H6zM14 3v4h4M9 12h6M9 16h6" />, // dispositif / dossier
  <path key="4" d="M4 7h16v10H4zM8 21h8M12 17v4M9 11l2 2 3-4" />, // santé digitale
  <path key="5" d="M12 3l8 3v6c0 5-3.5 7.5-8 9-4.5-1.5-8-4-8-9V6z M9 12l2 2 4-4" />, // assurance / bouclier
];

/**
 * Bande « Écosystème » à la Digital Pharma Lab : structure claire, beaucoup de
 * blanc, secteurs accompagnés présentés sobrement. Apporte la crédibilité d'un
 * cabinet sans inventer de logos clients (EvolvIA est récent → honnêteté).
 */
export function Ecosystem() {
  const t = useTranslations('ecosystem');
  const sectors = t.raw('items') as Sector[];

  return (
    <section className="relative py-24 md:py-32 bg-paper border-y border-ink-100">
      <div className="container-fluid">
        <div className="max-w-2xl mb-14 md:mb-16">
          <div className="eyebrow text-teal-700 mb-5">{t('label')}</div>
          <h2 className="font-display text-display-md leading-[1.1] text-ink-900 mb-5">
            <RevealText stagger={0.04}>{t('title')}</RevealText>
          </h2>
          <p className="text-lead text-ink-600">{t('subtitle')}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-5">
          {sectors.map((s, i) => (
            <div
              key={i}
              className="group flex flex-col items-center text-center gap-4 rounded-2xl border border-ink-100 bg-canvas/60 px-4 py-8 transition-colors hover:border-teal-500/40 hover:bg-teal-50/50"
            >
              <span className="inline-flex w-12 h-12 items-center justify-center rounded-xl bg-teal-500/10 text-teal-600 transition-colors group-hover:bg-teal-500 group-hover:text-white">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                  {ICONS[i % ICONS.length]}
                </svg>
              </span>
              <span className="text-sm font-medium text-ink-700 leading-snug">{s.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
