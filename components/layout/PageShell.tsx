'use client';

import { RevealText } from '@/components/animations/RevealText';

type PageShellProps = {
  eyebrow: string;
  title: string;
  subtitle?: string;
  image?: string;
  children?: React.ReactNode;
};

/**
 * En-tête commun des pages internes. Hero clair éditorial avec eyebrow, grand
 * titre serif et sous-titre. Image d'illustration optionnelle à droite.
 */
export function PageShell({ eyebrow, title, subtitle, image, children }: PageShellProps) {
  return (
    <>
      <section className="relative pt-40 pb-20 md:pt-52 md:pb-28 overflow-hidden">
        <div className="container-fluid relative">
          <div className={image ? 'grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-16 items-center' : ''}>
            <div>
              <div className="eyebrow text-teal-700 mb-8">
                <span className="eyebrow-rule" />
                <RevealText delay={0.1} trigger="load">
                  {eyebrow}
                </RevealText>
              </div>
              <h1 className="font-display text-display-lg text-ink-900 mb-8 max-w-4xl leading-[1.04]">
                <RevealText delay={0.25} trigger="load" stagger={0.05}>
                  {title}
                </RevealText>
              </h1>
              {subtitle && (
                <p className="text-lead text-ink-600 leading-relaxed max-w-2xl">
                  <RevealText delay={0.6} trigger="load" stagger={0.01}>
                    {subtitle}
                  </RevealText>
                </p>
              )}
            </div>

            {image && (
              <div className="relative rounded-[20px] overflow-hidden shadow-lift aspect-[4/3] opacity-0 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                <img src={image} alt="" className="absolute inset-0 w-full h-full object-cover" draggable={false} />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-900/25 to-transparent" />
              </div>
            )}
          </div>
        </div>
      </section>
      {children}
    </>
  );
}
