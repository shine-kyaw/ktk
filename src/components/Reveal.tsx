"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Scroll-triggered reveal, the one motion primitive used across the site.
 * Fade + 28px rise, once, with an optional stagger delay. Restrained on
 * purpose: the PRD bans constant motion and gimmicks.
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
  const reduce = useReducedMotion();
  if (reduce)
    return (
      <div id={id} className={className}>
        {children}
      </div>
    );

  return (
    <motion.div
      id={id}
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
