'use client';

import { useEffect, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { RevealText } from '@/components/animations/RevealText';

type NewsItem = {
  title: string;
  source: string;
  summary?: string;
  image?: string;
  link?: string;
  date?: string;
};

type Fallback = { title: string; source: string; summary: string; image: string };

// Images de repli pour les items sans visuel
const STOCK = [
  '/images/lab-research.jpg',
  '/images/digital-health.jpg',
  '/images/hospital-atrium.jpg',
  '/images/pills-bottle.jpg',
  '/images/boardroom.jpg',
  '/images/lab-research-2.jpg',
];

/**
 * Actualités en direct — IA, santé digitale et pharma.
 *
 * Contrainte : le site est en export statique (pas de serveur). On récupère donc
 * un flux RSS côté client via le service public rss2json, à partir d'une requête
 * Google Actualités ciblée (FR/EN). En cas d'échec, on affiche une sélection de
 * repli (dictionnaire) pour ne jamais laisser la section vide.
 */
const QUERY: Record<string, string> = {
  fr: 'intelligence artificielle santé OR pharmaceutique OR "santé digitale"',
  en: 'artificial intelligence healthcare OR pharmaceutical OR "digital health"',
};

function googleNewsRss(locale: string): string {
  const hl = locale === 'en' ? 'en-US' : 'fr';
  const gl = locale === 'en' ? 'US' : 'FR';
  const ceid = locale === 'en' ? 'US:en' : 'FR:fr';
  const q = encodeURIComponent(QUERY[locale] ?? QUERY.fr);
  return `https://news.google.com/rss/search?q=${q}&hl=${hl}&gl=${gl}&ceid=${ceid}`;
}

// Stratégie 1 : rss2json (JSON direct, CORS ok)
async function fetchViaRss2Json(rss: string, signal: AbortSignal): Promise<any[]> {
  const url = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rss)}&count=6`;
  const res = await fetch(url, { signal });
  const data = await res.json();
  if (data?.status !== 'ok' || !Array.isArray(data.items) || !data.items.length) throw new Error('rss2json empty');
  return data.items.map((it: any) => ({
    title: it.title,
    source: it.author,
    description: it.description,
    image: it.thumbnail || it.enclosure?.link,
    link: it.link,
    date: it.pubDate,
  }));
}

// Stratégie 2 : proxy CORS allorigins + parsing XML sûr (DOMParser, pas d'innerHTML)
async function fetchViaAllOrigins(rss: string, signal: AbortSignal): Promise<any[]> {
  const url = 'https://api.allorigins.win/raw?url=' + encodeURIComponent(rss);
  const res = await fetch(url, { signal });
  const text = await res.text();
  const doc = new DOMParser().parseFromString(text, 'text/xml');
  const nodes = Array.from(doc.querySelectorAll('item')).slice(0, 6);
  if (!nodes.length) throw new Error('xml empty');
  return nodes.map((n) => {
    const get = (sel: string) => n.querySelector(sel)?.textContent || '';
    const media = n.querySelector('content, thumbnail, enclosure');
    return {
      title: get('title'),
      source: get('source'),
      description: get('description'),
      image: media?.getAttribute('url') || undefined,
      link: get('link'),
      date: get('pubDate'),
    };
  });
}

// Strip HTML sans toucher au DOM (pas d'innerHTML → pas de risque XSS).
function stripHtml(input: string): string {
  if (!input) return '';
  const noTags = input.replace(/<[^>]*>/g, ' ');
  const decoded = noTags
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&#?\w+;/g, ' ');
  return decoded.replace(/\s+/g, ' ').trim();
}

type BakedArticle = { title: string; link: string; source: string; date?: string };

export function NewsFeed({ initialItems = [] }: { initialItems?: BakedArticle[] }) {
  const t = useTranslations('news');
  const locale = useLocale();
  const fallback = t.raw('fallback') as Fallback[];

  // Actualités RÉELLES récupérées au build (lib/news.ts), images depuis notre
  // banque pharma/santé puisque les flux RSS n'en fournissent pas.
  const baked: NewsItem[] = initialItems.map((a, i) => ({
    title: a.title,
    source: a.source,
    summary: '',
    image: STOCK[i % STOCK.length],
    link: a.link,
    date: a.date,
  }));

  const [items, setItems] = useState<NewsItem[] | null>(baked.length ? baked : null);
  const [errored, setErrored] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    (async () => {
      const rss = googleNewsRss(locale);
      let raw: any[] | null = null;
      // Chaîne de stratégies : rss2json, puis allorigins+XML. Fallback sinon.
      for (const strat of [fetchViaRss2Json, fetchViaAllOrigins]) {
        try {
          raw = await strat(rss, controller.signal);
          if (raw && raw.length) break;
        } catch {
          raw = null;
        }
      }
      clearTimeout(timeout);
      if (cancelled) return;
      if (!raw || !raw.length) {
        // Le refresh live a échoué : on garde les actus du build si présentes,
        // sinon on bascule sur la sélection de repli.
        if (!baked.length) setErrored(true);
        return;
      }
      const mapped: NewsItem[] = raw.slice(0, 6).map((it: any, idx: number) => ({
        title: stripHtml(it.title || ''),
        source: stripHtml(String(it.source || 'Actualités')).replace(' - Google News', '') || 'Actualités',
        summary: stripHtml(it.description || '').slice(0, 140),
        image: it.image || STOCK[idx % STOCK.length],
        link: it.link,
        date: it.date,
      }));
      setItems(mapped);
    })();

    return () => { cancelled = true; controller.abort(); clearTimeout(timeout); };
  }, [locale]);

  const display: NewsItem[] =
    items ??
    fallback.map((f, i) => ({ ...f, image: f.image || STOCK[i % STOCK.length] }));

  const isLoading = items === null && !errored;

  return (
    <section className="relative py-28 md:py-40 bg-gradient-to-b from-canvas via-azure-50 to-canvas">
      <div className="container-fluid">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14 md:mb-16">
          <div className="max-w-2xl">
            <div className="eyebrow text-teal-700 mb-7">
              <span className="eyebrow-rule" />
              {t('label')}
              {!errored && items && (
                <span className="ml-1 inline-flex items-center gap-1.5">
                  <span className="block w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
                </span>
              )}
            </div>
            <h2 className="font-display text-display-md text-ink-900 leading-[1.08] mb-5">
              <RevealText stagger={0.04}>{t('title')}</RevealText>
            </h2>
            <p className="text-lead text-ink-600">{t('subtitle')}</p>
          </div>
        </div>

        {errored && (
          <p className="text-sm text-ink-400 italic mb-8">{t('errorNote')}</p>
        )}
        {isLoading && (
          <p className="text-sm text-ink-400 mb-8">{t('loading')}</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {display.map((item, i) => {
            const inner = (
              <>
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={item.image}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    draggable={false}
                    loading="lazy"
                  />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="text-[11px] uppercase tracking-[0.16em] text-teal-700 mb-3 truncate">
                    {item.source}
                  </div>
                  <h3 className="font-display text-xl text-ink-900 leading-snug mb-3 flex-1">
                    {item.title}
                  </h3>
                  {item.summary && (
                    <p className="text-sm text-ink-500 leading-relaxed line-clamp-2">
                      {item.summary}
                    </p>
                  )}
                </div>
              </>
            );
            const cls =
              'group bg-paper rounded-card overflow-hidden border border-ink-100 shadow-soft hover:shadow-lift transition-all duration-500 flex flex-col';
            return item.link ? (
              <a key={i} href={item.link} target="_blank" rel="noopener noreferrer" className={cls}>
                {inner}
              </a>
            ) : (
              <article key={i} className={cls}>{inner}</article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
