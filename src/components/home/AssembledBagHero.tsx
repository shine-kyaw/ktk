"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { HeroBagPoster } from "./hero/HeroBagPoster";

const BagScene = dynamic(() => import("./hero/BagScene"), {
  ssr: false,
  loading: () => <div className="h-full w-full" />,
});

const DESKTOP_DURATION = 7.2;
const MOBILE_DURATION = 5;
const FINAL_REVEAL_AT = 0.76;

type NetworkInformation = {
  saveData?: boolean;
  effectiveType?: string;
  addEventListener?: (type: "change", listener: () => void) => void;
  removeEventListener?: (type: "change", listener: () => void) => void;
};

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function MobileFilmStage({ progress }: { progress: number }) {
  const weaveIn = clamp(progress / 0.3);
  const sheet = clamp((progress - 0.28) / 0.24);
  const form = clamp((progress - 0.46) / 0.24);
  const brand = clamp((progress - 0.7) / 0.18);

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      <div
        className="ktk-mobile-weave absolute left-1/2 top-[42%] aspect-[1.15/1] w-[150vw] max-w-[840px] -translate-x-1/2 -translate-y-1/2"
        style={{
          opacity: 1 - form,
          transform: `translate(-50%, -50%) perspective(700px) rotateX(${58 - sheet * 38}deg) scale(${1.3 - sheet * 0.32})`,
        }}
      >
        <div className="absolute inset-0" style={{ opacity: weaveIn }} />
      </div>

      <div
        className="absolute inset-0 flex items-start justify-center pt-[11vh]"
        style={{
          opacity: form,
          transform: `translateY(${(1 - form) * 7}vh) scale(${0.9 + form * 0.1})`,
          filter: `blur(${(1 - form) * 8}px)`,
        }}
      >
        <div style={{ opacity: 0.72 + brand * 0.28 }}>
          <HeroBagPoster className="h-[58vh] max-h-[590px] w-auto drop-shadow-[0_34px_48px_rgba(0,0,0,0.52)]" />
        </div>
      </div>

      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(255,255,255,.14),transparent_30%),linear-gradient(180deg,transparent_50%,rgba(4,5,8,.88)_88%)]"
        style={{ opacity: 0.42 + brand * 0.58 }}
      />
    </div>
  );
}

