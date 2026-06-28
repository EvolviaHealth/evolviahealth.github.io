'use client';

import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';

/**
 * Vrai calendrier de prise de rendez-vous, façon Doctolib, propulsé par
 * Cal.com (le « Doctolib open-source »). Embarqué directement dans le site,
 * thème EvolvIA (vert teal), affichage mois.
 *
 * Cal.com gère TOUT, en temps réel et sans rien de simulé :
 *  - le visiteur ne voit QUE les créneaux réellement libres (les heures déjà
 *    réservées ou bloquées dans l'agenda de Cassiopée n'apparaissent pas) ;
 *  - impossible de réserver deux fois le même créneau (verrou automatique) ;
 *  - synchronisation deux sens avec le Google Agenda de Cassiopée ;
 *  - email de confirmation + rappels + lien visio automatiques ;
 *  - Cassiopée voit les réservations tomber en direct dans son tableau de bord.
 *
 * Activation : créer le compte Cal.com de Cassiopée (gratuit, ~5 min), puis
 * coller son lien d'événement dans la variable d'environnement
 * NEXT_PUBLIC_CAL_LINK (ex. « evolvia-health/consultation »).
 * Voir README.md, section « Activer le calendrier Cal.com ».
 *
 * Tant que le lien n'est pas renseigné, on affiche une carte d'activation
 * claire (pas un faux calendrier) qui indique l'étape restante.
 */
export function CalBooking() {
  const t = useTranslations('booking');
  const link = process.env.NEXT_PUBLIC_CAL_LINK;
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!link || !ref.current) return;
    const el = ref.current;
    el.replaceChildren(); // évite un double embed si le composant se remonte

    // Chargeur officiel Cal.com (idempotent : ne ré-injecte pas le script)
    (function (C: any, A: string, L: string) {
      const p = (a: any, ar: any) => a.q.push(ar);
      const d = C.document;
      C.Cal =
        C.Cal ||
        function (...args: any[]) {
          const cal = C.Cal;
          if (!cal.loaded) {
            cal.ns = {};
            cal.q = cal.q || [];
            d.head.appendChild(d.createElement('script')).src = A;
            cal.loaded = true;
          }
          if (args[0] === L) {
            const api: any = function (...a: any[]) {
              p(api, a);
            };
            const namespace = args[1];
            api.q = api.q || [];
            if (typeof namespace === 'string') {
              cal.ns[namespace] = cal.ns[namespace] || api;
              p(cal.ns[namespace], args);
              p(cal, ['initNamespace', namespace]);
            } else {
              p(cal, args);
            }
            return;
          }
          p(cal, args);
        };
    })(window, 'https://app.cal.com/embed/embed.js', 'init');

    const Cal = (window as any).Cal;
    Cal('init', 'evolvia', { origin: 'https://cal.com' });
    Cal.ns.evolvia('inline', {
      elementOrSelector: el,
      calLink: link,
      // config.theme force le thème clair quel que soit le réglage du compte
      // Cal.com (sinon l'embed peut s'afficher en sombre sur le site clair).
      config: { layout: 'month_view', theme: 'light' },
    });
    Cal.ns.evolvia('ui', {
      theme: 'light',
      cssVarsPerTheme: { light: { 'cal-brand': '#1F9C87' } },
      hideEventTypeDetails: false,
      layout: 'month_view',
    });
  }, [link]);

  // ── Calendrier réel branché ──────────────────────────────────────────────
  if (link) {
    return (
      <div className="rounded-[20px] border border-ink-100 bg-paper shadow-soft overflow-hidden">
        <div className="px-6 pt-6 pb-1 flex items-center gap-2.5 text-[11px] uppercase tracking-[0.18em] text-teal-700 font-semibold">
          <span className="block w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
          {t('calNote')}
        </div>
        <div
          ref={ref}
          style={{ minHeight: 'min(86vh, 820px)', width: '100%', overflow: 'auto' }}
        />
      </div>
    );
  }

  // ── Carte d'activation (honnête, pas un faux calendrier) ─────────────────
  return (
    <div className="rounded-[20px] border border-teal-500/25 bg-gradient-to-br from-teal-50 to-paper shadow-soft p-8 md:p-12">
      <div className="flex items-center gap-2.5 text-[11px] uppercase tracking-[0.18em] text-teal-700 font-semibold mb-5">
        <span className="block w-2 h-2 rounded-full bg-teal-500" />
        {t('calNote')}
      </div>
      <h3 className="font-display text-2xl md:text-3xl text-ink-900 leading-tight mb-4 max-w-2xl">
        {t('title')}
      </h3>
      <p className="text-ink-600 leading-relaxed max-w-2xl mb-7">{t('calSoon')}</p>
      <a
        href="#message"
        className="inline-flex items-center gap-2.5 bg-teal-500 text-white px-7 py-3.5 rounded-full text-base font-semibold hover:bg-teal-600 transition-colors shadow-soft"
      >
        {t('calSoonCta')}
        <svg width="15" height="15" viewBox="0 0 14 14" fill="none">
          <path d="M1 7H13M13 7L7 1M13 7L7 13" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </a>
    </div>
  );
}
