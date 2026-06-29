import { PageShell } from '@/components/layout/PageShell';
import { Link } from '@/lib/i18n/routing';
import { setRequestLocale } from 'next-intl/server';

export const metadata = {
  title: 'Mentions légales',
  robots: { index: false, follow: true },
};

/**
 * Mentions légales — obligatoire en France pour un site professionnel.
 * Contenu rédigé en français (langue de référence de l'entité). Les champs
 * d'identification que seule Cassiopée connaît sont marqués [à compléter].
 */
export default async function MentionsLegalesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const h2 = 'font-display text-2xl text-ink-900 mb-3';

  return (
    <PageShell
      eyebrow="Informations légales"
      title="Mentions légales"
      subtitle="Informations relatives à l'éditeur et à l'hébergement du site EvolvIA Health."
    >
      <section className="bg-canvas py-16 md:py-24 border-t border-ink-100">
        <div className="container-fluid max-w-3xl space-y-10 text-ink-700 leading-relaxed">
          <div>
            <h2 className={h2}>Éditeur du site</h2>
            <p>
              Le présent site est édité par <strong>EvolvIA Health</strong>, cabinet de conseil en
              intelligence artificielle pour la santé et l'industrie pharmaceutique.
            </p>
            <ul className="mt-3 space-y-1">
              <li>Forme juridique : <em>[à compléter par Cassiopée]</em></li>
              <li>Capital social : <em>[à compléter]</em></li>
              <li>Siège social : <em>[à compléter — adresse]</em></li>
              <li>SIRET / RCS : <em>[à compléter]</em></li>
              <li>N° TVA intracommunautaire : <em>[à compléter]</em></li>
              <li>
                Email :{' '}
                <a href="mailto:evolviahealth@outlook.fr" className="text-teal-700 underline">
                  evolviahealth@outlook.fr
                </a>
              </li>
              <li>Directrice de la publication : <em>Cassiopée [à compléter]</em></li>
            </ul>
          </div>

          <div>
            <h2 className={h2}>Hébergement</h2>
            <p>
              Le site est hébergé par <strong>GitHub, Inc.</strong> (GitHub Pages) — 88 Colin P. Kelly Jr.
              Street, San Francisco, CA 94107, États-Unis —{' '}
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-teal-700 underline">
                github.com
              </a>.
            </p>
          </div>

          <div>
            <h2 className={h2}>Propriété intellectuelle</h2>
            <p>
              L'ensemble des contenus présents sur ce site (textes, visuels, logo, charte
              graphique, structure) est la propriété d'EvolvIA Health, sauf mention contraire.
              Toute reproduction ou réutilisation sans autorisation préalable est interdite.
            </p>
          </div>

          <div>
            <h2 className={h2}>Données personnelles</h2>
            <p>
              Les informations transmises via le formulaire de contact et la prise de rendez-vous
              sont traitées conformément au RGPD. Pour le détail des traitements et l'exercice de
              vos droits, consultez notre{' '}
              <Link href="/confidentialite" className="text-teal-700 underline">
                politique de confidentialité
              </Link>.
            </p>
          </div>

          <p className="text-sm text-ink-400 pt-4 border-t border-ink-100">
            Dernière mise à jour : juin 2026.
          </p>
        </div>
      </section>
    </PageShell>
  );
}
