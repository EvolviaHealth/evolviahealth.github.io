import { PageShell } from '@/components/layout/PageShell';
import { Link } from '@/lib/i18n/routing';
import { getTranslations, setRequestLocale } from 'next-intl/server';

type Sector = { name: string; desc: string };

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.clients' });
  return { title: t('metaTitle') };
}

export default async function ClientsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('pages.clients');
  const sectors = t.raw('sectors') as Sector[];

  return (
    <PageShell eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} image="/images/hospital-atrium.jpg">
      <section className="bg-canvas py-24 md:py-32 border-t border-ink-100">
        <div className="container-fluid">
          <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-teal-700 mb-10">
            {t('sectorsLabel')}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-ink-100 border border-ink-100 rounded-2xl overflow-hidden shadow-soft">
            {sectors.map((s, i) => (
              <div key={i} className="bg-paper p-8 md:p-10">
                <h3 className="font-display text-xl md:text-2xl text-ink-900 mb-3 leading-snug">
                  {s.name}
                </h3>
                <p className="text-base text-ink-600 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-sand text-ink-900 py-32 md:py-40">
        <div className="container-fluid max-w-4xl">
          <div className="text-6xl md:text-8xl font-display text-teal-500/30 leading-none mb-6 select-none">
            “
          </div>
          <blockquote className="font-display text-2xl md:text-4xl leading-tight mb-8 -mt-4">
            {t('testimonialQuote')}
          </blockquote>
          <div className="font-mono text-xs md:text-sm uppercase tracking-wider text-ink-600">
            · {t('testimonialAttribution')}
          </div>
        </div>
      </section>

      <section className="bg-mist py-32 md:py-40 border-t border-ink-100 text-center">
        <div className="container-fluid">
          <h2 className="font-display text-3xl md:text-5xl text-ink-900 mb-10 leading-tight">
            {t('ctaTitle')}
          </h2>
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
