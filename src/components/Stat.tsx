"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

/** Count-up stat — eases to the value when scrolled into view. */
export function Stat({
  value,
  label,
  suffix = "",
  isYear = false,
}: {
  value: number;
  label: string;
  suffix?: string;
  isYear?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setN(value);
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / 1500);
      setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, value]);

  return (
    <div ref={ref}>
      <p className="display text-4xl text-bone sm:text-5xl">
        {isYear ? n : n.toLocaleString()}
        {suffix && <span className="text-amber">{suffix}</span>}
      </p>
      <p className="mono mt-2 text-[0.68rem] uppercase tracking-[0.18em] text-ash">{label}</p>
    </div>
  );
}
