'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/routing';
import { RevealText } from '@/components/animations/RevealText';

/**
 * Teaser Prométhée — l'agent IA propriétaire. Version claire et calme,
 * sur fond encre profond pour le contraste de fin de page (rythme sombre/clair),
 * avec image et CTA. Différenciateur fort du cabinet.
 */
export function Promethee() {
  const t = useTranslations('promethee');

  return (
    <section className="relative py-28 md:py-40 bg-ink-900 overflow-hidden">
      {/* Halo très doux */}
      <div
        className="absolute top-0 right-0 w-[45vw] h-[45vw] rounded-full opacity-25 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(31,156,135,0.5) 0%, transparent 65%)' }}
      />

      <div className="container-fluid relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <div className="eyebrow text-teal-300 mb-8">
              <span className="eyebrow-rule" />
              {t('label')}
            </div>
            <h2 className="font-display text-display-lg leading-[1.05] mb-8 text-white">
              <RevealText stagger={0.04}>{t('title')}</RevealText>
            </h2>
            <p className="text-lead text-white/75 max-w-xl mb-8">
              {t('description')}
            </p>
            <p className="text-[15px] text-white/55 leading-relaxed max-w-lg mb-10">
              {t('extraNote')}
            </p>

            <div className="flex flex-wrap items-center gap-5">
              <Link
                href="/founder"
                className="group inline-flex items-center gap-3 bg-teal-500 text-white px-8 py-4 rounded-full text-base font-medium hover:bg-teal-400 transition-colors"
              >
                {t('cta')}
                <svg width="16" height="16" viewBox="0 0 14 14" fill="none" className="transition-transform group-hover:translate-x-1">
                  <path d="M1 7H13M13 7L7 1M13 7L7 13" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </Link>
              <span className="inline-flex items-center gap-2.5 text-[11px] uppercase tracking-widest text-teal-300">
                <span className="block w-1.5 h-1.5 rounded-full bg-teal-300 animate-pulse" />
                {t('status')}
              </span>
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-[20px] overflow-hidden shadow-lift aspect-[5/4]">
              <img
                src="/images/digital-health-2.jpg"
                alt="Agent IA appliqué à la santé"
                className="absolute inset-0 w-full h-full object-cover"
                draggable={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-900/50 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
