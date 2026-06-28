'use client';

import { Link } from '@/lib/i18n/routing';
import { useTranslations } from 'next-intl';
import { RevealText } from '@/components/animations/RevealText';

type Props = {
  eyebrow: string;
  title: string;
  description?: string;
};

/**
 * Page « Coming soon » claire pour les sections encore en cours de rédaction.
 */
export function ComingSoon({ eyebrow, title, description }: Props) {
  const t = useTranslations('comingSoon');
  return (
    <section className="min-h-screen flex items-center pt-40 pb-24 overflow-hidden relative">
      <div className="container-fluid">
        <div className="max-w-4xl">
          <div className="eyebrow text-teal-700 mb-10">
            <span className="eyebrow-rule" />
            <RevealText delay={0.1} trigger="load">
              {eyebrow}
            </RevealText>
          </div>

          <h1 className="font-display text-display-lg text-ink-900 mb-10 leading-[1.04]">
            <RevealText delay={0.25} trigger="load" stagger={0.05}>
              {title}
            </RevealText>
          </h1>

          <p className="text-lead text-ink-600 leading-relaxed max-w-2xl mb-12">
            {description ?? t('defaultDescription')}
          </p>

          <div className="flex gap-5 flex-wrap items-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-base text-ink-500 hover:text-teal-700 transition-colors group"
            >
              <svg width="16" height="16" viewBox="0 0 14 14" fill="none" className="transition-transform group-hover:-translate-x-1">
                <path d="M13 7H1M1 7L7 1M1 7L7 13" stroke="currentColor" strokeWidth="1.5" />
              </svg>
              {t('backHome')}
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-teal-500 text-white px-6 py-3 rounded-full text-base font-medium hover:bg-teal-600 transition-colors group"
            >
              {t('contactUs')}
              <svg width="16" height="16" viewBox="0 0 14 14" fill="none" className="transition-transform group-hover:translate-x-1">
                <path d="M1 7H13M13 7L7 1M13 7L7 13" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
