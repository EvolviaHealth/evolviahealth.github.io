'use client';

import { useLayoutEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { gsap } from 'gsap';
import { Link } from '@/lib/i18n/routing';
import { RevealText } from '@/components/animations/RevealText';

/**
 * Bande image plein écran avec citation, entre deux sections. Parallaxe douce,
 * voile encre pour la lisibilité. La citation reprend les mots de la
 * fondatrice : « l'IA, levier d'élévation ». Effet immersif demandé par
 * Cassiopée (« on se sent dans un autre monde »), en version sobre.
 */
export function ImageBand() {
  const t = useTranslations('band');
  const nav = useTranslations('nav');
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-band-img]',
        { yPercent: -10 },
        {
          yPercent: 10,
          ease: 'none',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        }
      );
    }, ref);
    return () => { try { ctx.revert(); } catch {} };
  }, []);

  return (
    <section ref={ref} className="relative h-[70vh] min-h-[480px] overflow-hidden flex items-center">
      {/* Image parallaxe (sur-dimensionnée pour absorber le déplacement) */}
      <img
        data-band-img
        src="/images/hospital-atrium.jpg"
        alt=""
        aria-hidden
        className="absolute inset-0 w-full h-[130%] -top-[15%] object-cover will-change-transform"
        draggable={false}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink-900/80 via-ink-900/50 to-ink-900/30" />

      <div className="container-fluid relative z-10">
        <blockquote className="max-w-4xl">
          <p className="font-display text-display-lg leading-[1.12] text-white mb-10">
            <RevealText stagger={0.04}>{t('quote')}</RevealText>
          </p>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-3 bg-white/95 text-ink-900 px-7 py-3.5 rounded-full text-base font-semibold hover:bg-teal-500 hover:text-white transition-colors"
          >
            {nav('contact')}
            <svg width="16" height="16" viewBox="0 0 14 14" fill="none" className="transition-transform group-hover:translate-x-1">
              <path d="M1 7H13M13 7L7 1M13 7L7 13" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </Link>
        </blockquote>
      </div>
    </section>
  );
}
