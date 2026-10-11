import { useEffect, useRef } from "react";

/*
  Red panda that peeks over the top edge of whatever you put inside (head + paws only).

  Props
    mood     "idle" | "sass" | "hmph" | "roll" | "love" | "up"
             idle = eyes follow the cursor, blinks, ear twitches, waves now and then
    align    "center" | "right"      where she sits on the card edge
    size     1 = full size (150px wide head). 0.8 = a bit smaller.
    glasses  "round" | "cat" | "square" | "none"
    roller   true | false            the hair roller on top of her head
    className  classes for the wrapper (for example "mx-auto w-full max-w-sm")
*/

const EDGE = 62; // y (in head units) where the card's top edge crosses her

// The head, exported from the panda playground
const HEAD = `<g class="bob"><g class="sq"><g class="hd"><g class="eL"><circle cx="46" cy="17" r="13" style="fill:var(--f2)"/><ellipse cx="46" cy="18" rx="7" ry="7.5" fill="#FBEFE2"/></g><g class="eR"><circle cx="104" cy="17" r="13" style="fill:var(--f2)"/><ellipse cx="104" cy="18" rx="7" ry="7.5" fill="#FBEFE2"/></g><g class="sc"><ellipse cx="75" cy="68" rx="30" ry="13" style="fill:var(--bw2)"/><ellipse cx="75" cy="38" rx="45" ry="39" style="fill:var(--bw)"/></g><ellipse cx="75" cy="41" rx="35" ry="30" style="fill:var(--f1)"/><path d="M41 43L34 47L41 52Z M109 43L116 47L109 52Z" fill="#FBEFE2"/><g class="fc"><ellipse cx="56" cy="50" rx="15" ry="11" fill="#FBEFE2"/><ellipse cx="94" cy="50" rx="15" ry="11" fill="#FBEFE2"/><ellipse cx="75" cy="53" rx="11" ry="8" fill="#FBEFE2"/><ellipse class="bL" cx="61" cy="26.5" rx="4.6" ry="2.7" fill="#FBEFE2"/><ellipse class="bR" cx="89" cy="26.5" rx="4.6" ry="2.7" fill="#FBEFE2"/><path d="M62 42Q58 48 57 54M88 42Q92 48 93 54" style="stroke:var(--f3)" stroke-width="2.4" fill="none" stroke-linecap="round"/><ellipse class="bl" cx="50" cy="49" rx="6" ry="3.5" fill="#F28AA8" opacity=".6"/><ellipse class="bl" cx="100" cy="49" rx="6" ry="3.5" fill="#F28AA8" opacity=".6"/><g class="eye"><ellipse cx="62" cy="37" rx="5.4" ry="5.9" fill="#FFF8F0"/><g class="pu"><circle cx="62" cy="37.3" r="3.9" fill="#2A140A"/><circle cx="63.5" cy="35.5" r="1.5" fill="#fff"/><circle cx="60.6" cy="39" r=".8" fill="#fff"/></g></g><g class="eye"><ellipse cx="88" cy="37" rx="5.4" ry="5.9" fill="#FFF8F0"/><g class="pu"><circle cx="88" cy="37.3" r="3.9" fill="#2A140A"/><circle cx="89.5" cy="35.5" r="1.5" fill="#fff"/><circle cx="86.6" cy="39" r=".8" fill="#fff"/></g></g><ellipse class="lid lL" cx="62" cy="37" rx="6.3" ry="6.8" style="fill:var(--f1)"/><ellipse class="lid lR" cx="88" cy="37" rx="6.3" ry="6.8" style="fill:var(--f1)"/><g class="cl"><path d="M57.5 37Q62 41.5 66.5 37M83.5 37Q88 41.5 92.5 37" stroke="#2A140A" stroke-width="1.5" fill="none" stroke-linecap="round"/></g><g class="cm"><path d="M57.5 39Q62 33.5 66.5 39M83.5 39Q88 33.5 92.5 39" stroke="#2A140A" stroke-width="1.5" fill="none" stroke-linecap="round"/></g><g class="lv"><g transform="translate(62 37) scale(1.5)"><path d="M0 2.6C-5-1-3.4-5 0-2.4C3.4-5 5-1 0 2.6Z" fill="#E0457B"/></g><g transform="translate(88 37) scale(1.5)"><path d="M0 2.6C-5-1-3.4-5 0-2.4C3.4-5 5-1 0 2.6Z" fill="#E0457B"/></g></g><path d="M58.7 33.6L55.6 31.6M59.6 32L57.2 29.2M91.3 33.6L94.4 31.6M90.4 32L92.8 29.2" stroke="#2A140A" stroke-width="1.4" stroke-linecap="round" fill="none"/><g class="gw"><ellipse cx="75" cy="50" rx="28" ry="17" fill="#7cc4ff" fill-opacity=".3"/><ellipse cx="75" cy="52" rx="21" ry="12" fill="#9fd6ff" fill-opacity=".4"/><ellipse cx="75" cy="54" rx="13" ry="7" fill="#d4ecff" fill-opacity=".5"/></g><g class="gl"><g class="g-r"><circle cx="62" cy="37" r="8.6"/><circle cx="88" cy="37" r="8.6"/></g><g class="g-s"><rect x="53.4" y="29" width="17.2" height="16" rx="4.5"/><rect x="79.4" y="29" width="17.2" height="16" rx="4.5"/></g><g class="g-c"><path d="M52 30Q58 28.5 66 30Q71.5 31.5 70.8 38Q69 45.5 62 45.5Q54 45.5 53 38Z"/><path d="M98 30Q92 28.5 84 30Q78.5 31.5 79.2 38Q81 45.5 88 45.5Q96 45.5 97 38Z"/></g><path fill="none" d="M70.6 35.5Q75 33 79.4 35.5M53.5 34.5L41 32.5M96.5 34.5L109 32.5"/><path fill="none" stroke="#fff" stroke-width="1.2" stroke-linecap="round" opacity=".8" d="M56.5 32.5L59 30.5M82.5 32.5L85 30.5"/><g class="rf" stroke="none"><ellipse cx="62" cy="41.4" rx="4.8" ry="2.2" fill="#d6edff"/><ellipse cx="88" cy="41.4" rx="4.8" ry="2.2" fill="#d6edff"/><ellipse cx="66.2" cy="34" rx="1.6" ry="1" fill="#eaf6ff"/><ellipse cx="92.2" cy="34" rx="1.6" ry="1" fill="#eaf6ff"/></g></g><ellipse cx="75" cy="47" rx="4.2" ry="3" fill="#2A140A"/><ellipse cx="74" cy="46" rx="1.2" ry=".6" fill="#fff" opacity=".7"/><g stroke="#2A140A" stroke-width="1.3" fill="none" stroke-linecap="round"><g class="m m-idle"><path d="M75 50V52M75 52Q71 56.5 67.5 54M75 52Q79 56.5 82.5 54"/></g><g class="m m-o"><path d="M75 50V52"/><ellipse cx="75" cy="55.2" rx="2.3" ry="2.9" fill="#7A2A2A"/></g><g class="m m-smirk"><path d="M75 50V52M75 52Q72 55 69 54.5M75 52Q80 55.5 86 50.5"/></g><g class="m m-pout"><path d="M75 50V53M69.5 55.5Q72.3 53 75 55.5Q77.7 58 80.5 55.5"/></g><g class="m m-focus"><path d="M75 50V52M71.5 54.5Q75 56 78.5 54.5"/><ellipse cx="76.5" cy="57" rx="2" ry="2.4" fill="#F28AA8" stroke="none"/></g><g class="m m-love"><path d="M75 50V52"/><path d="M68 53Q75 63 82 53Z" fill="#7A2A2A"/><ellipse cx="75" cy="57.5" rx="3" ry="1.8" fill="#F28AA8" stroke="none"/></g></g></g><g class="dr"><ellipse cx="58" cy="66" rx="3.4" ry="9" style="fill:var(--f1)"/><ellipse cx="76" cy="68" rx="3" ry="11" style="fill:var(--f1)"/><ellipse cx="93" cy="65" rx="3.4" ry="8" style="fill:var(--f1)"/></g><g class="hp"><path d="M38 46C26 14 50 -4 75 -4C100 -4 124 14 112 46" style="stroke:var(--bw2)" stroke-width="3.6" fill="none" stroke-linecap="round"/><path d="M39 40C30 16 52 -1 75 -1C98 -1 120 16 111 40" style="stroke:var(--bw)" stroke-width="1.2" fill="none" stroke-linecap="round" opacity=".8"/><ellipse cx="37" cy="46" rx="7.5" ry="10.5" style="fill:var(--bw);stroke:var(--bw2);stroke-width:1.6"/><ellipse cx="39" cy="46" rx="3.6" ry="7" style="fill:var(--bw2)" opacity=".4"/><ellipse cx="113" cy="46" rx="7.5" ry="10.5" style="fill:var(--bw);stroke:var(--bw2);stroke-width:1.6"/><ellipse cx="111" cy="46" rx="3.6" ry="7" style="fill:var(--bw2)" opacity=".4"/><g class="cb"><path d="M35 56C26 68 37 78 33 90" style="stroke:var(--bw2)" stroke-width="1.6" fill="none" stroke-linecap="round"/></g></g><g class="rl"><g transform="rotate(-12 66 17.5)"><rect x="55" y="11.5" width="22" height="12" rx="6" style="fill:var(--bw);stroke:var(--bw2);stroke-width:1.2"/><g fill="#fff" fill-opacity=".7"><circle cx="59.6" cy="14.7" r=".75"/><circle cx="62.9" cy="14.7" r=".75"/><circle cx="66.2" cy="14.7" r=".75"/><circle cx="69.5" cy="14.7" r=".75"/><circle cx="72.8" cy="14.7" r=".75"/><circle cx="61.2" cy="17.5" r=".75"/><circle cx="64.5" cy="17.5" r=".75"/><circle cx="67.8" cy="17.5" r=".75"/><circle cx="71.1" cy="17.5" r=".75"/><circle cx="74.39999999999999" cy="17.5" r=".75"/><circle cx="59.6" cy="20.299999999999997" r=".75"/><circle cx="62.9" cy="20.299999999999997" r=".75"/><circle cx="66.2" cy="20.299999999999997" r=".75"/><circle cx="69.5" cy="20.299999999999997" r=".75"/><circle cx="72.8" cy="20.299999999999997" r=".75"/></g><path d="M63 11.7Q66.5 17.5 63 23.3M70 11.7Q73.5 17.5 70 23.3" style="stroke:var(--f3)" stroke-width="3" fill="none" stroke-linecap="round"/><ellipse cx="57" cy="17.5" rx="1.8" ry="4.4" fill="#fff" fill-opacity=".35"/><rect x="58.5" y="9.4" width="14" height="2.4" rx="1.2" fill="#d9d9e2" stroke="#9a9aa8" stroke-width=".7"/></g></g><g class="bow"><path d="M85 11L82 19L86 16Z M87 11L90 19L86 16Z" style="fill:var(--bw2)"/><path d="M86 9C80 1 73 3 74 9C75 15 81 15 86 9Z" style="fill:var(--bw)"/><path d="M86 9C92 1 99 3 98 9C97 15 91 15 86 9Z" style="fill:var(--bw)"/><circle cx="86" cy="9" r="3" style="fill:var(--bw2)"/><circle cx="85" cy="8" r=".9" fill="#fff" opacity=".7"/><ellipse cx="78" cy="7.2" rx="1.6" ry=".9" fill="#fff" opacity=".55"/></g></g></g></g><g class="fx"></g>`;

