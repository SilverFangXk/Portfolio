
import { useEffect, useRef, useState } from 'react';
import PandaMascot from './PandaMascot';

const DEFAULT_SUGGESTIONS = [
  'What is her experience?',
  'Which projects has she built?',
  'What are her main skills?',
  'Is she looking for an internship?',
];

// Fake backend for testing the moods before a real API exists.
const demoFetch = (question) =>
  new Promise((resolve) =>
    setTimeout(
      () =>
        resolve({
          ok: true,
          json: async () =>
            /experience|project|skill|intern/i.test(question)
              ? {
                  found: true,
                  answer:
                    'Demo answer. Once your backend is connected, the real answer from the resume appears here.',
                  sources: [
                    {
                      section: 'Experience',
                      text: 'Demo source chunk...',
                    },
                  ],
                }
              : {
                  found: false,
                  answer:
                    "I couldn't find that in the resume, so I don't want to guess.",
                  sources: [],
                },
        }),
      2800
    )
  );

const Icon = ({ d }) => (
  <svg
    viewBox="0 0 24 24"
    className="h-4 w-4"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d={d} />
  </svg>
);

const EXPAND = 'M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7';
const COLLAPSE = 'M4 14h6v6M20 10h-6V4M14 10l7-7M3 21l7-7';
const CLOSE = 'M18 6L6 18M6 6l12 12';

