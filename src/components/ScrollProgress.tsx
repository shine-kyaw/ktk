"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 180, damping: 28, mass: 0.25 });
  return <motion.div aria-hidden className="fixed inset-x-0 top-0 z-[70] h-0.5 origin-left bg-red" style={{ scaleX }} />;
}
