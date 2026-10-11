import { useEffect, useRef } from 'react';
import './PandaMascot.css';

/**
 * Red panda mascot for the chatbot.
 *
 * mood: 'idle' | 'up' | 'sass' | 'roll' | 'hmph' | 'love' | 'scroll' | 'read' | 'shrug' | 'music' | 'sleep'
 *
 * Example mapping from RAG chatbot state to mood:
 *   const MOOD = {
 *     idle: 'idle', greeting: 'love', typing: 'up',
 *     retrieving: 'read', generating: 'scroll',
 *     done: 'music', error: 'shrug', away: 'sleep',
 *   };
 *   <PandaMascot mood={MOOD[status]} size={120} follow />
 */
const SVG = `<svg class="pn" data-m="idle" viewBox="-4 -8 158 112" role="img" aria-label="Cute red panda mascot"><g class="sh"><path d="M22 104C22 84 40 71 62 69.5L88 69.5C110 71 128 84 128 104Z" fill="#C94A1F"/></g><g class="bob"><g class="sq"><g class="hd"><g class="eL"><circle cx="46" cy="17" r="13" fill="#C94A1F"/><ellipse cx="46" cy="18" rx="7" ry="7.5" fill="#FBEFE2" /></g><g class="eR"><circle cx="104" cy="17" r="13" fill="#C94A1F"/><ellipse cx="104" cy="18" rx="7" ry="7.5" fill="#FBEFE2" /></g><ellipse cx="75" cy="41" rx="35" ry="30" fill="#E2622E" /><path d="M41 43L34 47L41 52Z M109 43L116 47L109 52Z" fill="#FBEFE2"/><ellipse cx="56" cy="50" rx="15" ry="11" fill="#FBEFE2" /><ellipse cx="94" cy="50" rx="15" ry="11" fill="#FBEFE2" /><ellipse cx="75" cy="53" rx="11" ry="8" fill="#FBEFE2" /><ellipse class="bL" cx="61" cy="26.5" rx="4.6" ry="2.7" fill="#FBEFE2"/><ellipse class="bR" cx="89" cy="26.5" rx="4.6" ry="2.7" fill="#FBEFE2"/><path d="M62 42Q58 48 57 54M88 42Q92 48 93 54" stroke="#B23E17" stroke-width="2.4" fill="none" stroke-linecap="round"/><ellipse class="bl" cx="50" cy="49" rx="6" ry="3.5" fill="#F28AA8" opacity=".6"/><ellipse class="bl" cx="100" cy="49" rx="6" ry="3.5" fill="#F28AA8" opacity=".6"/><g class="eye"><ellipse cx="62" cy="37" rx="5.4" ry="5.9" fill="#FFF8F0"/><g class="pu"><circle cx="62" cy="37.3" r="3.9" fill="#2A140A"/><circle cx="63.5" cy="35.5" r="1.5" fill="#fff"/><circle cx="60.6" cy="39" r=".8" fill="#fff"/></g></g><g class="eye"><ellipse cx="88" cy="37" rx="5.4" ry="5.9" fill="#FFF8F0"/><g class="pu"><circle cx="88" cy="37.3" r="3.9" fill="#2A140A"/><circle cx="89.5" cy="35.5" r="1.5" fill="#fff"/><circle cx="86.6" cy="39" r=".8" fill="#fff"/></g></g><ellipse class="lid lL" cx="62" cy="37" rx="6.3" ry="6.8" fill="#E2622E"/><ellipse class="lid lR" cx="88" cy="37" rx="6.3" ry="6.8" fill="#E2622E"/><g class="cl"><path d="M57.5 37Q62 41.5 66.5 37M83.5 37Q88 41.5 92.5 37" stroke="#2A140A" stroke-width="1.5" fill="none" stroke-linecap="round"/></g><g class="cm"><path d="M57.5 39Q62 33.5 66.5 39M83.5 39Q88 33.5 92.5 39" stroke="#2A140A" stroke-width="1.5" fill="none" stroke-linecap="round"/></g><g class="lv"><g transform="translate(62 37) scale(1.5)"><path d="M0 2.6C-5-1-3.4-5 0-2.4C3.4-5 5-1 0 2.6Z" fill="#E0457B"/></g><g transform="translate(88 37) scale(1.5)"><path d="M0 2.6C-5-1-3.4-5 0-2.4C3.4-5 5-1 0 2.6Z" fill="#E0457B"/></g></g><path d="M58.7 33.6L55.6 31.6M59.6 32L57.2 29.2M91.3 33.6L94.4 31.6M90.4 32L92.8 29.2" stroke="#2A140A" stroke-width="1.4" stroke-linecap="round" fill="none"/><g class="gl"><circle cx="62" cy="37" r="8.6"/><circle cx="88" cy="37" r="8.6"/><path fill="none" d="M70.6 35.5Q75 33 79.4 35.5M53.5 34.5L41 32.5M96.5 34.5L109 32.5"/><path fill="none" stroke="#fff" stroke-width="1.2" stroke-linecap="round" opacity=".8" d="M56.5 32.5L59 30.5M82.5 32.5L85 30.5"/><g class="rf" stroke="none"><ellipse cx="62" cy="41.4" rx="4.8" ry="2.2" fill="#d6edff"/><ellipse cx="88" cy="41.4" rx="4.8" ry="2.2" fill="#d6edff"/><ellipse cx="66.2" cy="34" rx="1.6" ry="1" fill="#eaf6ff"/><ellipse cx="92.2" cy="34" rx="1.6" ry="1" fill="#eaf6ff"/></g></g><ellipse cx="75" cy="47" rx="4.2" ry="3" fill="#2A140A"/><ellipse cx="74" cy="46" rx="1.2" ry=".6" fill="#fff" opacity=".7"/><g class="sb"><circle cx="68" cy="52" r="5.2" fill="#cfeaff" fill-opacity=".55" stroke="#9fd0f5" stroke-width="1"/><ellipse cx="66.2" cy="50" rx="1.6" ry="1" fill="#fff" opacity=".9"/></g><g stroke="#2A140A" stroke-width="1.3" fill="none" stroke-linecap="round"><g class="m m-idle"><path d="M75 50V52M75 52Q71 56.5 67.5 54M75 52Q79 56.5 82.5 54"/></g><g class="m m-o"><path d="M75 50V52"/><ellipse cx="75" cy="55.2" rx="2.3" ry="2.9" fill="#7A2A2A"/></g><g class="m m-smirk"><path d="M75 50V52M75 52Q72 55 69 54.5M75 52Q80 55.5 86 50.5"/></g><g class="m m-pout"><path d="M75 50V53M69.5 55.5Q72.3 53 75 55.5Q77.7 58 80.5 55.5"/></g><g class="m m-love"><path d="M75 50V52"/><path d="M68 53Q75 63 82 53Z" fill="#7A2A2A"/><ellipse cx="75" cy="57.5" rx="3" ry="1.8" fill="#F28AA8" stroke="none"/></g></g><g class="hp"><path d="M38 46C26 14 50 -4 75 -4C100 -4 124 14 112 46" stroke="#C0537F" stroke-width="3.6" fill="none" stroke-linecap="round"/><path d="M39 40C30 16 52 -1 75 -1C98 -1 120 16 111 40" stroke="#E0709E" stroke-width="1.2" fill="none" stroke-linecap="round" opacity=".8"/><ellipse cx="37" cy="46" rx="7.5" ry="10.5" fill="#E0709E" stroke="#C0537F" stroke-width="1.6"/><ellipse cx="39" cy="46" rx="3.6" ry="7" fill="#C0537F" opacity=".4"/><ellipse cx="113" cy="46" rx="7.5" ry="10.5" fill="#E0709E" stroke="#C0537F" stroke-width="1.6"/><ellipse cx="111" cy="46" rx="3.6" ry="7" fill="#C0537F" opacity=".4"/></g><g class="rl"><g transform="rotate(-12 66 17.5)"><rect x="55" y="11.5" width="22" height="12" rx="6" fill="#E0709E" stroke="#C0537F" stroke-width="1.2"/><g fill="#fff" fill-opacity=".7"><circle cx="59.6" cy="14.7" r=".75"/><circle cx="62.9" cy="14.7" r=".75"/><circle cx="66.2" cy="14.7" r=".75"/><circle cx="69.5" cy="14.7" r=".75"/><circle cx="72.8" cy="14.7" r=".75"/><circle cx="61.2" cy="17.5" r=".75"/><circle cx="64.5" cy="17.5" r=".75"/><circle cx="67.8" cy="17.5" r=".75"/><circle cx="71.1" cy="17.5" r=".75"/><circle cx="74.4" cy="17.5" r=".75"/><circle cx="59.6" cy="20.3" r=".75"/><circle cx="62.9" cy="20.3" r=".75"/><circle cx="66.2" cy="20.3" r=".75"/><circle cx="69.5" cy="20.3" r=".75"/><circle cx="72.8" cy="20.3" r=".75"/></g><path d="M63 11.7Q66.5 17.5 63 23.3M70 11.7Q73.5 17.5 70 23.3" stroke="#B23E17" stroke-width="3" fill="none" stroke-linecap="round"/><ellipse cx="57" cy="17.5" rx="1.8" ry="4.4" fill="#fff" fill-opacity=".35"/><rect x="58.5" y="9.4" width="14" height="2.4" rx="1.2" fill="#d9d9e2" stroke="#9a9aa8" stroke-width=".7"/></g></g></g></g></g><defs><linearGradient id="pmBeam" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#9fd6ff" stop-opacity=".75"/><stop offset=".55" stop-color="#b9e0ff" stop-opacity=".3"/><stop offset="1" stop-color="#d9eeff" stop-opacity="0"/></linearGradient></defs><path class="bm" d="M69 68C65 57 54 46 30 24L120 24C96 46 85 57 81 68Z" fill="url(#pmBeam)"/><g class="ph"><rect x="68" y="67" width="14" height="24" rx="3.2" fill="#E0709E"/><rect x="69.8" y="69" width="6.6" height="6.6" rx="2" fill="#3d3045"/><circle cx="72" cy="71.2" r="1.3" fill="#15101a"/><circle cx="74.3" cy="73.6" r="1.3" fill="#15101a"/><circle cx="79" cy="87" r="1.6" fill="#fff" opacity=".5"/></g><g class="bkb"><path d="M75 69.5Q67 68 60 70V91Q67 90 75 91.5Z" fill="#C0537F"/><path d="M75 69.5Q83 68 90 70V91Q83 90 75 91.5Z" fill="#E0709E"/><rect x="73.7" y="69" width="2.6" height="22.5" rx="1.2" fill="#C0537F" opacity=".9"/><path d="M60 70.4Q67 68.4 75 69.9Q83 68.4 90 70.4" stroke="#fffaf2" stroke-width="1.6" fill="none"/><path d="M82 78.4c-2-1.6-3.4.6-1.6 2l1.6 1.4 1.6-1.4c1.8-1.4.4-3.6-1.6-2Z" fill="#fff" opacity=".7"/></g><g class="pw pwL"><ellipse cx="61" cy="80" rx="6.6" ry="5.8" fill="#B23E17" /><ellipse cx="56.9" cy="75.6" rx="2.5" ry="2.5" fill="#B23E17" /><ellipse cx="61" cy="74.4" rx="2.5" ry="2.5" fill="#B23E17" /><ellipse cx="65.1" cy="75.6" rx="2.5" ry="2.5" fill="#B23E17" /><ellipse cx="61" cy="80.4" rx="3" ry="2.2" fill="#F28AA8" opacity=".55"/></g><g class="pw pwR"><ellipse cx="89" cy="80" rx="6.6" ry="5.8" fill="#B23E17" /><ellipse cx="84.9" cy="75.6" rx="2.5" ry="2.5" fill="#B23E17" /><ellipse cx="89" cy="74.4" rx="2.5" ry="2.5" fill="#B23E17" /><ellipse cx="93.1" cy="75.6" rx="2.5" ry="2.5" fill="#B23E17" /><ellipse cx="89" cy="80.4" rx="3" ry="2.2" fill="#F28AA8" opacity=".55"/></g><g class="fx"></g></svg>`;

