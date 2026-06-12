"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

const TICKER = [
  "Est. 2008 — Yangon",
  "STARLINGER European technology",
  "Cement sacks since 2012",
  "Plain & printed PP woven bags",
  "NEWLONG · YAO HAN machinery",
  "100% quality assurance",
];

export function HomeHero() {
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
    <section className="grain relative flex min-h-screen flex-col justify-end overflow-hidden bg-coal">
      {/* Cinematic atmosphere — woven-fabric texture (the product itself),
          amber furnace glow, engineering grid. Slow settle on load; swaps
          for the client's cinematic photo set when it arrives. */}
      <motion.div
        className="weave absolute inset-0"
        initial={reduce ? false : { scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 7, ease: [0.16, 1, 0.3, 1] }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 85% 110%, rgb(242 169 0 / 0.14) 0%, transparent 55%), radial-gradient(90% 70% at 0% 0%, rgb(237 233 224 / 0.05) 0%, transparent 50%)",
        }}
      />
      <div className="blueprint absolute inset-0" />

      {/* Oversized watermark — scale, literally */}
      <span
        aria-hidden
        className="display pointer-events-none absolute -right-6 top-24 select-none text-[26vw] leading-none text-bone/[0.045]"
      >
        KTK
      </span>

      <div className="container-x relative pb-28 pt-44">
        <motion.p {...rise(0)} className="eyebrow">
          Kaung Thu Kha · Industrial Packaging · Myanmar
        </motion.p>
        <motion.h1
          {...rise(1)}
          className="display mt-6 max-w-5xl text-[clamp(3rem,9vw,7.5rem)] text-bone"
        >
          Industrial
          <br />
          packaging <span className="text-amber">at scale.</span>
        </motion.h1>
        <motion.p {...rise(2)} className="mt-8 max-w-xl text-lg leading-relaxed text-bone-dim">
          Cement sacks and PP woven bags, produced in Yangon on European STARLINGER lines —
          supplying Myanmar&apos;s construction and commodity industries since 2008.
        </motion.p>
        <motion.div {...rise(3)} className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/products"
            className="press mono bg-amber px-7 py-4 text-[0.74rem] font-semibold uppercase tracking-[0.16em] text-coal transition-colors hover:bg-bone"
          >
            Explore products
          </Link>
          <Link
            href="/contact"
            className="press mono border border-seam px-7 py-4 text-[0.74rem] uppercase tracking-[0.16em] text-bone transition-colors hover:border-amber hover:text-amber"
          >
            Become a dealer
          </Link>
        </motion.div>
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
                <span className="h-1 w-1 bg-amber" />
              </span>
            ))}
          </div>
        </div>
        <style>{`
          .ticker-track { animation: tickerScroll 36s linear infinite; }
          @keyframes tickerScroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
          @media (prefers-reduced-motion: reduce) { .ticker-track { animation: none; } }
        `}</style>
      </div>
    </section>
  );
}
