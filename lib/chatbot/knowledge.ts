// ─────────────────────────────────────────────────────────────────────────
// Base de connaissances du chatbot guidé (« façon Amazon »).
//
// Le bot n'est PAS une IA : ce sont des boutons (questions fréquentes) qui
// mènent à des réponses préparées. Avantages pour un cabinet santé :
//   • Gratuit, instantané, aucun backend (compatible export statique Next).
//   • Zéro hallucination : le bot ne dit QUE ce qui est écrit ici, et tout
//     ici est vrai (aligné mot pour mot avec les pages du site).
//   • RGPD-safe : aucune donnée visiteur n'est envoyée nulle part.
//
// Tout le contenu vit ici (et pas dans les dictionnaires i18n) pour deux
// raisons : éviter de planter les locales /es /de /it sur une clé manquante,
// et garder l'arbre de FAQ facile à maintenir. On fournit FR + EN ; les
// autres langues retombent sur EN.
//
// NB : le site ne publie jamais le nom de la fondatrice → le bot non plus.
// ─────────────────────────────────────────────────────────────────────────

export type ChatAction = 'booking' | 'email';

/** Une pastille de réponse rapide (bouton cliquable). */
export type ChatOption = {
  /** id du nœud cible, OU id réservé ('menu'), OU id libre si `action` est posé. */
  id: string;
  label: string;
  /** Si présent : déclenche une action (navigation RDV / email) au lieu d'ouvrir un nœud. */
  action?: ChatAction;
  /** Rendu en bouton primaire (teal plein) plutôt qu'en pastille discrète. */
  primary?: boolean;
};

/** Un nœud de conversation : une réponse du bot + ses pastilles de suivi. */
export type ChatNode = {
  /** Réponse du bot. `\n` = saut de ligne. */
  answer: string;
  options: ChatOption[];
};

export type ChatbotStrings = {
  launcherAria: string;
  closeAria: string;
  nudge: string;
  headerName: string;
  headerStatus: string;
  greeting: string;
  menuPrompt: string;
  bookingChip: string;
  menuChip: string;
  privacy: string;
};

export type ChatbotData = ChatbotStrings & {
  /** Sujets de premier niveau (affichés après l'accueil). */
  root: ChatOption[];
  nodes: Record<string, ChatNode>;
};

export const CONTACT_EMAIL = 'evolviahealth@outlook.fr';

