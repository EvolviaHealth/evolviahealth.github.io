'use client';

import { useEffect, useRef } from 'react';

/**
 * Halo de curseur « studio » : un petit cercle teal translucide qui suit la
 * souris avec une légère inertie. Uniquement sur écrans avec souris (pointer
 * fin) et désactivé si l'utilisateur préfère moins d'animations. Décoratif,
 * pointer-events: none — ne gêne jamais l'interaction. Si le JS échoue, rien
 * ne s'affiche (zéro risque de blocage).
 */
export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduce || !ref.current) return;

    const el = ref.current;
    el.style.opacity = '0';
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let cx = x;
    let cy = y;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      el.style.opacity = '1';
    };
    const tick = () => {
      cx += (x - cx) * 0.18;
      cy += (y - cy) * 0.18;
      el.style.transform = `translate3d(${cx - 18}px, ${cy - 18}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: 36,
        height: 36,
        borderRadius: '9999px',
        border: '1.5px solid rgba(31,156,135,0.55)',
        background: 'radial-gradient(circle, rgba(31,156,135,0.12) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 55,
        opacity: 0,
        transition: 'opacity 0.3s ease',
        willChange: 'transform',
      }}
    />
  );
}
