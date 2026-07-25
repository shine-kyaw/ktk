"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { HeroBagPoster } from "./hero/HeroBagPoster";

const BagScene = dynamic(() => import("./hero/BagScene"), {
  ssr: false,
  loading: () => <div className="h-full w-full" />,
});

const FILM_DURATION = 9.2;

const SHOTS = [
  {
    from: 0,
    to: 1.7,
    index: "01",
    eyebrow: "The material",
    title: "It begins\nwith a thread.",
  },
  {
    from: 1.7,
    to: 4.2,
    index: "02",
    eyebrow: "The weave",
    title: "Precision,\nunder tension.",
  },
  {
    from: 4.2,
    to: 6.25,
    index: "03",
    eyebrow: "The form",
    title: "Shaped to carry\nreal weight.",
  },
  {
    from: 6.25,
    to: 7.75,
    index: "04",
    eyebrow: "The standard",
    title: "Sealed. Printed.\nProven.",
  },
] as const;

function FilmPoster({ finalFrame }: { finalFrame: boolean }) {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <HeroBagPoster
        className={`w-auto drop-shadow-[0_50px_80px_rgba(0,0,0,0.48)] transition-all duration-1000 ${
          finalFrame ? "h-[64%] translate-y-3 scale-100 opacity-100" : "h-[76%] -translate-y-1 scale-110 opacity-75"
        }`}
      />
    </div>
  );
}

