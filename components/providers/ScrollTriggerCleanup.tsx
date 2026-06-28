'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { gsap } from 'gsap';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Composant invisible qui kill TOUS les ScrollTriggers à chaque changement
 * de pathname. Indispensable avec React 19 + Next.js App Router + GSAP pin.
 *
 * Bug résolu : "Failed to execute 'removeChild' on 'Node'"
 *
 * Le problème : quand React 19 unmount une page contenant des sections
 * pinnées (UseCases scroll horizontal), GSAP a un cleanup asynchrone via
 * gsap.context() qui essaie de toucher des DOM nodes que React a déjà
 * retirés → removeChild plante.
 *
 * La solution : intercepter le changement de pathname côté client avant
 * que React ne commence à démonter, et killer tous les ScrollTriggers
 * + tweens synchroniquement. Comme ça quand React arrive, il n'y a plus
 * rien dans le DOM que GSAP voudrait toucher.
 */
export function ScrollTriggerCleanup() {
  const pathname = usePathname();

  useEffect(() => {
    // Cleanup function qui s'exécute AVANT le changement de pathname.
    // Le return d'un useEffect est appelé pendant la phase de cleanup
    // de React, juste avant qu'il commence à unmount les enfants.
    return () => {
      try {
        // Kill explicitement tous les ScrollTriggers (incluant pin spacers)
        ScrollTrigger.getAll().forEach((t) => {
          try { t.kill(true); } catch {}
        });
        // Refresh pour reset le state interne de ScrollTrigger
        try { ScrollTrigger.refresh(); } catch {}
        // Kill tous les tweens GSAP actifs (au cas où)
        try { gsap.globalTimeline.clear(); } catch {}
      } catch {
        // Silencieux — si ça plante on s'en fout, l'idée c'est d'éviter
        // que le bug atteigne l'utilisateur. Pire cas : pas de cleanup,
        // mais ça ne crash plus.
      }
    };
  }, [pathname]);

  return null;
}
