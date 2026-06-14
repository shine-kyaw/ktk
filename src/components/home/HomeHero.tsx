"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { HeroMedia } from "./HeroMedia";
import { HeroStat } from "./HeroStat";

type StatItem = { value: number; suffix?: string; label: string; isYear?: boolean };

const TICKER = [
  "~55% of Myanmar's woven-bag market",
  "27 million bags every month",
  "Manufacturing since 1991",
  "European STARLINGER lines",
  "Food-grade SABIC resin",
  "Sole HCH & YAO HAN distributor",
  "One-stop packaging partner",
];

/**
 * Landing hero. `heroImage` is null today (designed placeholder atmosphere);
 * when the client's photos arrive, set it and a cinematic reveal plays —
 * see HeroMedia. `stats` come from the CMS layer via the server page.
 */
export function HomeHero({
  stats,
  heroImage = null,
}: {
  stats: StatItem[];
  heroImage?: string | null;
}) {
  const reduce = useReducedMotion();

  const rise = (i: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 36 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.9, delay: 0.15 + i * 0.12, ease: [0.16, 1, 0.3, 1] as const },
        };

  return (
    <section className="relative flex min-h-screen flex-col justify-end overflow-hidden bg-coal">
      <HeroMedia src={heroImage} />

      {/* Oversized watermark — scale, literally */}
      <span
        aria-hidden
        className="display pointer-events-none absolute -right-6 top-24 select-none text-[26vw] leading-none text-bone/[0.045]"
      >
        KTK
      </span>

      <div className="container-x relative pb-24 pt-44">
        <motion.p {...rise(0)} className="eyebrow">
          Kaung Thu Kha · Industrial Packaging · Since 1991
        </motion.p>
        <motion.h1
          {...rise(1)}
          className="display mt-6 max-w-5xl text-[clamp(2.8rem,8.5vw,7rem)] text-bone"
        >
          Myanmar&apos;s packaging
          <br />
          runs on <span className="text-red">KTK.</span>
        </motion.h1>
        <motion.p {...rise(2)} className="mt-8 max-w-2xl text-lg leading-relaxed text-bone-dim">
          More than half the country&apos;s woven bags — 27 million a month — produced on
          European STARLINGER lines, and supplied with everything around the bag: thread,
          filler, closing machinery, and on-site service.
        </motion.p>
        <motion.div {...rise(3)} className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/products"
            className="press mono bg-red px-7 py-4 text-[0.74rem] font-semibold uppercase tracking-[0.16em] text-bone transition-colors hover:bg-bone hover:text-coal"
          >
            Explore products
          </Link>
          <Link
            href="/contact"
            className="press mono border border-seam px-7 py-4 text-[0.74rem] uppercase tracking-[0.16em] text-bone transition-colors hover:border-red hover:text-red"
          >
            Become a dealer
          </Link>
        </motion.div>

        {/* Scale ribbon — the four numbers that are the brand */}
        <motion.dl
          {...rise(4)}
          className="mt-14 grid max-w-3xl grid-cols-2 gap-x-8 gap-y-8 border-t border-seam pt-10 sm:grid-cols-4"
        >
          {stats.map((s) => (
            <HeroStat key={s.label} {...s} />
          ))}
        </motion.dl>
      </div>

      {/* Fact ticker — one slow loop, industrial signage voice */}
      <div className="relative border-t border-seam bg-coal/80 backdrop-blur-sm">
        <div className="flex overflow-hidden py-4">
          <div className="ticker-track flex shrink-0 items-center gap-12 pr-12">
            {[...TICKER, ...TICKER].map((item, i) => (
              <span
                key={i}
                className="mono flex items-center gap-12 whitespace-nowrap text-[0.66rem] uppercase tracking-[0.2em] text-ash"
              >
                {item}
                <span className="h-1 w-1 bg-red" />
              </span>
            ))}
          </div>
        </div>
        <style>{`
          .ticker-track { animation: tickerScroll 38s linear infinite; }
          @keyframes tickerScroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
          @media (prefers-reduced-motion: reduce) { .ticker-track { animation: none; } }
        `}</style>
      </div>
    </section>
  );
}
