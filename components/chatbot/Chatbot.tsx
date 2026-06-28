'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocale } from 'next-intl';
import { useRouter } from '@/lib/i18n/routing';
import { cn } from '@/lib/utils';
import {
  getChatbotData,
  CONTACT_EMAIL,
  type ChatOption,
} from '@/lib/chatbot/knowledge';

type Message = { key: number; role: 'bot' | 'user'; text: string };

// Délai de « frappe » du bot avant chaque réponse — assez court pour rester
// réactif, assez long pour donner la sensation vivante d'un vrai assistant.
const TYPING_MS = 550;
// Délai avant l'apparition de la bulle d'accroche (si le chat n'est pas ouvert).
const NUDGE_MS = 9000;

/**
 * Chatbot guidé d'EvolvIA Health.
 *
 * Bot à boutons (« façon Amazon ») : pas d'IA, pas de backend, pas de données
 * envoyées. Tout le contenu vient de lib/chatbot/knowledge.ts. Monté hors du
 * SmoothScroll (Lenis) dans le layout, comme l'AnimatedBackground, car c'est un
 * élément `fixed`.
 */
export function Chatbot() {
  const locale = useLocale();
  const router = useRouter();
  const data = getChatbotData(locale);

  const [open, setOpen] = useState(false);
  const [started, setStarted] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [options, setOptions] = useState<ChatOption[]>([]);
  const [typing, setTyping] = useState(false);
  const [showNudge, setShowNudge] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const keyRef = useRef(0); // compteur d'id de message (évite Math.random/Date)
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const nextKey = () => ++keyRef.current;

  // Nettoyage des timers à l'unmount.
  useEffect(() => {
    const list = timers.current;
    return () => list.forEach(clearTimeout);
  }, []);

  // Accroche discrète après quelques secondes, une seule fois par session.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (sessionStorage.getItem('evolvia-chat-nudged')) return;
    const t = setTimeout(() => {
      setShowNudge((v) => (open ? v : true));
    }, NUDGE_MS);
    timers.current.push(t);
    return () => clearTimeout(t);
  }, [open]);

  // Auto-scroll vers le bas à chaque nouveau message / état de frappe.
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, typing, options]);

  // Fermeture au clavier (Échap).
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const pushMessage = useCallback((role: 'bot' | 'user', text: string) => {
    setMessages((prev) => [...prev, { key: nextKey(), role, text }]);
  }, []);

  /** Réponse du bot avec indicateur de frappe, puis pose les pastilles. */
  const botReply = useCallback(
    (text: string, opts: ChatOption[]) => {
      setTyping(true);
      setOptions([]);
      const t = setTimeout(() => {
        setTyping(false);
        pushMessage('bot', text);
        setOptions(opts);
      }, TYPING_MS);
      timers.current.push(t);
    },
    [pushMessage]
  );

  /**
   * Complète les pastilles d'un nœud avec, si pertinent, un raccourci RDV
   * (primaire) et toujours un retour au menu. Dédupliqué par id.
   */
  const withGlobalOptions = useCallback(
    (nodeId: string, base: ChatOption[]): ChatOption[] => {
      const out = [...base];
      const hasBooking =
        nodeId === 'rdv' ||
        out.some((o) => o.id === 'rdv' || o.action === 'booking');
      if (!hasBooking) {
        out.push({ id: 'rdv', label: data.bookingChip, primary: true });
      }
      out.push({ id: 'menu', label: data.menuChip });
      return out;
    },
    [data.bookingChip, data.menuChip]
  );

  const start = useCallback(() => {
    if (started) return;
    setStarted(true);
    pushMessage('bot', data.greeting);
    setOptions(data.root);
  }, [started, data.greeting, data.root, pushMessage]);

  const openChat = useCallback(() => {
    setShowNudge(false);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('evolvia-chat-nudged', '1');
    }
    setOpen(true);
    start();
  }, [start]);

  const goBooking = useCallback(() => {
    router.push('/contact');
  }, [router]);

  /** Gère un clic sur une pastille. */
  const handleOption = useCallback(
    (opt: ChatOption) => {
      // Actions terminales (navigation / email).
      if (opt.action === 'booking') {
        pushMessage('user', opt.label);
        goBooking();
        return;
      }
      if (opt.action === 'email') {
        pushMessage('user', opt.label);
        if (typeof window !== 'undefined') {
          window.location.href = `mailto:${CONTACT_EMAIL}`;
        }
        return;
      }

      // Retour au menu principal.
      if (opt.id === 'menu') {
        pushMessage('user', opt.label);
        botReply(data.menuPrompt, data.root);
        return;
      }

      // Ouverture d'un nœud de la base de connaissances.
      const node = data.nodes[opt.id];
      if (!node) return;
      pushMessage('user', opt.label);
      botReply(node.answer, withGlobalOptions(opt.id, node.options));
    },
    [data, botReply, goBooking, pushMessage, withGlobalOptions]
  );

  return (
    <>
      {/* ── Accroche flottante ─────────────────────────────────────────── */}
      {showNudge && !open && (
        <button
          type="button"
          onClick={openChat}
          className="chat-nudge fixed bottom-[5.75rem] right-5 z-[60] max-w-[15rem] rounded-2xl rounded-br-md border border-ink-100 bg-paper px-4 py-3 text-left text-sm font-medium text-ink-700 shadow-lift hover:text-teal-700 sm:right-6"
        >
          {data.nudge}
          <span
            aria-hidden
            className="absolute -right-1 -top-1 flex h-3 w-3"
          >
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-75" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-teal-500" />
          </span>
        </button>
      )}

      {/* ── Panneau de conversation ───────────────────────────────────── */}
      {open && (
        <div
          role="dialog"
          aria-label={data.headerName}
          className="chat-panel fixed bottom-5 right-4 z-[60] flex w-[min(23.5rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-[20px] border border-ink-100 bg-paper shadow-lift sm:right-6"
          style={{ height: 'min(34rem, calc(100vh - 7rem))' }}
        >
          {/* En-tête premium teal → azure */}
          <header className="flex items-center gap-3 bg-gradient-to-br from-teal-600 to-azure-600 px-4 py-3.5 text-white">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15 font-display text-lg leading-none">
              E
            </span>
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-semibold leading-tight">
                {data.headerName}
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-white/80">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-sage-400" />
                {data.headerStatus}
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={data.closeAria}
              className="rounded-full p-1.5 text-white/80 transition-colors hover:bg-white/15 hover:text-white"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
                <path
                  d="M4.5 4.5l9 9m0-9l-9 9"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </header>

          {/* Fil de messages (zone scrollable — soustraite à Lenis) */}
          <div
            ref={scrollRef}
            data-lenis-prevent
            className="flex-1 space-y-3 overflow-y-auto bg-canvas px-4 py-4"
          >
            {messages.map((m) =>
              m.role === 'bot' ? (
                <div key={m.key} className="chat-in flex items-end gap-2">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-teal-500 font-display text-xs text-white">
                    E
                  </span>
                  <div className="max-w-[80%] whitespace-pre-line rounded-2xl rounded-bl-sm border border-ink-100 bg-paper px-3.5 py-2.5 text-[13.5px] leading-relaxed text-ink-700 shadow-soft">
                    {m.text}
                  </div>
                </div>
              ) : (
                <div key={m.key} className="chat-in flex justify-end">
                  <div className="max-w-[80%] whitespace-pre-line rounded-2xl rounded-br-sm bg-teal-500 px-3.5 py-2.5 text-[13.5px] leading-relaxed text-white shadow-soft">
                    {m.text}
                  </div>
                </div>
              )
            )}

            {/* Indicateur de frappe */}
            {typing && (
              <div className="chat-in flex items-end gap-2">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-teal-500 font-display text-xs text-white">
                  E
                </span>
                <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm border border-ink-100 bg-paper px-3.5 py-3 shadow-soft">
                  <span className="chat-dot h-1.5 w-1.5 rounded-full bg-ink-300" />
                  <span className="chat-dot h-1.5 w-1.5 rounded-full bg-ink-300" />
                  <span className="chat-dot h-1.5 w-1.5 rounded-full bg-ink-300" />
                </div>
              </div>
            )}
          </div>

          {/* Pastilles de réponse rapide */}
          {options.length > 0 && !typing && (
            <div className="flex flex-wrap gap-2 border-t border-ink-100 bg-paper px-3.5 py-3">
              {options.map((opt) => (
                <button
                  key={opt.id + opt.label}
                  type="button"
                  onClick={() => handleOption(opt)}
                  className={cn(
                    'rounded-full px-3.5 py-2 text-[13px] font-medium transition-colors duration-300',
                    opt.primary
                      ? 'bg-teal-500 text-white hover:bg-teal-600'
                      : 'border border-teal-600/30 bg-teal-50/60 text-teal-700 hover:bg-teal-500 hover:text-white'
                  )}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}

          {/* Note de confidentialité */}
          <div className="bg-paper px-4 pb-3 pt-1 text-center text-[10.5px] text-ink-400">
            {data.privacy}
          </div>
        </div>
      )}

      {/* ── Bouton lanceur ─────────────────────────────────────────────── */}
      <button
        type="button"
        onClick={() => (open ? setOpen(false) : openChat())}
        aria-label={data.launcherAria}
        aria-expanded={open}
        className="group fixed bottom-5 right-4 z-[61] flex h-14 w-14 items-center justify-center rounded-full bg-teal-500 text-white shadow-lift transition-all duration-300 hover:bg-teal-600 hover:scale-105 active:scale-95 sm:right-6"
      >
        {/* Pastille « en ligne » */}
        {!open && (
          <span aria-hidden className="absolute -right-0.5 -top-0.5 flex h-3.5 w-3.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sage-400 opacity-75" />
            <span className="relative inline-flex h-3.5 w-3.5 rounded-full border-2 border-teal-500 bg-sage-500" />
          </span>
        )}
        {/* Icône : bulle de chat ↔ croix */}
        <svg
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden
          className="transition-transform duration-300"
        >
          {open ? (
            <path
              d="M6 6l12 12M18 6L6 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          ) : (
            <path
              d="M4 5.5A1.5 1.5 0 0 1 5.5 4h13A1.5 1.5 0 0 1 20 5.5v9a1.5 1.5 0 0 1-1.5 1.5H9l-4 4v-4H5.5A1.5 1.5 0 0 1 4 14.5v-9Z"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinejoin="round"
              fill="none"
            />
          )}
        </svg>
      </button>
    </>
  );
}
