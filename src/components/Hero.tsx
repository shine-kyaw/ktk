"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const SLIDES = [
  { src: "/photos/factory.jpg", alt: "AG Holding manufacturing facility, Yangon" },
  { src: "/photos/power-transformer.jpg", alt: "230 kV power transformers at substation" },
  { src: "/photos/factory-2.jpg", alt: "Aerial view of AG Holding transformer plant" },
];

const SLIDE_MS = 700;
const HOLD_MS = 4200;
const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";

// Pixel streaks that race across the frame with each slide transition —
// deterministic (no Math.random: SSR markup must match the client).
// Colors mix brand red, ink, and ringed white so the squares read on both
// bright skies and dark steel, whatever the photo behind them.
const STREAKS: { top: string; s: number; dur: number; delay: number; c: "red" | "ink" | "white" }[] = [
  { top: "6%", s: 10, dur: 1050, delay: 0, c: "ink" },
  { top: "14%", s: 16, dur: 1220, delay: 60, c: "red" },
  { top: "22%", s: 8, dur: 1000, delay: 130, c: "white" },
  { top: "30%", s: 20, dur: 1350, delay: 20, c: "red" },
  { top: "38%", s: 12, dur: 1130, delay: 170, c: "ink" },
  { top: "47%", s: 15, dur: 1280, delay: 90, c: "white" },
  { top: "55%", s: 9, dur: 1030, delay: 220, c: "red" },
  { top: "63%", s: 18, dur: 1400, delay: 40, c: "ink" },
  { top: "71%", s: 13, dur: 1160, delay: 150, c: "red" },
  { top: "79%", s: 8, dur: 1080, delay: 200, c: "white" },
  { top: "86%", s: 16, dur: 1300, delay: 70, c: "ink" },
  { top: "92%", s: 10, dur: 1110, delay: 120, c: "red" },
  { top: "26%", s: 9, dur: 1190, delay: 240, c: "ink" },
  { top: "68%", s: 14, dur: 1240, delay: 110, c: "white" },
];

// Streaks use a steadier ease than the slide itself, so they stay visibly
// mid-frame for most of the transition instead of front-loading the travel.
const STREAK_EASE = "cubic-bezier(0.33, 0, 0.2, 1)";

// Ambient motes — tiny squares drifting up the photo, looping forever.
const MOTES = [
  { left: "8%", top: "78%", s: 7, dur: 13, delay: 0 },
  { left: "22%", top: "88%", s: 5, dur: 17, delay: 3.5 },
  { left: "47%", top: "92%", s: 9, dur: 15, delay: 1.2, red: true },
  { left: "68%", top: "84%", s: 6, dur: 19, delay: 5 },
  { left: "84%", top: "90%", s: 8, dur: 14, delay: 2.2 },
  { left: "93%", top: "80%", s: 5, dur: 16, delay: 7 },
];

// Eased count-up for the stat ribbon (cubic ease-out, ~1.4s on load).
function CountUp({ to, suffix, reduce }: { to: number; suffix?: string; reduce: boolean }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (reduce) {
      setN(to);
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / 1400);
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, reduce]);
  return (
    <>
      {n}
      {suffix}
    </>
  );
}

