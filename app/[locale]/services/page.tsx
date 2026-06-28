import { PageShell } from '@/components/layout/PageShell';
import { Link } from '@/lib/i18n/routing';
import { getTranslations, setRequestLocale } from 'next-intl/server';

type ServiceItem = {
  num: string;
  category: string;
  title: string;
  desc: string;
  deliverables: string[];
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.services' });
  return { title: t('metaTitle') };
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('pages.services');
  const items = t.raw('items') as ServiceItem[];

  return (
    <PageShell eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} image="/images/lab-research.jpg">
      <section className="bg-canvas py-24 md:py-32 border-t border-ink-100">
        <div className="container-fluid">
          <div className="space-y-20 md:space-y-28">
            {items.map((it) => (
              <article
                key={it.num}
                className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-start pb-16 md:pb-20 border-b border-ink-100 last:border-b-0"
              >
                <div className="md:col-span-5">
                  <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-teal-700 mb-4">
                    {it.num} · {it.category}
                  </div>
                  <h2 className="font-display text-3xl md:text-5xl text-ink-900 leading-[1.05]">
                    {it.title}
                  </h2>
                </div>
                <div className="md:col-span-7">
                  <p className="text-lg text-ink-600 leading-relaxed mb-8">{it.desc}</p>
                  <ul className="space-y-2.5">
                    {it.deliverables.map((d, i) => (
                      <li key={i} className="text-base text-ink-600 flex gap-3">
                        <span className="text-teal-700 select-none mt-0.5">→</span>
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-mist py-32 md:py-40 border-t border-ink-100 text-center">
        <div className="container-fluid">
          <h2 className="font-display text-3xl md:text-5xl text-ink-900 mb-6 leading-tight">
            {t('ctaTitle')}
          </h2>
          <p className="text-lg text-ink-600 max-w-xl mx-auto mb-10">{t('ctaSubtitle')}</p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 bg-teal-500 text-white font-medium px-6 py-3.5 rounded-full hover:bg-teal-600 transition-colors"
          >
            {t('ctaButton')}
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 7H13M13 7L7 1M13 7L7 13" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
