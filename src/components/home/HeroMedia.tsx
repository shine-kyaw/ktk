"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Hero background.
 *
 * Pass `src` (an image in /public) to show real media — it reveals with a
 * cinematic left-to-right clip-wipe plus a slow Ken-Burns push, the
 * "attract" animation for when the client's photos/video arrive.
 *
 * Pass nothing and it renders the designed placeholder atmosphere
 * (woven-fabric texture + furnace glow + engineering grid). Either way the
 * hero looks intentional — swapping in media is a one-line change.
 */
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
        {/* Cinematic grade so any photo reads as graded film, not stock */}
        <div className="absolute inset-0 bg-gradient-to-t from-coal via-coal/55 to-coal/25" />
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(120% 90% at 85% 110%, rgb(242 169 0 / 0.16) 0%, transparent 55%)",
          }}
        />
      </div>
    );
  }

  // ── Designed placeholder ────────────────────────────────────────────────
  return (
    <div className="grain absolute inset-0 overflow-hidden">
      {/* Woven-tape texture (the product itself), slow settle on load */}
      <motion.div
        className="weave absolute inset-0"
        initial={reduce ? false : { scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 7, ease: [0.16, 1, 0.3, 1] }}
      />
      {/* Drifting furnace glow — quiet life behind the headline */}
      <motion.div
        className="absolute inset-0"
        initial={false}
        animate={reduce ? {} : { backgroundPosition: ["0% 100%", "12% 88%", "0% 100%"] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background:
            "radial-gradient(120% 90% at 85% 110%, rgb(242 169 0 / 0.16) 0%, transparent 55%), radial-gradient(90% 70% at 0% 0%, rgb(237 233 224 / 0.05) 0%, transparent 50%)",
        }}
      />
      <div className="blueprint absolute inset-0" />
    </div>
  );
}