// ─── Français ──────────────────────────────────────────────────────────────
const fr: ChatbotData = {
  launcherAria: 'Ouvrir l’assistant EvolvIA',
  closeAria: 'Fermer l’assistant',
  nudge: 'Une question ? Je suis là 👋',
  headerName: 'Assistant EvolvIA',
  headerStatus: 'En ligne · réponse immédiate',
  greeting:
    'Bonjour 👋 Je suis l’assistant d’EvolvIA Health. Choisissez un sujet ci-dessous, je vous réponds tout de suite.',
  menuPrompt: 'Bien sûr. Sur quoi puis-je vous renseigner ?',
  bookingChip: '📅 Prendre rendez-vous',
  menuChip: '↩ Menu principal',
  privacy: '🔒 Conversation guidée · aucune donnée enregistrée',
  root: [
    { id: 'services', label: '💡 Vos services' },
    { id: 'pourqui', label: '🏥 C’est pour qui ?' },
    { id: 'approche', label: '🧭 Comment vous travaillez' },
    { id: 'rgpd', label: '🔒 Données & RGPD' },
    { id: 'delais', label: '⏱️ Délais & devis' },
    { id: 'rdv', label: '📅 Prendre rendez-vous' },
  ],
  nodes: {
    services: {
      answer:
        'EvolvIA Health, c’est 5 expertises :\n\n1. Conseil stratégique IA\n2. Agents IA personnalisés (RAG médical)\n3. Formation à l’IA générative\n4. Accompagnement du changement\n5. Innovation & cas d’usage\n\nLequel vous intéresse ?',
      options: [
        { id: 'services-conseil', label: 'Conseil stratégique' },
        { id: 'services-agents', label: 'Agents IA sur mesure' },
        { id: 'services-formation', label: 'Formation' },
        { id: 'services-innovation', label: 'Innovation & R&D' },
      ],
    },
    'services-conseil': {
      answer:
        'Conseil stratégique 🧭\nOn définit votre trajectoire IA : audit de maturité en 4 semaines, cartographie des cas d’usage à forte valeur, feuille de route 12–36 mois et business case avec ROI projeté. Une vision claire avant le moindre pilote technique.',
      options: [{ id: 'services', label: '↩ Autres services' }],
    },
    'services-agents': {
      answer:
        'Agents IA personnalisés 🤖\nDes assistants formés sur vos données propriétaires et intégrés à vos workflows : RAG médical, assistants documentaires compatibles HDS, multi-modèles (OpenAI, Anthropic, Mistral), hébergement européen voire on-premise. Du prototype au passage à l’échelle.',
      options: [{ id: 'services', label: '↩ Autres services' }],
    },
    'services-formation': {
      answer:
        'Formation à l’IA générative 🎓\nDes programmes sur mesure pour vos équipes médicales, R&D et opérationnelles : sessions exécutives (3h, comité de direction), bootcamp métier (2 jours), formation de formateurs et certifications internes.',
      options: [{ id: 'services', label: '↩ Autres services' }],
    },
    'services-innovation': {
      answer:
        'Innovation & cas d’usage 🔭\nVeille technologique, agents autonomes pour la R&D, modèles multimodaux (image médicale, texte, voix) et ateliers de prospective IA santé. Préparer demain avec les briques d’aujourd’hui.',
      options: [{ id: 'services', label: '↩ Autres services' }],
    },
    pourqui: {
      answer:
        'Nous accompagnons les acteurs de la santé pharmaceutique et digitale :\n\n• Laboratoires pharmaceutiques (affaires médicales, R&D, pharmacovigilance, accès au marché)\n• Hôpitaux et CHU\n• Healthtech & MedTech (série A à C)\n• Organismes publics & associations (ARS, sociétés savantes, fondations)',
      options: [{ id: 'services', label: '💡 Vos services' }],
    },
    approche: {
      answer:
        'Notre approche : 5 phases sur ~6 semaines.\n\n1. Cadrage stratégique\n2. Architecture & cadrage technique\n3. Conception & design\n4. Développement (sprints d’1 semaine)\n5. Lancement & transmission\n\nTrois jalons où vous validez, et une hotline de 4 semaines incluse après livraison. Aucune boîte noire.',
      options: [{ id: 'services', label: '💡 Vos services' }],
    },
    rgpd: {
      answer:
        'La souveraineté des données est au cœur de notre travail 🔒\n\n• 100% hébergement européen, conçu pour le RGPD\n• Hébergement HDS (données de santé) possible\n• Déploiement on-premise possible\n• Aucune donnée partagée avec des tiers\n\nNous privilégions les modèles européens (Mistral, modèles locaux) quand c’est possible.',
      options: [{ id: 'approche', label: '🧭 Votre méthode' }],
    },
    delais: {
      answer:
        'Réactivité et transparence ⏱️\n\n• Réponse avec une approche structurée sous 48h ouvrées\n• Audit de maturité : 4 semaines\n• Pilote RAG médical : livrable en 4 semaines\n• Budget cadré sur mesure — et le 1er devis est gratuit, sans engagement.',
      options: [],
    },
    rdv: {
      answer:
        'Avec plaisir ! 📅\nPrenez un créneau de 30 minutes : vous recevez aussitôt un email de confirmation avec un lien Google Meet. C’est sans engagement.',
      options: [
        { id: 'rdv-go', label: 'Ouvrir le calendrier →', action: 'booking', primary: true },
        { id: 'human', label: '✉️ Parler à un humain' },
      ],
    },
    human: {
      answer:
        'Vous pouvez nous écrire directement à ' +
        CONTACT_EMAIL +
        ' — réponse sous 48h ouvrées. Ou prenez un créneau, c’est encore plus rapide 😊',
      options: [
        { id: 'human-mail', label: '✉️ ' + CONTACT_EMAIL, action: 'email' },
        { id: 'rdv', label: '📅 Prendre rendez-vous' },
      ],
    },
  },
};

