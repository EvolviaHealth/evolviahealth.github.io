# EvolvIA Health — site web

Site vitrine du cabinet de conseil **EvolvIA Health** (intelligence artificielle
appliquée à la santé et à l'industrie pharmaceutique). Site multilingue (5 langues),
calendrier de prise de rendez-vous, formulaire de contact, actualités, pages légales.

> **Adresse de production :** https://evolviahealth.github.io

---

## 1. Stack technique

| Brique | Détail |
|---|---|
| Framework | [Next.js 15](https://nextjs.org) (App Router) en **export statique** (`output: 'export'`) |
| Langage | TypeScript + React 19 |
| Styles | Tailwind CSS |
| Internationalisation | `next-intl` (FR, EN, ES, DE, IT) |
| Animations | GSAP, Motion, Lenis |
| Hébergement | Vercel (CDN statique) |

Le site ne nécessite **aucun serveur** : tout est pré-généré en HTML/CSS/JS et servi
par un CDN. C'est rapide, robuste et peu coûteux.

---

## 2. Prérequis

- **Node.js 18+** (https://nodejs.org)
- npm (fourni avec Node.js)

---

## 3. Installation

```bash
npm install
```

## 4. Développement local

```bash
npm run dev
```

Puis ouvrir **http://localhost:3000/fr** dans un navigateur.

## 5. Build de production (export statique)

```bash
npm run build
```

Le site statique est généré dans le dossier **`out/`** (publiable tel quel sur
n'importe quel hébergeur statique).

---

## 6. Déploiement (Vercel)

Le projet est conçu pour Vercel.

- **Option simple (recommandée)** : connecter ce dépôt à un compte Vercel — chaque
  mise à jour du code déclenche un déploiement automatique.
- **Option en ligne de commande** :
  ```bash
  npx vercel deploy --prod
  ```

Configuration de build dans [`vercel.json`](./vercel.json) : sortie statique
(`outputDirectory: "out"`).

---

## 7. Variables d'environnement

Le site **fonctionne sans aucune variable** (le formulaire bascule alors sur un
e-mail pré-rempli). Les variables ci-dessous **activent** les fonctions avancées.
Le détail et la marche à suivre sont dans [`.env.example`](./.env.example) ;
copier ce fichier en `.env.local` (développement) et renseigner les valeurs sur
Vercel (production).

| Variable | Rôle |
|---|---|
| `NEXT_PUBLIC_CAL_LINK` | Lien d'événement Cal.com (calendrier de RDV en temps réel) |
| `NEXT_PUBLIC_WEB3FORMS_KEY` | Clé Web3Forms (envoi réel du formulaire par e-mail, sans serveur) |
| `NEXT_PUBLIC_GCAL_BOOKING_URL` | Alternative : page de réservation Google Agenda |
| `RESEND_API_KEY`, `GOOGLE_*` | Confirmation automatique par e-mail + lien Google Meet (mode serveur) |

> ⚠️ Ne jamais écrire d'identifiant ou de mot de passe directement dans le code.
> Tout passe par les variables d'environnement.

---

## 8. Structure du projet

```
app/                  Routes (App Router) — une page par dossier
  [locale]/           Pages multilingues (/fr, /en, /es, /de, /it)
components/           Composants React (sections, mise en page, formulaires…)
lib/
  i18n/dictionaries/  Textes du site, un fichier JSON par langue (fr.json, en.json…)
  news.ts             Récupération des actualités au build
public/               Images, logos, robots.txt, sitemap.xml
server/               Exemple de route de réservation (mode serveur, optionnel)
```

---

## 9. Modifier le contenu (textes)

Tous les textes affichés sont dans **`lib/i18n/dictionaries/`** — un fichier par
langue. Pour changer un texte, modifier la valeur correspondante dans `fr.json`
(et idéalement dans les autres langues), puis redéployer.

Pour **ajouter une langue** : ajouter le code dans `lib/i18n/routing.ts` et
`request.ts`, puis créer le dictionnaire `xx.json` correspondant.

---

## 10. Propriété

© EvolvIA Health. L'ensemble du code, des textes et de la charte graphique est la
propriété d'EvolvIA Health.