export function AssembledBagHero() {
  const reduce = useReducedMotion();
  const startedAt = useRef<number | null>(null);
  const elapsedBeforePause = useRef(0);
  const lastPaint = useRef(0);
  const filmProgress = useRef(0);
  const [mounted, setMounted] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [lowPower, setLowPower] = useState(false);
  const [sceneReady, setSceneReady] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [run, setRun] = useState(0);

  useEffect(() => {
    setMounted(true);
    const viewport = window.matchMedia("(min-width: 900px)");
    const updateViewport = () => setIsDesktop(viewport.matches);
    updateViewport();
    viewport.addEventListener("change", updateViewport);

    const device = navigator as Navigator & {
      connection?: NetworkInformation;
      deviceMemory?: number;
    };
    const connection = device.connection;
    const probe = document.createElement("canvas");
    let webglAvailable = false;
    try {
      webglAvailable = Boolean(
        probe.getContext("webgl2", { failIfMajorPerformanceCaveat: true }) ||
          probe.getContext("webgl", { failIfMajorPerformanceCaveat: true }),
      );
    } catch {
      webglAvailable = false;
    }
    const updateCapability = () => {
      setLowPower(
        Boolean(
          !webglAvailable ||
          (device.deviceMemory !== undefined && device.deviceMemory < 4) ||
          navigator.hardwareConcurrency < 4 ||
          connection?.saveData ||
            connection?.effectiveType === "slow-2g" ||
            connection?.effectiveType === "2g",
        ),
      );
    };
    updateCapability();
    connection?.addEventListener?.("change", updateCapability);

    return () => {
      viewport.removeEventListener("change", updateViewport);
      connection?.removeEventListener?.("change", updateCapability);
    };
  }, []);

  const duration = isDesktop ? DESKTOP_DURATION : MOBILE_DURATION;
  const bypassFilm = Boolean(reduce) || lowPower;

  useEffect(() => {
    if (!mounted) return;
    if (bypassFilm) {
      filmProgress.current = 1;
      setElapsed(duration);
      return;
    }
    if (isDesktop && !sceneReady) return;

    startedAt.current = null;
    elapsedBeforePause.current = filmProgress.current * duration;
    lastPaint.current = 0;
    let frame = 0;

    const tick = (now: number) => {
      if (startedAt.current === null) startedAt.current = now;
      const next = Math.min(elapsedBeforePause.current + (now - startedAt.current) / 1000, duration);
      filmProgress.current = next / duration;

      // The scene itself interpolates every WebGL frame. Thirty state updates
      // per second keep the shared React clock smooth without over-rendering.
      if (now - lastPaint.current >= 33 || next === duration) {
        setElapsed(next);
        lastPaint.current = now;
      }
      if (next < duration) frame = requestAnimationFrame(tick);
    };

    const onVisibility = () => {
      if (document.hidden) {
        if (startedAt.current !== null) {
          elapsedBeforePause.current = Math.min(
            elapsedBeforePause.current + (performance.now() - startedAt.current) / 1000,
            duration,
          );
        }
        startedAt.current = null;
        cancelAnimationFrame(frame);
      } else if (elapsedBeforePause.current < duration) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [bypassFilm, duration, isDesktop, mounted, run, sceneReady]);

  const progress = bypassFilm ? 1 : clamp(elapsed / duration);
  const finalFrame = progress >= FINAL_REVEAL_AT;
  const complete = progress >= 0.995;

  const replay = useCallback(() => {
    filmProgress.current = 0;
    setElapsed(0);
    setRun((value) => value + 1);
  }, []);

  const finishFilm = useCallback(() => {
    elapsedBeforePause.current = duration;
    startedAt.current = performance.now();
    filmProgress.current = 1;
    setElapsed(duration);
  }, [duration]);

  return (
    <section
      className="ktk-cinema relative isolate h-[100svh] overflow-hidden bg-[#07080b] text-white lg:min-h-[640px]"
      style={{ zIndex: finalFrame ? 40 : 60 }}
      aria-label="From polypropylene strand to finished KTK industrial bag"
    >
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_53%_42%,#24232a_0%,#101116_42%,#07080b_78%)]" />

        {mounted && isDesktop && !bypassFilm ? (
          <BagScene
            progress={progress}
            progressRef={filmProgress}
            interactive={complete}
            onReady={() => setSceneReady(true)}
            onFailure={() => setLowPower(true)}
          />
        ) : (
          <MobileFilmStage progress={progress} />
        )}

        <div className="ktk-film-vignette pointer-events-none absolute inset-0" />
        <div className="ktk-film-grain pointer-events-none absolute inset-0" />
      </div>

      <AnimatePresence mode="wait">
        {progress >= 0.08 && progress < 0.31 && !bypassFilm && (
          <motion.p
            key="thread-caption"
            aria-hidden
            className="pointer-events-none absolute bottom-[12vh] left-1/2 z-10 w-[min(88vw,680px)] -translate-x-1/2 text-center text-[clamp(1rem,1.7vw,1.35rem)] font-medium tracking-[-0.01em] text-white/78"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            Every load begins with a thread.
          </motion.p>
        )}

        {progress >= 0.63 && progress < 0.79 && !bypassFilm && (
          <motion.p
            key="strength-caption"
            aria-hidden
            className="pointer-events-none absolute bottom-[12vh] left-1/2 z-10 w-[min(88vw,680px)] -translate-x-1/2 text-center text-[clamp(1rem,1.7vw,1.35rem)] font-medium tracking-[-0.01em] text-white/78"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            Engineered under tension.
          </motion.p>
        )}
      </AnimatePresence>

      <motion.div
        className="ktk-final-overlay pointer-events-none absolute inset-0 z-20 flex items-end lg:items-center"
        initial={false}
        animate={{ opacity: finalFrame ? 1 : 0 }}
        transition={{ duration: 1.05, ease: [0.16, 1, 0.3, 1] }}
        aria-hidden={!finalFrame}
      >
        <div className="container-x pb-[max(5.75rem,env(safe-area-inset-bottom))] pt-28 lg:pb-10">
          <div className="pointer-events-auto max-w-[43rem]">
                <motion.p
                  className="mono text-[0.6rem] font-semibold uppercase tracking-[0.27em] text-red"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.65, delay: 0.16 }}
                >
                  Woven packaging · Myanmar · Since 1991
                </motion.p>
                <motion.h1
                  className="display mt-5 text-[clamp(3rem,7.2vw,7.5rem)] leading-[0.86]"
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
                >
                  Strength,
                  <br />
                  <span className="text-red">woven in.</span>
                </motion.h1>
                <motion.p
                  className="mt-5 max-w-md text-sm leading-relaxed text-white/66 sm:text-base"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.38 }}
                >
                  Industrial packaging shaped by precision weaving, controlled construction, and
                  manufacturing discipline.
                </motion.p>
                <motion.div
                  className="mt-7 flex flex-wrap gap-3"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.5 }}
                >
                  <Link
                    href="/products"
                    tabIndex={finalFrame ? 0 : -1}
                    className="press mono bg-red px-6 py-3.5 text-[0.66rem] font-semibold uppercase tracking-[0.17em] text-white transition-colors hover:bg-white hover:text-[#08090d]"
                  >
                    Explore products
                  </Link>
                  <Link
                    href="/manufacturing"
                    tabIndex={finalFrame ? 0 : -1}
                    className="press mono border border-white/28 bg-black/10 px-6 py-3.5 text-[0.66rem] uppercase tracking-[0.17em] text-white backdrop-blur-sm transition-colors hover:border-white"
                  >
                    Enter the factory
                  </Link>
                </motion.div>
          </div>
        </div>
      </motion.div>

      {!bypassFilm && (
        <button
          type="button"
          onClick={complete ? replay : finishFilm}
          className="mono absolute bottom-[max(.65rem,env(safe-area-inset-bottom))] right-3 z-30 min-h-11 min-w-11 px-3 py-2 text-[0.66rem] uppercase tracking-[0.2em] text-white/52 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red sm:right-7"
        >
          {complete ? "Replay film ↻" : "Skip →"}
        </button>
      )}

      {complete && (
        <motion.div
          className="pointer-events-none absolute bottom-[max(1.45rem,env(safe-area-inset-bottom))] left-5 z-30 flex items-center gap-3 sm:left-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <span className="h-8 w-px bg-gradient-to-b from-white/60 to-transparent" />
          <span className="mono text-[0.54rem] uppercase tracking-[0.22em] text-white/42">
            Scroll to explore
          </span>
        </motion.div>
      )}

      <style>{`
        .ktk-film-vignette {
          background:
            radial-gradient(circle at 52% 43%, transparent 32%, rgba(0,0,0,.18) 66%, rgba(0,0,0,.76) 100%),
            linear-gradient(180deg, rgba(0,0,0,.4), transparent 24%, transparent 74%, rgba(0,0,0,.5));
        }
        .ktk-film-grain {
          opacity: .025;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.72' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.55'/%3E%3C/svg%3E");
        }
        .ktk-mobile-weave {
          transition: opacity 80ms linear, transform 80ms linear;
        }
        .ktk-mobile-weave > div {
          background:
            repeating-linear-gradient(0deg, transparent 0 10px, rgba(243,239,229,.9) 10px 18px, transparent 18px 21px),
            repeating-linear-gradient(90deg, transparent 0 10px, rgba(255,252,244,.82) 10px 18px, transparent 18px 21px);
          box-shadow: inset 0 0 70px rgba(255,255,255,.12), 0 35px 90px rgba(0,0,0,.5);
          mask-image: radial-gradient(ellipse at center, #000 18%, rgba(0,0,0,.88) 52%, transparent 78%);
        }
        .ktk-final-overlay {
          background: linear-gradient(90deg, rgba(4,5,8,.9) 0%, rgba(4,5,8,.62) 39%, rgba(4,5,8,.04) 68%, rgba(4,5,8,.18) 100%);
        }
        @media (max-width: 899px) {
          .ktk-final-overlay {
            background: linear-gradient(180deg, rgba(4,5,8,.02) 26%, rgba(4,5,8,.48) 54%, rgba(4,5,8,.96) 83%, #040508 100%);
          }
        }
        @media (max-height: 680px) and (max-width: 899px) {
          .ktk-cinema h1 { font-size: clamp(2.5rem, 14vw, 3.6rem); }
          .ktk-cinema p { line-height: 1.45; }
        }
        @media (prefers-reduced-motion: reduce) {
          .ktk-mobile-weave { transition: none; }
        }
      `}</style>
    </section>
  );
}
