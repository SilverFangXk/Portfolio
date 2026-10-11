import { useEffect, useMemo, useRef, useState } from 'react';
import PandaMascot from './PandaMascot';

/**
 * Hero animation kit:
 *  <HeroPhoto src="/me.jpg" />   circular photo, orbit ring, floating chips and a panda playing peekaboo behind it
 *  <HeroBackdrop />              drifting glow blobs and twinkling dots (put it inside the hero <section className="relative">)
 *  <Reveal delay={0.2}>...</Reveal>   fade-up entrance for text (stagger with delay)
 *  <ShimmerText>Khadija</ShimmerText> slow light sweep across a word
 *  <Glitter count={16} />        twinkling 4-point sparkles (fills its parent, which must be position:relative/absolute)
 *  <SparkleText>word</SparkleText>   a word with little sparkles popping around it
 *  <StatCards stats={[{ value: 6, suffix: '+', label: 'Projects', icon: FolderKanban }]} />  count-up stat cards
 */

const CSS = `
@keyframes hero-rise{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:none}}
@keyframes hero-shimmer{to{background-position:-200% 0}}
@keyframes hero-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
@keyframes hero-spin{to{transform:rotate(360deg)}}
@keyframes hero-glow{0%,100%{opacity:.55;transform:scale(1)}50%{opacity:.9;transform:scale(1.06)}}
@keyframes hero-drift-a{0%,100%{transform:translate(0,0)}50%{transform:translate(40px,30px)}}
@keyframes hero-drift-b{0%,100%{transform:translate(0,0)}50%{transform:translate(-50px,25px)}}
@keyframes hero-drift-c{0%,100%{transform:translate(0,0)}50%{transform:translate(30px,-40px)}}
@keyframes hero-sparkle{0%,100%{opacity:0;transform:scale(0) rotate(0deg)}50%{opacity:1;transform:scale(1) rotate(90deg)}}
@keyframes hero-twinkle{0%,100%{opacity:.1;transform:scale(.6)}50%{opacity:.9;transform:scale(1.2)}}
.hero-rise{opacity:0;animation:hero-rise .8s cubic-bezier(.2,.7,.2,1) forwards}
@media (prefers-reduced-motion:reduce){.hero-rise{opacity:1;animation:none}.hero-fx,.hero-fx *{animation:none!important}}
`;

// Peekaboo script: the panda hides, pops up, reacts, hides again.
const STEPS = [
  { show: false, mood: 'idle', ms: 3000 },
  { show: true, mood: 'up', ms: 1900 },
  { show: true, mood: 'love', ms: 2300 },
  { show: false, mood: 'idle', ms: 3500 },
  { show: true, mood: 'sass', ms: 2200 },
  { show: true, mood: 'idle', ms: 1500 },
  { show: false, mood: 'idle', ms: 2500 },
];

export function HeroPhoto({
  src,
  alt = '',
  size = 280,
  peek = true,
  chips = ['Big Data', 'Cloud', 'AI', 'Data Engineering'],
}) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (!peek) return;
    const t = setTimeout(() => setI((n) => (n + 1) % STEPS.length), STEPS[i].ms);
    return () => clearTimeout(t);
  }, [i, peek]);

  const step = STEPS[i];
  const pw = Math.round(size * 0.62); // panda width
  const spots = [
    { right: '-12%', top: '16%', delay: '0s' },
    { left: '-14%', top: '38%', delay: '.8s' },
    { right: '-8%', bottom: '14%', delay: '1.6s' },
    { left: '-6%', bottom: '4%', delay: '2.4s' },
  ];

  return (
    <div className="hero-fx relative mx-auto" style={{ width: size, height: size }}>
      <style>{CSS}</style>

      {/* soft glow behind everything */}
      <div
        className="absolute -inset-8 rounded-full bg-primary/25 blur-3xl"
        style={{ animation: 'hero-glow 5s ease-in-out infinite' }}
      />

      {/* orbit ring with two travelling dots */}
      <div
        className="absolute -inset-4 rounded-full border border-dashed border-primary/30"
        style={{ animation: 'hero-spin 40s linear infinite' }}
      >
        <span className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary" />
        <span className="absolute bottom-[14%] right-[6%] h-1.5 w-1.5 rounded-full bg-primary/60" />
      </div>

      {/* panda hiding behind the photo */}
      <div
        className="absolute left-1/2 z-0"
        style={{
          width: pw,
          top: -pw * 0.35,
          transform: `translateX(-50%) translateY(${step.show ? 0 : Math.round(pw * 0.32)}px)`,
          transition: step.show
            ? 'transform 600ms cubic-bezier(0.34, 1.56, 0.64, 1)'
            : 'transform 380ms cubic-bezier(0.4, 0, 1, 1)',
        }}
      >
        <PandaMascot mood={step.mood} size={pw} />
      </div>

      {/* the photo */}
      <div className="relative z-10 h-full w-full overflow-hidden rounded-full border-4 border-card shadow-2xl">
        <img src={src} alt={alt} className="h-full w-full object-cover" />
      </div>

      {/* glitter around the photo */}
      <Glitter count={12} className="-inset-10 z-20" />

      {/* floating chips */}
      {chips.slice(0, spots.length).map((c, k) => (
        <span
          key={c}
          className="absolute z-20 rounded-full border border-border/60 bg-card/80 px-3 py-1 text-[11px] font-semibold text-foreground/80 shadow-md backdrop-blur"
          style={{ ...spots[k], animation: `hero-float 4.5s ease-in-out ${spots[k].delay} infinite` }}
        >
          {c}
        </span>
      ))}
    </div>
  );
}

