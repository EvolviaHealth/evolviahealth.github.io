'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { cn } from '@/lib/utils';

/**
 * Formulaire de message RÉEL (complément du vrai calendrier Google).
 * Collecte coordonnées + besoin (dont « devis gratuit ») et envoie la demande
 * à Cassiopée. Aucun créneau simulé : la prise de rendez-vous avec créneaux
 * réels + Google Meet se fait via le calendrier Google embarqué (GoogleBooking).
 *
 * Envoi RÉEL sans serveur (site statique) via Web3Forms : le formulaire part
 * directement par email dans la boîte de Cassiopée. On renseigne la clé
 * d'accès Web3Forms (gratuite, liée à l'email de Cassiopée) dans la variable
 * NEXT_PUBLIC_WEB3FORMS_KEY. Anti-spam par honeypot. Si la clé n'est pas
 * encore posée OU si l'envoi échoue, on bascule sur un mailto pré-rempli
 * (le lead n'est jamais perdu). Voir README.md, « Activer le formulaire ».
 */
const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
const FALLBACK_EMAIL = 'evolviahealth@outlook.fr';

export function BookingForm() {
  const t = useTranslations('booking');
  const cf = useTranslations('contactForm');
  const locale = useLocale();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const needOptions = ['devis', 'conseil', 'agents', 'formation', 'autre'] as const;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get('name') || ''),
      email: String(fd.get('email') || ''),
      org: String(fd.get('org') || ''),
      need: String(fd.get('need') || ''),
      message: String(fd.get('message') || ''),
      locale,
    };
    const besoin = t(`needOptions.${payload.need}`);
    const honeypot = Boolean(fd.get('botcheck'));
    try {
      if (!WEB3FORMS_KEY) throw new Error('not-configured');
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `Nouvelle demande — ${payload.name} (site EvolvIA Health)`,
          from_name: 'Site EvolvIA Health',
          // Cassiopée peut répondre directement au prospect
          replyto: payload.email,
          botcheck: honeypot,
          Nom: payload.name,
          Email: payload.email,
          Organisation: payload.org || '—',
          Besoin: besoin,
          Message: payload.message || '—',
          Langue: locale,
        }),
      });
      const data = await res.json().catch(() => ({ success: false }));
      if (!data.success) throw new Error('web3forms');
      setSubmitted(true);
    } catch {
      // Repli : ouvre la messagerie du visiteur avec un email pré-rempli
      const subject = encodeURIComponent(`Demande via le site, ${payload.name}`);
      const body = encodeURIComponent(
        `Nom : ${payload.name}\nEmail : ${payload.email}\nOrganisation : ${payload.org}\nBesoin : ${besoin}\n\n${payload.message}`
      );
      window.location.href = `mailto:${FALLBACK_EMAIL}?subject=${subject}&body=${body}`;
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-teal-50 border border-teal-500/30 rounded-card p-10">
        <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-teal-700 font-semibold mb-4">
          <span className="block w-2 h-2 rounded-full bg-teal-500" />
          {cf('successLabel')}
        </div>
        <h3 className="font-display text-3xl text-ink-900 mb-4 leading-tight">{cf('successTitle')}</h3>
        <p className="text-ink-600 leading-relaxed">{cf('successText')}</p>
      </div>
    );
  }

  const inputCls =
    'w-full bg-paper border border-ink-200 rounded-xl px-4 py-3.5 text-base text-ink-900 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition placeholder:text-ink-300';
  const labelCls = 'block text-[13px] font-medium text-ink-700 mb-2';

  return (
    <form onSubmit={handleSubmit} className="space-y-7" noValidate>
      {/* Honeypot anti-spam (caché aux humains, coché par les bots) */}
      <input
        type="checkbox"
        name="botcheck"
        className="hidden"
        style={{ display: 'none' }}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className={labelCls}>{cf('name')}</label>
          <input id="name" name="name" required className={inputCls} placeholder={cf('namePlaceholder')} autoComplete="name" />
        </div>
        <div>
          <label htmlFor="email" className={labelCls}>{cf('email')}</label>
          <input id="email" name="email" type="email" required className={inputCls} placeholder={cf('emailPlaceholder')} autoComplete="email" />
        </div>
      </div>
      <div>
        <label htmlFor="org" className={labelCls}>{cf('org')}</label>
        <input id="org" name="org" className={inputCls} placeholder={cf('orgPlaceholder')} autoComplete="organization" />
      </div>

      <div>
        <div className="text-[11px] uppercase tracking-[0.18em] text-teal-700 font-semibold mb-4">
          {t('stepNeed')}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {needOptions.map((opt, i) => (
            <label
              key={opt}
              className="flex items-center gap-3 bg-paper border border-ink-200 rounded-xl px-4 py-3.5 cursor-pointer hover:border-teal-500/60 transition has-[:checked]:border-teal-500 has-[:checked]:bg-teal-50"
            >
              <input type="radio" name="need" value={opt} defaultChecked={i === 0} className="accent-teal-600" />
              <span className="text-[15px] text-ink-700">{t(`needOptions.${opt}`)}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="message" className={labelCls}>{t('messageOptional')}</label>
        <textarea id="message" name="message" rows={4} className={cn(inputCls, 'resize-none')} placeholder={cf('messagePlaceholder')} />
      </div>

      <label className="flex items-start gap-3 text-[13px] text-ink-500 leading-relaxed">
        <input type="checkbox" required className="mt-1 accent-teal-600" />
        {cf('rgpd')}
      </label>

      <button
        type="submit"
        disabled={submitting}
        className="group inline-flex items-center gap-3 bg-teal-500 text-white px-8 py-4 rounded-full text-base font-semibold hover:bg-teal-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-soft"
      >
        {submitting ? cf('submitting') : cf('submit')}
        <svg width="16" height="16" viewBox="0 0 14 14" fill="none" className="transition-transform group-hover:translate-x-1">
          <path d="M1 7H13M13 7L7 1M13 7L7 13" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </button>
    </form>
  );
}
