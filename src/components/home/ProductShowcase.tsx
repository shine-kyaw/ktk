"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { CATEGORIES, PRODUCTS } from "@/data/products";

/** Category-filtered product grid for the home page (CMS-driven later). */
export function ProductShowcase() {
  const [cat, setCat] = useState<string>("All");
  const reduce = useReducedMotion();
  const items = (cat === "All" ? PRODUCTS : PRODUCTS.filter((p) => p.category === cat)).slice(0, 6);

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {["All", ...CATEGORIES].map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`mono press px-4 py-2 text-[0.66rem] uppercase tracking-[0.16em] transition-colors ${
              cat === c
                ? "bg-amber text-coal"
                : "border border-seam text-ash hover:border-amber hover:text-amber"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-px bg-seam sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {items.map((p) => (
            <motion.div
              key={p.slug}
              layout={!reduce}
              initial={reduce ? false : { opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduce ? undefined : { opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="bg-coal"
            >
              <Link
                href={`/products/${p.slug}`}
                className="group flex h-full flex-col p-7 transition-colors hover:bg-iron"
              >
                <span className="mono text-[0.6rem] uppercase tracking-[0.2em] text-ash">
                  {p.category}
                </span>
                <h3 className="display mt-3 text-xl text-bone transition-colors group-hover:text-amber">
                  {p.name}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-ash">{p.summary}</p>
                <span className="mono mt-6 text-[0.64rem] uppercase tracking-[0.18em] text-amber opacity-0 transition-opacity group-hover:opacity-100">
                  View product →
                </span>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
