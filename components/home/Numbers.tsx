'use client';

import { useTranslations } from 'next-intl';
import { RevealText } from '@/components/animations/RevealText';
import { CountUp } from '@/components/animations/CountUp';

type NumberItem = { value: string; label: string };

/**
 * Section « Par les chiffres » — bande colorée profonde bleu→vert
 * (« du bleu, du vert, c'est la pharma »), chiffres blancs serif animés.
 */
export function Numbers() {
  const t = useTranslations('numbers');
  const items = t.raw('items') as NumberItem[];

  return (
    <section className="relative py-28 md:py-40 bg-gradient-to-br from-azure-700 via-teal-700 to-teal-600 overflow-hidden">
      {/* Halo lumineux discret */}
      <div
        className="absolute -top-1/3 -right-1/4 w-[60vw] h-[60vw] rounded-full opacity-30 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.25) 0%, transparent 65%)' }}
      />

      <div className="container-fluid relative">
        <div className="max-w-3xl mb-14 md:mb-20">
          <div className="eyebrow text-teal-100 mb-6">{t('label')}</div>
          <h2 className="font-display text-display-lg leading-[1.08] text-white">
            <RevealText stagger={0.04}>{t('title')}</RevealText>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
          {items.map((item, i) => (
            <div key={i} className="border-t-2 border-white/30 pt-7">
              <div className="font-display text-5xl md:text-6xl lg:text-7xl leading-[0.9] tracking-tight text-white mb-5">
                <CountUp value={item.value} />
              </div>
              <p className="text-[15px] text-white/80 leading-relaxed max-w-[24ch]">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
