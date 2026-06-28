'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/routing';
import { RevealText } from '@/components/animations/RevealText';

type VersusBlock = {
  tag: string;
  headline: string;
  steps: string[];
  total: string;
};

/**
 * Section « Avant / Après » — démonstration de gain potentiel, présentée
 * honnêtement comme un exemple sectoriel illustratif (demande de Cassiopée :
 * ne rien affirmer de faux, chiffres issus de projets comparables).
 */
export function Versus() {
  const t = useTranslations('versus');
  const before = t.raw('before') as VersusBlock;
  const after = t.raw('after') as VersusBlock;

  return (
    <section className="relative py-28 md:py-40 bg-canvas overflow-hidden">
      <div className="container-fluid">
        <div className="max-w-3xl mb-14">
          <div className="eyebrow text-azure-600 mb-7">
            <span className="eyebrow-rule" />
            {t('label')}
          </div>
          <h2 className="font-display text-display-lg leading-[1.05] mb-6 text-ink-900">
            <RevealText stagger={0.04}>{t('title')}</RevealText>
          </h2>
          <p className="text-lead text-ink-600 max-w-2xl">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-6 lg:gap-3 items-stretch">
          {/* Avant */}
          <article className="rounded-card p-8 md:p-10 bg-paper border border-ink-100 shadow-soft flex flex-col">
            <header className="mb-8 pb-6 border-b border-ink-100">
              <span className="inline-block px-3 py-1 mb-4 rounded-full text-[10px] font-semibold tracking-widest uppercase bg-ink-100 text-ink-500">
                {before.tag}
              </span>
              <h3 className="font-display text-3xl md:text-4xl text-ink-700 leading-tight">
                {before.headline}
              </h3>
            </header>
            <ul className="space-y-3 flex-1">
              {before.steps.map((step, i) => (
                <li key={i} className="text-[15px] text-ink-600 leading-relaxed">
                  {step}
                </li>
              ))}
            </ul>
            <footer className="mt-8 pt-6 border-t border-ink-100 font-mono text-xs uppercase tracking-wider text-ink-500">
              {before.total}
            </footer>
          </article>

          {/* Pastille VS */}
          <div className="flex items-center justify-center px-2">
            <span
              aria-hidden
              className="w-16 h-16 rounded-full flex items-center justify-center font-bold text-sm tracking-widest text-white"
              style={{
                background: 'linear-gradient(135deg, #2D7AA8, #1F9C87)',
                boxShadow: '0 12px 36px rgba(31, 156, 135, 0.28)',
                border: '4px solid #FBFAF7',
              }}
            >
              VS
            </span>
          </div>

          {/* Après */}
          <article className="rounded-card p-8 md:p-10 bg-gradient-to-b from-teal-50 to-paper border border-teal-500/30 flex flex-col shadow-lift">
            <header className="mb-8 pb-6 border-b border-teal-500/20">
              <span className="inline-block px-3 py-1 mb-4 rounded-full text-[10px] font-semibold tracking-widest uppercase bg-teal-500/15 text-teal-700">
                {after.tag}
              </span>
              <h3 className="font-display text-3xl md:text-4xl text-teal-800 leading-tight">
                {after.headline}
              </h3>
            </header>
            <ul className="space-y-3 flex-1">
              {after.steps.map((step, i) => (
                <li key={i} className="text-[15px] text-ink-700 leading-relaxed">
                  {step}
                </li>
              ))}
            </ul>
            <footer className="mt-8 pt-6 border-t border-teal-500/20 font-mono text-xs uppercase tracking-wider text-teal-700 font-semibold">
              {after.total}
            </footer>
          </article>
        </div>

        {/* Disclaimer honnêteté */}
        <p className="mt-8 max-w-3xl text-sm text-ink-400 leading-relaxed italic">
          {t('disclaimer')}
        </p>

        <div className="mt-12 text-center">
          <Link
            href="/contact"
            className="group inline-flex items-center gap-3 bg-ink-900 text-white px-8 py-4 rounded-full text-base font-medium hover:bg-teal-600 transition-colors"
          >
            {t('cta')}
            <svg width="16" height="16" viewBox="0 0 14 14" fill="none" className="transition-transform group-hover:translate-x-1">
              <path d="M1 7H13M13 7L7 1M13 7L7 13" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
