import { PageShell } from '@/components/layout/PageShell';
import { Link } from '@/lib/i18n/routing';
import { NewsFeed } from '@/components/home/NewsFeed';
import { getNews } from '@/lib/news';
import { getTranslations, setRequestLocale } from 'next-intl/server';

type Category = { label: string; count: string };

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.insights' });
  return { title: t('metaTitle') };
}

export default async function InsightsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('pages.insights');
  const cats = t.raw('categories') as Category[];
  const news = await getNews(locale);

  return (
    <PageShell eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} image="/images/digital-health-2.jpg">
      {/* Fil d'actualités (réelles, récupérées au build + refresh live) */}
      <NewsFeed initialItems={news} />

      {/* Catégories + note + abonnement */}
      <section className="bg-mist py-24 md:py-32">
        <div className="container-fluid">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16">
            {cats.map((c, i) => (
              <div
                key={i}
                className="bg-paper border border-ink-100 rounded-card p-6 md:p-8 shadow-soft"
              >
                <div className="text-[11px] uppercase tracking-wider text-teal-700 mb-3 font-semibold">
                  {c.count}
                </div>
                <h3 className="font-display text-lg md:text-xl text-ink-900 leading-snug">
                  {c.label}
                </h3>
              </div>
            ))}
          </div>

          <div className="max-w-3xl border-l-2 border-teal-500 pl-8 py-2">
            <p className="font-display text-xl md:text-2xl text-ink-800 leading-snug italic">
              {t('comingNote')}
            </p>
          </div>

          <div className="mt-16 pt-10 border-t border-ink-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="text-[11px] uppercase tracking-[0.18em] text-ink-500 font-medium">
              {t('subscribeLabel')}
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-teal-500 text-white font-medium px-7 py-3.5 rounded-full hover:bg-teal-600 transition-colors"
            >
              {t('subscribeCta')}
              <svg width="16" height="16" viewBox="0 0 14 14" fill="none">
                <path d="M1 7H13M13 7L7 1M13 7L7 13" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
