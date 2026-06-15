"use client";

import { motion, useReducedMotion } from "framer-motion";
import { BagSheet } from "@/components/home/BagSheet";
import type { ProductMaterialLayer } from "@/data/products";

/**
 * The product page's dark cinematic band — a static (non-pinned) material
 * teardown that reuses the BagSheet art via the shared `variant` union. The
 * full pinned scroll version lives on the homepage; this is its sub-page cousin.
 */
export function MaterialBreakdown({
  productName,
  layers,
}: {
  productName: string;
  layers: ProductMaterialLayer[];
}) {
  const reduce = useReducedMotion();
  return (
    <section className="weave-light blueprint-light relative overflow-hidden bg-ink py-24">
      <div className="container-x">
        <div className="flex items-center gap-3">
          <span className="h-px w-10 bg-red" />
          <p className="mono text-[0.7rem] uppercase tracking-[0.24em] text-white/70">
            Built layer by layer
          </p>
        </div>
        <h2 className="display mt-5 max-w-2xl text-4xl text-white">Inside the {productName}.</h2>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-white/55">
          Not one material, a stack of them, each doing a job. Together they make a bag built for
          reliable strength.
        </p>

        <ol className="mt-14 grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {layers.map((l, i) => (
            <motion.li
              key={l.id}
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="flex gap-5 bg-ink p-6"
            >
              <div className="h-28 w-20 shrink-0 drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
                <BagSheet variant={l.variant} active />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="mono text-[0.62rem] text-red">
                    {String(l.order).padStart(2, "0")}
                  </span>
                  <span className="mono text-[0.6rem] uppercase tracking-[0.18em] text-white/55">
                    {l.tag}
                  </span>
                </div>
                <h3 className="display mt-2 text-lg text-white">{l.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{l.description}</p>
                {l.note && (
                  <p className="mt-3 border-l border-white/12 pl-3 text-[0.72rem] leading-relaxed text-white/40">
                    {l.note}
                  </p>
                )}
              </div>
            </motion.li>
          ))}
        </ol>

        <p className="mono mt-10 text-[0.6rem] leading-relaxed text-white/45">
          Layer details are representative placeholders pending confirmation of KTK&apos;s verified
          product specifications.
        </p>
      </div>
    </section>
  );
}
