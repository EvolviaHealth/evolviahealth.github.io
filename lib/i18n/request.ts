import { getRequestConfig } from 'next-intl/server';
import { routing, type Locale } from './routing';
import fr from './dictionaries/fr.json';
import en from './dictionaries/en.json';
import es from './dictionaries/es.json';
import de from './dictionaries/de.json';
import it from './dictionaries/it.json';

// next-intl AbstractIntlMessages n'accepte pas string[] dans la valeur,
// or hero.title est un tableau. On cast pour bypass la contrainte stricte ;
// la lecture par t() reste correctement typée côté composants.
const dictionaries: Record<Locale, any> = { fr, en, es, de, it };

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale: Locale = routing.locales.includes(requested as Locale)
    ? (requested as Locale)
    : routing.defaultLocale;

  return {
    locale,
    messages: dictionaries[locale],
  };
});
