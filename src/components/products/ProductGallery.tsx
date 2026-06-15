"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import type { ProductMedia } from "@/data/products";

/** Thumbnail grid with a lightweight click-to-zoom overlay. No lightbox lib. */
export function ProductGallery({ items }: { items: ProductMedia[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <>
      <div className="mt-6 grid gap-px bg-seam sm:grid-cols-2 lg:grid-cols-3">
        {items.map((m, i) => (
          <button
            key={m.src}
            type="button"
            onClick={() => setOpen(i)}
            className="group relative aspect-[4/3] overflow-hidden bg-iron"
          >
            <Image
              src={m.src}
              alt={m.alt}
              fill
              sizes="(min-width: 1024px) 30vw, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            />
            {m.caption && (
              <span className="mono absolute inset-x-0 bottom-0 bg-ink/70 px-3 py-2 text-[0.58rem] uppercase tracking-[0.14em] text-white opacity-0 transition-opacity group-hover:opacity-100">
                {m.caption}
              </span>
            )}
          </button>
        ))}
      </div>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/90 p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            role="dialog"
            aria-modal="true"
          >
            <div className="relative max-h-[85vh] w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
              <div className="relative aspect-[4/3] w-full">
                <Image src={items[open].src} alt={items[open].alt} fill className="object-contain" />
              </div>
              {items[open].caption && (
                <p className="mono mt-3 text-center text-[0.62rem] uppercase tracking-[0.16em] text-white/70">
                  {items[open].caption}
                </p>
              )}
              <button
                type="button"
                onClick={() => setOpen(null)}
                aria-label="Close"
                className="press mono absolute -top-12 right-0 text-[0.7rem] uppercase tracking-[0.16em] text-white hover:text-red"
              >
                Close ✕
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
