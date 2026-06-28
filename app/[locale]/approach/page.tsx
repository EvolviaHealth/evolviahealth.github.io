import { PageShell } from '@/components/layout/PageShell';
import { Link } from '@/lib/i18n/routing';
import { getTranslations, setRequestLocale } from 'next-intl/server';

type Phase = { num: string; title: string; desc: string; week: string };
type Checkpoint = { tag: string; title: string; desc: string };

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.approach' });
  return { title: t('metaTitle') };
}

export default async function ApproachPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('pages.approach');
  const phases = t.raw('phases') as Phase[];
  const checkpoints = t.raw('checkpoints') as Checkpoint[];

  return (
    <PageShell
      eyebrow={t('eyebrow')}
      title={t('title')}
      subtitle={t('subtitle')}
      image="/images/handshake.jpg"
    >
      {/* Phases */}
      <section className="bg-canvas py-20 md:py-28">
        <div className="container-fluid">
          <div className="border-t border-ink-200">
            {phases.map((p) => (
              <article
                key={p.num}
                className="grid grid-cols-12 gap-4 md:gap-8 items-start py-10 md:py-14 border-b border-ink-100 group"
              >
                <span className="col-span-2 md:col-span-1 font-display text-3xl md:text-4xl text-teal-600 tabular-nums leading-none">
                  {p.num}
                </span>
                <div className="col-span-10 md:col-span-7">
                  <h3 className="font-display text-2xl md:text-3xl text-ink-900 mb-3 leading-tight">
                    {p.title}
                  </h3>
                  <p className="text-[15px] md:text-base text-ink-600 leading-relaxed">{p.desc}</p>
                </div>
                <span className="col-start-3 col-span-10 md:col-start-9 md:col-span-4 text-xs md:text-sm uppercase tracking-wider text-ink-400 font-medium">
                  {p.week}
                </span>
              </article>
            ))}
          </div>

          {/* Jalons */}
          <div className="mt-20 md:mt-28">
            <div className="eyebrow text-teal-700 mb-10">
              <span className="eyebrow-rule" />
              {t('checkpointsLabel')}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {checkpoints.map((c, i) => (
                <div
                  key={i}
                  className="bg-paper border border-ink-100 rounded-card p-7 shadow-soft"
                >
                  <div className="text-xs uppercase tracking-wider text-teal-700 mb-4 font-semibold">
                    {c.tag}
                  </div>
                  <h4 className="font-display text-xl text-ink-900 mb-3 leading-snug">{c.title}</h4>
                  <p className="text-sm text-ink-600 leading-relaxed">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* GROS call to action final (demande Cassiopée) */}
      <section className="relative bg-gradient-to-br from-ink-900 via-teal-800 to-azure-700 py-28 md:py-40 overflow-hidden">
        <div
          className="absolute -top-1/4 left-1/2 -translate-x-1/2 w-[70vw] h-[70vw] rounded-full opacity-25 blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(31,156,135,0.5) 0%, transparent 65%)' }}
        />
        <div className="container-fluid relative text-center">
          <p className="text-base uppercase tracking-[0.2em] text-teal-300 mb-6">{t('ctaLead')}</p>
          <h2 className="font-display text-display-lg md:text-display-xl text-white mb-8 leading-[1.02] max-w-4xl mx-auto">
            {t('ctaTitle')}
          </h2>
          <p className="text-lead text-white/70 max-w-2xl mx-auto mb-12">{t('ctaSubtitle')}</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 bg-teal-500 text-white px-10 py-5 rounded-full text-lg font-semibold hover:bg-teal-400 transition-colors shadow-lift"
            >
              {t('ctaButton')}
              <svg width="18" height="18" viewBox="0 0 14 14" fill="none" className="transition-transform group-hover:translate-x-1">
                <path d="M1 7H13M13 7L7 1M13 7L7 13" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 border border-white/30 text-white px-8 py-5 rounded-full text-base font-medium hover:bg-white/10 transition-colors"
            >
              {t('ctaButtonSecondary')}
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
