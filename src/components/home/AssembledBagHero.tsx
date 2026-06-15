"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { HeroBagPoster } from "./hero/HeroBagPoster";

// The 3D scene is client-only and lazy-loaded; the static poster covers SSR,
// the loading window, mobile, and reduced-motion.
const BagScene = dynamic(() => import("./hero/BagScene"), {
  ssr: false,
  loading: () => <PosterStage />,
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
    <section className="relative isolate flex min-h-screen flex-col overflow-hidden">
      {/* light cinematic background — clean, soft, premium */}
      <div className="absolute inset-0 -z-10 bg-coal" />
      <div className="blueprint absolute inset-0 -z-10 opacity-40" />
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

      <div className="container-x grid flex-1 items-center gap-8 pb-20 pt-28 lg:grid-cols-2 lg:gap-10">
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
              Industrial Packaging · Myanmar · Since 1991
            </p>
          </motion.div>

          <motion.h1
            {...rise(1)}
            className="display mt-6 text-[clamp(2.5rem,5.6vw,4.8rem)] leading-[1.04] text-bone"
          >
            Built Layer by Layer
            <br />
            for <span className="text-red">Reliable Strength.</span>
          </motion.h1>

          <motion.p {...rise(2)} className="mt-6 max-w-xl text-lg leading-relaxed text-bone-dim">
            KTK manufactures cement packaging designed for consistent quality, dependable handling,
            and trusted supply across Myanmar&rsquo;s construction industry.
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
          {use3D ? <BagScene /> : <PosterStage />}
          {use3D && (
            <span className="mono pointer-events-none absolute bottom-1 left-1/2 -translate-x-1/2 text-[0.56rem] uppercase tracking-[0.22em] text-ash/70">
              ↻ Drag to rotate
            </span>
          )}
        </div>
      </div>

      {/* scroll cue */}
      <div className="pointer-events-none absolute inset-x-0 bottom-6 z-10 flex justify-center">
        <div className="flex flex-col items-center gap-2">
          <span className="mono text-[0.56rem] uppercase tracking-[0.24em] text-ash">Scroll</span>
          <span className="ktk-scroll relative block h-9 w-px overflow-hidden bg-seam">
            <span className="ktk-scroll-dot absolute left-0 top-0 h-3 w-px bg-red" />
          </span>
        </div>
      </div>

      <style>{`
        .ktk-hero-float { animation: ktkHeroFloat 6s ease-in-out infinite; }
        @keyframes ktkHeroFloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
        .ktk-scroll-dot { animation: ktkScrollDot 2.1s ease-in-out infinite; }
        @keyframes ktkScrollDot { 0% { transform: translateY(-12px); } 100% { transform: translateY(36px); } }
        @media (prefers-reduced-motion: reduce) {
          .ktk-hero-float, .ktk-scroll-dot { animation: none; }
        }
      `}</style>
    </section>
  );
}
