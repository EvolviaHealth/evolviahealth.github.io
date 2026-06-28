'use client';

import { useEffect, useState } from 'react';
import { Link, usePathname } from '@/lib/i18n/routing';
import { useTranslations, useLocale } from 'next-intl';
import { cn } from '@/lib/utils';
import type { Locale } from '@/lib/i18n/routing';

export function Header() {
  const t = useTranslations('nav');
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Ferme le menu mobile à chaque changement de page + bloque le scroll quand ouvert
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const items = [
    { href: '/about' as const, label: t('about') },
    { href: '/services' as const, label: t('services') },
    { href: '/use-cases' as const, label: t('useCases') },
    { href: '/approach' as const, label: t('approach') },
    { href: '/founder' as const, label: t('founder') },
    { href: '/insights' as const, label: t('insights') },
    { href: '/temoignages' as const, label: t('testimonials') },
  ];

  const languages: { code: Locale; label: string; name: string }[] = [
    { code: 'fr', label: 'FR', name: 'Français' },
    { code: 'en', label: 'EN', name: 'English' },
    { code: 'es', label: 'ES', name: 'Español' },
    { code: 'de', label: 'DE', name: 'Deutsch' },
    { code: 'it', label: 'IT', name: 'Italiano' },
  ];
  const current = languages.find((l) => l.code === locale) ?? languages[0];

  return (
    <header
      className={cn(
        'fixed top-0 inset-x-0 z-50 transition-all duration-500',
        scrolled
          ? 'py-3 bg-canvas/85 backdrop-blur-md border-b border-ink-200/60 shadow-[0_1px_0_rgba(12,30,34,0.04)]'
          : 'py-5 bg-transparent border-b border-transparent'
      )}
    >
      <div className="container-fluid flex items-center justify-between gap-6">
        <Link href="/" className="block shrink-0" aria-label={t('homeAria')}>
          {/* Logo officiel exact (version couleur sur transparent, @4x = net).
              Identique à la charte : « Evolv » bleu nuit, « IA » vert, « HEALTH »
              avec tirets. */}
          <img
            src="/brand/evolvia-logo-transparent@4x.png"
            alt="EvolvIA Health"
            className="h-12 md:h-14 w-auto select-none"
            draggable={false}
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-5 xl:gap-7">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="nav-link text-[14px] text-ink-600 hover:text-teal-700 transition-colors whitespace-nowrap"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4 shrink-0">
          {/* Switcher de langue — menu déroulant (5 langues) */}
          <details className="relative group/lang" aria-label={t('langAria')}>
            <summary className="list-none cursor-pointer inline-flex items-center gap-1.5 rounded-full border border-ink-200 px-3 py-1.5 text-[11px] uppercase tracking-widest font-semibold text-ink-600 hover:text-ink-900 hover:border-ink-300 transition-colors select-none">
              {current.label}
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none" className="transition-transform group-open/lang:rotate-180">
                <path d="M3 4.5 6 7.5 9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </summary>
            <div className="absolute right-0 mt-2 w-40 rounded-xl border border-ink-100 bg-paper shadow-lift overflow-hidden py-1 z-50">
              {languages.map((lang) => {
                const isActive = locale === lang.code;
                return (
                  <Link
                    key={lang.code}
                    href={pathname}
                    locale={lang.code}
                    aria-current={isActive ? 'true' : undefined}
                    className={cn(
                      'flex items-center justify-between gap-3 px-4 py-2.5 text-sm transition-colors',
                      isActive ? 'text-teal-700 font-semibold bg-teal-50' : 'text-ink-600 hover:bg-ink-50 hover:text-ink-900'
                    )}
                  >
                    {lang.name}
                    <span className="text-[10px] uppercase tracking-widest text-ink-400">{lang.label}</span>
                  </Link>
                );
              })}
            </div>
          </details>

          {/* CTA header : Prise de rendez-vous (couleur claire/secondaire ici,
              le CTA pétant principal est dans le Hero) */}
          <Link
            href="/contact"
            className="hidden sm:inline-flex items-center gap-2 text-[15px] font-medium border border-teal-600/40 text-teal-700 px-5 py-2.5 rounded-full hover:bg-teal-600 hover:text-white hover:border-teal-600 transition-all"
          >
            {t('contact')}
          </Link>

          {/* Burger — navigation mobile/tablette (en dessous de lg) */}
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={menuOpen}
            className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-full border border-ink-200 text-ink-800 hover:border-teal-500 hover:text-teal-700 transition-colors"
          >
            {menuOpen ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Panneau de navigation mobile (toutes les pages accessibles au doigt) */}
      {menuOpen && (
        <div className="lg:hidden border-t border-ink-100 bg-canvas/95 backdrop-blur-md max-h-[calc(100vh-70px)] overflow-y-auto">
          <nav className="container-fluid py-4 flex flex-col">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="py-3.5 border-b border-ink-100 text-lg text-ink-800 hover:text-teal-700 transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="mt-5 inline-flex items-center justify-center gap-2 bg-teal-500 text-white px-6 py-3.5 rounded-full text-base font-semibold hover:bg-teal-600 transition-colors shadow-soft"
            >
              {t('contact')}
              <svg width="15" height="15" viewBox="0 0 14 14" fill="none">
                <path d="M1 7H13M13 7L7 1M13 7L7 13" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
