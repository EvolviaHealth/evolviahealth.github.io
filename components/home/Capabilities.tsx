'use client';

import { useTranslations } from 'next-intl';
import { RevealText } from '@/components/animations/RevealText';

type CapabilityItem = {
  num: string;
  status: string;
  title: string;
  desc: string;
};

// Badges de statut — variantes claires, sobres
// Icônes par capacité (ordre du dictionnaire) : RAG, agents, multimodal,
// raisonnement, fine-tuning, génération. Traits fins, ton teal.
const ICONS = [
  <path key="rag" d="M4 4h10l4 4v12H4zM14 4v4h4M8 13h8M8 17h5" />,
  <path key="agents" d="M12 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm-7 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm14 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm-7 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM12 5v4m0 6v4m-5.3-9.3 3.6 2.1m3.4 0 3.6-2.1m-10.6 6.6 3.6-2.1m3.4 0 3.6 2.1" />,
  <path key="multi" d="m12 3 9 5-9 5-9-5zM3 13l9 5 9-5" />,
  <path key="reason" d="M12 3a6 6 0 0 1 6 6c0 2.2-1.2 3.7-2.4 5-.9 1-1.6 2-1.6 3v1h-4v-1c0-1-.7-2-1.6-3C7.2 12.7 6 11.2 6 9a6 6 0 0 1 6-6zM10 21h4" />,
  <path key="tune" d="M5 4v6m0 4v6m7-16v10m0 4v2m7-16v2m0 4v10M3 10h4m5 4h4m3-8h4" />,
  <path key="gen" d="M14 4l1.2 3.2L18.5 8.5l-3.3 1.3L14 13l-1.2-3.2L9.5 8.5l3.3-1.3zM6 14l.8 2.2L9 17l-2.2.8L6 20l-.8-2.2L3 17l2.2-.8zM17 15l.6 1.7 1.7.6-1.7.6-.6 1.7-.6-1.7-1.7-.6 1.7-.6z" />,
];

const STATUS_COLORS: Record<string, string> = {
  Mature: 'text-teal-700 border-teal-500/30 bg-teal-50',
  Émergent: 'text-azure-600 border-azure-500/30 bg-azure-50',
  Emerging: 'text-azure-600 border-azure-500/30 bg-azure-50',
  'En montée': 'text-sage-600 border-sage-500/30 bg-sage-400/10',
  Rising: 'text-sage-600 border-sage-500/30 bg-sage-400/10',
  Encadré: 'text-clay-600 border-clay-500/30 bg-clay-400/10',
  Supervised: 'text-clay-600 border-clay-500/30 bg-clay-400/10',
  'Cas par cas': 'text-ink-500 border-ink-200 bg-ink-50',
  'Case-by-case': 'text-ink-500 border-ink-200 bg-ink-50',
};

/**
 * Cartographie honnête des capacités IA en 2026. Cartes blanches premium sur
 * fond clair, badge de statut sobre, hover en relief. Signal « cabinet IA qui
 * maîtrise l'état de l'art » sans esthétique terminal.
 */
export function Capabilities() {
  const t = useTranslations('capabilities');
  const items = t.raw('items') as CapabilityItem[];

  return (
    <section className="relative py-28 md:py-40 bg-gradient-to-b from-azure-50 via-canvas to-teal-100/60">
      <div className="container-fluid">
        <div className="max-w-3xl mb-14 md:mb-20">
          <div className="eyebrow text-teal-700 mb-7">
            {t('label')}
          </div>
          <h2 className="font-display text-display-lg leading-[1.05] text-ink-900 mb-7">
            <RevealText stagger={0.04}>{t('title')}</RevealText>
          </h2>
          <p className="text-lead text-ink-600 max-w-2xl">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((item, i) => {
            const statusClass =
              STATUS_COLORS[item.status] ?? 'text-ink-500 border-ink-200 bg-ink-50';
            return (
              <article
                key={i}
                className="group relative bg-paper rounded-card p-8 md:p-9 min-h-[260px] flex flex-col justify-between border border-ink-100 shadow-soft transition-all duration-500 hover:shadow-lift hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="inline-flex w-11 h-11 items-center justify-center rounded-xl bg-teal-50 text-teal-600 ring-1 ring-teal-500/20">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      {ICONS[i % ICONS.length]}
                    </svg>
                  </span>
                  <span
                    className={`inline-flex items-center gap-2 px-3 py-1 text-[10px] uppercase tracking-[0.16em] font-semibold border rounded-full ${statusClass}`}
                  >
                    <span className="block w-1.5 h-1.5 rounded-full bg-current" />
                    {item.status}
                  </span>
                </div>
                <div className="flex-1 flex flex-col justify-end">
                  <h3 className="font-display text-2xl md:text-[1.75rem] text-ink-900 mb-3 leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-[15px] text-ink-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
