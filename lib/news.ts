/**
 * Récupération d'actualités RÉELLES côté serveur (au build).
 *
 * Le site est en export statique : ce fetch s'exécute pendant `next build`
 * (l'environnement de build a accès au réseau) et « cuit » les dernières
 * actualités dans le HTML. Le composant client NewsFeed tente ensuite un
 * rafraîchissement live ; en dernier recours, une sélection de repli s'affiche.
 *
 * Aucune dépendance externe : parsing RSS par expressions régulières.
 * Pour rafraîchir les actualités en prod : redéployer (ou brancher un Deploy
 * Hook quotidien via GitHub Actions).
 */

export type NewsArticle = {
  title: string;
  link: string;
  source: string;
  date?: string;
};

const QUERY: Record<string, string> = {
  fr: 'intelligence artificielle santé OR pharmaceutique OR "santé digitale"',
  en: 'artificial intelligence healthcare OR pharmaceutical OR "digital health"',
  es: 'inteligencia artificial salud OR farmacéutica OR "salud digital"',
  de: 'künstliche Intelligenz Gesundheit OR Pharma OR "digitale Gesundheit"',
  it: 'intelligenza artificiale sanità OR farmaceutica OR "salute digitale"',
};

function googleNewsRss(locale: string): string {
  const map: Record<string, { hl: string; gl: string; ceid: string }> = {
    fr: { hl: 'fr', gl: 'FR', ceid: 'FR:fr' },
    en: { hl: 'en-US', gl: 'US', ceid: 'US:en' },
    es: { hl: 'es', gl: 'ES', ceid: 'ES:es' },
    de: { hl: 'de', gl: 'DE', ceid: 'DE:de' },
    it: { hl: 'it', gl: 'IT', ceid: 'IT:it' },
  };
  const c = map[locale] ?? map.fr;
  const q = encodeURIComponent(QUERY[locale] ?? QUERY.fr);
  return `https://news.google.com/rss/search?q=${q}&hl=${c.hl}&gl=${c.gl}&ceid=${c.ceid}`;
}

function decode(s: string): string {
  return s
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#?\w+;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function tag(block: string, name: string): string {
  const m = block.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`, 'i'));
  return m ? decode(m[1]) : '';
}

export async function getNews(locale: string): Promise<NewsArticle[]> {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 6000);
    const res = await fetch(googleNewsRss(locale), {
      signal: controller.signal,
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; EvolviaHealthBot/1.0)' },
      // Revalidation côté build/ISR si jamais le mode serveur est activé
      next: { revalidate: 3600 },
    } as RequestInit);
    clearTimeout(timer);
    if (!res.ok) return [];
    const xml = await res.text();
    const items = xml.split(/<item>/i).slice(1, 9);
    const articles: NewsArticle[] = items.map((block) => {
      const rawTitle = tag(block, 'title');
      // Google News : "Titre - Source"
      const idx = rawTitle.lastIndexOf(' - ');
      const title = idx > 20 ? rawTitle.slice(0, idx) : rawTitle;
      const src = tag(block, 'source') || (idx > 20 ? rawTitle.slice(idx + 3) : 'Google Actualités');
      return {
        title,
        link: tag(block, 'link'),
        source: src,
        date: tag(block, 'pubDate'),
      };
    });
    return articles.filter((a) => a.title && a.link).slice(0, 6);
  } catch {
    return [];
  }
}
