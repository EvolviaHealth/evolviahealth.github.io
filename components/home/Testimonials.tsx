'use client';

import { useTranslations } from 'next-intl';
import { RevealText } from '@/components/animations/RevealText';

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  photo?: string;
};

/**
 * Témoignages (« le retour des gens ») en défilement horizontal continu,
 * comme demandé par Cassiopée (« ça défile »). Pause au survol. Cartes avec
 * guillemets, photo, nom et rôle ; données éditables dans testimonials.items
 * des dictionnaires. La piste est dupliquée pour une boucle sans couture.
 */
export function Testimonials() {
  const t = useTranslations('testimonials');
  const items = t.raw('items') as Testimonial[];
  // Duplication pour la boucle infinie (translateX -50%)
  const loop = [...items, ...items];

  return (
    <section className="relative py-28 md:py-40 bg-sand overflow-hidden">
      <div className="container-fluid">
        <div className="max-w-3xl mb-14 md:mb-16">
          <div className="eyebrow text-teal-700 mb-6">{t('label')}</div>
          <h2 className="font-display text-display-lg leading-[1.08] text-ink-900 mb-5">
            <RevealText stagger={0.04}>{t('title')}</RevealText>
          </h2>
          <p className="text-lead text-ink-600 max-w-2xl">{t('subtitle')}</p>
        </div>
      </div>

      {/* Piste défilante pleine largeur, fondus sur les bords */}
      <div className="relative testi-wrap">
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 md:w-32 z-10 bg-gradient-to-r from-sand to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 md:w-32 z-10 bg-gradient-to-l from-sand to-transparent" />

        <div className="flex gap-6 w-max testi-track px-6">
          {loop.map((item, i) => (
            <figure
              key={i}
              className="w-[360px] md:w-[520px] shrink-0 bg-paper rounded-card p-9 md:p-11 border border-ink-100 shadow-soft flex flex-col"
              aria-hidden={i >= items.length}
            >
              <span aria-hidden className="font-display text-7xl leading-none text-teal-500/40 mb-3 select-none">
                “
              </span>
              <blockquote className="font-display text-2xl md:text-[1.75rem] leading-[1.3] text-ink-900 flex-1">
                {item.quote}
              </blockquote>
              <figcaption className="mt-8 pt-6 border-t border-ink-100 flex items-center gap-5">
                {item.photo ? (
                  <img
                    src={item.photo}
                    alt={item.name}
                    className="w-16 h-16 md:w-[72px] md:h-[72px] rounded-full object-cover ring-2 ring-teal-500/30"
                    draggable={false}
                  />
                ) : (
                  <span className="w-16 h-16 rounded-full bg-teal-500/15 flex items-center justify-center font-display text-2xl text-teal-700">
                    {item.name.charAt(0)}
                  </span>
                )}
                <div>
                  <div className="text-[17px] md:text-lg font-semibold text-ink-900 leading-tight">{item.name}</div>
                  <div className="text-[14px] md:text-[15px] text-ink-500 leading-tight mt-1">{item.role}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
