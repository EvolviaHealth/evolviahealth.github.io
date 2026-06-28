'use client';

import { useTranslations } from 'next-intl';
import { RevealText } from '@/components/animations/RevealText';
import { CountUp } from '@/components/animations/CountUp';

type Stat = { value: string; label: string };

/**
 * Bande de confiance — chiffres clés uniquement (titre + 4 stats animées).
 * Les secteurs accompagnés sont désormais présentés dans la section Écosystème
 * dédiée (évite la redite et garde un rythme « clean » façon Digital Pharma Lab).
 */
export function Trust() {
  const t = useTranslations('trust');
  const stats = t.raw('stats') as Stat[];

  return (
    <section className="relative py-20 md:py-28 bg-gradient-to-b from-teal-100/80 via-mist to-canvas border-y border-teal-500/20">
      <div className="container-fluid">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-20 items-center">
          <div>
            <div className="eyebrow text-teal-700 mb-6">
              <span className="eyebrow-rule" />
              {t('label')}
            </div>
            <h2 className="font-display text-display-md text-ink-900 leading-[1.08]">
              <RevealText stagger={0.04}>{t('title')}</RevealText>
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-10">
            {stats.map((s, i) => (
              <div key={i} className="border-t-2 border-teal-500/40 pt-5">
                <div className="font-display text-5xl md:text-6xl leading-none text-teal-600 mb-3">
                  <CountUp value={s.value} />
                </div>
                <p className="text-sm text-ink-600 leading-relaxed max-w-[26ch]">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