const NS = 'http://www.w3.org/2000/svg';
const HEART = 'M0 2.6C-5-1-3.4-5 0-2.4C3.4-5 5-1 0 2.6Z';

function spawn(svg, ch) {
  const fx = svg.querySelector('.fx');
  if (!fx) return;
  const g = document.createElementNS(NS, 'g');
  let n;
  if (ch === 'h') {
    g.setAttribute('transform', `translate(${60 + Math.random() * 30} 14)`);
    n = document.createElementNS(NS, 'path');
    n.setAttribute('d', HEART);
    n.setAttribute('class', 'fh');
  } else {
    const z = ch === 'z';
    const x = z ? 100 + Math.random() * 10 : Math.random() < 0.5 ? 14 + Math.random() * 14 : 112 + Math.random() * 16;
    g.setAttribute('transform', `translate(${x} ${z ? 14 : 28})`);
    n = document.createElementNS(NS, 'text');
    n.setAttribute('class', 'fz');
    n.textContent = ch;
    n.style.fill = z ? '#7f9bff' : '#C0537F';
  }
  n.style.setProperty('--dx', `${Math.random() * 16 - 8}px`);
  g.appendChild(n);
  fx.appendChild(g);
  setTimeout(() => g.remove(), 2300);
}

export default function PandaMascot({ mood = 'idle', size = 160, follow = false, className = '' }) {
  const root = useRef(null);

  useEffect(() => {
    const svg = root.current.querySelector('svg');
    svg.dataset.m = mood;
    svg.style.removeProperty('--px');
    svg.style.removeProperty('--py');
    let timer;
    if (mood === 'music') { spawn(svg, '\u266a'); timer = setInterval(() => spawn(svg, '\u266a'), 700); }
    if (mood === 'sleep') { spawn(svg, 'z'); timer = setInterval(() => spawn(svg, 'z'), 1100); }
    if (mood === 'love') for (let i = 0; i < 5; i++) setTimeout(() => spawn(svg, 'h'), i * 140);
    return () => clearInterval(timer);
  }, [mood]);

  useEffect(() => {
    if (!follow || mood !== 'idle') return;
    const svg = root.current.querySelector('svg');
    const move = (e) => {
      const r = svg.getBoundingClientRect();
      const dx = (e.clientX - r.left - r.width / 2) / (window.innerWidth / 2);
      const dy = (e.clientY - r.top - r.height / 2) / (window.innerHeight / 2);
      svg.style.setProperty('--px', Math.max(-1, Math.min(1, dx)) * 1.5);
      svg.style.setProperty('--py', Math.max(-1, Math.min(1, dy)) * 1.4);
    };
    window.addEventListener('pointermove', move);
    return () => window.removeEventListener('pointermove', move);
  }, [follow, mood]);

  const boop = () => {
    const el = root.current;
    el.classList.add('bp');
    setTimeout(() => el.classList.remove('bp'), 520);
    spawn(el.querySelector('svg'), 'h');
  };

  return (
    <div
      ref={root}
      className={`panda ${className}`}
      style={{ width: size }}
      onClick={boop}
      dangerouslySetInnerHTML={{ __html: SVG }}
    />
  );
}