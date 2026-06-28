'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useTranslations } from 'next-intl';
import { RevealText } from '@/components/animations/RevealText';

/**
 * Section Prométhée détaillée — sur la page Founder. Met en avant l'agent
 * IA propriétaire d'EvolvIA Health.
 */
export function PrometheeSection() {
  const ref = useRef<HTMLElement>(null);
  const t = useTranslations('promethee');

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.to('[data-promethee-detail-orb]', {
        rotate: 360,
        duration: 90,
        repeat: -1,
        ease: 'none',
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      className="relative bg-canvas py-32 md:py-48 overflow-hidden border-t border-ink-100"
    >
      <div
        data-promethee-detail-orb
        className="absolute top-1/2 right-0 translate-x-1/3 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] rounded-full opacity-100 blur-3xl pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(31,156,135,0.18) 0%, rgba(31,156,135,0) 70%)',
        }}
      />

      <div className="container-fluid relative">
        <div className="grid grid-cols-12 gap-8 lg:gap-16">
          <div className="col-span-12 lg:col-span-5">
            <div className="mb-8 text-xs uppercase tracking-[0.25em] text-teal-700">
              {t('label')}
            </div>
            <h2 className="font-display text-display-lg leading-[1.02] mb-10 text-ink-900">
              <RevealText stagger={0.05}>{t('title')}</RevealText>
            </h2>
            <div
              className="inline-flex items-center gap-2.5 px-3 py-1 border border-teal-700/40 text-[11px] uppercase tracking-widest text-teal-700"
              style={{ borderRadius: '2px' }}
            >
              <span className="block w-3 h-px bg-teal-700 opacity-70" />
              {t('status')}
            </div>
          </div>

          <div className="col-span-12 lg:col-span-6 lg:col-start-7">
            <p className="text-xl md:text-2xl text-ink-900 leading-relaxed mb-10 font-display">
              {t('description')}
            </p>
            <p className="text-base text-ink-600 leading-relaxed max-w-lg">
              {t('extraNote')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