export function Hero() {
  const t = useTranslations("home");
  const tc = useTranslations("common");
  // Atomic {active, prev, dir} — incoming slide sweeps in over the outgoing
  // one (which gets pushed back underneath), so the composite never dips to
  // the dark fallback. dir: 1 = forward (enter from right), -1 = backward.
  const [{ active, prev, dir }, setSlide] = useState({ active: 0, prev: -1, dir: 1 });
  const [reduce, setReduce] = useState(false);

  const go = (next: number) =>
    setSlide((s) =>
      s.active === next ? s : { active: next, prev: s.active, dir: next > s.active ? 1 : -1 },
    );

  useEffect(() => {
    setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  // Autoplay re-arms on every slide change (manual or automatic), so the
  // hold time — and the dot's progress fill — is always a full HOLD_MS.
  useEffect(() => {
    if (reduce) return;
    const id = setTimeout(() => {
      setSlide((s) => ({ active: (s.active + 1) % SLIDES.length, prev: s.active, dir: 1 }));
    }, HOLD_MS);
    return () => clearTimeout(id);
  }, [active, reduce]);

  // Once-on-load entrance stagger for the frosted panel's children.
  const rise = (step: number) =>
    reduce ? undefined : { animation: `heroRise 700ms ${EASE} ${step * 90}ms both` };

  return (
    <section className="relative isolate flex min-h-[92vh] items-center overflow-hidden pt-16">
      {/* Directional slide choreography (transform/opacity only).
          Incoming frame sweeps in while its image counter-drifts inside it
          with a micro-overshoot settle (overscan always covers the frame);
          a light streak + pixel streak swarm ride along with the seam.
          The outgoing frame is pushed back in depth (drift + grow + dim). */}
      <style>{`
        /* hero-anim-v: ktk-1 */
        @keyframes heroFrameInFwd  { from { transform: translateX(100%); }  to { transform: translateX(0); } }
        @keyframes heroFrameInBwd  { from { transform: translateX(-100%); } to { transform: translateX(0); } }
        @keyframes heroFrameOutFwd { from { transform: translateX(0) scale(1); } to { transform: translateX(-45%) scale(1.06); } }
        @keyframes heroFrameOutBwd { from { transform: translateX(0) scale(1); } to { transform: translateX(45%) scale(1.06); } }
        @keyframes heroImgInFwd {
          0%   { transform: translateX(-9%) scale(1.2); }
          60%  { transform: translateX(0.6%) scale(1.05); }
          100% { transform: translateX(0) scale(1); }
        }
        @keyframes heroImgInBwd {
          0%   { transform: translateX(9%) scale(1.2); }
          60%  { transform: translateX(-0.6%) scale(1.05); }
          100% { transform: translateX(0) scale(1); }
        }
        @keyframes heroVeilOut { from { opacity: 0; } to { opacity: 0.35; } }
        @keyframes heroEdgeGlow { 0% { opacity: 0; } 25% { opacity: 0.5; } 100% { opacity: 0; } }
        @keyframes heroStreakFwd {
          0%   { opacity: 0; transform: translateX(0) rotate(0deg); }
          8%   { opacity: 0.95; }
          75%  { opacity: 0.75; }
          100% { opacity: 0; transform: translateX(-118vw) rotate(140deg); }
        }
        @keyframes heroStreakBwd {
          0%   { opacity: 0; transform: translateX(0) rotate(0deg); }
          8%   { opacity: 0.95; }
          75%  { opacity: 0.75; }
          100% { opacity: 0; transform: translateX(118vw) rotate(-140deg); }
        }
        @keyframes heroDecoPulse {
          0%, 100% { opacity: 0.18; transform: scale(1); }
          50%      { opacity: 0.95; transform: scale(1.2); }
        }
        @keyframes heroFloat {
          0%   { opacity: 0; transform: translateY(0) rotate(0deg); }
          12%  { opacity: 0.5; }
          80%  { opacity: 0.3; }
          100% { opacity: 0; transform: translateY(-50vh) rotate(160deg); }
        }
        @keyframes heroRise { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes heroCapIn { from { opacity: 0; transform: translateX(-16px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes heroDotFill { from { transform: scaleX(0); } to { transform: scaleX(1); } }
        @keyframes heroCountIn { from { opacity: 0; transform: translateY(0.45em); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      {/* Full-bleed auto-cycling wallpaper */}
      <div className="absolute inset-0 -z-10 overflow-hidden bg-ink">
        {SLIDES.map((s, i) => {
          const isActive = i === active;
          const isPrev = i === prev;
          // First paint (prev === -1) renders the active slide statically — no
          // entrance animation on page load.
          const animate = !reduce && prev !== -1;
          const frameAnim =
            animate && isActive
              ? `${dir === 1 ? "heroFrameInFwd" : "heroFrameInBwd"} ${SLIDE_MS}ms ${EASE} both`
              : animate && isPrev
                ? `${dir === 1 ? "heroFrameOutFwd" : "heroFrameOutBwd"} ${SLIDE_MS}ms ${EASE} both`
                : "none";
          const imgAnim =
            animate && isActive
              ? `${dir === 1 ? "heroImgInFwd" : "heroImgInBwd"} ${SLIDE_MS}ms ${EASE} both`
              : "none";
          return (
            <div
              key={s.src}
              className="absolute inset-0 overflow-hidden"
              style={{
                zIndex: isActive ? 2 : isPrev ? 1 : 0,
                visibility: isActive || isPrev ? "visible" : "hidden",
                animation: frameAnim,
              }}
              aria-hidden={!isActive}
            >
              <Image
                src={s.src}
                alt={s.alt}
                fill
                priority
                sizes="100vw"
                className="object-cover"
                style={{ animation: imgAnim }}
              />
              {/* Light streak riding the incoming slide's leading edge */}
              {animate && isActive && (
                <div
                  key={`glow-${active}-${prev}`}
                  className={`pointer-events-none absolute inset-y-0 w-28 ${
                    dir === 1
                      ? "left-0 bg-gradient-to-r from-white/60 to-transparent"
                      : "right-0 bg-gradient-to-l from-white/60 to-transparent"
                  }`}
                  style={{ opacity: 0, animation: `heroEdgeGlow ${SLIDE_MS}ms ${EASE} both` }}
                />
              )}
              {/* Outgoing slide dims as it recedes — sells the depth push */}
              <div
                className="pointer-events-none absolute inset-0 bg-ink"
                style={{
                  opacity: 0,
                  animation: animate && isPrev ? `heroVeilOut ${SLIDE_MS}ms ${EASE} both` : "none",
                }}
              />
            </div>
          );
        })}
        {/* Pixel streak swarm — glowing squares race across the full frame
            with the seam on every transition, direction-aware */}
        {!reduce && prev !== -1 && (
          <div
            key={`streaks-${active}-${prev}`}
            className="pointer-events-none absolute inset-0 z-[4] overflow-hidden"
          >
            {STREAKS.map((q, k) => (
              <span
                key={k}
                className={`absolute block ${
                  q.c === "red" ? "bg-red" : q.c === "ink" ? "bg-ink" : "bg-white"
                }`}
                style={{
                  top: q.top,
                  ...(dir === 1 ? { left: "103%" } : { right: "103%" }),
                  width: q.s,
                  height: q.s,
                  opacity: 0,
                  boxShadow:
                    q.c === "white"
                      ? "0 0 0 1px rgb(14 17 22 / 0.4), 0 0 12px rgb(255 255 255 / 0.5)"
                      : "0 0 14px rgb(255 255 255 / 0.4)",
                  animation: `${dir === 1 ? "heroStreakFwd" : "heroStreakBwd"} ${q.dur}ms ${STREAK_EASE} ${q.delay}ms both`,
                }}
              />
            ))}
          </div>
        )}
        {/* Ambient motes — squares drifting slowly up the photo, behind the panel */}
        {!reduce && (
          <div className="pointer-events-none absolute inset-0 z-[2]">
            {MOTES.map((m, k) => (
              <span
                key={k}
                className={`absolute block ${m.red ? "bg-red" : "bg-white"}`}
                style={{
                  left: m.left,
                  top: m.top,
                  width: m.s,
                  height: m.s,
                  opacity: 0,
                  animation: `heroFloat ${m.dur}s linear ${m.delay}s infinite`,
                }}
              />
            ))}
          </div>
        )}
        {/* depth wash for edge legibility (kept subtle; the panel does the heavy lifting) */}
        <div className="absolute inset-0 z-[3] bg-gradient-to-r from-canvas/25 via-transparent to-transparent" />
      </div>

      {/* Company label over the image */}
      <span className="mono absolute right-4 top-20 z-10 rounded bg-ink/70 px-2.5 py-1 text-[0.6rem] uppercase tracking-wider text-white backdrop-blur sm:right-8">
        {tc("company")}
      </span>

      {/* Header content over a ~65% frosted rounded panel, staggered rise on load */}
      <div className="container-x w-full py-16">
        <div className="max-w-2xl rounded-3xl border border-white/55 bg-white/65 p-7 shadow-lift backdrop-blur-md sm:p-10">
          <p
            className="mono mb-4 inline-flex items-center gap-2 rounded-full border border-hair-strong bg-white/70 px-3 py-1.5 text-[0.66rem] uppercase tracking-[0.14em] text-ink-soft"
            style={rise(0)}
          >
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-red" />
            {t("heroEyebrow")}
          </p>
          <h1
            className="max-w-[16ch] text-4xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-6xl"
            style={rise(1)}
          >
            {t("heroTitle")}
          </h1>
          <p className="mt-6 max-w-md text-lg text-ink-soft" style={rise(2)}>
            {t("heroSub")}
          </p>
          <div className="mt-8 flex flex-wrap gap-3" style={rise(3)}>
            <Link href="/products" className="press rounded-md bg-red px-5 py-3 text-sm font-medium text-white hover:bg-red-soft">
              {t("heroCta")}
            </Link>
            <Link href="/services" className="press rounded-md border border-hair-strong bg-white/70 px-5 py-3 text-sm font-medium text-ink hover:border-blue hover:text-blue">
              {t("heroCta2")}
            </Link>
          </div>

          {/* stat ribbon — numbers count up on load */}
          <dl
            className="mono mt-9 grid max-w-lg grid-cols-3 divide-x divide-hair border-t border-hair pt-5 text-center"
            style={rise(4)}
          >
            {(
              [
                [230, " kV", t("heroStatVoltage")],
                [150, " MVA", t("heroStatCapacity")],
                [27, "", t("heroStatSkus")],
              ] as [number, string, string][]
            ).map(([v, suffix, l]) => (
              <div key={l} className="px-3">
                <dd className="text-xl font-semibold text-ink">
                  <CountUp to={v} suffix={suffix} reduce={reduce} />
                </dd>
                <dt className="mt-1 text-[0.62rem] uppercase tracking-wider text-ink-mute">{l}</dt>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Bottom-left cluster: ambient circuit grid (4×4 squares pulsing in a
          diagonal wave, one brand-red accent — re-ripples on every slide
          change) + per-slide caption swinging in with each photo. */}
      <div className="absolute bottom-7 left-8 z-10 hidden items-center gap-4 sm:flex" aria-hidden>
        <div key={`deco-${active}`} className="grid grid-cols-4 gap-1.5">
          {Array.from({ length: 16 }).map((_, k) => {
            const row = Math.floor(k / 4);
            const col = k % 4;
            return (
              <span
                key={k}
                className={`h-1.5 w-1.5 ${k === 6 ? "bg-red" : "bg-white"}`}
                style={{
                  opacity: 0.18,
                  animation: reduce
                    ? "none"
                    : `heroDecoPulse 2800ms ease-in-out ${(row + col) * 220}ms infinite`,
                }}
              />
            );
          })}
        </div>
        <div key={`cap-${active}`} className="flex items-center gap-2.5">
          <span
            className="block h-[1.1rem] w-[3px] bg-red"
            style={reduce ? undefined : { animation: `heroCapIn 550ms ${EASE} 120ms both` }}
          />
          <span
            className="mono text-[0.66rem] uppercase tracking-[0.16em] text-white/95 [text-shadow:0_1px_5px_rgb(0_0_0/0.5)]"
            style={reduce ? undefined : { animation: `heroCapIn 550ms ${EASE} 220ms both` }}
          >
            {t(`heroSlideCap${active + 1}`)}
          </span>
        </div>
      </div>

      {/* Slide counter + indicators (active dot fills like a timer until the next slide) */}
      <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 items-center gap-4 sm:left-auto sm:right-8 sm:translate-x-0">
        <span
          key={`count-${active}`}
          className="mono text-[0.66rem] tracking-[0.18em] text-white/90 [text-shadow:0_1px_4px_rgb(0_0_0/0.45)]"
          style={{ animation: reduce ? "none" : `heroCountIn 420ms ${EASE} both` }}
          aria-hidden
        >
          {String(active + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}
        </span>
        <div className="flex items-center gap-2">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              aria-label={`Show slide ${i + 1}`}
              onClick={() => go(i)}
              className={`relative h-1.5 overflow-hidden rounded-full shadow transition-all ${
                i === active ? "w-9 bg-white/30" : "w-2.5 bg-white opacity-60 hover:opacity-100"
              }`}
            >
              {i === active && (
                <span
                  key={`fill-${active}`}
                  className="absolute inset-0 origin-left rounded-full bg-white"
                  style={{ animation: reduce ? "none" : `heroDotFill ${HOLD_MS}ms linear both` }}
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
