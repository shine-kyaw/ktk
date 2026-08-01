"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import type { ProductMedia } from "@/data/products";

export function ProductGallery({ items }: { items: ProductMedia[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);
  const pointerStart = useRef<number | null>(null);
  const isOpen = open !== null;

  const move = useCallback(
    (delta: number) => {
      setOpen((current) => {
        if (current === null) return current;
        return (current + delta + items.length) % items.length;
      });
    },
    [items.length],
  );

  useEffect(() => {
    if (!isOpen) return;
    lastFocused.current = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
      lastFocused.current?.focus();
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(null);
      if (event.key === "ArrowLeft") move(-1);
      if (event.key === "ArrowRight") move(1);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, move]);

  return (
    <>
      <div className="mt-6 grid gap-px bg-seam sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) => (
          <button
            key={`${item.src}-${index}`}
            type="button"
            onClick={() => setOpen(index)}
            className="group relative aspect-[4/3] overflow-hidden bg-[#f2f1eb] text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-red"
            aria-label={`Open image ${index + 1} of ${items.length}: ${item.alt}`}
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              sizes="(min-width: 1024px) 30vw, 100vw"
              className="object-contain p-4 transition-transform duration-500 group-hover:scale-[1.04]"
            />
            <span className="mono absolute left-3 top-3 bg-ink/78 px-2.5 py-1 text-[0.52rem] uppercase tracking-[0.14em] text-white">
              {String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
            </span>
            {item.caption ? (
              <span className="mono absolute inset-x-0 bottom-0 bg-ink/82 px-3 py-2.5 text-[0.56rem] uppercase tracking-[0.13em] text-white transition-colors group-hover:bg-red">
                {item.caption}
              </span>
            ) : null}
          </button>
        ))}
      </div>

      <AnimatePresence>
        {open !== null ? (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/94 p-4 sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            role="dialog"
            aria-modal="true"
            aria-label={items[open].alt}
          >
            <motion.div
              key={items[open].src}
              className="relative flex max-h-[92vh] w-full max-w-6xl flex-col"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              onClick={(event) => event.stopPropagation()}
              onPointerDown={(event) => {
                pointerStart.current = event.clientX;
              }}
              onPointerUp={(event) => {
                if (pointerStart.current === null) return;
                const distance = event.clientX - pointerStart.current;
                pointerStart.current = null;
                if (Math.abs(distance) > 48) move(distance > 0 ? -1 : 1);
              }}
            >
              <div className="relative min-h-0 flex-1 bg-white/95">
                <div className="relative h-[68vh] max-h-[760px] w-full">
                  <Image src={items[open].src} alt={items[open].alt} fill sizes="95vw" className="object-contain p-3 sm:p-6" priority />
                </div>
              </div>

              <div className="flex items-center justify-between gap-4 border-t border-white/15 bg-coal px-3 py-3 sm:px-5">
                <button
                  type="button"
                  onClick={() => move(-1)}
                  className="press mono border border-white/20 px-4 py-2 text-[0.62rem] uppercase tracking-[0.14em] text-white hover:border-red hover:text-red"
                  aria-label="Previous image"
                >
                  ← Previous
                </button>
                <div className="min-w-0 text-center">
                  <p className="mono truncate text-[0.58rem] uppercase tracking-[0.14em] text-white/75">
                    {items[open].caption ?? items[open].alt}
                  </p>
                  <p className="mono mt-1 text-[0.52rem] uppercase tracking-[0.14em] text-red">
                    {open + 1} of {items.length}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => move(1)}
                  className="press mono border border-white/20 px-4 py-2 text-[0.62rem] uppercase tracking-[0.14em] text-white hover:border-red hover:text-red"
                  aria-label="Next image"
                >
                  Next →
                </button>
              </div>

              <button
                ref={closeRef}
                type="button"
                onClick={() => setOpen(null)}
                aria-label="Close product gallery"
                className="press mono absolute right-0 top-0 z-10 bg-ink/85 px-4 py-3 text-[0.62rem] uppercase tracking-[0.16em] text-white hover:bg-red"
              >
                Close ✕
              </button>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
