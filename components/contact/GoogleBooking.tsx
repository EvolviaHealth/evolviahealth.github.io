'use client';

import { useTranslations } from 'next-intl';

/**
 * Réservation RÉELLE via Google Appointment Scheduling (page de prise de
 * rendez-vous native de Google Agenda). Google gère tout : créneaux réels,
 * places déjà prises, création de l'événement, lien Google Meet automatique et
 * email de confirmation au visiteur. Rien de simulé.
 *
 * Il suffit de coller l'URL de la page de réservation de Cassiopée dans la
 * variable d'environnement NEXT_PUBLIC_GCAL_BOOKING_URL (voir README.md,
 * « Activer la vraie prise de rendez-vous Google »).
 *
 * Tant que l'URL n'est pas renseignée, ce composant ne rend rien (la page
 * affiche alors le formulaire de message, lui aussi réel).
 */
export function GoogleBooking() {
  const t = useTranslations('booking');
  const url = process.env.NEXT_PUBLIC_GCAL_BOOKING_URL;

  if (!url) return null;

  // On force gv=true pour l'affichage embarqué de Google.
  const src = url.includes('gv=true') ? url : `${url}${url.includes('?') ? '&' : '?'}gv=true`;

  return (
    <div className="rounded-[20px] border border-ink-100 bg-paper shadow-soft overflow-hidden">
      <div className="px-6 pt-6 pb-2 flex items-center gap-2.5 text-[11px] uppercase tracking-[0.18em] text-teal-700 font-semibold">
        <span className="block w-2 h-2 rounded-full bg-teal-500" />
        {t('meetNote')}
      </div>
      <iframe
        src={src}
        title="Réservation Google"
        className="w-full"
        style={{ border: 0, minHeight: 'min(80vh, 760px)' }}
        loading="lazy"
      />
    </div>
  );
}
