import { PageShell } from '@/components/layout/PageShell';
import { PrometheeSection } from '@/components/founder/PrometheeSection';
import { getTranslations, setRequestLocale } from 'next-intl/server';

type TimelineRow = { period: string; title: string; desc: string };

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.founder' });
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
  };
}

export default async function FounderPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('pages.founder');
  const timeline = t.raw('timeline') as TimelineRow[];

  return (
    <PageShell eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')}>
      {/* Bio + photo */}
      <section className="bg-canvas py-20 md:py-28">
        <div className="container-fluid">
          <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-12 lg:gap-20 items-start">
            {/* Photo + carte école */}
            <div className="lg:sticky lg:top-32">
              <div className="relative rounded-t-[999px] rounded-b-[24px] overflow-hidden shadow-lift ring-1 ring-ink-100 aspect-[4/5] img-zoom">
                <img
                  src="/images/founder-portrait.jpg"
                  alt={t('photoAlt')}
                  className="absolute inset-0 w-full h-full object-cover"
                  draggable={false}
                />
              </div>
              <div className="mt-6 bg-paper border border-ink-100 rounded-card p-6 shadow-soft">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 text-teal-600">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 3 1 9l11 6 9-4.91V17h2V9M5 13.18v4L12 21l7-3.82v-4L12 17z" fill="currentColor"/></svg>
                  </span>
                  <p className="text-sm text-ink-600 leading-relaxed">{t('schoolNote')}</p>
                </div>
              </div>
            </div>

            {/* Bio + parcours */}
            <div>
              <div className="eyebrow text-teal-700 mb-6">
                <span className="eyebrow-rule" />
                {t('founderEyebrow')}
              </div>
              <h2 className="font-display text-display-md text-ink-900 mb-8 leading-[1.08]">
                {t('founderHeading')}
              </h2>
              <p className="text-lead text-ink-600 leading-relaxed mb-6">{t('founderBio')}</p>
              <p className="text-base text-ink-500 leading-relaxed mb-14 max-w-2xl">{t('growthNote')}</p>

              <div className="border-t border-ink-200">
                {timeline.map((row, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-2 md:gap-12 py-7 border-b border-ink-100"
                  >
                    <span className="text-xs uppercase tracking-wider text-teal-700 font-semibold pt-1">
                      {row.period}
                    </span>
                    <div>
                      <h3 className="font-display text-xl md:text-2xl text-ink-900 mb-2 leading-snug">
                        {row.title}
                      </h3>
                      <p className="text-base text-ink-600 leading-relaxed">{row.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Prométhée lab */}
      <section className="bg-sand py-28 md:py-40">
        <div className="container-fluid max-w-4xl">
          <div className="eyebrow text-azure-600 mb-6">
            <span className="eyebrow-rule" />
            {t('prometheeLabPretitle')}
          </div>
          <h2 className="font-display text-display-md text-ink-900 leading-tight mb-8">
            {t('prometheeLabTitle')}
          </h2>
          <p className="text-lead text-ink-600 leading-relaxed mb-12 max-w-2xl">
            {t('prometheeLabText')}
          </p>
          <div className="border-l-2 border-teal-500 pl-8 py-2 max-w-3xl">
            <p className="font-display text-2xl md:text-3xl leading-snug italic text-ink-800">
              « {t('prometheeLabQuote')} »
            </p>
          </div>
        </div>
      </section>

      <PrometheeSection />
    </PageShell>
  );
}
