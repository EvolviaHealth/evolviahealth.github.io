'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

/**
 * Formulaire de contact — adapté pour fond sombre + entièrement traduit FR/EN.
 * Tous les libellés viennent de `contactForm` dans les dictionnaires next-intl.
 * À brancher sur /api/contact (Resend + Sanity) — actuellement simulation.
 */
export function ContactForm() {
  const t = useTranslations('contactForm');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      // TODO: brancher sur /api/contact (Resend + Sanity)
      await new Promise((r) => setTimeout(r, 900));
      setSubmitted(true);
    } catch {
      setError(t('errorMessage'));
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="border border-teal-400/30 bg-teal-400/5 p-10 rounded-xl">
        <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-teal-300 mb-4">
          {t('successLabel')}
        </div>
        <h3 className="font-display text-3xl mb-4 leading-tight text-ink-50">
          {t('successTitle')}
        </h3>
        <p className="text-ink-100/70 leading-relaxed">{t('successText')}</p>
      </div>
    );
  }

  const inputClasses =
    'w-full bg-transparent border-b border-ink-100/15 py-4 text-base text-ink-50 focus:outline-none focus:border-teal-400 transition-colors placeholder:text-ink-100/30';
  const labelClasses =
    'block text-[11px] font-mono uppercase tracking-[0.18em] text-ink-100/45 mb-2';

  return (
    <form onSubmit={handleSubmit} className="space-y-7" noValidate>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className={labelClasses}>
            {t('name')}
          </label>
          <input
            required
            type="text"
            id="name"
            name="name"
            className={inputClasses}
            placeholder={t('namePlaceholder')}
            autoComplete="name"
          />
        </div>
        <div>
          <label htmlFor="email" className={labelClasses}>
            {t('email')}
          </label>
          <input
            required
            type="email"
            id="email"
            name="email"
            className={inputClasses}
            placeholder={t('emailPlaceholder')}
            autoComplete="email"
          />
        </div>
      </div>

      <div>
        <label htmlFor="org" className={labelClasses}>
          {t('org')}
        </label>
        <input
          type="text"
          id="org"
          name="org"
          className={inputClasses}
          placeholder={t('orgPlaceholder')}
          autoComplete="organization"
        />
      </div>

      <div>
        <label htmlFor="topic" className={labelClasses}>
          {t('topic')}
        </label>
        <select
          id="topic"
          name="topic"
          className={cn(
            inputClasses,
            'appearance-none cursor-pointer bg-no-repeat bg-right pr-8'
          )}
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8' fill='none'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%23F4F7FA' stroke-opacity='0.4' stroke-width='1.5'/%3E%3C/svg%3E\")",
          }}
          defaultValue=""
        >
          <option value="" className="bg-ink-900 text-ink-50">
            {t('topicSelect')}
          </option>
          <option value="conseil" className="bg-ink-900 text-ink-50">
            {t('topicOptions.conseil')}
          </option>
          <option value="agents" className="bg-ink-900 text-ink-50">
            {t('topicOptions.agents')}
          </option>
          <option value="formation" className="bg-ink-900 text-ink-50">
            {t('topicOptions.formation')}
          </option>
          <option value="change" className="bg-ink-900 text-ink-50">
            {t('topicOptions.change')}
          </option>
          <option value="autre" className="bg-ink-900 text-ink-50">
            {t('topicOptions.autre')}
          </option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className={labelClasses}>
          {t('message')}
        </label>
        <textarea
          required
          id="message"
          name="message"
          rows={5}
          className={cn(inputClasses, 'resize-none')}
          placeholder={t('messagePlaceholder')}
        />
      </div>

      <div className="flex items-start gap-3 pt-4">
        <input
          required
          type="checkbox"
          id="rgpd"
          name="rgpd"
          className="mt-1.5 accent-teal-400"
        />
        <label
          htmlFor="rgpd"
          className="text-xs text-ink-100/55 leading-relaxed"
        >
          {t('rgpd')}
        </label>
      </div>

      {error && (
        <p className="text-sm text-red-400" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="group inline-flex items-center gap-3 bg-teal-400 text-ink-900 px-8 py-4 rounded-full text-sm font-semibold tracking-wide hover:bg-ink-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {submitting ? t('submitting') : t('submit')}
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          className="transition-transform group-hover:translate-x-1"
        >
          <path
            d="M1 7H13M13 7L7 1M13 7L7 13"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
      </button>
    </form>
  );
}
