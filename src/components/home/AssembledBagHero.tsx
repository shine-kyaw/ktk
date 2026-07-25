"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { HeroBagPoster } from "./hero/HeroBagPoster";

// The 3D scene is client-only and lazy-loaded. The poster is the static
// fallback for mobile/reduced-motion only — during the chunk-load window we
// show quiet empty space (not the poster) so no "card" flashes before the
// scene fades in.
const BagScene = dynamic(() => import("./hero/BagScene"), {
  ssr: false,
  loading: () => <QuietStage />,
});

const TRUST = [
  "Product Quality",
  "Reliable Supply",
  "Industrial Manufacturing",
  "Trusted Partner",
];

function PosterStage() {
  return (
    <div className="ktk-hero-float flex h-full w-full items-center justify-center">
      <HeroBagPoster className="h-[80%] max-h-[560px] w-auto drop-shadow-[0_40px_60px_rgba(11,13,18,0.18)]" />
    </div>
  );
}

// Quiet placeholder for the brief 3D chunk-load window — no rectangle, no
// poster, just space the scene fades into.
function QuietStage() {
  return <div className="h-full w-full" />;
}

export function AssembledBagHero() {
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Live 3D only where it earns its weight: desktop, motion allowed.
  const use3D = mounted && isDesktop && !reduce;

  const rise = (i: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 22 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.75, delay: 0.15 + i * 0.1, ease: [0.16, 1, 0.3, 1] as const },
        };

  return (
    <section className="ktk-film relative isolate flex min-h-screen flex-col overflow-hidden">
      {/* light cinematic background — clean, soft, premium */}
      <div className="absolute inset-0 -z-10 bg-coal" />
      <div className="blueprint absolute inset-0 -z-10 opacity-40" />
      <div className="ktk-film-vignette pointer-events-none absolute inset-0 -z-10" />
      <div className="ktk-film-grain pointer-events-none absolute inset-0 -z-10" />
      <div className="ktk-film-sweep pointer-events-none absolute inset-y-0 -z-10 w-[28vw]" />
      <div
        className="absolute inset-0 -z-10"
        style={{ background: "radial-gradient(56% 56% at 70% 42%, rgba(255,255,255,0.92) 0%, transparent 64%)" }}
      />
      <div
        className="absolute inset-0 -z-10"
        style={{ background: "radial-gradient(130% 95% at 84% 16%, rgba(59,65,237,0.08) 0%, transparent 56%)" }}
      />
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ boxShadow: "inset 0 0 260px 56px rgba(11,13,18,0.08)" }}
      />

      <div className="pointer-events-none absolute left-6 top-28 z-10 hidden lg:block">
        <p className="ktk-film-label mono text-[0.55rem] uppercase tracking-[0.28em] text-ash/70">
          KTK / MATERIAL STUDY 01
        </p>
        <div className="mt-3 h-20 w-px bg-gradient-to-b from-red via-red/40 to-transparent" />
      </div>

      <div className="container-x relative grid flex-1 items-center gap-8 pb-20 pt-28 lg:grid-cols-2 lg:gap-10">
        {/* copy */}
        <div className="relative z-10">
          <motion.div {...rise(0)}>
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-red" />
              <p className="mono text-[0.78rem] font-semibold uppercase tracking-[0.22em] text-bone">
                Kaung Thu Kha Trading Co., Ltd
              </p>
            </div>
            <p className="mono mt-3 text-[0.64rem] uppercase tracking-[0.2em] text-ash">
              Woven packaging · Myanmar · Since 1991
            </p>
          </motion.div>

          <motion.h1
            {...rise(1)}
            className="display mt-6 text-[clamp(2.5rem,5.6vw,4.8rem)] leading-[1.04] text-bone"
          >
            From woven fibre
            <br />
            to <span className="text-red">reliable strength.</span>
          </motion.h1>

          <motion.p {...rise(2)} className="mt-6 max-w-xl text-lg leading-relaxed text-bone-dim">
            A closer look at the material, machinery, and discipline behind every KTK cement bag.
          </motion.p>

          <motion.div {...rise(3)} className="mt-9 flex flex-wrap gap-4">
            <Link
              href="/products"
              className="press mono bg-red px-7 py-4 text-[0.74rem] font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-ink"
            >
              Explore products
            </Link>
            <Link
              href="/contact"
              className="press mono border border-bone/25 px-7 py-4 text-[0.74rem] uppercase tracking-[0.16em] text-bone transition-colors hover:border-red hover:text-red"
            >
              Contact sales
            </Link>
          </motion.div>

          <motion.ul {...rise(4)} className="mt-12 flex flex-wrap gap-x-8 gap-y-3">
            {TRUST.map((t) => (
              <li
                key={t}
                className="mono flex items-center gap-2 text-[0.66rem] uppercase tracking-[0.14em] text-ash"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-red" />
                {t}
              </li>
            ))}
          </motion.ul>
        </div>

        {/* bag stage */}
        <div className="relative h-[42vh] w-full sm:h-[50vh] lg:h-[78vh]">
          {!mounted ? <QuietStage /> : use3D ? <BagScene /> : <PosterStage />}
          {use3D && (
            <span className="mono pointer-events-none absolute bottom-1 left-1/2 -translate-x-1/2 text-[0.56rem] uppercase tracking-[0.22em] text-ash/70">
              ↻ Drag to rotate
            </span>
          )}
          <div className="pointer-events-none absolute bottom-3 right-0 hidden items-center gap-3 lg:flex">
            <span className="mono text-[0.55rem] uppercase tracking-[0.2em] text-ash/60">Material / 01</span>
            <span className="h-px w-16 bg-red/70" />
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 border-t border-seam/70">
        <div className="container-x flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <span className="ktk-film-dot h-1.5 w-1.5 rounded-full bg-red" />
            <span className="mono text-[0.55rem] uppercase tracking-[0.25em] text-ash">Manufacturing in motion</span>
          </div>
          <span className="mono text-[0.55rem] uppercase tracking-[0.25em] text-ash/60">01 — 04</span>
        </div>
      </div>

      <style>{`
        .ktk-film::after {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 2;
          opacity: .18;
          background: repeating-linear-gradient(180deg, transparent 0, transparent 3px, rgba(255,255,255,.035) 4px, transparent 5px);
          mix-blend-mode: overlay;
        }
        .ktk-film-vignette { background: radial-gradient(ellipse at center, transparent 38%, rgba(7,8,11,.28) 100%); }
        .ktk-film-grain { opacity: .055; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.7'/%3E%3C/svg%3E"); }
        .ktk-film-sweep { left: -30vw; transform: skewX(-14deg); background: linear-gradient(90deg, transparent, rgba(237,28,36,.08), rgba(255,255,255,.13), transparent); animation: ktkFilmSweep 9s cubic-bezier(.4,0,.2,1) infinite; }
        .ktk-film-label { animation: ktkFilmLabel 7s ease-in-out infinite; }
        .ktk-film-dot { animation: ktkFilmDot 2.2s ease-in-out infinite; box-shadow: 0 0 0 0 rgba(237,28,36,.6); }
        @keyframes ktkFilmSweep { 0%, 18% { transform: translateX(0) skewX(-14deg); opacity: 0; } 30% { opacity: 1; } 58%, 100% { transform: translateX(180vw) skewX(-14deg); opacity: 0; } }
        @keyframes ktkFilmLabel { 0%, 100% { opacity: .45; } 50% { opacity: 1; } }
        @keyframes ktkFilmDot { 0%, 100% { box-shadow: 0 0 0 0 rgba(237,28,36,.5); } 50% { box-shadow: 0 0 0 7px rgba(237,28,36,0); } }
        .ktk-hero-float { animation: ktkHeroFloat 6s ease-in-out infinite; }
        @keyframes ktkHeroFloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
        @media (prefers-reduced-motion: reduce) {
          .ktk-hero-float { animation: none; }
          .ktk-film-sweep, .ktk-film-label, .ktk-film-dot { animation: none; }
        }
      `}</style>
    </section>
  );
}
