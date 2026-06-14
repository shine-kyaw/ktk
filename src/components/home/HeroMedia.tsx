"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Hero background.
 *
 * With `src` (an image in /public): cinematic clip-wipe + Ken-Burns reveal,
 * the "attract" animation for when the client's photos/video arrive.
 *
 * Without it: an animated woven-lattice field, a nod to the PP woven fabric
 * KTK makes. Drifting warp/weft, diagonal red tapes, a slow light sweep,
 * rising squares, and a breathing glow. Designed to pull with motion alone,
 * no photography required. Swapping in media is a one-line change.
 */
const SQUARES = [
  { left: "10%", top: "82%", s: 8, dur: 15, delay: 0, red: false },
  { left: "24%", top: "90%", s: 6, dur: 18, delay: 4, red: true },
  { left: "46%", top: "86%", s: 10, dur: 16, delay: 1.5, red: false },
  { left: "63%", top: "92%", s: 7, dur: 20, delay: 6, red: false },
  { left: "78%", top: "84%", s: 9, dur: 14, delay: 2.4, red: true },
  { left: "90%", top: "88%", s: 6, dur: 17, delay: 8, red: false },
];

export function HeroMedia({ src, alt = "KTK manufacturing" }: { src?: string | null; alt?: string }) {
  const reduce = useReducedMotion();

  if (src) {
    return (
      <div className="grain absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute inset-0"
          initial={reduce ? false : { clipPath: "inset(0 100% 0 0)" }}
          animate={{ clipPath: "inset(0 0% 0 0)" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            className="absolute inset-0"
            initial={reduce ? false : { scale: 1.18 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image src={src} alt={alt} fill priority sizes="100vw" className="object-cover" />
          </motion.div>
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-coal via-coal/55 to-coal/25" />
      </div>
    );
  }

  // ── Animated woven-lattice placeholder ──────────────────────────────────
  return (
    <div className="absolute inset-0 overflow-hidden bg-coal">
      <style>{`
        @keyframes ktkWeave { from { background-position: 0 0, 0 0; } to { background-position: 88px 88px, -88px 88px; } }
        @keyframes ktkTapes { from { background-position: 0 0; } to { background-position: 260px 0; } }
        @keyframes ktkSheen {
          0% { transform: translateX(-140%) skewX(-12deg); opacity: 0; }
          18% { opacity: 0.55; }
          55% { opacity: 0; }
          100% { transform: translateX(160%) skewX(-12deg); opacity: 0; }
        }
        @keyframes ktkGlow {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.85; }
          50% { transform: translate(4%, -3%) scale(1.08); opacity: 1; }
        }
        @keyframes ktkRise {
          0% { opacity: 0; transform: translateY(0) rotate(0deg); }
          12% { opacity: 0.5; }
          80% { opacity: 0.28; }
          100% { opacity: 0; transform: translateY(-46vh) rotate(150deg); }
        }
        .ktk-weave {
          background-image:
            repeating-linear-gradient(0deg, rgba(235,239,245,0.05) 0 1px, transparent 1px 22px),
            repeating-linear-gradient(90deg, rgba(235,239,245,0.05) 0 1px, transparent 1px 22px);
          animation: ktkWeave 42s linear infinite;
        }
        .ktk-tapes {
          background-image: repeating-linear-gradient(115deg, rgba(226,72,59,0.06) 0 2px, transparent 2px 64px);
          animation: ktkTapes 34s linear infinite;
        }
        .ktk-sheen {
          width: 42%;
          background: linear-gradient(90deg, transparent, rgba(235,239,245,0.09), transparent);
          animation: ktkSheen 11s ease-in-out infinite;
        }
        .ktk-glow { animation: ktkGlow 14s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .ktk-weave, .ktk-tapes, .ktk-sheen, .ktk-glow { animation: none; }
        }
      `}</style>

      {/* breathing institutional-blue glow */}
      <div
        className="ktk-glow absolute inset-0"
        style={{
          background:
            "radial-gradient(70% 60% at 82% 12%, rgba(0,59,92,0.55) 0%, transparent 60%), radial-gradient(80% 70% at 12% 95%, rgba(34,90,130,0.35) 0%, transparent 60%)",
        }}
      />
      {/* woven warp + weft */}
      <div className="ktk-weave absolute inset-0" />
      {/* diagonal red tapes */}
      <div className="ktk-tapes absolute inset-0" />
      {/* rising squares (the woven motif) */}
      {!reduce &&
        SQUARES.map((q, k) => (
          <span
            key={k}
            className={`absolute block ${q.red ? "bg-red" : "bg-bone"}`}
            style={{
              left: q.left,
              top: q.top,
              width: q.s,
              height: q.s,
              opacity: 0,
              animation: `ktkRise ${q.dur}s linear ${q.delay}s infinite`,
            }}
          />
        ))}
      {/* slow light sweep */}
      <div className="ktk-sheen pointer-events-none absolute inset-y-0 -left-1/4" />
      {/* legibility wash, content sits over the lower-left */}
      <div className="absolute inset-0 bg-gradient-to-tr from-coal via-coal/80 to-transparent" />
    </div>
  );
}
