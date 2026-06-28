import { setRequestLocale } from 'next-intl/server';
import { Hero } from '@/components/home/Hero';
import { Trust } from '@/components/home/Trust';
import { Ecosystem } from '@/components/home/Ecosystem';
import { ImageBand } from '@/components/home/ImageBand';
import { Manifesto } from '@/components/home/Manifesto';
import { Capabilities } from '@/components/home/Capabilities';
import { UseCases } from '@/components/home/UseCases';
import { Versus } from '@/components/home/Versus';
import { Numbers } from '@/components/home/Numbers';
import { Testimonials } from '@/components/home/Testimonials';
import { NewsFeed } from '@/components/home/NewsFeed';
import { Marquee } from '@/components/home/Marquee';
import { Promethee } from '@/components/home/Promethee';
import { getNews } from '@/lib/news';

/**
 * Parcours de la Home (structure de cabinet de conseil santé premium) :
 * 1. Hero — promesse + CTA inversés (Découvrir l'approche, puis Prendre RDV)
 * 2. Trust — chiffres clés + secteurs servis (« ils nous font confiance »)
 * 3. Manifeste — conviction fondatrice
 * 4. Capabilities — état de l'art IA (signal d'expertise)
 * 5. UseCases — activités concrètes (scroll horizontal)
 * 6. Versus — gain potentiel illustratif (honnête)
 * 7. Numbers — 4 chiffres clés
 * 8. Testimonials — le retour des gens
 * 9. NewsFeed — actualités en direct IA / santé / pharma
 * 10. Marquee — bandeau valeurs
 * 11. Prométhée — différenciateur (agent IA propriétaire) + CTA finale
 */
export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const news = await getNews(locale);
  return (
    <>
      <Hero />
      <Trust />
      <Ecosystem />
      <ImageBand />
      <Manifesto />
      <Capabilities />
      <UseCases />
      <Versus />
      <Numbers />
      <Testimonials />
      <NewsFeed initialItems={news} />
      <Marquee />
      <Promethee />
    </>
  );
}
