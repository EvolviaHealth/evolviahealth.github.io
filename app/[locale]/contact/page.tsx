import { BookingForm } from '@/components/contact/BookingForm';
import { CalBooking } from '@/components/contact/CalBooking';
import { GoogleBooking } from '@/components/contact/GoogleBooking';
import { getTranslations, setRequestLocale } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'booking' });
  return {
    title: t('title'),
    description: t('subtitle'),
  };
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('booking');
  const c = await getTranslations('contact');

  return (
    <section className="relative min-h-screen pt-40 pb-24 md:pt-48 md:pb-32">
      <div className="container-fluid">
        {/* Intro */}
        <div className="max-w-3xl mb-12">
          <div className="eyebrow text-teal-700 mb-6">
            <span className="eyebrow-rule" />
            {t('eyebrow')}
          </div>
          <h1 className="font-display text-display-md text-ink-900 leading-[1.04] mb-6">
            {t('title')}
          </h1>
          <p className="text-lead text-ink-600 leading-relaxed">{t('subtitle')}</p>
        </div>

        {/* Vrai calendrier de RDV Cal.com (créneaux réels temps réel, anti
            double-réservation, sync Google Agenda, emails auto). Carte
            d'activation tant que NEXT_PUBLIC_CAL_LINK n'est pas renseigné. */}
        <div className="mb-16">
          <CalBooking />
        </div>

        {/* Repli Google Appointment Scheduling, si jamais utilisé à la place. */}
        <div className="mb-16">
          <GoogleBooking />
        </div>

        {/* Formulaire de message (réel) + coordonnées */}
        <div id="message" className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <aside className="lg:col-span-5">
            <h2 className="font-display text-2xl md:text-3xl text-ink-900 mb-6 leading-tight">
              {c('formLabel')}
            </h2>
            <div className="space-y-8">
              <div className="pb-6 border-b border-ink-100">
                <div className="text-[11px] uppercase tracking-[0.18em] text-ink-400 mb-3 font-medium">
                  {c('emailLabel')}
                </div>
                <a
                  href="mailto:evolviahealth@outlook.fr"
                  className="font-display text-2xl md:text-3xl text-ink-900 hover:text-teal-700 transition-colors break-all"
                >
                  evolviahealth@outlook.fr
                </a>
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-[0.18em] text-ink-400 mb-3 font-medium">
                  {c('privacyLabel')}
                </div>
                <p className="text-sm text-ink-500 leading-relaxed max-w-sm">
                  {c('privacyText')}
                </p>
              </div>
            </div>
          </aside>

          <div className="lg:col-span-7">
            <div className="rounded-[20px] border border-ink-100 bg-mist/40 p-6 md:p-10 shadow-soft">
              <BookingForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
