'use client';

import { useTranslations } from 'next-intl';
import { RevealText } from '@/components/animations/RevealText';

/**
 * Manifeste — déclaration éditoriale serif sur image botanique voilée
 * (texture chaude, plus de bloc uni « tout blanc »).
 */
export function Manifesto() {
  const t = useTranslations('manifesto');

  return (
    <section className="relative py-32 md:py-44 overflow-hidden">
      {/* Image de fond + voile chaud pour la lisibilité */}
      <img
        src="/images/texture-eucalyptus.jpg"
        alt=""
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
      />
      <div className="absolute inset-0 bg-sand/55" />

      <div className="container-fluid relative">
        <div className="flex flex-col gap-8 max-w-4xl">
          <div className="eyebrow text-teal-700">{t('label')}</div>
          <h2 className="font-display text-display-lg leading-[1.12] text-ink-900">
            <RevealText stagger={0.03}>{t('text')}</RevealText>
          </h2>
        </div>
      </div>
    </section>
  );
}
