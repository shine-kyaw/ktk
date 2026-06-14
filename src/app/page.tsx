import Link from "next/link";
import { HomeHero } from "@/components/home/HomeHero";
import { ProductShowcase } from "@/components/home/ProductShowcase";
import { Reveal } from "@/components/Reveal";
import {
  getStats,
  getProofPoints,
  getProducts,
  getProductCategories,
  getServices,
  getJobs,
  getNews,
  getActivities,
  getIndustries,
  getPartners,
} from "@/lib/cms";

const WHY = [
  {
    title: "The scale leader",
    desc: "~55% of Myanmar's PP woven-bag market and 27 million bags a month. No domestic supplier matches the volume.",
  },
  {
    title: "European technology",
    desc: "Cement sacks and woven bags produced on STARLINGER lines by European-trained operators — the global bag-plant standard.",
  },
  {
    title: "Food-grade inputs",
    desc: "Virgin resin from SABIC, the world's fourth-largest chemical producer. No recycled content, no odor, reliable strength.",
  },
  {
    title: "One-stop supply",
    desc: "Bags, thread, filler, closing machinery, and 70,000+ spare parts — one accountable partner for the whole line.",
  },
  {
    title: "Exclusive agencies",
    desc: "Sole Myanmar distributor for HCH bearings and YAO HAN machinery — sources competitors can't get locally.",
  },
  {
    title: "Responsible service",
    desc: "Door-to-door teams and on-site problem-solving, backed by a 100% quality-assurance pledge on every lot.",
  },
];

