import { PageShell } from '@/components/layout/PageShell';
import { Link } from '@/lib/i18n/routing';
import { getTranslations, setRequestLocale } from 'next-intl/server';

type Testimonial = { quote: string; name: string; role: string; photo?: string };

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'testimonials' });
  return { title: t('title'), description: t('subtitle') };
}

export default async function TestimonialsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('testimonials');
  const nav = await getTranslations('nav');
  const booking = await getTranslations('booking');
  const items = t.raw('items') as Testimonial[];

  return (
    <PageShell eyebrow={t('label')} title={t('title')} subtitle={t('subtitle')} image="/images/boardroom.jpg">
      <section className="bg-canvas py-20 md:py-28">
        <div className="container-fluid">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item, i) => (
              <figure
                key={i}
                className="relative bg-paper rounded-card p-9 md:p-11 border border-ink-100 shadow-soft flex flex-col"
              >
                <span aria-hidden className="font-display text-7xl leading-none text-teal-500/40 mb-3 select-none">
                  “
                </span>
                <blockquote className="font-display text-2xl md:text-[1.75rem] leading-[1.3] text-ink-900 flex-1">
                  {item.quote}
                </blockquote>
                <figcaption className="mt-8 pt-6 border-t border-ink-100 flex items-center gap-5">
                  {item.photo ? (
                    <img src={item.photo} alt={item.name} className="w-16 h-16 md:w-[72px] md:h-[72px] rounded-full object-cover ring-2 ring-teal-500/30" />
                  ) : (
                    <span className="w-16 h-16 rounded-full bg-teal-500/15 flex items-center justify-center font-display text-2xl text-teal-700">
                      {item.name.charAt(0)}
                    </span>
                  )}
                  <div>
                    <div className="text-[17px] md:text-lg font-semibold text-ink-900 leading-tight">{item.name}</div>
                    <div className="text-[14px] md:text-[15px] text-ink-500 leading-tight mt-1">{item.role}</div>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* CTA : partager son retour */}
      <section className="bg-sand py-24 md:py-32 text-center">
        <div className="container-fluid">
          <h2 className="font-display text-display-sm md:text-display-md text-ink-900 mb-8 leading-tight max-w-3xl mx-auto">
            {nav('testimonials')}
          </h2>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 bg-teal-500 text-white px-8 py-4 rounded-full text-base font-semibold hover:bg-teal-600 transition-colors"
          >
            {booking('eyebrow')}
            <svg width="16" height="16" viewBox="0 0 14 14" fill="none">
              <path d="M1 7H13M13 7L7 1M13 7L7 13" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
