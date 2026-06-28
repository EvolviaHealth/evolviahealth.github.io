import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['fr', 'en', 'es', 'de', 'it'] as const,
  defaultLocale: 'fr',
  // 'always' force le préfixe locale dans l'URL (/fr/contact, /en/contact).
  // 'as-needed' était source de confusion : /contact était matché par /[locale]/page.tsx
  // avec locale="contact" et déclenchait notFound() dans le layout.
  localePrefix: 'always',
});

export type Locale = (typeof routing.locales)[number];

export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