export default function ResumeChat({
  apiUrl,
  ownerName = 'Doja',
  suggestions = DEFAULT_SUGGESTIONS,
  pandaSize = 180,
  onClose,
  expanded = false,
  onToggleExpand,
  demo = false,
}) {
  const [messages, setMessages] = useState([
    {
      role: 'bot',
      found: true,
      text: `Hi! I'm ${ownerName}'s resume bot 🐼 Ask me about her experience, projects or skills. I only answer from her resume.`,
    },
  ]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [mood, setMood] = useState('love');

  const timers = useRef([]);
  const sleepTimer = useRef(null);
  const listRef = useRef(null);

  const later = (fn, ms) => {
    const t = setTimeout(fn, ms);
    timers.current.push(t);
  };

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  const wake = () => {
    clearTimeout(sleepTimer.current);
    sleepTimer.current = setTimeout(() => setMood('sleep'), 45000);
  };

  useEffect(() => {
    later(() => setMood('idle'), 2200);
    wake();

    return () => {
      clearTimers();
      clearTimeout(sleepTimer.current);
    };
  }, []);

  useEffect(() => {
    if (loading) return;

    if (input.trim()) {
      setMood('up');
    } else {
      setMood((m) => (m === 'up' ? 'idle' : m));
    }
  }, [input, loading]);

  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, loading]);

  const send = async (text) => {
    const question = (text ?? input).trim();

    if (!question || loading) return;

    wake();
    clearTimers();

    setMessages((m) => [
      ...m,
      { role: 'user', text: question },
    ]);

    setInput('');
    setLoading(true);
    setMood('read');

    // Panda animation while the answer is being prepared.
    later(() => setMood('scroll'), 1200);

    try {
      // Prevent accidental requests to an undefined or missing API URL.
      if (!demo && !apiUrl) {
        throw new Error(
          'Missing VITE_CHAT_API_URL configuration'
        );
      }

      const res = demo
        ? await demoFetch(question)
        : await fetch(apiUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ question }),
          });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const data = await res.json();

      if (typeof data.answer !== 'string') {
        throw new Error('Invalid API response: missing answer');
      }

      clearTimers();

      const found = data.found !== false;

      setMessages((m) => [
        ...m,
        {
          role: 'bot',
          text: data.answer,
          found,
          sources: Array.isArray(data.sources)
            ? data.sources
            : [],
        },
      ]);

      setMood(found ? 'music' : 'shrug');
      later(() => setMood('idle'), found ? 3000 : 4000);
    } catch (err) {
      console.error('Resume chatbot request failed:', err);

      clearTimers();

      setMessages((m) => [
        ...m,
        {
          role: 'bot',
          found: false,
          text: "Sorry, I couldn't reach the server. Please try again in a moment.",
        },
      ]);

      setMood('shrug');
      later(() => setMood('idle'), 4000);
    } finally {
      setLoading(false);
      wake();
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    send();
  };

  // In expanded mode, the panda appears while the bot works
  // and briefly after it finishes.
  const showDock =
    expanded &&
    (loading || mood === 'music' || mood === 'shrug');

  const [dockMounted, setDockMounted] = useState(false);
  const [dockUp, setDockUp] = useState(false);

  useEffect(() => {
    if (showDock) {
      setDockMounted(true);

      const raf = requestAnimationFrame(() =>
        requestAnimationFrame(() => setDockUp(true))
      );

      return () => cancelAnimationFrame(raf);
    }

    setDockUp(false);

    const t = setTimeout(() => setDockMounted(false), 350);

    return () => clearTimeout(t);
  }, [showDock]);

  const btn =
    'flex h-7 w-7 items-center justify-center rounded-full text-foreground/50 transition hover:bg-secondary/20 hover:text-foreground';

  return (
    <section
      className={
        expanded
          ? 'h-full w-full'
          : 'mx-auto w-full max-w-md'
      }
    >
      {!expanded && (
        <PandaMascot
          mood={mood}
          size={pandaSize}
          follow
          className="relative z-0 mx-auto -mb-3"
        />
      )}

      <div
        className={
          expanded
            ? 'flex h-full flex-col border-l border-border/60 bg-card shadow-2xl'
            : 'relative z-10 rounded-3xl border border-border/60 bg-card shadow-lg'
        }
      >
        <header className="relative px-5 pb-2 pt-5 text-center">
          <div className="absolute right-3 top-3 flex gap-1">
            {onToggleExpand && (
              <button
                type="button"
                onClick={onToggleExpand}
                aria-label={expanded ? 'Shrink chat' : 'Expand chat'}
                className={btn}
              >
                <Icon d={expanded ? COLLAPSE : EXPAND} />
              </button>
            )}

            {onClose && (
              <button
                type="button"
                onClick={onClose}
                aria-label="Close chat"
                className={btn}
              >
                <Icon d={CLOSE} />
              </button>
            )}
          </div>

          <h2 className="text-base font-bold text-foreground">
            Ask {ownerName}'s resume
          </h2>

          <p className="text-xs text-foreground/60">
            Answers come only from the resume, with sources.
          </p>
        </header>

        <div
          ref={listRef}
          aria-live="polite"
          className={`${
            expanded ? 'min-h-0 flex-1' : 'max-h-72'
          } space-y-3 overflow-y-auto px-4 py-2`}
        >
          {messages.map((m, i) =>
            m.role === 'user' ? (
              <div key={i} className="flex justify-end">
                <div className="max-w-[85%] rounded-2xl rounded-br-md bg-primary px-3 py-2 text-sm text-primary-foreground">
                  {m.text}
                </div>
              </div>
            ) : (
              <div key={i} className="flex">
                <div
                  className={`max-w-[85%] rounded-2xl rounded-bl-md px-3 py-2 text-sm ${
                    m.found
                      ? 'bg-secondary/30 text-foreground'
                      : 'bg-muted text-foreground/70'
                  }`}
                >
                  {m.text}

                  {m.sources && m.sources.length > 0 && (
                    <details className="mt-2 text-xs">
                      <summary className="cursor-pointer font-semibold text-primary">
                        Sources ({m.sources.length})
                      </summary>

                      <ul className="mt-1 space-y-1">
                        {m.sources.map((s, j) => (
                          <li
                            key={j}
                            className="rounded-lg bg-background/60 p-2"
                          >
                            <span className="font-semibold">
                              {s.section}
                            </span>

                            <span className="block text-foreground/70">
                              {s.text}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </details>
                  )}
                </div>
              </div>
            )
          )}

          {loading && !expanded && (
            <div className="flex" aria-label="Thinking">
              <div className="flex gap-1 rounded-2xl rounded-bl-md bg-secondary/30 px-3 py-3">
                {[0, 150, 300].map((d) => (
                  <span
                    key={d}
                    className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary/60"
                    style={{ animationDelay: `${d}ms` }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {dockMounted && (
          <div
            className="overflow-hidden px-4 pt-3"
            aria-label={loading ? 'Thinking' : undefined}
          >
            <div
              className="flex items-end gap-2"
              style={{
                transform: dockUp
                  ? 'translateY(0)'
                  : 'translateY(105%)',
                transition: dockUp
                  ? 'transform 450ms cubic-bezier(0.34, 1.56, 0.64, 1)'
                  : 'transform 300ms cubic-bezier(0.4, 0, 1, 1)',
              }}
            >
              <PandaMascot mood={mood} size={92} />

              {loading && (
                <div className="mb-6 flex gap-1 rounded-2xl rounded-bl-md bg-secondary/30 px-3 py-3">
                  {[0, 150, 300].map((d) => (
                    <span
                      key={d}
                      className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary/60"
                      style={{ animationDelay: `${d}ms` }}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {messages.length === 1 && (
          <div className="flex flex-wrap gap-2 px-4 pb-2">
            {suggestions.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => send(s)}
                className="rounded-full border border-border/60 bg-card/50 px-3 py-1 text-xs font-semibold text-foreground/80 transition hover:bg-secondary/20"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        <form
          onSubmit={onSubmit}
          className="flex gap-2 border-t border-border/40 p-3"
        >
          <input
            value={input}
            onChange={(e) => {
              wake();
              setInput(e.target.value);
            }}
            placeholder="Ask about experience, projects, skills..."
            aria-label="Your question"
            disabled={loading}
            className="min-w-0 flex-1 rounded-full border border-border/60 bg-background/60 px-4 py-2 text-sm text-foreground outline-none placeholder:text-foreground/40 focus:border-primary"
          />

          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="rounded-full bg-primary px-4 py-2 text-sm font-bold text-primary-foreground transition hover:opacity-90 disabled:opacity-40"
          >
            Send
          </button>
        </form>
      </div>
    </section>
  );
}