const DOTS = [
  [8, 14, 0], [22, 70, 1.2], [35, 30, 2.1], [48, 88, 0.6], [60, 12, 1.8],
  [72, 55, 2.6], [84, 80, 0.3], [90, 25, 1.5], [15, 45, 2.9], [66, 38, 0.9],
];

export function HeroBackdrop() {
  return (
    <div className="hero-fx pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <style>{CSS}</style>
      <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-primary/15 blur-3xl" style={{ animation: 'hero-drift-a 16s ease-in-out infinite' }} />
      <div className="absolute right-0 top-1/3 h-80 w-80 rounded-full bg-secondary/40 blur-3xl" style={{ animation: 'hero-drift-b 20s ease-in-out infinite' }} />
      <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-primary/10 blur-3xl" style={{ animation: 'hero-drift-c 18s ease-in-out infinite' }} />
      {DOTS.map(([top, left, d], k) => (
        <span
          key={k}
          className="absolute h-1 w-1 rounded-full bg-primary"
          style={{ top: `${top}%`, left: `${left}%`, animation: `hero-twinkle 3.2s ease-in-out ${d}s infinite` }}
        />
      ))}
      <Glitter count={26} />
    </div>
  );
}

export function Reveal({ children, delay = 0, as: Tag = 'div', className = '' }) {
  return (
    <Tag className={`hero-rise ${className}`} style={{ animationDelay: `${delay}s` }}>
      <style>{CSS}</style>
      {children}
    </Tag>
  );
}

export function ShimmerText({ children, className = '' }) {
  return (
    <span
      className={`bg-gradient-to-r from-foreground via-primary to-foreground bg-[length:200%_100%] bg-clip-text text-transparent ${className}`}
      style={{ animation: 'hero-shimmer 6s linear infinite' }}
    >
      <style>{CSS}</style>
      {children}
    </span>
  );
}

const STAR = 'M12 0C12.8 7 17 11.2 24 12C17 12.8 12.8 17 12 24C11.2 17 7 12.8 0 12C7 11.2 11.2 7 12 0Z';

function Star({ size, className = '', style }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} style={style} aria-hidden="true">
      <path d={STAR} fill="currentColor" />
    </svg>
  );
}

export function Glitter({ count = 16, className = 'inset-0' }) {
  const items = useMemo(() => {
    let seed = 7; // fixed seed: sparkles stay put across re-renders
    const r = () => (seed = (seed * 9301 + 49297) % 233280) / 233280;
    return Array.from({ length: count }, () => ({
      top: r() * 100,
      left: r() * 100,
      size: 6 + r() * 14,
      delay: r() * 4,
      dur: 2 + r() * 2.5,
      gold: r() > 0.6,
    }));
  }, [count]);

  return (
    <div className={`hero-fx pointer-events-none absolute ${className}`}>
      <style>{CSS}</style>
      {items.map((it, k) => (
        <Star
          key={k}
          size={it.size}
          className={`absolute ${it.gold ? 'text-amber-300' : 'text-primary'}`}
          style={{
            top: `${it.top}%`,
            left: `${it.left}%`,
            opacity: 0,
            filter: 'drop-shadow(0 0 4px currentColor)',
            animation: `hero-sparkle ${it.dur}s ease-in-out ${it.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

export function SparkleText({ children, className = '' }) {
  const spots = [
    { top: '-30%', right: '-8%', size: 14, delay: 0 },
    { bottom: '-20%', left: '-6%', size: 10, delay: 1.1 },
    { top: '10%', left: '45%', size: 8, delay: 2 },
  ];
  return (
    <span className={`relative inline-block ${className}`}>
      <style>{CSS}</style>
      {children}
      <span className="hero-fx pointer-events-none">
        {spots.map(({ size, delay, ...pos }, k) => (
          <Star
            key={k}
            size={size}
            className="absolute text-amber-300"
            style={{
              ...pos,
              opacity: 0,
              filter: 'drop-shadow(0 0 4px currentColor)',
              animation: `hero-sparkle 2.6s ease-in-out ${delay}s infinite`,
            }}
          />
        ))}
      </span>
    </span>
  );
}

function CountUp({ to, duration = 1400 }) {
  const ref = useRef(null);
  const [n, setN] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduce) { setN(to); return; }
    let raf;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const tick = (t) => {
        const p = Math.min((t - t0) / duration, 1);
        setN(Math.round(to * (1 - Math.pow(1 - p, 3)))); // ease-out
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [to, duration]);
  return <span ref={ref}>{n}</span>;
}

/** stats: [{ value: number, suffix?: string, label: string, icon: LucideIcon }] */
export function StatCards({ stats, className = '' }) {
  return (
    <div className={`grid grid-cols-3 gap-3 ${className}`}>
      <style>{CSS}</style>
      {stats.map(({ value, suffix = '', label, icon: Icon }, k) => (
        <div
          key={label}
          className="hero-rise rounded-2xl border border-border bg-card/80 p-3 text-center shadow-md backdrop-blur-sm transition-transform hover:-translate-y-1"
          style={{ animationDelay: `${0.2 + k * 0.12}s` }}
        >
          {Icon && <Icon size={16} className="mx-auto mb-1.5 text-primary" />}
          <div className="text-2xl font-black leading-none text-foreground">
            <CountUp to={value} />
            {suffix}
          </div>
          <div className="mt-1 text-[10px] font-semibold uppercase tracking-wide text-foreground/60">{label}</div>
        </div>
      ))}
    </div>
  );
}