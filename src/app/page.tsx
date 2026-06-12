import Link from "next/link";
import { HomeHero } from "@/components/home/HomeHero";
import { ProductShowcase } from "@/components/home/ProductShowcase";
import { Reveal } from "@/components/Reveal";
import { Stat } from "@/components/Stat";
import { STATS } from "@/data/products";

const MILESTONES = [
  { year: "2008", text: "Kaung Thu Kha founded in Yangon — bearings and industrial trading." },
  { year: "2009", text: "Appointed distributor for NEWLONG bag-closing machinery (Japan)." },
  { year: "2012", text: "Own cement sack production begins on STARLINGER European lines." },
  { year: "2013", text: "YAO HAN (Taiwan) machinery partnership; product range expands." },
  { year: "Today", text: "Full industrial packaging supplier — sacks, bags, fillers, thread, machinery." },
];

const WHY = [
  {
    title: "European technology",
    desc: "Cement sacks produced on STARLINGER lines — the same machinery standard used by leading bag plants worldwide.",
  },
  {
    title: "Proven since 2008",
    desc: "Seventeen years supplying Myanmar's construction and commodity industries without compromising on quality.",
  },
  {
    title: "One-stop supply",
    desc: "Sacks, woven bags, fillers, thread, closing machinery, and bearings — one supplier, one accountable partner.",
  },
  {
    title: "100% quality assurance",
    desc: "Every production lot inspected before dispatch. We import and produce good-quality products only.",
  },
  {
    title: "Machinery & service",
    desc: "NEWLONG and YAO HAN closers with parts and after-sales support — we keep filling lines running.",
  },
  {
    title: "Dealer network",
    desc: "Distribution relationships across Myanmar, with capacity to onboard new dealers and projects.",
  },
];

const APPLICATIONS = [
  { sector: "Cement & construction", detail: "Block-bottom sacks engineered for automated filling lines." },
  { sector: "Rice & agriculture", detail: "PP woven bags for grain, seed, and feed distribution." },
  { sector: "Fertilizer & chemicals", detail: "Laminated woven bags with moisture protection." },
  { sector: "Consumer commodities", detail: "Multi-color printed bags for retail-facing brands." },
];

