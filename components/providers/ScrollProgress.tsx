'use client';

import { useEffect, useState } from 'react';

/**
 * Fine barre de progression de lecture en haut de page (dégradé azur→teal→sage).
 * Purement décorative, n'intercepte aucun clic. Se met à jour au scroll.
 */
export function ScrollProgress() {
  const [p, setP] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setP(max > 0 ? (h.scrollTop || window.scrollY) / max : 0);
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div
      aria-hidden
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: 3,
        width: '100%',
        transform: `scaleX(${p})`,
        transformOrigin: 'left',
        background: 'linear-gradient(90deg, #2D7AA8, #1F9C87, #7FB069)',
        zIndex: 60,
        pointerEvents: 'none',
        transition: 'transform 0.1s linear',
      }}
    />
  );
}
