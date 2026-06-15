"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/Reveal";

type Step = { no: string; stage: string; title: string; body: string };

/**
 * Dark cinematic manufacturing-process timeline. Eight stages reveal on scroll
 * with a single restrained flourish: a red "production line" spine that fills
 * top-to-bottom as you scroll the steps. No scroll-hijack/pin (the anatomy
 * section owns the one pinned moment). Mobile = stacked cards; reduced-motion =
 * static full spine. Content from getProcessSteps() (CMS seam).
 */
export function ProcessTimeline({ steps }: { steps: Step[] }) {
  const reduce = useReducedMotion();
  const railRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ["start 75%", "end 60%"],
  });
  const spineRaw = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  return (
    <section className="relative overflow-hidden border-y border-white/12 bg-ink">
      <div className="blueprint-light absolute inset-0 opacity-50" />
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(80% 70% at 15% 0%, rgb(59 65 237 / 0.18) 0%, transparent 55%)" }}
      />
      <div className="container-x relative py-28 lg:py-36">
        <div className="grid gap-14 lg:grid-cols-12">
          {/* sticky header */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-red" />
                <p className="mono text-[0.7rem] uppercase tracking-[0.24em] text-white/70">The process</p>
              </div>
              <h2 className="display mt-5 text-4xl text-white sm:text-5xl">
                From resin to <span className="text-red">ready to ship.</span>
              </h2>
              <p className="mt-6 max-w-xs leading-relaxed text-white/60">
                Eight controlled stages on European STARLINGER lines. Every bag follows the same
                path, every time.
              </p>
              <Link
                href="/manufacturing"
                className="press mono mt-9 inline-block border border-white/25 px-7 py-4 text-[0.72rem] uppercase tracking-[0.16em] text-white transition-colors hover:border-red hover:text-red"
              >
                Inside the plant
              </Link>
            </div>
          </div>

          {/* step rail */}
          <ol ref={railRef} className="relative lg:col-span-8">
            <span className="absolute bottom-2 left-[7px] top-2 w-px bg-white/12" aria-hidden />
            <motion.span
              style={{ scaleY: reduce ? 1 : spineRaw }}
              className="absolute bottom-2 left-[7px] top-2 w-px origin-top bg-red"
              aria-hidden
            />
            {steps.map((s, i) => (
              <Reveal key={s.no} delay={(i % 2) * 0.05}>
                <li className="relative grid grid-cols-[auto,1fr] gap-6 pb-12">
                  <span className="relative z-10 mt-1.5 block h-3.5 w-3.5 rounded-full border border-red bg-ink" />
                  <div className="-mt-1">
                    <div className="flex items-baseline gap-3">
                      <span className="mono text-[0.66rem] text-red">{s.no}</span>
                      <span className="mono text-[0.66rem] uppercase tracking-[0.2em] text-white/55">
                        {s.stage}
                      </span>
                    </div>
                    <h3 className="display mt-2 text-2xl text-white">{s.title}</h3>
                    <p className="mt-3 max-w-md leading-relaxed text-white/65">{s.body}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>

        <p className="mono mt-4 max-w-xl text-[0.62rem] leading-relaxed text-white/45">
          Process stages are representative pending confirmation of KTK's verified line sequence.
        </p>
      </div>
    </section>
  );
}
