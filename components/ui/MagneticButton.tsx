'use client';

import { useRef, type ReactNode, type ComponentProps } from 'react';
import { gsap } from 'gsap';
import { Link } from '@/lib/i18n/routing';
import { cn } from '@/lib/utils';

type Href = ComponentProps<typeof Link>['href'];

type MagneticButtonProps = {
  children: ReactNode;
  href: Href;
  variant?: 'primary' | 'secondary' | 'dark';
  className?: string;
  strength?: number;
};

/**
 * Bouton magnétique (le bouton suit légèrement le curseur, retour élastique).
 * Micro-interaction premium type studio (ribbit.dk) en version sobre.
 * Variantes pour le thème clair pharma. Utilise le Link i18n (préfixe locale).
 */
export function MagneticButton({
  children,
  href,
  variant = 'primary',
  className,
  strength = 0.3,
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) * strength;
    const y = (e.clientY - top - height / 2) * strength;
    gsap.to(el, { x, y, duration: 0.5, ease: 'power3.out' });
  };

  const handleMouseLeave = () => {
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.8, ease: 'elastic.out(1, 0.4)' });
  };

  const variants: Record<string, string> = {
    primary: 'bg-teal-500 text-white hover:bg-teal-600 shadow-soft',
    secondary: 'bg-white text-ink-800 border border-ink-200 hover:border-teal-500 hover:text-teal-700',
    dark: 'bg-ink-900 text-white hover:bg-teal-600',
  };

  return (
    <Link
      ref={ref}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        'group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full text-base font-semibold tracking-wide transition-colors duration-500 will-change-transform',
        variants[variant],
        className
      )}
    >
      {/* Reflet lumineux qui traverse le bouton au survol */}
      <span aria-hidden className="absolute inset-0 overflow-hidden rounded-full">
        <span className="btn-shine" />
      </span>
      <span className="relative z-10 inline-flex items-center gap-2.5">
        {children}
        <svg
          width="16"
          height="16"
          viewBox="0 0 14 14"
          fill="none"
          className="transition-transform duration-500 group-hover:translate-x-1"
        >
          <path d="M1 7H13M13 7L7 1M13 7L7 13" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </span>
    </Link>
  );
}