export default async function HomePage() {
  const [stats, proof, products, categories, services, jobs, news, activities, industries, partners] =
    await Promise.all([
      getStats(),
      getProofPoints(),
      getProducts(),
      getProductCategories(),
      getServices(),
      getJobs(),
      getNews(),
      getActivities(),
      getIndustries(),
      getPartners(),
    ]);

  return (
    <>
      {/* 1 — Hero (heroImage stays null until the client's photos arrive) */}
      <HomeHero stats={stats} heroImage={null} />

      {/* 2 — Company introduction */}
      <section className="border-t border-seam bg-iron">
        <div className="container-x grid gap-14 py-24 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow">The company</p>
            <h2 className="display mt-5 text-4xl text-bone sm:text-5xl">
              The supplier behind
              <br />
              the <span className="text-red">supply chain.</span>
            </h2>
            <p className="mt-7 max-w-md leading-relaxed text-ash">
              Kaung Thu Kha began in 2008 as Myanmar&apos;s authorized bearing distributor and
              grew into the country&apos;s leading industrial-packaging manufacturer — running
              European STARLINGER lines out of the San Kaung factory and supplying the
              machinery, consumables, and service around every bag.
            </p>
            <div className="mt-10 grid grid-cols-2 gap-8 sm:grid-cols-4">
              {proof.map((p) => (
                <div key={p.label}>
                  <p className="display text-3xl text-bone">{p.value}</p>
                  <p className="mono mt-2 text-[0.6rem] uppercase tracking-[0.14em] text-ash">
                    {p.label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <h3 className="eyebrow">Industries we supply</h3>
            <div className="mt-6 grid gap-px bg-seam sm:grid-cols-2">
              {industries.map((ind) => (
                <div key={ind} className="bg-iron px-5 py-4 text-sm text-bone-dim">
                  {ind}
                </div>
              ))}
            </div>
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
                  Everything around the bag.
                </h2>
              </div>
              <Link
                href="/products"
                className="mono text-[0.7rem] uppercase tracking-[0.18em] text-red hover:text-bone"
              >
                Full catalog →
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="mt-12">
            <ProductShowcase products={products} categories={categories.map((c) => c.name)} />
          </Reveal>
        </div>
      </section>

      {/* 3b — Featured services */}
      <section className="border-t border-seam bg-iron">
        <div className="container-x py-24">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="eyebrow">Services</p>
                <h2 className="display mt-5 max-w-2xl text-4xl text-bone sm:text-5xl">
                  One-stop, by design.
                </h2>
              </div>
              <Link
                href="/services"
                className="mono text-[0.7rem] uppercase tracking-[0.18em] text-red hover:text-bone"
              >
                All services →
              </Link>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-px bg-seam sm:grid-cols-2 lg:grid-cols-3">
            {services.slice(0, 3).map((s, i) => (
              <Reveal key={s.slug} delay={i * 0.08} className="bg-iron">
                <Link href="/services" className="group block h-full p-7 transition-colors hover:bg-coal">
                  <span className="mono text-[0.64rem] text-red">0{i + 1}</span>
                  <h3 className="display mt-4 text-xl text-bone transition-colors group-hover:text-red">
                    {s.name}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ash">{s.summary}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 4 — Manufacturing excellence */}
      <section className="grain weave relative overflow-hidden border-t border-seam">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(110% 100% at 100% 0%, rgb(34 90 130 / 0.12) 0%, transparent 50%)",
          }}
        />
        <div className="container-x relative py-32">
          <Reveal>
            <p className="eyebrow">Manufacturing</p>
            <h2 className="display mt-5 max-w-3xl text-4xl text-bone sm:text-6xl">
              15 million sacks a month.
              <br />
              <span className="text-red">European lines.</span>
            </h2>
            <p className="mt-7 max-w-lg leading-relaxed text-bone-dim">
              The San Kaung factory runs STARLINGER extrusion, weaving, lamination, and
              conversion — operated by technicians trained by European specialists, with
              inspection at every stage from tape to finished sack.
            </p>
            <Link
              href="/manufacturing"
              className="press mono mt-10 inline-block border border-bone/30 px-7 py-4 text-[0.72rem] uppercase tracking-[0.16em] text-bone transition-colors hover:border-red hover:text-red"
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
              Market leader, by the numbers.
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-px bg-seam sm:grid-cols-2 lg:grid-cols-3">
            {WHY.map((w, i) => (
              <Reveal key={w.title} delay={(i % 3) * 0.08} className="bg-iron">
                <div className="h-full p-7">
                  <span className="mono text-[0.64rem] text-red">0{i + 1}</span>
                  <h3 className="mt-4 text-base font-semibold text-bone">{w.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ash">{w.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 6 — Latest news & activities */}
      <section className="border-t border-seam">
        <div className="container-x grid gap-14 py-24 lg:grid-cols-2">
          <Reveal>
            <div className="flex items-end justify-between gap-6">
              <h2 className="display text-3xl text-bone">Latest news</h2>
              <Link href="/news" className="mono text-[0.68rem] uppercase tracking-[0.18em] text-red hover:text-bone">
                Newsroom →
              </Link>
            </div>
            <div className="mt-8 divide-y divide-seam border-y border-seam">
              {news.slice(0, 3).map((n) => (
                <Link key={n.slug} href={`/news/${n.slug}`} className="group block py-5">
                  <span className="mono text-[0.62rem] text-red">{n.date}</span>
                  <h3 className="mt-1.5 font-semibold text-bone transition-colors group-hover:text-red">
                    {n.title}
                  </h3>
                </Link>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="flex items-end justify-between gap-6">
              <h2 className="display text-3xl text-bone">Activities</h2>
              <Link href="/activities" className="mono text-[0.68rem] uppercase tracking-[0.18em] text-red hover:text-bone">
                All activities →
              </Link>
            </div>
            <div className="mt-8 divide-y divide-seam border-y border-seam">
              {activities.slice(0, 3).map((a) => (
                <Link key={a.slug} href="/activities" className="group block py-5">
                  <span className="mono text-[0.62rem] uppercase tracking-[0.16em] text-red">
                    {a.category}
                  </span>
                  <h3 className="mt-1.5 font-semibold text-bone transition-colors group-hover:text-red">
                    {a.title}
                  </h3>
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* 6b — Careers strip */}
      <section className="border-t border-seam bg-iron">
        <div className="container-x py-24">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="eyebrow">Careers</p>
                <h2 className="display mt-5 max-w-xl text-4xl text-bone sm:text-5xl">We&apos;re hiring.</h2>
              </div>
              <Link href="/careers" className="mono text-[0.7rem] uppercase tracking-[0.18em] text-red hover:text-bone">
                All positions →
              </Link>
            </div>
          </Reveal>
          <div className="mt-10 divide-y divide-seam border-y border-seam">
            {jobs.slice(0, 3).map((j, i) => (
              <Reveal key={j.slug} delay={i * 0.05}>
                <Link
                  href={`/careers/${j.slug}`}
                  className="group flex flex-wrap items-baseline justify-between gap-3 py-6 transition-colors hover:bg-coal sm:px-4"
                >
                  <h3 className="display text-xl text-bone transition-colors group-hover:text-red">
                    {j.title}
                  </h3>
                  <span className="mono text-[0.64rem] uppercase tracking-[0.14em] text-ash">
                    {j.department} · {j.location}
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 6c — Partner marks */}
      <section className="border-t border-seam">
        <div className="container-x py-14">
          <Reveal>
            <p className="mono text-center text-[0.62rem] uppercase tracking-[0.24em] text-ash">
              Technology & brand partners
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-14 gap-y-6">
              {partners.map((p) => (
                <span
                  key={p.name}
                  title={`${p.origin} — ${p.note}`}
                  className="display text-xl tracking-wide text-bone/35 transition-colors hover:text-bone/70"
                >
                  {p.name}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* 7 — Dealer CTA */}
      <section className="border-t border-inst bg-inst">
        <div className="container-x py-24">
          <Reveal>
            <div className="flex flex-wrap items-center justify-between gap-10">
              <div>
                <p className="mono text-[0.68rem] uppercase tracking-[0.22em] text-bone/70">Partnerships</p>
                <h2 className="display mt-4 max-w-2xl text-4xl text-bone sm:text-6xl">
                  Stock KTK.
                  <br />
                  Build with us.
                </h2>
                <p className="mt-5 max-w-md text-sm leading-relaxed text-bone/80">
                  We are expanding our dealer and distributor network across Myanmar. Talk to our
                  team about pricing, territories, and supply programs.
                </p>
              </div>
              <Link
                href="/contact"
                className="press mono bg-red px-9 py-5 text-[0.76rem] font-semibold uppercase tracking-[0.16em] text-bone transition-colors hover:bg-bone hover:text-coal"
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
            <p className="mono mt-4 text-lg text-bone">sales@ktk.com.mm</p>
          </Reveal>
          <Reveal delay={0.16}>
            <h3 className="eyebrow">Visit</h3>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-bone-dim">
              Zone (2), Hlaing Thar Yar Township, Yangon —{" "}
              <Link href="/contact" className="text-red hover:text-bone">
                map & inquiry form →
              </Link>
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
