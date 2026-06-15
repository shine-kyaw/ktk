"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
  AnimatePresence,
  type MotionValue,
} from "framer-motion";
import { BagSheet } from "./BagSheet";
import type { BagAnatomy, BagLayer } from "@/data/anatomy";

/**
 * Scroll-based material breakdown of a KTK cement bag, an Apple-style product
 * teardown adapted for industrial packaging.
 *
 * Desktop: the diagram is pinned; scrolling separates the bag into its layers
 * and highlights each one in turn, then reassembles it with a closing message.
 * Mobile: no scroll hijacking, the same layers render as stacked reveal cards.
 *
 * All content comes from the CMS layer (getBagAnatomy), so layer name, copy,
 * order, callout side, and technical note are editable from the backend later.
 */
export function ProductAnatomyScroll({ data }: { data: BagAnatomy }) {
  return (
    <section className="relative border-t border-seam bg-coal">
      <AnatomyPinned data={data} />
      <AnatomyCards data={data} />
      {data.disclaimer && (
        <p className="container-x mx-auto pb-12 text-center text-[0.62rem] leading-relaxed text-ash">
          {data.disclaimer}
        </p>
      )}
    </section>
  );
}

/* ── Desktop: pinned scroll teardown ──────────────────────────────────────── */
function AnatomyPinned({ data }: { data: BagAnatomy }) {
  const reduce = useReducedMotion();
  const layers = data.layers;
  const total = layers.length + 1; // last state reassembles the bag
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  // Assembled -> exploded (held through the tour) -> reassembled at the end.
  const explode = useTransform(scrollYProgress, [0, 0.08, 0.8, 0.92], [0, 1, 1, 0]);

  const [active, setActive] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.min(total - 1, Math.max(0, Math.floor(v * total)));
    setActive(idx);
  });
  const isFinal = active >= layers.length;

  return (
    <div ref={ref} className="hidden lg:block" style={{ height: `${total * 90}vh` }}>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="container-x grid w-full grid-cols-12 items-center gap-10">
            {/* text column */}
            <div className="col-span-5">
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-red" />
                <p className="mono text-[0.7rem] uppercase tracking-[0.24em] text-bone-dim">
                  {data.eyebrow}
                </p>
              </div>
              <h2 className="display mt-5 text-4xl text-bone">{data.title}</h2>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-ash">{data.intro}</p>

              <div className="mt-8 min-h-[188px]">
                <AnimatePresence mode="wait">
                  {isFinal ? (
                    <motion.div
                      key="final"
                      initial={reduce ? false : { opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={reduce ? undefined : { opacity: 0, y: -16 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <span className="mono text-[0.66rem] uppercase tracking-[0.2em] text-red">
                        The whole bag
                      </span>
                      <h3 className="display mt-3 text-3xl text-bone">{data.closing.title}</h3>
                      <p className="mt-4 max-w-md leading-relaxed text-bone-dim">
                        {data.closing.body}
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key={active}
                      initial={reduce ? false : { opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={reduce ? undefined : { opacity: 0, y: -16 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="flex items-center gap-3">
                        <span className="mono text-[0.66rem] text-red">
                          {String(active + 1).padStart(2, "0")} / {String(layers.length).padStart(2, "0")}
                        </span>
                        <span className="mono text-[0.66rem] uppercase tracking-[0.2em] text-ash">
                          {layers[active].tag}
                        </span>
                      </div>
                      <h3 className="display mt-3 text-3xl text-bone">{layers[active].name}</h3>
                      <p className="mt-4 max-w-md leading-relaxed text-bone-dim">
                        {layers[active].description}
                      </p>
                      <p className="mt-5 max-w-md border-l border-seam pl-4 text-[0.78rem] leading-relaxed text-ash">
                        {layers[active].note}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* progress rail */}
              <ul className="mt-10 space-y-1.5">
                {layers.map((l, i) => {
                  const on = !isFinal && i === active;
                  const done = isFinal || i < active;
                  return (
                    <li key={l.id} className="flex items-center gap-3">
                      <span
                        className={`h-px transition-all duration-300 ${
                          on ? "w-8 bg-red" : done ? "w-5 bg-bone-dim" : "w-3 bg-seam"
                        }`}
                      />
                      <span
                        className={`mono text-[0.66rem] uppercase tracking-[0.14em] transition-colors ${
                          on ? "text-bone" : "text-ash"
                        }`}
                      >
                        {l.name}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* diagram column */}
            <div className="relative col-span-7 h-[64vh]">
              <div className="absolute inset-0" style={{ perspective: 1100 }}>
                <div
                  className="relative h-full w-full"
                  style={{
                    transformStyle: "preserve-3d",
                    transform: reduce ? undefined : "rotateX(8deg) rotateZ(-2deg)",
                  }}
                >
                  {layers.map((layer, i) => (
                    <Sheet
                      key={layer.id}
                      layer={layer}
                      index={i}
                      count={layers.length}
                      active={active}
                      isFinal={isFinal}
                      explode={explode}
                      reduce={!!reduce}
                    />
                  ))}
                </div>
              </div>

              {/* reassembled closing badge */}
              <AnimatePresence>
                {isFinal && (
                  <motion.div
                    className="pointer-events-none absolute inset-x-0 bottom-6 z-50 flex justify-center"
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 14 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <span className="mono rounded-full border border-red/40 bg-coal/80 px-5 py-2 text-[0.64rem] uppercase tracking-[0.2em] text-bone backdrop-blur-sm">
                      Five layers · one reliable bag
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
        </div>
      </div>
    </div>
  );
}

/* one layer sheet, position driven by scroll, highlight driven by state */
function Sheet({
  layer,
  index,
  count,
  active,
  isFinal,
  explode,
  reduce,
}: {
  layer: BagLayer;
  index: number;
  count: number;
  active: number;
  isFinal: boolean;
  explode: MotionValue<number>;
  reduce: boolean;
}) {
  const center = (count - 1) / 2;
  const dy = (index - center) * 56;
  const dx = (index - center) * 12;
  const y = useTransform(explode, [0, 1], [0, dy]);
  const x = useTransform(explode, [0, 1], [0, dx]);

  const isActive = !isFinal && active === index;
  const dim = !isFinal && !isActive;

  return (
    <motion.div
      className="absolute left-1/2 top-1/2"
      style={{
        x: reduce ? 0 : x,
        y: reduce ? 0 : y,
        width: 210,
        height: 270,
        marginLeft: -105,
        marginTop: -135,
        zIndex: isActive ? 40 : 24 - index,
      }}
      animate={{
        opacity: dim ? 0.26 : 1,
        scale: isActive ? 1.05 : 1,
        filter: dim && !reduce ? "blur(1.5px)" : "blur(0px)",
      }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="relative h-full w-full drop-shadow-[0_30px_55px_rgba(0,0,0,0.5)]">
        <BagSheet variant={layer.variant} active={isActive} />

        {/* callout chip, only on the active layer */}
        <AnimatePresence>
          {isActive && (
            <motion.div
              className="absolute left-full top-1/2 flex -translate-y-1/2 items-center"
              initial={reduce ? false : { opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduce ? undefined : { opacity: 0, x: -8 }}
              transition={{ duration: 0.35 }}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-red" />
              <span className="h-px w-10 bg-red" />
              <span className="mono whitespace-nowrap rounded-sm border border-red/40 bg-coal/80 px-2.5 py-1 text-[0.6rem] uppercase tracking-[0.16em] text-bone backdrop-blur-sm">
                {layer.tag}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

/* ── Mobile: stacked reveal cards (no scroll hijacking) ────────────────────── */
function AnatomyCards({ data }: { data: BagAnatomy }) {
  const reduce = useReducedMotion();
  return (
    <div className="lg:hidden">
      <div className="container-x py-20">
        <div className="flex items-center gap-3">
          <span className="h-px w-10 bg-red" />
          <p className="mono text-[0.68rem] uppercase tracking-[0.24em] text-bone-dim">
            {data.eyebrow}
          </p>
        </div>
        <h2 className="display mt-6 text-4xl text-bone">{data.title}</h2>
        <p className="mt-4 max-w-md leading-relaxed text-ash">{data.intro}</p>

        <div className="mt-12 space-y-4">
          {data.layers.map((layer, i) => (
            <motion.div
              key={layer.id}
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
              className="flex gap-5 border border-seam bg-iron p-5"
            >
              <div className="h-28 w-20 shrink-0">
                <BagSheet variant={layer.variant} active />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="mono text-[0.62rem] text-red">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="mono text-[0.6rem] uppercase tracking-[0.18em] text-ash">
                    {layer.tag}
                  </span>
                </div>
                <h3 className="display mt-1.5 text-lg text-bone">{layer.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ash">{layer.description}</p>
                <p className="mt-3 border-l border-seam pl-3 text-[0.74rem] leading-relaxed text-ash/80">
                  {layer.note}
                </p>
              </div>
            </motion.div>
          ))}

          {/* closing card */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="border border-red/40 bg-inst p-6"
          >
            <span className="mono text-[0.62rem] uppercase tracking-[0.2em] text-bone/70">
              The whole bag
            </span>
            <h3 className="display mt-3 text-2xl text-bone">{data.closing.title}</h3>
            <p className="mt-3 leading-relaxed text-bone/80">{data.closing.body}</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
