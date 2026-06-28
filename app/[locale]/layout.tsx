import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/lib/i18n/routing';
import { Plus_Jakarta_Sans, Instrument_Serif } from 'next/font/google';
import { routing } from '@/lib/i18n/routing';
import { SmoothScroll } from '@/components/providers/SmoothScroll';
import { ScrollTriggerCleanup } from '@/components/providers/ScrollTriggerCleanup';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { AnimatedBackground } from '@/components/layout/AnimatedBackground';
import { ScrollProgress } from '@/components/providers/ScrollProgress';
import { Chatbot } from '@/components/chatbot/Chatbot';

const SITE_URL = 'https://evolviahealth.github.io';

// Pré-génère les routes des 5 locales au build pour l'export statique
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// Corps de texte : Plus Jakarta Sans (police libre Google Fonts), au rendu
// arrondi et aéré dans l'esprit des plateformes santé type Doctolib.
// Les titres restent en serif (Cassiopée adore les grands titres).
const sans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const display = Instrument_Serif({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  return {
    title: {
      default: t('defaultTitle'),
      template: '%s | EvolvIA Health',
    },
    description: t('description'),
    metadataBase: new URL(SITE_URL),
    keywords: [
      'EvolvIA Health',
      'EvolvIA',
      'intelligence artificielle santé',
      'IA santé',
      'IA pharma',
      'conseil IA santé',
      'cabinet conseil intelligence artificielle',
      'santé digitale',
      'industrie pharmaceutique',
      'agents IA santé',
      'AI healthcare consulting',
    ],
    alternates: {
      languages: Object.fromEntries(routing.locales.map((l) => [l, `${SITE_URL}/${l}`])),
    },
    openGraph: {
      type: 'website',
      siteName: 'EvolvIA Health',
      title: t('defaultTitle'),
      description: t('description'),
      url: `${SITE_URL}/${locale}`,
      images: [{ url: `${SITE_URL}/images/lab-research-2.jpg`, width: 1600, height: 2000, alt: 'EvolvIA Health' }],
      locale,
    },
    twitter: {
      card: 'summary_large_image',
      title: t('defaultTitle'),
      description: t('description'),
      images: [`${SITE_URL}/images/lab-research-2.jpg`],
    },
    robots: { index: true, follow: true },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as Locale)) notFound();
  setRequestLocale(locale);
  const messages = await getMessages();
  const t = await getTranslations({ locale, namespace: 'meta' });

  // Données structurées Google (référencement de la marque). Contenu 100%
  // statique généré par nous (aucune entrée utilisateur), sans < > & :
  // rendu en enfant de <script>, donc sans HTML brut injecté.
  const jsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'EvolvIA Health',
    alternateName: 'EvolvIA',
    url: SITE_URL,
    logo: `${SITE_URL}/brand/evolvia-logo-transparent@4x.png`,
    description: t('description'),
    email: 'evolviahealth@outlook.fr',
    areaServed: 'FR',
    knowsAbout: ['Intelligence artificielle', 'Santé', 'Industrie pharmaceutique', 'Santé digitale'],
  });

  return (
    <html lang={locale} className={`${sans.variable} ${display.variable}`}>
      <body className="bg-canvas text-ink-900 font-sans">
        <script type="application/ld+json">{jsonLd}</script>
        {/* Rideau d'entrée (auto-effaçant) + finitions studio */}
        <div className="page-reveal" aria-hidden>
          <img src="/brand/evolvia-logo-transparent@4x.png" alt="" />
        </div>
        <ScrollProgress />
        <NextIntlClientProvider messages={messages}>
          <AnimatedBackground />
          <ScrollTriggerCleanup />
          <SmoothScroll>
            <Header />
            <main>{children}</main>
            <Footer />
          </SmoothScroll>
          {/* Chatbot guidé — hors du SmoothScroll (élément fixed, comme le fond
              animé), pour ne pas être affecté par les transforms de Lenis. */}
          <Chatbot />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
