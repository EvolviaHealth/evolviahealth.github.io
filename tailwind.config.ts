import type { Config } from 'tailwindcss';

export default {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // ─────────────────────────────────────────────────────────────
        // PALETTE « Pharma Premium Light »
        // Fond clair chaud, encre profonde teal-navy (bleu + vert = pharma),
        // accents médicaux désaturés (classe, jamais criard). Demandé par
        // Cassiopée : « du blanc, du bleu, du vert, c'est la pharma. Classe,
        // pas barriolé, pas trop sobre. »
        // ─────────────────────────────────────────────────────────────

        // Fonds (clairs et COLORÉS — fini le « tout blanc »)
        canvas: '#EDF6F1',   // fond de page — menthe douce (vert pharma clair)
        paper: '#FFFFFF',    // cartes / surfaces nettes (contraste sur fond teinté)
        mist: '#DDEEE6',     // bande menthe plus profonde (alternance)
        sand: '#F4EDDF',     // bande chaude (témoignages, citations)

        // Encre (texte) — teal-navy profond, ni pur noir ni pur bleu
        ink: {
          DEFAULT: '#0C1E22',
          50: '#F3F6F5',
          100: '#E3EAE8',
          200: '#C7D3D0',
          300: '#9DAEAA',
          400: '#728682',   // texte discret / légendes
          500: '#54675F',
          600: '#3C4F4A',   // corps de texte secondaire
          700: '#26393A',
          800: '#152B2D',
          900: '#0C1E22',   // titres
        },

        // Accent principal — teal médical désaturé (le « vert pharma » classe)
        teal: {
          DEFAULT: '#1F9C87',
          50: '#E7F5F1',
          100: '#C9EAE2',
          300: '#6FCBB9',
          400: '#34B49E',
          500: '#1F9C87',   // CTA primaire « pétant mais classe »
          600: '#1A8473',
          700: '#156E5F',
          800: '#114F45',
        },

        // Accent secondaire — bleu pharma calme
        azure: {
          DEFAULT: '#2D7AA8',
          50: '#E9F2F8',
          100: '#CFE3EF',
          400: '#5398C4',
          500: '#2D7AA8',
          600: '#235E86',
          700: '#1B4A6A',
        },

        // Vert sauge (extrémité verte du logo) — highlights discrets
        sage: {
          DEFAULT: '#7FB069',
          400: '#8FC06F',
          500: '#7FB069',
          600: '#5E9249',
        },

        // Argile / or chaud — touche premium, usage très parcimonieux
        clay: {
          DEFAULT: '#BE915A',
          400: '#D2A972',
          500: '#BE915A',
          600: '#9C7544',
        },

        // Alias historique conservé pour compat
        bone: '#F4EFE6',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Times New Roman', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        // Échelle réduite — Cassiopée trouvait les gros blocs de texte trop grands.
        // Titres présents mais raisonnables (surtout les phrases longues type Manifeste).
        'display-2xl': ['clamp(2.75rem, 5.5vw, 5.5rem)', { lineHeight: '1.0', letterSpacing: '-0.025em' }],
        'display-xl': ['clamp(2.4rem, 4.4vw, 4.25rem)', { lineHeight: '1.02', letterSpacing: '-0.02em' }],
        'display-lg': ['clamp(1.9rem, 3vw, 2.75rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-md': ['clamp(1.6rem, 2.3vw, 2.2rem)', { lineHeight: '1.15', letterSpacing: '-0.015em' }],
        'display-sm': ['clamp(1.35rem, 1.8vw, 1.7rem)', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        // Corps de texte — plus généreux pour la lisibilité
        'lead': ['clamp(1.18rem, 1.6vw, 1.45rem)', { lineHeight: '1.6', letterSpacing: '-0.005em' }],
        'body-lg': ['1.1875rem', { lineHeight: '1.7' }],
      },
      maxWidth: {
        content: '1280px',
      },
      borderRadius: {
        card: '14px',
      },
      boxShadow: {
        soft: '0 2px 8px rgba(12, 30, 34, 0.04), 0 12px 32px rgba(12, 30, 34, 0.06)',
        lift: '0 8px 24px rgba(12, 30, 34, 0.08), 0 24px 60px rgba(12, 30, 34, 0.10)',
        ring: '0 0 0 1px rgba(12, 30, 34, 0.06)',
      },
      transitionTimingFunction: {
        'expo-out': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'soft': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
} satisfies Config;
