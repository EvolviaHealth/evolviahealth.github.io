/**
 * ─────────────────────────────────────────────────────────────────────────────
 * BACKEND DE PRISE DE RENDEZ-VOUS — Google Calendar + Google Meet + Resend
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * Ce fichier est un MODÈLE PRÊT À L'EMPLOI. Il n'est PAS compilé tant qu'il est
 * dans /server (exclu du build). Pour l'ACTIVER (voir README.md, section
 * « Activer la prise de rendez-vous automatique ») :
 *
 *   1. Dans next.config.mjs, commenter la ligne `output: 'export'`
 *      (le site passe d'export statique à rendu serveur).
 *   2. Déplacer ce fichier vers : app/api/booking/route.ts
 *   3. Installer les dépendances :  npm i googleapis resend
 *   4. Renseigner les variables d'environnement (voir .env.example) chez l'hébergeur.
 *   5. Déployer. Le formulaire poste déjà sur /api/booking.
 *
 * Sans activation, le formulaire bascule automatiquement sur un mailto pré-rempli
 * (le lead n'est jamais perdu).
 */

import { google } from 'googleapis';
import { Resend } from 'resend';

export const runtime = 'nodejs';

type Payload = {
  name: string;
  email: string;
  org?: string;
  need?: string;
  message?: string;
  slot: string; // ISO local, ex "2026-06-10T10:00:00"
  locale?: string;
};

const NEED_LABELS: Record<string, string> = {
  devis: 'Devis gratuit',
  conseil: 'Conseil stratégique IA',
  agents: 'Agent IA personnalisé',
  formation: 'Formation à l\'IA',
  autre: 'Autre sujet',
};

function oauthClient() {
  const client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  );
  client.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN });
  return client;
}

export async function POST(req: Request) {
  let body: Payload;
  try {
    body = await req.json();
  } catch {
    return Response.json({ ok: false, error: 'invalid_json' }, { status: 400 });
  }

  if (!body?.name || !body?.email || !body?.slot) {
    return Response.json({ ok: false, error: 'missing_fields' }, { status: 400 });
  }

  const start = new Date(body.slot);
  const end = new Date(start.getTime() + 30 * 60 * 1000); // 30 min
  const needLabel = NEED_LABELS[body.need ?? 'autre'] ?? body.need ?? '';

  let meetLink: string | undefined;

  // 1) Créer l'événement Google Calendar + lien Google Meet (si configuré)
  if (process.env.GOOGLE_REFRESH_TOKEN) {
    try {
      const calendar = google.calendar({ version: 'v3', auth: oauthClient() });
      const event = await calendar.events.insert({
        calendarId: process.env.GOOGLE_CALENDAR_ID || 'primary',
        conferenceDataVersion: 1,
        sendUpdates: 'all',
        requestBody: {
          summary: `EvolvIA Health — ${body.name} (${needLabel})`,
          description:
            `Demande : ${needLabel}\nOrganisation : ${body.org || '—'}\n\n${body.message || ''}`,
          start: { dateTime: start.toISOString(), timeZone: 'Europe/Paris' },
          end: { dateTime: end.toISOString(), timeZone: 'Europe/Paris' },
          attendees: [{ email: body.email, displayName: body.name }],
          conferenceData: {
            createRequest: {
              requestId: `evolvia-${start.getTime()}`,
              conferenceSolutionKey: { type: 'hangoutsMeet' },
            },
          },
        },
      });
      meetLink =
        event.data.hangoutLink ||
        event.data.conferenceData?.entryPoints?.find((e) => e.entryPointType === 'video')?.uri ||
        undefined;
    } catch (e) {
      console.error('[booking] google calendar error', e);
    }
  }

  // 2) Emails de confirmation via Resend (si configuré)
  if (process.env.RESEND_API_KEY) {
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const from = process.env.BOOKING_FROM_EMAIL || 'EvolvIA Health <onboarding@resend.dev>';
      const owner = process.env.BOOKING_OWNER_EMAIL || body.email;
      const whenStr = start.toLocaleString('fr-FR', { dateStyle: 'full', timeStyle: 'short' });

      // Au client
      await resend.emails.send({
        from,
        to: body.email,
        subject: 'Votre rendez-vous avec EvolvIA Health est confirmé',
        html: `<p>Bonjour ${body.name},</p>
          <p>Votre rendez-vous est confirmé pour le <strong>${whenStr}</strong> (Europe/Paris).</p>
          ${meetLink ? `<p>Lien de visioconférence Google Meet : <a href="${meetLink}">${meetLink}</a></p>` : ''}
          <p>Sujet : ${needLabel}</p>
          <p>À très vite,<br/>L'équipe EvolvIA Health</p>`,
      });

      // À Cassiopée (notification du lead)
      await resend.emails.send({
        from,
        to: owner,
        subject: `Nouveau rendez-vous — ${body.name} (${needLabel})`,
        html: `<p>Nouvelle demande de rendez-vous :</p>
          <ul>
            <li>Nom : ${body.name}</li>
            <li>Email : ${body.email}</li>
            <li>Organisation : ${body.org || '—'}</li>
            <li>Besoin : ${needLabel}</li>
            <li>Créneau : ${whenStr}</li>
            ${meetLink ? `<li>Meet : <a href="${meetLink}">${meetLink}</a></li>` : ''}
          </ul>
          <p>${body.message || ''}</p>`,
      });
    } catch (e) {
      console.error('[booking] resend error', e);
    }
  }

  return Response.json({ ok: true, meetLink, degraded: !process.env.GOOGLE_REFRESH_TOKEN });
}