// ─── English ─────────────────────────────────────────────────────────────
const en: ChatbotData = {
  launcherAria: 'Open the EvolvIA assistant',
  closeAria: 'Close the assistant',
  nudge: 'A question? I’m here 👋',
  headerName: 'EvolvIA Assistant',
  headerStatus: 'Online · instant reply',
  greeting:
    'Hi 👋 I’m the EvolvIA Health assistant. Pick a topic below and I’ll answer right away.',
  menuPrompt: 'Of course. What can I help you with?',
  bookingChip: '📅 Book a call',
  menuChip: '↩ Main menu',
  privacy: '🔒 Guided chat · no data stored',
  root: [
    { id: 'services', label: '💡 Your services' },
    { id: 'pourqui', label: '🏥 Who is it for?' },
    { id: 'approche', label: '🧭 How you work' },
    { id: 'rgpd', label: '🔒 Data & GDPR' },
    { id: 'delais', label: '⏱️ Timelines & quote' },
    { id: 'rdv', label: '📅 Book a call' },
  ],
  nodes: {
    services: {
      answer:
        'EvolvIA Health offers 5 areas of expertise:\n\n1. AI strategy consulting\n2. Custom AI agents (medical RAG)\n3. Generative-AI training\n4. Change management\n5. Innovation & use cases\n\nWhich one interests you?',
      options: [
        { id: 'services-conseil', label: 'Strategy consulting' },
        { id: 'services-agents', label: 'Custom AI agents' },
        { id: 'services-formation', label: 'Training' },
        { id: 'services-innovation', label: 'Innovation & R&D' },
      ],
    },
    'services-conseil': {
      answer:
        'AI strategy 🧭\nWe define your AI roadmap: a maturity audit in 4 weeks, a map of high-value use cases, a 12–36 month roadmap and a business case with projected ROI. A clear vision before any technical pilot.',
      options: [{ id: 'services', label: '↩ Other services' }],
    },
    'services-agents': {
      answer:
        'Custom AI agents 🤖\nAssistants trained on your proprietary data and integrated into your workflows: medical RAG, HDS-compliant document assistants, multi-model (OpenAI, Anthropic, Mistral), European hosting or even on-premise. From prototype to scale.',
      options: [{ id: 'services', label: '↩ Other services' }],
    },
    'services-formation': {
      answer:
        'Generative-AI training 🎓\nTailored programs for your medical, R&D and operational teams: executive sessions (3h, leadership), 2-day bootcamps, train-the-trainer programs and internal certifications.',
      options: [{ id: 'services', label: '↩ Other services' }],
    },
    'services-innovation': {
      answer:
        'Innovation & use cases 🔭\nTech watch, autonomous R&D agents, multimodal models (medical imaging, text, voice) and foresight workshops on AI in healthcare. Preparing tomorrow with today’s building blocks.',
      options: [{ id: 'services', label: '↩ Other services' }],
    },
    pourqui: {
      answer:
        'We work with players in pharmaceutical and digital health:\n\n• Pharmaceutical labs (medical affairs, R&D, pharmacovigilance, market access)\n• Hospitals and university hospitals\n• Healthtech & MedTech (series A to C)\n• Public bodies & associations',
      options: [{ id: 'services', label: '💡 Your services' }],
    },
    approche: {
      answer:
        'Our approach: 5 phases over ~6 weeks.\n\n1. Strategic framing\n2. Architecture & technical scoping\n3. Design\n4. Development (1-week sprints)\n5. Launch & handover\n\nThree checkpoints where you sign off, plus a 4-week hotline included after delivery. No black box.',
      options: [{ id: 'services', label: '💡 Your services' }],
    },
    rgpd: {
      answer:
        'Data sovereignty is at the heart of what we do 🔒\n\n• 100% European hosting, built for GDPR\n• HDS hosting (health data) available\n• On-premise deployment possible\n• No data shared with third parties\n\nWe favour European models (Mistral, local models) whenever possible.',
      options: [{ id: 'approche', label: '🧭 Your method' }],
    },
    delais: {
      answer:
        'Responsive and transparent ⏱️\n\n• A structured proposal within 2 business days\n• Maturity audit: 4 weeks\n• Medical RAG pilot: deliverable in 4 weeks\n• Budget scoped to your case — and the first quote is free, no strings attached.',
      options: [],
    },
    rdv: {
      answer:
        'With pleasure! 📅\nBook a 30-minute slot: you’ll instantly get a confirmation email with a Google Meet link. No commitment.',
      options: [
        { id: 'rdv-go', label: 'Open the calendar →', action: 'booking', primary: true },
        { id: 'human', label: '✉️ Talk to a human' },
      ],
    },
    human: {
      answer:
        'You can write to us directly at ' +
        CONTACT_EMAIL +
        ' — reply within 2 business days. Or book a slot, it’s even faster 😊',
      options: [
        { id: 'human-mail', label: '✉️ ' + CONTACT_EMAIL, action: 'email' },
        { id: 'rdv', label: '📅 Book a call' },
      ],
    },
  },
};

const DATA: Record<string, ChatbotData> = { fr, en };

/** Renvoie les données du bot pour la locale (fallback EN). */
export function getChatbotData(locale: string): ChatbotData {
  return DATA[locale] ?? DATA.en;
}