export function AssembledBagHero() {
  const reduce = useReducedMotion();
  const startedAt = useRef<number | null>(null);
  const lastPaint = useRef(0);
  const [mounted, setMounted] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [run, setRun] = useState(0);

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (reduce) {
      setElapsed(FILM_DURATION);
      return;
    }

    startedAt.current = null;
    lastPaint.current = 0;
    let frame = 0;

    const tick = (now: number) => {
      if (startedAt.current === null) startedAt.current = now;
      const next = Math.min((now - startedAt.current) / 1000, FILM_DURATION);

      // 20fps is enough for copy/progress state; the WebGL scene renders itself.
      if (now - lastPaint.current > 50 || next === FILM_DURATION) {
        setElapsed(next);
        lastPaint.current = now;
      }
      if (next < FILM_DURATION) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [reduce, run]);

  const replay = useCallback(() => {
    setElapsed(0);
    setRun((value) => value + 1);
  }, []);

  const finishFilm = useCallback(() => {
    startedAt.current = performance.now() - FILM_DURATION * 1000;
    setElapsed(FILM_DURATION);
  }, []);

  const finalFrame = elapsed >= 7.75;
  const activeShot = useMemo(
    () => SHOTS.find((shot) => elapsed >= shot.from && elapsed < shot.to),
    [elapsed],
  );
  const progress = Math.min((elapsed / FILM_DURATION) * 100, 100);
  const use3D = mounted && isDesktop && !reduce;

  return (
    <section
      className={`ktk-cinema relative isolate h-[100svh] min-h-[640px] overflow-hidden bg-[#08090d] ${
        finalFrame ? "is-final" : "is-playing"
      }`}
      aria-label="KTK woven packaging film"
    >
      {/* Full-viewport film stage */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_44%,#272b3d_0%,#10121a_38%,#07080b_76%)]" />
        <div className="ktk-cinema-grid absolute inset-0 opacity-35" />
        <motion.div
          className="absolute inset-0"
          animate={{
            opacity: finalFrame ? 0.8 : 1,
            scale: finalFrame ? 1 : elapsed < 1.7 ? 1.12 : 1,
            filter: elapsed < 0.65 ? "blur(12px)" : "blur(0px)",
          }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        >
          {use3D ? <BagScene key={run} /> : <FilmPoster finalFrame={finalFrame} />}
        </motion.div>

        {/* Moving material threads — most visible in the opening shot */}
        <div
          className="ktk-thread-field absolute inset-0"
          style={{ opacity: Math.max(0, 1 - elapsed / 3.2) }}
          aria-hidden
        >
          {Array.from({ length: 12 }).map((_, i) => (
            <i key={`v-${i}`} className="ktk-thread ktk-thread-v" style={{ left: `${7 + i * 8}%`, animationDelay: `${i * -0.23}s` }} />
          ))}
          {Array.from({ length: 8 }).map((_, i) => (
            <i key={`h-${i}`} className="ktk-thread ktk-thread-h" style={{ top: `${18 + i * 10}%`, animationDelay: `${i * -0.31}s` }} />
          ))}
        </div>

        <div className="ktk-cinema-vignette absolute inset-0" />
        <div className="ktk-cinema-grain absolute inset-0" />
        <div className="ktk-cinema-scan absolute inset-0" />
        <div className="ktk-red-rake absolute inset-y-0 w-[24vw]" />
      </div>

      {/* Opening slate */}
      <AnimatePresence>
        {elapsed < 0.95 && !reduce && (
          <motion.div
            className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center bg-[#07080b]"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.75 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.03 }}
              transition={{ duration: 0.55 }}
              className="rounded-md bg-white px-5 py-3"
            >
              <Image
                src="/brand/ktk-logo.png"
                alt="Kaung Thu Kha Group Company Limited"
                width={1600}
                height={357}
                priority
                className="h-9 w-auto sm:h-11"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Shot copy — text behaves as film captions, not hero-page content */}
      <div className="pointer-events-none absolute inset-0 z-10">
        <AnimatePresence mode="wait">
          {activeShot && elapsed >= 0.9 && (
            <motion.div
              key={activeShot.index}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className={`absolute left-5 right-5 sm:left-10 sm:right-auto lg:left-[7vw] ${
                activeShot.index === "02" ? "bottom-[14vh]" : "bottom-[16vh] lg:bottom-[15vh]"
              }`}
            >
              <div className="mb-4 flex items-center gap-3">
                <span className="h-px w-9 bg-red" />
                <span className="mono text-[0.58rem] uppercase tracking-[0.3em] text-white/60">
                  {activeShot.index} / {activeShot.eyebrow}
                </span>
              </div>
              <h2 className="display whitespace-pre-line text-[clamp(2.7rem,6.2vw,6.6rem)] leading-[0.88] text-white">
                {activeShot.title}
              </h2>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* The film resolves into the actual landing-page hero */}
      <AnimatePresence>
        {finalFrame && (
          <motion.div
            className="absolute inset-0 z-20 flex items-end bg-[linear-gradient(90deg,rgba(5,6,9,.84)_0%,rgba(5,6,9,.58)_36%,rgba(5,6,9,.08)_68%,rgba(5,6,9,.22)_100%)] lg:items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.05 }}
          >
            <div className="container-x pb-24 pt-32 lg:pb-12">
              <motion.div
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-3xl"
              >
                <p className="mono text-[0.62rem] font-semibold uppercase tracking-[0.28em] text-red">
                  Woven packaging · Myanmar · Since 1991
                </p>
                <h1 className="display mt-5 text-[clamp(3.2rem,7.2vw,7.8rem)] leading-[0.86] text-white">
                  Strength,
                  <br />
                  <span className="text-red">woven in.</span>
                </h1>
                <p className="mt-6 max-w-lg text-base leading-relaxed text-white/68 sm:text-lg">
                  Industrial packaging built through disciplined material control, precision weaving,
                  and manufacturing you can depend on.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href="/products"
                    className="press mono bg-red px-6 py-3.5 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-white hover:text-[#08090d]"
                  >
                    Explore products
                  </Link>
                  <Link
                    href="/manufacturing"
                    className="press mono border border-white/30 bg-black/10 px-6 py-3.5 text-[0.68rem] uppercase tracking-[0.18em] text-white backdrop-blur-sm transition-colors hover:border-white"
                  >
                    Enter the factory
                  </Link>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Film controls and progress */}
      <div className="absolute bottom-0 left-0 right-0 z-30">
        <div className="h-px bg-white/12">
          <div className="h-full bg-red transition-[width] duration-75" style={{ width: `${progress}%` }} />
        </div>
        <div className="container-x flex h-14 items-center justify-between">
          <div className="flex items-center gap-3">
            <span className={`h-1.5 w-1.5 rounded-full bg-red ${finalFrame ? "" : "ktk-live-dot"}`} />
            <span className="mono text-[0.54rem] uppercase tracking-[0.25em] text-white/48">
              {finalFrame ? "Film complete" : "Manufacturing in motion"}
            </span>
          </div>
          <button
            type="button"
            onClick={finalFrame ? replay : finishFilm}
            className="mono px-3 py-2 text-[0.56rem] uppercase tracking-[0.24em] text-white/58 transition-colors hover:text-white"
          >
            {finalFrame ? "Replay film ↻" : "Skip film →"}
          </button>
        </div>
      </div>

      <style>{`
        .ktk-cinema-grid {
          background-image:
            linear-gradient(rgba(255,255,255,.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.035) 1px, transparent 1px);
          background-size: 8vw 8vw;
          transform: perspective(650px) rotateX(58deg) scale(1.7) translateY(14%);
          transform-origin: 50% 100%;
        }
        .ktk-cinema-vignette {
          pointer-events: none;
          background:
            radial-gradient(circle at 50% 44%, transparent 24%, rgba(0,0,0,.2) 62%, rgba(0,0,0,.82) 100%),
            linear-gradient(180deg, rgba(0,0,0,.46), transparent 24%, transparent 70%, rgba(0,0,0,.58));
        }
        .ktk-cinema-grain {
          pointer-events: none;
          opacity: .065;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.82' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.75'/%3E%3C/svg%3E");
          animation: ktkGrain .18s steps(2) infinite;
        }
        .ktk-cinema-scan {
          pointer-events: none;
          opacity: .2;
          mix-blend-mode: overlay;
          background: repeating-linear-gradient(180deg, transparent 0, transparent 3px, rgba(255,255,255,.035) 4px, transparent 5px);
        }
        .ktk-red-rake {
          left: -34vw;
          opacity: .65;
          transform: skewX(-13deg);
          background: linear-gradient(90deg, transparent, rgba(237,28,36,.04), rgba(237,28,36,.18), rgba(255,255,255,.06), transparent);
          animation: ktkRake 5.8s cubic-bezier(.4,0,.2,1) infinite;
          pointer-events: none;
        }
        .ktk-thread-field {
          pointer-events: none;
          overflow: hidden;
          transition: opacity .8s ease;
          mask-image: radial-gradient(circle at 50% 50%, #000 0%, transparent 74%);
        }
        .ktk-thread {
          position: absolute;
          display: block;
          background: linear-gradient(90deg, transparent, rgba(245,244,239,.22), rgba(245,244,239,.76), rgba(245,244,239,.18), transparent);
          box-shadow: 0 0 16px rgba(255,255,255,.1);
        }
        .ktk-thread-v {
          top: -25%;
          height: 150%;
          width: 2px;
          animation: ktkThreadV 2.4s ease-in-out infinite alternate;
        }
        .ktk-thread-h {
          left: -20%;
          width: 140%;
          height: 2px;
          animation: ktkThreadH 2.8s ease-in-out infinite alternate;
        }
        .ktk-live-dot {
          animation: ktkLive 1.7s ease-in-out infinite;
        }
        @keyframes ktkRake {
          0%, 8% { transform: translateX(0) skewX(-13deg); opacity: 0; }
          20% { opacity: .7; }
          58%, 100% { transform: translateX(180vw) skewX(-13deg); opacity: 0; }
        }
        @keyframes ktkThreadV {
          from { transform: translateX(-12px) rotate(.15deg); opacity: .22; }
          to { transform: translateX(12px) rotate(-.15deg); opacity: .7; }
        }
        @keyframes ktkThreadH {
          from { transform: translateY(-10px); opacity: .18; }
          to { transform: translateY(10px); opacity: .6; }
        }
        @keyframes ktkGrain {
          0% { transform: translate(0, 0); }
          25% { transform: translate(-1.5%, 1%); }
          50% { transform: translate(1%, -1.5%); }
          75% { transform: translate(1.5%, 1%); }
          100% { transform: translate(-1%, -1%); }
        }
        @keyframes ktkLive {
          0%, 100% { box-shadow: 0 0 0 0 rgba(237,28,36,.5); }
          50% { box-shadow: 0 0 0 7px rgba(237,28,36,0); }
        }
        @media (max-width: 639px) {
          .ktk-cinema.is-final > div:first-child > div:nth-child(3) {
            transform: scale(.92) translateY(-8%);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .ktk-cinema-grain, .ktk-red-rake, .ktk-thread, .ktk-live-dot { animation: none; }
        }
      `}</style>
    </section>
  );
}
