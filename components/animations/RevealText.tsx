'use client';

import { CSSProperties, ElementType, Fragment, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

type RevealTextProps = {
  children: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  stagger?: number;
  trigger?: 'load' | 'scroll';
};

/**
 * Reveal mot-par-mot, 100% CSS (keyframes) + IntersectionObserver.
 *
 * Principe de sûreté : par défaut (SSR, JS cassé, observer muet) le texte est
 * VISIBLE. L'animation ne s'arme (classe .reveal-ready) que lorsque le JS est
 * vivant : au mount pour trigger="load", à l'entrée dans le viewport pour
 * trigger="scroll". Remplace l'ancienne version GSAP qui pouvait laisser le
 * texte invisible en production (retour de Cassiopée : « tout est blanc »).
 */
export function RevealText({
  children,
  as: Tag = 'span',
  className,
  delay = 0,
  stagger = 0.04,
  trigger = 'scroll',
}: RevealTextProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || el.classList.contains('reveal-ready')) return;
    const arm = () => el.classList.add('reveal-ready');

    if (trigger === 'load' || !('IntersectionObserver' in window)) {
      arm();
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          arm();
          io.disconnect();
        }
      },
      { rootMargin: '0px 0px -8% 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [trigger]);

  const words = children.split(' ');

  return (
    <Tag ref={ref as never} className={cn('inline reveal-text', className)} aria-label={children}>
      {words.map((word, i) => (
        <Fragment key={i}>
          <span
            className="reveal-word inline-block"
            style={{ '--rd': `${delay + i * stagger}s` } as CSSProperties}
          >
            {word}
          </span>
          {/* Espace HORS de la boîte inline-block : les navigateurs suppriment
              les espaces de fin à l'intérieur (mots collés sinon). */}
          {i < words.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </Tag>
  );
}