const CSS = `
.pnd{--px:0;--py:0;--lid:.001;overflow:visible}
.pnd .bob{animation:pnd-bob 3.6s ease-in-out infinite}
@keyframes pnd-bob{50%{transform:translateY(-1.3px)}}
.pnd .sq{transform-origin:75px 60px;animation:pnd-sway 5s ease-in-out infinite alternate}
@keyframes pnd-sway{from{rotate:-1.3deg}to{rotate:1.3deg}}
.pnd .hd{transform-origin:75px 58px;transition:transform .9s cubic-bezier(.4,0,.2,1)}
.pnd .pu{transform:translate(calc(var(--px)*1px),calc(var(--py)*1px));transition:transform .3s cubic-bezier(.4,0,.2,1)}
.pnd .eye{transform-box:fill-box;transform-origin:center;animation:pnd-blink 4.5s infinite}
@keyframes pnd-blink{0%,92%,100%{transform:scaleY(1)}95%{transform:scaleY(.08)}}
.pnd .lid{transform:scaleY(var(--lid));transition:transform .4s ease}
.pnd .lL{transform-origin:62px 30.8px}.pnd .lR{transform-origin:88px 30.8px}
.pnd .bL,.pnd .bR{transform-box:fill-box;transform-origin:center;transition:transform .6s cubic-bezier(.4,0,.2,1)}
.pnd .eL{transform-origin:46px 25px;animation:pnd-tw 7s infinite;transition:transform .8s ease}
.pnd .eR{transform-origin:104px 25px;animation:pnd-tw 9s 2s infinite;transition:transform .8s ease}
@keyframes pnd-tw{0%,90%,100%{transform:rotate(0)}93%{transform:rotate(-11deg)}96%{transform:rotate(4deg)}}
.pnd .bl{transform-box:fill-box;transform-origin:center;transition:transform .4s,opacity .4s}
.pnd .m{display:none}.pnd .m-idle{display:block}
.pnd .lv{opacity:0;transition:opacity .2s;transform-box:fill-box;transform-origin:center}
.pnd .bow{transform-origin:86px 9px;animation:pnd-bow 3s ease-in-out infinite}
@keyframes pnd-bow{50%{transform:rotate(7deg)}}
.pnd .hp,.pnd .cm,.pnd .cl,.pnd .dr,.pnd .rf{opacity:0}
.pnd .gw,.pnd .g-r,.pnd .g-c,.pnd .g-s,.pnd .sc,.pnd .rl{display:none}
.pnd .gl{stroke:var(--bw2);stroke-width:1.8;fill:#fff;fill-opacity:.13}
.pnd[data-gl=round] .g-r,.pnd[data-gl=cat] .g-c,.pnd[data-gl=square] .g-s{display:block}
.pnd[data-gl=none] .gl{display:none}
.pnd[data-rl=on] .rl{display:block}

/* moods */
.pnd[data-m=up]{--px:.2;--py:-1.5}
.pnd[data-m=up] .hd{transform:rotate(-5deg) translateY(-1px)}
.pnd[data-m=up] .bL,.pnd[data-m=up] .bR{transform:translateY(-3px)}
.pnd[data-m=up] .m-idle{display:none}.pnd[data-m=up] .m-o{display:block}

.pnd[data-m=sass]{--px:1.5;--py:.2;--lid:.5}
.pnd[data-m=sass] .hd{transform:rotate(7deg) translate(1px,1px)}
.pnd[data-m=sass] .bR{transform:translateY(-3.4px) rotate(-14deg)}
.pnd[data-m=sass] .bL{transform:translateY(1px) rotate(8deg)}
.pnd[data-m=sass] .m-idle{display:none}.pnd[data-m=sass] .m-smirk{display:block}

.pnd[data-m=hmph]{--px:-1.5;--py:-.4;--lid:.62}
.pnd[data-m=hmph] .hd{transform:rotate(-8deg) translateY(-2px)}
.pnd[data-m=hmph] .eL{transform:rotate(-14deg);animation:none}
.pnd[data-m=hmph] .eR{transform:rotate(14deg);animation:none}
.pnd[data-m=hmph] .bl{transform:scale(1.25)}
.pnd[data-m=hmph] .m-idle{display:none}.pnd[data-m=hmph] .m-pout{display:block}

.pnd[data-m=roll]{--lid:.28}
.pnd[data-m=roll] .hd{transform:rotate(-2deg)}
.pnd[data-m=roll] .pu{animation:pnd-roll 2.4s ease-in-out infinite}
.pnd[data-m=roll] .m-idle{display:none}.pnd[data-m=roll] .m-pout{display:block}
@keyframes pnd-roll{0%{transform:translate(0,0)}20%{transform:translate(-1.4px,-1.2px)}40%{transform:translate(0,-1.7px)}60%{transform:translate(1.4px,-1.1px)}80%{transform:translate(1.4px,.3px)}100%{transform:translate(0,0)}}

.pnd[data-m=love] .hd{transform:rotate(3deg) scale(1.03)}
.pnd[data-m=love] .pu{opacity:0}
.pnd[data-m=love] .lv{opacity:1;animation:pnd-pulse .5s ease-in-out infinite alternate}
.pnd[data-m=love] .bl{transform:scale(1.3);opacity:1}
.pnd[data-m=love] .m-idle{display:none}.pnd[data-m=love] .m-love{display:block}
@keyframes pnd-pulse{to{transform:scale(1.12)}}

/* paw wave (only while idle) */
.pnd-wave{animation:pnd-wv 5s ease-in-out infinite}
@keyframes pnd-wv{0%,55%,100%{transform:rotate(0)}60%,72%{transform:rotate(-16deg)}66%,78%{transform:rotate(16deg)}84%{transform:rotate(0)}}

@media (prefers-reduced-motion:reduce){.pnd *,.pnd-wave{animation:none!important}}
`;

