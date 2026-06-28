import { PageShell } from '@/components/layout/PageShell';
import { Link } from '@/lib/i18n/routing';
import { getTranslations, setRequestLocale } from 'next-intl/server';

type Value = { num: string; title: string; desc: string };

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.about' });
  return { title: t('metaTitle') };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('pages.about');
  const values = t.raw('values') as Value[];

  return (
    <PageShell eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} image="/images/office-lobby.jpg">
      <section className="bg-mist text-ink-900 py-24 md:py-32 border-t border-ink-100">
        <div className="container-fluid grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-azure-600 mb-5">
              {t('missionLabel')}
            </div>
            <h2 className="font-display text-3xl md:text-4xl leading-tight mb-6">
              {t('missionTitle')}
            </h2>
            <p className="text-base md:text-lg text-ink-600 leading-relaxed">{t('missionText')}</p>
          </div>
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-azure-600 mb-5">
              {t('visionLabel')}
            </div>
            <h2 className="font-display text-3xl md:text-4xl leading-tight mb-6">
              {t('visionTitle')}
            </h2>
            <p className="text-base md:text-lg text-ink-600 leading-relaxed">{t('visionText')}</p>
          </div>
        </div>
      </section>

      <section className="bg-canvas py-32 md:py-40">
        <div className="container-fluid">
          <div className="text-center mb-20">
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-teal-700 mb-5">
              {t('valuesLabel')}
            </div>
            <h2 className="font-display text-3xl md:text-5xl text-ink-900 leading-tight max-w-2xl mx-auto">
              {t('valuesTitle')}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
            {values.map((v) => (
              <div key={v.num}>
                <div className="font-mono text-xs uppercase tracking-wider text-teal-700 mb-4">
                  {v.num}
                </div>
                <h3 className="font-display text-xl md:text-2xl text-ink-900 mb-3 leading-snug">
                  {v.title}
                </h3>
                <p className="text-[15px] md:text-base text-ink-600 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-sand text-ink-900 py-32 md:py-40 text-center">
        <div className="container-fluid">
          <h2 className="font-display text-3xl md:text-5xl mb-10 leading-tight max-w-2xl mx-auto">
            {t('ctaTitle')}
          </h2>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 bg-ink-900 text-white font-medium px-6 py-3.5 rounded-full hover:bg-ink-700 transition-colors"
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
