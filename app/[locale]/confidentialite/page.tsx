import { PageShell } from '@/components/layout/PageShell';
import { setRequestLocale } from 'next-intl/server';

export const metadata = {
  title: 'Politique de confidentialité',
  robots: { index: false, follow: true },
};

/**
 * Politique de confidentialité (RGPD). Obligatoire dès lors que le site
 * collecte des données (formulaire + prise de rendez-vous). Rédigée en
 * français ; champs spécifiques marqués [à compléter par Cassiopée].
 */
export default async function ConfidentialitePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const h2 = 'font-display text-2xl text-ink-900 mb-3';

  return (
    <PageShell
      eyebrow="RGPD"
      title="Politique de confidentialité"
      subtitle="Comment EvolvIA Health collecte, utilise et protège vos données personnelles."
    >
      <section className="bg-canvas py-16 md:py-24 border-t border-ink-100">
        <div className="container-fluid max-w-3xl space-y-10 text-ink-700 leading-relaxed">
          <div>
            <h2 className={h2}>Responsable du traitement</h2>
            <p>
              Les données collectées sur ce site sont traitées par <strong>EvolvIA Health</strong>.
              Pour toute question :{' '}
              <a href="mailto:evolviahealth@outlook.fr" className="text-teal-700 underline">
                evolviahealth@outlook.fr
              </a>.
            </p>
          </div>

          <div>
            <h2 className={h2}>Données collectées</h2>
            <ul className="space-y-1 list-disc pl-5">
              <li>
                <strong>Formulaire de contact</strong> : nom, adresse email, organisation, nature
                du besoin et message.
              </li>
              <li>
                <strong>Prise de rendez-vous</strong> : nom, adresse email et créneau choisi.
              </li>
            </ul>
            <p className="mt-3">
              Aucune donnée de santé n'est collectée via ce site. Aucun cookie publicitaire ou de
              traçage n'est déposé.
            </p>
          </div>

          <div>
            <h2 className={h2}>Finalités et base légale</h2>
            <p>
              Vos données sont utilisées uniquement pour répondre à votre demande et organiser un
              éventuel rendez-vous. La base légale est votre <strong>consentement</strong> (case à
              cocher du formulaire) et l'intérêt légitime du cabinet à traiter les demandes reçues.
            </p>
          </div>

          <div>
            <h2 className={h2}>Destinataires et sous-traitants</h2>
            <p>Vos données peuvent transiter par les prestataires techniques suivants :</p>
            <ul className="mt-2 space-y-1 list-disc pl-5">
              <li><strong>Vercel</strong> — hébergement du site.</li>
              <li><strong>Web3Forms</strong> — acheminement des messages du formulaire par email.</li>
              <li><strong>Cal.com</strong> — gestion des rendez-vous.</li>
              <li><strong>Google</strong> (Agenda / Meet) — création des rendez-vous et liens visio.</li>
            </ul>
            <p className="mt-2">Vos données ne sont ni vendues, ni cédées à des tiers à des fins commerciales.</p>
          </div>

          <div>
            <h2 className={h2}>Durée de conservation</h2>
            <p>
              Les messages et coordonnées sont conservés au maximum <strong>12 mois</strong> après
              le dernier contact, puis supprimés.
            </p>
          </div>

          <div>
            <h2 className={h2}>Vos droits</h2>
            <p>
              Conformément au RGPD, vous disposez d'un droit d'accès, de rectification,
              d'effacement, d'opposition et de portabilité de vos données. Pour les exercer,
              écrivez à{' '}
              <a href="mailto:evolviahealth@outlook.fr" className="text-teal-700 underline">
                evolviahealth@outlook.fr
              </a>. Vous pouvez également introduire une réclamation auprès de la CNIL
              (www.cnil.fr).
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
