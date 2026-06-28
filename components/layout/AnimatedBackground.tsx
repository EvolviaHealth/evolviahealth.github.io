'use client';

/**
 * Fond global clair — esthétique pharma premium (revue scientifique + cabinet
 * de conseil santé). Fond papier chaud, halos sauge/azur très diffus qui
 * dérivent à peine, fine trame moléculaire et grain léger. Aucun effet « tech
 * Tron », aucun néon : on veut classe, lumineux, élevé.
 *
 * 100% CSS (GPU-friendly). Respecte prefers-reduced-motion.
 */
export function AnimatedBackground() {
  return (
    <div
      aria-hidden
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
    >
      {/* Base : dégradé menthe → azur doux (fond clairement coloré) */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(180deg, #EDF6F1 0%, #E6F2EC 50%, #E7F0F6 100%)' }}
      />

      {/* Halo sauge/teal — dérive lente, couleur bien présente mais douce */}
      <div
        className="absolute w-[55vw] h-[55vw] rounded-full blur-3xl will-change-transform halo halo-1"
        style={{
          background:
            'radial-gradient(circle, rgba(31, 156, 135, 0.20) 0%, rgba(127, 176, 105, 0.12) 40%, transparent 70%)',
        }}
      />

      {/* Halo azur pharma — dérive opposée */}
      <div
        className="absolute w-[45vw] h-[45vw] rounded-full blur-3xl will-change-transform halo halo-2"
        style={{
          background:
            'radial-gradient(circle, rgba(45, 122, 168, 0.17) 0%, transparent 65%)',
        }}
      />

      {/* Halo chaud (argile) pour la chaleur premium */}
      <div
        className="absolute w-[35vw] h-[35vw] rounded-full blur-3xl will-change-transform halo halo-3"
        style={{
          background:
            'radial-gradient(circle, rgba(190, 145, 90, 0.10) 0%, transparent 70%)',
        }}
      />

      {/* Trame moléculaire hexagonale — discrète, signe « revue scientifique » */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.04]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="hex-pattern"
            x="0"
            y="0"
            width="60"
            height="52"
            patternUnits="userSpaceOnUse"
            patternTransform="scale(1.7)"
          >
            <polygon
              points="30,2 56,17 56,47 30,62 4,47 4,17"
              fill="none"
              stroke="#0C1E22"
              strokeWidth="0.6"
            />
          </pattern>
          <radialGradient id="hex-fade-gradient" cx="50%" cy="35%" r="80%">
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <mask id="hex-fade">
            <rect width="100%" height="100%" fill="url(#hex-fade-gradient)" />
          </mask>
        </defs>
        <rect width="100%" height="100%" fill="url(#hex-pattern)" mask="url(#hex-fade)" />
      </svg>

      {/* Particules retirées : look « clean » façon Digital Pharma Lab
         (sections calmes, peu de bruit visuel). La couleur reste portée par
         les halos ci-dessus et le feuillage ci-dessous. */}

      {/* Feuillage botanique global, très doux (en bas de l'écran) */}
      <img
        src="/images/texture-eucalyptus.jpg"
        alt=""
        aria-hidden
        className="absolute bottom-0 left-0 w-full h-[45vh] object-cover opacity-[0.13]"
        style={{ maskImage: 'linear-gradient(to top, black 30%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to top, black 30%, transparent 100%)' }}
        draggable={false}
      />

      {/* Grain léger pour la matière */}
      <div
        className="absolute inset-0 opacity-[0.025] mix-blend-multiply"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.6'/%3E%3C/svg%3E\")",
        }}
      />

      <style jsx>{`
        .halo-1 { top: -15%; right: -10%; animation: halo-drift-1 46s ease-in-out infinite; }
        .halo-2 { bottom: -20%; left: -15%; animation: halo-drift-2 52s ease-in-out infinite; }
        .halo-3 { top: 38%; left: 34%; animation: halo-drift-3 40s ease-in-out infinite; }
        @keyframes halo-drift-1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50%      { transform: translate(-4vw, 3vh) scale(1.06); }
        }
        @keyframes halo-drift-2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50%      { transform: translate(5vw, -4vh) scale(1.08); }
        }
        @keyframes halo-drift-3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33%      { transform: translate(3vw, -2vh) scale(1.04); }
          66%      { transform: translate(-2vw, 4vh) scale(0.96); }
        }
        @media (prefers-reduced-motion: reduce) {
          .halo { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
