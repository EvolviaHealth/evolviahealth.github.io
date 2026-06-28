import { PageShell } from '@/components/layout/PageShell';
import { Link } from '@/lib/i18n/routing';
import { getTranslations, setRequestLocale } from 'next-intl/server';

type Stat = { label: string; value: string };
type UseCase = { tag: string; title: string; desc: string; stats: Stat[] };

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.useCases' });
  return { title: t('metaTitle') };
}

export default async function UseCasesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('pages.useCases');
  const items = t.raw('items') as UseCase[];

  return (
    <PageShell eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} image="/images/digital-health.jpg">
      <section className="bg-canvas py-24 md:py-32 border-t border-ink-100">
        <div className="container-fluid">
          <div className="space-y-16 md:space-y-24">
            {items.map((c, i) => (
              <article
                key={i}
                className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-start pb-16 border-b border-ink-100 last:border-b-0"
              >
                <div className="md:col-span-5">
                  <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-teal-700 mb-4">
                    {c.tag}
                  </div>
                  <h2 className="font-display text-3xl md:text-5xl text-ink-900 leading-[1.05]">
                    {c.title}
                  </h2>
                </div>
                <div className="md:col-span-7">
                  <p className="text-lg text-ink-600 leading-relaxed mb-10">{c.desc}</p>
                  <div className="grid grid-cols-3 gap-4 md:gap-6 pt-6 border-t border-ink-100">
                    {c.stats.map((s, j) => (
                      <div key={j}>
                        <div className="font-mono text-[10px] uppercase tracking-wider text-ink-500 mb-2">
                          {s.label}
                        </div>
                        <div className="font-display text-2xl md:text-3xl text-ink-900 leading-tight">
                          {s.value}
                        </div>
                      </div>
                    ))}
                  </div>
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
