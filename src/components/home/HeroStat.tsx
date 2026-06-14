"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

/** Count-up stat tile for the hero scale ribbon. */
export function HeroStat({
  value,
  suffix = "",
  label,
  isYear = false,
}: {
  value: number;
  suffix?: string;
  label: string;
  isYear?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
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
      const p = Math.min(1, (now - t0) / 1600);
      setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, value]);

  const display = isYear ? String(n) : n.toLocaleString();

  return (
    <div ref={ref}>
      <dd className="display text-4xl text-bone sm:text-5xl">
        {display}
        {suffix && <span className="text-amber">{suffix}</span>}
      </dd>
      <dt className="mono mt-3 text-[0.62rem] uppercase leading-relaxed tracking-[0.16em] text-ash">
        {label}
      </dt>
    </div>
  );
}
