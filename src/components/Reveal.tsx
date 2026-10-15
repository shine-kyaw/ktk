"use client";

import { useEffect, useRef } from "react";

/**
 * Scroll-triggered reveal, the one motion primitive used across the site.
 * Fade + 28px rise, once, with an optional stagger delay.
 *
 * Content is visible by default. It is only hidden for the reveal once the
 * inline script in the root layout has marked the page `ktk-js`; if the app
 * then fails to start, a CSS failsafe (globals.css) shows it after 3.5s, so a
 * slow or failed script can never leave a section blank. Reduced motion gets
 * a plain fade with no movement.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  id,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  id?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.documentElement.classList.add("ktk-ready");
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("is-in");
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          el.classList.add("is-in");
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -80px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      id={id}
      className={className}
      data-reveal=""
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </div>
  );
}
