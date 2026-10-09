import Link from "next/link";
import { HeroFilm } from "./HeroFilm";

/*
 * Home hero: KTK's own circular looms behind the headline.
 *
 * Everything a visitor needs (headline, copy, both routes in) is server-
 * rendered and visible at once, on every device, with or without JavaScript
 * or motion. The film is a layer behind it; see HeroFilm for how it degrades.
 */
export function Hero() {
  return (
    <section
      className="ktk-hero relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden bg-[#07080b] text-white lg:min-h-[max(100svh,640px)] lg:justify-center"
      aria-label="KTK, woven industrial packaging"
    >
      <HeroFilm />

      {/* Legibility: a dark band under the header, and a scrim behind the copy
          (from the left on wide screens, from the bottom on phones). */}
      <div className="ktk-hero-scrim pointer-events-none absolute inset-0" aria-hidden />

      <div className="container-x relative z-10 pb-[max(5.5rem,calc(env(safe-area-inset-bottom)+4.5rem))] pt-28 lg:pb-16">
        <div className="max-w-[43rem]">
          <p className="ktk-hero-rise mono text-[0.62rem] font-semibold uppercase tracking-[0.27em] text-red">
            Woven packaging · Myanmar · Since 2012
          </p>
          <h1
            className="ktk-hero-rise display mt-5 text-[clamp(3rem,7.2vw,7.5rem)] leading-[0.86]"
            style={{ animationDelay: "80ms" }}
          >
            Strength,
            <br />
            <span className="text-red">woven in.</span>
          </h1>
          <p
            className="ktk-hero-rise mt-6 max-w-md text-[0.95rem] leading-relaxed text-white/80 sm:text-base"
            style={{ animationDelay: "180ms" }}
          >
            Industrial packaging shaped by precision weaving, controlled construction, and
            manufacturing discipline.
          </p>
          <div className="ktk-hero-rise mt-8 flex flex-wrap gap-3" style={{ animationDelay: "260ms" }}>
            <Link
              href="/products"
              className="press mono bg-red px-6 py-3.5 text-[0.66rem] font-semibold uppercase tracking-[0.17em] text-white transition-colors hover:bg-white hover:text-[#08090d]"
            >
              Explore products
            </Link>
            <Link
              href="/manufacturing"
              className="press mono border border-white/40 bg-black/20 px-6 py-3.5 text-[0.66rem] uppercase tracking-[0.17em] text-white backdrop-blur-sm transition-colors hover:border-white"
            >
              Enter the factory
            </Link>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-[max(1.6rem,calc(env(safe-area-inset-bottom)+0.4rem))] left-5 z-20 hidden items-center gap-3 sm:left-10 sm:flex" aria-hidden>
        <span className="h-8 w-px bg-gradient-to-b from-white/70 to-transparent" />
        <span className="mono text-[0.56rem] uppercase tracking-[0.22em] text-white/60">Scroll to explore</span>
      </div>
    </section>
  );
}