export default function HomePage() {
  return (
    <>
      {/* 1 — Hero */}
      <HomeHero />

      {/* 2 — Company introduction */}
      <section className="border-t border-seam bg-iron">
        <div className="container-x grid gap-14 py-24 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow">The company</p>
            <h2 className="display mt-5 text-4xl text-bone sm:text-5xl">
              Built in Yangon.
              <br />
              Trusted since <span className="text-amber">2008.</span>
            </h2>
            <p className="mt-7 max-w-md leading-relaxed text-ash">
              Kaung Thu Kha Trading Co., Ltd began as an industrial trading house and grew into
              one of Myanmar&apos;s industrial packaging manufacturers — producing cement sacks
              and PP woven bags on European technology, backed by machinery partnerships with
              Japan and Taiwan.
            </p>
            <div className="mt-12 grid grid-cols-2 gap-10 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              {STATS.map((s) => (
                <Stat key={s.label} value={s.value} label={s.label} suffix={"suffix" in s ? s.suffix : ""} isYear={"isYear" in s && s.isYear} />
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <ol className="relative border-l border-seam pl-8">
              {MILESTONES.map((m) => (
                <li key={m.year} className="relative pb-10 last:pb-0">
                  <span className="absolute -left-[2.31rem] top-1 h-2.5 w-2.5 bg-amber" />
                  <p className="mono text-[0.7rem] uppercase tracking-[0.2em] text-amber">{m.year}</p>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-bone-dim">{m.text}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      {/* 3 — Product showcase */}
      <section className="border-t border-seam">
        <div className="container-x py-24">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="eyebrow">Products</p>
                <h2 className="display mt-5 max-w-2xl text-4xl text-bone sm:text-5xl">
                  Made for the fill line.
                </h2>
              </div>
              <Link
                href="/products"
                className="mono text-[0.7rem] uppercase tracking-[0.18em] text-amber hover:text-bone"
              >
                Full catalog →
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="mt-12">
            <ProductShowcase />
          </Reveal>
        </div>
      </section>

      {/* 4 — Manufacturing excellence */}
      <section className="grain weave relative overflow-hidden border-t border-seam">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(110% 100% at 100% 0%, rgb(242 169 0 / 0.12) 0%, transparent 50%)",
          }}
        />
        <div className="container-x relative py-32">
          <Reveal>
            <p className="eyebrow">Manufacturing</p>
            <h2 className="display mt-5 max-w-3xl text-4xl text-bone sm:text-6xl">
              European lines.
              <br />
              Yangon <span className="text-amber">workmanship.</span>
            </h2>
            <p className="mt-7 max-w-lg leading-relaxed text-bone-dim">
              Our Hlaing Thar Yar plant runs STARLINGER extrusion, weaving, lamination, and
              conversion — with inspection at every stage from tape to finished sack.
            </p>
            <Link
              href="/manufacturing"
              className="press mono mt-10 inline-block border border-bone/30 px-7 py-4 text-[0.72rem] uppercase tracking-[0.16em] text-bone transition-colors hover:border-amber hover:text-amber"
            >
              Inside the plant
            </Link>
          </Reveal>
        </div>
      </section>

      {/* 5 — Why choose KTK */}
      <section className="border-t border-seam bg-iron">
        <div className="container-x py-24">
          <Reveal>
            <p className="eyebrow">Why KTK</p>
            <h2 className="display mt-5 max-w-2xl text-4xl text-bone sm:text-5xl">
              The supplier behind the supply chain.
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-px bg-seam sm:grid-cols-2 lg:grid-cols-3">
            {WHY.map((w, i) => (
              <Reveal key={w.title} delay={(i % 3) * 0.08} className="bg-iron">
                <div className="h-full p-7">
                  <span className="mono text-[0.64rem] text-amber">0{i + 1}</span>
                  <h3 className="mt-4 text-base font-semibold text-bone">{w.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ash">{w.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 6 — Applications */}
      <section className="border-t border-seam">
        <div className="container-x py-24">
          <Reveal>
            <p className="eyebrow">Applications</p>
            <h2 className="display mt-5 max-w-2xl text-4xl text-bone sm:text-5xl">
              Where our bags work.
            </h2>
          </Reveal>
          <div className="mt-12 divide-y divide-seam border-y border-seam">
            {APPLICATIONS.map((a, i) => (
              <Reveal key={a.sector} delay={i * 0.06}>
                <div className="group flex flex-wrap items-baseline justify-between gap-3 py-7 transition-colors hover:bg-iron sm:px-4">
                  <h3 className="display text-2xl text-bone transition-colors group-hover:text-amber sm:text-3xl">
                    {a.sector}
                  </h3>
                  <p className="max-w-sm text-sm text-ash">{a.detail}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 7 — Dealer / distributor CTA */}
      <section className="border-t border-seam bg-amber">
        <div className="container-x py-24">
          <Reveal>
            <div className="flex flex-wrap items-center justify-between gap-10">
              <div>
                <p className="mono text-[0.68rem] uppercase tracking-[0.22em] text-coal/70">
                  Partnerships
                </p>
                <h2 className="display mt-4 max-w-2xl text-4xl text-coal sm:text-6xl">
                  Stock KTK.
                  <br />
                  Build with us.
                </h2>
                <p className="mt-5 max-w-md text-sm leading-relaxed text-coal/75">
                  We are expanding our dealer and distributor network across Myanmar. Talk to our
                  team about pricing, territories, and supply programs.
                </p>
              </div>
              <Link
                href="/contact"
                className="press mono bg-coal px-9 py-5 text-[0.76rem] font-semibold uppercase tracking-[0.16em] text-amber transition-colors hover:bg-iron"
              >
                Start the conversation
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 8 — Contact strip */}
      <section className="border-t border-seam">
        <div className="container-x grid gap-10 py-24 md:grid-cols-3">
          <Reveal>
            <h3 className="eyebrow">Call</h3>
            <p className="mono mt-4 text-lg text-bone">(959) 264 817 108</p>
            <p className="mono mt-1 text-lg text-bone">(959) 264 817 109</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h3 className="eyebrow">Write</h3>
            <p className="mono mt-4 text-lg text-bone">kaungthukha@ktk.com.mm</p>
          </Reveal>
          <Reveal delay={0.16}>
            <h3 className="eyebrow">Visit</h3>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-bone-dim">
              Zone (2), Hlaing Thar Yar Township, Yangon —{" "}
              <Link href="/contact" className="text-amber hover:text-bone">
                map & inquiry form →
              </Link>
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
