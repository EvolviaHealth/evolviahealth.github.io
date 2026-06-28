'use client';

import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { gsap } from 'gsap';
import { RevealText } from '@/components/animations/RevealText';

const services = [
  {
    n: '01',
    titleFr: 'Conseil stratégique IA',
    titleEn: 'Strategic AI consulting',
    bodyFr: "Cadrage, feuille de route et gouvernance de l'IA adaptés au contexte santé et pharmaceutique.",
    bodyEn: 'Framing, roadmap and AI governance tailored to healthcare and pharmaceutical contexts.',
  },
  {
    n: '02',
    titleFr: 'Agents IA personnalisés',
    titleEn: 'Custom AI agents',
    bodyFr: "Conception et déploiement d'agents calibrés sur vos protocoles, données et workflows existants.",
    bodyEn: 'Design and deployment of agents calibrated on your protocols, data and existing workflows.',
  },
  {
    n: '03',
    titleFr: 'Formation GenAI métiers',
    titleEn: 'GenAI training for teams',
    bodyFr: 'Montée en compétence des équipes — usages concrets, posture critique, hygiène des données.',
    bodyEn: 'Upskilling teams — concrete use cases, critical thinking, data hygiene.',
  },
  {
    n: '04',
    titleFr: 'Accompagnement du changement',
    titleEn: 'Change management',
    bodyFr: "Intégration humaine de l'IA dans les opérations : adoption, mesure d'impact, itération continue.",
    bodyEn: 'Human integration of AI in operations: adoption, impact measurement, continuous iteration.',
  },
];

export function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const t = useTranslations('services');

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from('[data-service-card]', {
        opacity: 0,
        y: 60,
        duration: 1,
        stagger: 0.1,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-40 bg-bone text-ink-900">
      <div className="container-fluid">
        <div className="flex items-end justify-between mb-24">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-8 text-xs uppercase tracking-[0.25em] text-azure-500">
              <span className="block w-12 h-px bg-azure-500" />
              {t('label')}
            </div>
            <h2 className="font-display text-display-lg leading-[1.05]">
              <RevealText stagger={0.04}>{t('title')}</RevealText>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-ink-200">
          {services.map((s) => (
            <div
              key={s.n}
              data-service-card
              className="group relative bg-bone p-12 hover:bg-ink-900 hover:text-ink-50 transition-colors duration-700 cursor-pointer"
            >
              <span className="block text-xs font-mono text-azure-500 mb-8">
                {s.n}
              </span>
              <h3 className="font-display text-2xl md:text-3xl mb-6 leading-tight">
                {s.titleFr}
              </h3>
              <p className="text-base leading-relaxed text-ink-700 group-hover:text-ink-100/70 transition-colors">
                {s.bodyFr}
              </p>
              <div className="mt-12 flex items-center gap-2 text-sm text-azure-500 group-hover:text-teal-400">
                En savoir plus
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 7H13M13 7L7 1M13 7L7 13" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
