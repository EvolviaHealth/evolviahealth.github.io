'use client';

import { useEffect, useRef, useState } from 'react';

type CountUpProps = {
  value: string;
  duration?: number;
  className?: string;
};

/**
 * Compteur animé : extrait le nombre d'une valeur formatée ("+40%", "5×",
 * "100%") et l'anime de 0 jusqu'à la cible quand l'élément entre à l'écran.
 * Préfixe/suffixe conservés. Sûr par défaut : l'état initial est la valeur
 * finale (SSR/JS cassé → chiffre visible). Les nombres > 1000 (années) ne
 * sont pas animés.
 */
export function CountUp({ value, duration = 1.4, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const m = value.match(/^(\D*)(\d+(?:[.,]\d+)?)(.*)$/);
    const el = ref.current;
    if (!m || !el || !('IntersectionObserver' in window)) return;

    const target = parseFloat(m[2].replace(',', '.'));
    if (!isFinite(target) || target > 1000) return; // années etc. : pas d'animation

    const decimals = (m[2].split(/[.,]/)[1] || '').length;
    let raf = 0;
    let started = false;

    const io = new IntersectionObserver(
      (entries) => {
        if (started || !entries.some((e) => e.isIntersecting)) return;
        started = true;
        io.disconnect();
        const t0 = performance.now();
        const tick = (t: number) => {
          const p = Math.min(1, (t - t0) / (duration * 1000));
          const eased = 1 - Math.pow(1 - p, 3);
          setDisplay(`${m[1]}${(target * eased).toFixed(decimals)}${m[3]}`);
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [value, duration]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
