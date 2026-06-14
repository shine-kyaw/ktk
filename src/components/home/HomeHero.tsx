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
 * Landing hero. `heroImage` is null today (animated woven-lattice field);
 * set it when the client's photos arrive and a cinematic reveal plays.
 * `stats` come from the CMS layer via the server page.
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
          initial: { opacity: 0, y: 34 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.9, delay: 0.12 + i * 0.11, ease: [0.16, 1, 0.3, 1] as const },
        };

  return (
    <section className="relative flex min-h-screen flex-col justify-end overflow-hidden bg-coal">
      <HeroMedia src={heroImage} />

      <div className="container-x relative pb-24 pt-44">
        <motion.div {...rise(0)} className="flex items-center gap-3">
          <span className="h-px w-10 bg-red" />
          <p className="mono text-[0.7rem] uppercase tracking-[0.24em] text-bone-dim">
            Industrial Packaging · Myanmar · Since 1991
          </p>
        </motion.div>

        {/* The company name, front and centre */}
        <motion.h1 {...rise(1)} className="display mt-7 text-[clamp(2.9rem,9vw,7.5rem)] text-bone">
          Kaung Thu Kha
        </motion.h1>

        {/* The pull: scale stated plainly, in big type */}
        <motion.p
          {...rise(2)}
          className="mt-5 max-w-3xl text-[clamp(1.35rem,3vw,2.4rem)] font-semibold leading-tight text-bone"
        >
          The packaging behind <span className="text-red">half of Myanmar&apos;s</span> industry.
        </motion.p>

        <motion.p {...rise(3)} className="mt-6 max-w-xl text-base leading-relaxed text-ash">
          27 million woven bags a month, produced on European STARLINGER lines, with the thread,
          filler, machinery, and on-site service around every one of them.
        </motion.p>

        <motion.div {...rise(4)} className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/products"
            className="press mono bg-red px-7 py-4 text-[0.74rem] font-semibold uppercase tracking-[0.16em] text-bone transition-colors hover:bg-bone hover:text-coal"
          >
            Explore products
          </Link>
          <Link
            href="/contact"
            className="press mono border border-bone/25 px-7 py-4 text-[0.74rem] uppercase tracking-[0.16em] text-bone transition-colors hover:border-red hover:text-red"
          >
            Become a dealer
          </Link>
        </motion.div>

        {/* Scale ribbon */}
        <motion.dl
          {...rise(5)}
          className="mt-14 grid max-w-3xl grid-cols-2 gap-x-8 gap-y-8 border-t border-seam pt-10 sm:grid-cols-4"
        >
          {stats.map((s) => (
            <HeroStat key={s.label} {...s} />
          ))}
        </motion.dl>
      </div>

      {/* Fact ticker */}
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
