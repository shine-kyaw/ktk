"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const STEPS = [
  {
    kicker: "01 · Industrial trading",
    title: "A dependable supply network",
    body: "Industrial machinery, components and raw materials are sourced through established brand relationships and supplied across Myanmar.",
    image: "/assets/company/factory/factory-exterior.webp",
  },
  {
    kicker: "02 · Manufacturing",
    title: "Production built for industry",
    body: "San Kaung operations support woven packaging production with experienced teams, production equipment and specification-led quality control.",
    image: "/assets/company/factory/factory-1.webp",
  },
  {
    kicker: "03 · Packaging solutions",
    title: "One bag, engineered around the product",
    body: "Cement, rice, fertilizer, animal-feed, flour and sugar bags can be configured by material, size, print, lamination and application.",
    image: "/assets/company/factory/factory-4.webp",
  },
  {
    kicker: "04 · Engineering",
    title: "Technical support beyond supply",
    body: "The wider group connects packaging experience with electrical engineering, machinery, installation and after-sales support.",
    image: "/assets/company/factory/factory-5.webp",
  },
];

export function AboutScrollStory() {
  const [active, setActive] = useState(0);
  const refs = useRef<Array<HTMLElement | null>>([]);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.step));
      }),
      { rootMargin: "-38% 0px -44%", threshold: 0 },
    );
    refs.current.forEach((node) => node && observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="mt-20 border-y border-seam py-16 sm:py-24">
      <div className="grid gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:h-[calc(100vh-9rem)] lg:min-h-[620px]">
          <p className="eyebrow">Explore our capabilities</p>
          <h2 className="display mt-5 max-w-xl text-4xl text-bone sm:text-6xl">Scroll through selected areas of the group.</h2>
          <div className="relative mt-9 aspect-[4/3] overflow-hidden border border-seam bg-iron lg:absolute lg:inset-x-0 lg:bottom-0 lg:aspect-auto lg:h-[48%]">
            {STEPS.map((step, index) => (
              <motion.div
                key={step.image}
                initial={false}
                animate={{ opacity: active === index ? 1 : 0, scale: active === index ? 1 : 1.04 }}
                transition={{ duration: reduceMotion ? 0 : 0.55, ease: "easeOut" }}
                className="absolute inset-0"
              >
                <Image src={step.image} alt={step.title} fill sizes="(min-width: 1024px) 52vw, 100vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              </motion.div>
            ))}
            <div className="absolute inset-x-6 bottom-5 flex items-center gap-3">
              <span className="mono text-[0.62rem] text-white">0{active + 1}</span>
              <div className="h-px flex-1 bg-white/25"><motion.div className="h-px bg-red" animate={{ width: `${((active + 1) / STEPS.length) * 100}%` }} /></div>
              <span className="mono text-[0.62rem] text-white/60">0{STEPS.length}</span>
            </div>
          </div>
        </div>

        <div>
          {STEPS.map((step, index) => (
            <motion.article
              key={step.title}
              ref={(node) => { refs.current[index] = node; }}
              data-step={index}
              animate={{ opacity: active === index ? 1 : 0.42, x: active === index ? 0 : 8 }}
              transition={{ duration: reduceMotion ? 0 : 0.35 }}
              className="flex min-h-[52vh] flex-col justify-center border-b border-seam py-14 first:pt-0 last:border-0 lg:min-h-[70vh]"
            >
              <p className="mono text-[0.66rem] uppercase tracking-[0.2em] text-red">{step.kicker}</p>
              <h3 className="display mt-5 text-3xl text-bone sm:text-5xl">{step.title}</h3>
              <p className="mt-6 max-w-lg text-base leading-relaxed text-bone-dim">{step.body}</p>
              <button onClick={() => refs.current[(index + 1) % STEPS.length]?.scrollIntoView({ behavior: "smooth", block: "center" })} className="mono mt-8 w-fit text-[0.62rem] uppercase tracking-[0.16em] text-red hover:text-bone">
                {index === STEPS.length - 1 ? "Back to first capability ↑" : "Continue exploring ↓"}
              </button>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
