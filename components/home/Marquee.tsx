'use client';

import { useTranslations } from 'next-intl';

/**
 * Bandeau défilant infini avec les valeurs du cabinet. Version claire,
 * boucle seamless, pause au hover. Animation appréciée par Cassiopée.
 */
export function Marquee() {
  const t = useTranslations('marquee');
  const items = t.raw('items') as string[];
  const loop = [...items, ...items];

  return (
    <section className="relative py-20 md:py-24 bg-ink-900 overflow-hidden">
      <div className="text-center mb-10">
        <span className="eyebrow text-teal-300 justify-center">
          <span className="eyebrow-rule" />
          {t('label')}
          <span className="eyebrow-rule" />
        </span>
      </div>

      <div className="relative group">
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r from-ink-900 to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l from-ink-900 to-transparent" />

        <div
          className="flex gap-16 md:gap-20 whitespace-nowrap will-change-transform marquee-track"
          aria-hidden="true"
        >
          {loop.map((item, i) => (
            <span
              key={i}
              className={`flex items-center gap-16 md:gap-20 shrink-0 font-display text-3xl md:text-4xl lg:text-5xl tracking-tight ${
                i % 2 === 0 ? 'text-white/85' : 'italic text-teal-300'
              }`}
            >
              {item}
              <span className="text-white/20" aria-hidden>·</span>
            </span>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .marquee-track { animation: marquee-scroll 38s linear infinite; }
        .group:hover .marquee-track { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track { animation: none; }
        }
      `}</style>
    </section>
  );
}
