'use client';

import { useLayoutEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { gsap } from 'gsap';
import { RevealText } from '@/components/animations/RevealText';
import { MagneticButton } from '@/components/ui/MagneticButton';

/**
 * Hero clair « pharma premium ». Badge coloré qui annonce immédiatement ce que
 * fait le cabinet (retour Cassiopée : « on ne comprend pas en quoi consiste
 * l'entreprise »), grand titre serif, image clinique à droite, CTA inversés
 * (Découvrir notre approche en vif à gauche, Prendre rendez-vous en clair).
 */
export function Hero() {
  const t = useTranslations('hero');
  const heroRef = useRef<HTMLElement>(null);
  const titleLines = t.raw('title') as string[];

  useLayoutEffect(() => {
    if (!heroRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to('[data-hero-media]', {
        yPercent: 12,
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });
      gsap.to('[data-scroll-cue]', {
        y: 10,
        repeat: -1,
        yoyo: true,
        duration: 1.4,
        ease: 'sine.inOut',
      });
    }, heroRef);
    return () => { try { ctx.revert(); } catch {} };
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen w-full flex items-center pt-32 pb-20 overflow-hidden"
    >
      <div className="container-fluid relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-16 items-center">
          {/* Colonne texte */}
          <div>
            {/* Badge : on comprend en 1 seconde ce que fait le cabinet */}
            <span className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-teal-500/10 border border-teal-500/25 text-teal-800 text-sm font-medium mb-7">
              <span className="block w-2 h-2 rounded-full bg-teal-500" />
              {t('eyebrow')}
            </span>

            <h1 className="font-display text-display-xl text-ink-900 mb-7">
              {titleLines.map((line, i) => (
                <span key={i} className="block">
                  <RevealText delay={0.2 + i * 0.12} trigger="load" stagger={0.05}>
                    {line}
                  </RevealText>
                </span>
              ))}
            </h1>

            <p className="text-lead text-ink-600 max-w-xl mb-10">
              <RevealText delay={0.7} trigger="load" stagger={0.008}>
                {t('subtitle')}
              </RevealText>
            </p>

            {/* CTA : Découvrir (vif, gauche) puis Prendre RDV (clair, droite) */}
            <div
              className="flex flex-wrap items-center gap-4 opacity-0 animate-fade-in-up"
              style={{ animationDelay: '1s' }}
            >
              <MagneticButton href="/approach" variant="primary">
                {t('ctaApproach')}
              </MagneticButton>
              <MagneticButton href="/contact" variant="secondary">
                {t('ctaBooking')}
              </MagneticButton>
            </div>
          </div>

          {/* Colonne média */}
          <div
            data-hero-media
            className="relative opacity-0 animate-fade-in-up"
            style={{ animationDelay: '0.4s' }}
          >
            {/* Blob organique : halo naturel qui se déforme derrière l'image */}
            <div
              aria-hidden
              className="absolute inset-0 max-w-[440px] mx-auto lg:mx-0 lg:ml-auto blob-soft scale-110 -z-10"
              style={{
                background:
                  'linear-gradient(135deg, rgba(31,156,135,0.28), rgba(127,176,105,0.22) 60%, rgba(45,122,168,0.18))',
                filter: 'blur(28px)',
              }}
            />

            {/* Image en arche : signature visuelle santé premium */}
            <div className="relative rounded-t-[999px] rounded-b-[24px] overflow-hidden shadow-lift ring-1 ring-ink-100 aspect-[4/5] max-w-[440px] mx-auto lg:mx-0 lg:ml-auto img-zoom">
              <img
                src="/images/lab-research-2.jpg"
                alt="Recherche scientifique en laboratoire pharmaceutique"
                className="absolute inset-0 w-full h-full object-cover"
                draggable={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-900/30 via-transparent to-transparent" />
            </div>

            {/* Carte flottante premium */}
            <div className="absolute -bottom-6 -left-2 sm:-left-6 bg-white rounded-2xl shadow-lift p-5 max-w-[230px] animate-soft-float">
              <div className="flex items-center gap-2 mb-2">
                <span className="block w-2 h-2 rounded-full bg-teal-500" />
                <span className="text-[11px] uppercase tracking-[0.18em] text-ink-400 font-medium">
                  Pharma · Santé digitale
                </span>
              </div>
              <p className="font-display text-2xl text-ink-900 leading-tight">
                IA utile, mesurable, souveraine.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Indicateur scroll */}
      <div
        data-scroll-cue
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-[11px] uppercase tracking-widest text-ink-400 pointer-events-none"
      >
        <span>{t('scroll')}</span>
        <span className="block w-px h-12 bg-gradient-to-b from-ink-300 to-transparent" />
      </div>
    </section>
  );
}
