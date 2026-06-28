'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/routing';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

type Activity = {
  tag: string;
  title: string;
  body: string;
};

/**
 * Section « Activités » — scroll horizontal pinné, version claire et éditoriale.
 * Contenu traduit (lu depuis useCases.items des dictionnaires, 5 langues).
 */
export function UseCases() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const t = useTranslations('useCases');
  const items = t.raw('items') as Activity[];

  useLayoutEffect(() => {
    if (!sectionRef.current || !trackRef.current) return;
    // Scroll horizontal pinné UNIQUEMENT sur desktop (≥1024px). Sur mobile/
    // tablette, les cartes s'empilent verticalement (pas de pin → zéro saccade
    // tactile). gsap.matchMedia nettoie tout seul quand on change de breakpoint.
    const mm = gsap.matchMedia();
    mm.add('(min-width: 1024px)', () => {
      const cards = gsap.utils.toArray<HTMLElement>('[data-usecase-card]');
      const total = cards.length;

      const horizontalTween = gsap.to(trackRef.current, {
        xPercent: -100 * (total - 1),
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${(total - 1) * window.innerHeight * 1.5}`,
          pin: true,
          pinType: 'transform',
          scrub: 2,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      cards.forEach((card) => {
        gsap.from(card.querySelectorAll('[data-usecase-line]'), {
          opacity: 0,
          y: 30,
          stagger: 0.08,
          duration: 0.9,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: card,
            containerAnimation: horizontalTween,
            start: 'left 65%',
          },
        });
      });
    });
    return () => { try { mm.revert(); } catch {} };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative lg:h-screen lg:overflow-hidden bg-mist"
    >
      {/* En-tête flottant (desktop, par-dessus le scroll horizontal) */}
      <div className="hidden lg:block absolute top-0 left-0 right-0 z-10 pt-32 pointer-events-none">
        <div className="container-fluid flex items-center justify-between">
          <div className="eyebrow text-ink-500">
            <span className="eyebrow-rule" />
            {t('label')}
          </div>
          <span className="text-[11px] font-mono tracking-wider text-ink-400">
            {t('hint')}
          </span>
        </div>
      </div>

      {/* En-tête normal (mobile / tablette) */}
      <div className="lg:hidden container-fluid pt-24 pb-2">
        <div className="eyebrow text-ink-500">
          <span className="eyebrow-rule" />
          {t('label')}
        </div>
      </div>

      <div
        ref={trackRef}
        className="flex flex-col lg:flex-row lg:h-full max-lg:!w-full"
        style={{ width: `${items.length * 100}vw` }}
      >
        {items.map((a, idx) => (
          <article
            key={idx}
            data-usecase-card
            className="relative w-full lg:w-screen h-auto lg:h-screen flex items-center px-6 md:px-12 lg:px-32 py-20 lg:py-0 border-b border-ink-200/50 lg:border-b-0"
          >
            {/* Numéro géant en filigrane (desktop seulement, sinon il chevauche le texte) */}
            <span
              aria-hidden
              className="hidden lg:block absolute right-[4vw] bottom-[6vh] font-display text-[34vh] leading-none text-teal-600/[0.07] select-none pointer-events-none"
            >
              {String(idx + 1).padStart(2, '0')}
            </span>
            <div className="grid grid-cols-12 gap-8 lg:gap-16 w-full items-start">
              <div className="col-span-12 lg:col-span-4 lg:pt-2">
                <div data-usecase-line className="flex items-center gap-4 mb-6">
                  <span className="font-mono text-sm tracking-wider text-teal-600">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <span className="block w-16 h-px bg-ink-200" />
                </div>
                <div
                  data-usecase-line
                  className="font-display italic text-2xl text-ink-500"
                >
                  {a.tag}
                </div>
              </div>

              <div className="col-span-12 lg:col-span-7 lg:col-start-6">
                <h3
                  data-usecase-line
                  className="font-display text-display-md text-ink-900 mb-8 leading-[1.08]"
                >
                  {a.title}
                </h3>
                <p
                  data-usecase-line
                  className="text-lead text-ink-600 max-w-2xl mb-10"
                >
                  {a.body}
                </p>
                <Link
                  href="/services"
                  data-usecase-line
                  className="inline-flex items-center gap-2 text-base text-teal-700 hover:text-teal-600 transition-colors group font-medium"
                >
                  En savoir plus
                  <svg width="16" height="16" viewBox="0 0 14 14" fill="none" className="transition-transform duration-500 group-hover:translate-x-1">
                    <path d="M1 7H13M13 7L7 1M13 7L7 13" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </Link>
              </div>
            </div>

            <div className="hidden lg:block absolute bottom-12 left-0 right-0 pointer-events-none">
              <div className="container-fluid flex items-center justify-between text-[11px] font-mono tracking-wider text-ink-400">
                <span>
                  {String(idx + 1).padStart(2, '0')} <span className="text-ink-300">/ 0{items.length}</span>
                </span>
                <div className="flex gap-2">
                  {items.map((_, i) => (
                    <span
                      key={i}
                      className={`block w-8 h-px transition-colors duration-500 ${
                        i <= idx ? 'bg-teal-600' : 'bg-ink-200'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