export const PandaPeek = ({
  children,
  mood = "idle",
  align = "center",
  size = 1,
  glasses = "round",
  roller = true,
  className = "",
}) => {
  const headRef = useRef(null);

  // Idle: the pupils follow the cursor (or your finger on a phone).
  // Any other mood takes over the eyes, so the cursor values are cleared.
  useEffect(() => {
    const el = headRef.current;
    if (!el) return;
    if (mood !== "idle") {
      el.style.removeProperty("--px");
      el.style.removeProperty("--py");
      return;
    }
    const move = (e) => {
      const r = el.getBoundingClientRect();
      const dx = (e.clientX - r.left - r.width / 2) / (window.innerWidth / 2);
      const dy = (e.clientY - r.top - r.height / 2) / (window.innerHeight / 2);
      el.style.setProperty("--px", Math.max(-1, Math.min(1, dx)) * 1.5);
      el.style.setProperty("--py", Math.max(-1, Math.min(1, dy)) * 1.4);
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, [mood]);

  const w = 150 * size;
  const h = 78 * size;
  const place =
    align === "right"
      ? { right: 28 }
      : { left: "50%", marginLeft: -w / 2 };
  const box = { position: "absolute", top: 0, width: w, height: h, pointerEvents: "none", ...place };

  return (
    <div
      className={`relative ${className}`}
      style={{
        paddingTop: EDGE * size,
        // fur and accent colors (change these to recolor her)
        "--f1": "#E2622E",
        "--f2": "#C94A1F",
        "--f3": "#B23E17",
        "--bw": "#E0709E",
        "--bw2": "#C0537F",
      }}
    >
      <style>{CSS}</style>

      {/* head, behind the card */}
      <svg
        ref={headRef}
        className="pnd"
        data-m={mood}
        data-gl={glasses}
        data-rl={roller ? "on" : "off"}
        viewBox="0 0 150 78"
        aria-hidden="true"
        style={{ ...box, zIndex: 0 }}
        dangerouslySetInnerHTML={{ __html: HEAD }}
      />

      <div className="relative z-10">{children}</div>

      {/* paws, resting on the card edge */}
      <svg viewBox="0 0 150 78" aria-hidden="true" style={{ ...box, zIndex: 20 }}>
        <ellipse cx="50" cy={EDGE + 2} rx="10" ry="6.5" style={{ fill: "var(--f3)" }} />
        <g
          className={mood === "idle" ? "pnd-wave" : undefined}
          style={{ transformOrigin: `112px ${EDGE + 2}px` }}
        >
          <ellipse cx="114" cy={EDGE - 10} rx="6" ry="10" style={{ fill: "var(--f3)" }} />
        </g>
      </svg>
    </div>
  );
};