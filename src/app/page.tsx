import Link from "next/link";
import { AssembledBagHero } from "@/components/home/AssembledBagHero";
import { ProductQuality } from "@/components/home/ProductQuality";
import { ProductAnatomyScroll } from "@/components/home/ProductAnatomyScroll";
import { ProcessTimeline } from "@/components/home/ProcessTimeline";
import { HeroBagPoster } from "@/components/home/hero/HeroBagPoster";
import { Reveal } from "@/components/Reveal";
import {
  getProofPoints,
  getFeaturedProducts,
  getBagAnatomy,
  getQualityPillars,
  getProcessSteps,
  getWhyPoints,
  getNews,
  getActivities,
  getIndustries,
  getPartners,
  getCompany,
} from "@/lib/cms";

function ProductVisual({ category }: { category: string }) {
  const type = category.toLowerCase();

  if (type.includes("cement") || type.includes("woven bag")) {
    return (
      <div className="relative flex h-full items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_50%_35%,rgba(255,255,255,.12),transparent_42%),#17191f]">
        <div className="absolute inset-0 weave-light opacity-45" />
        <HeroBagPoster className="relative h-[82%] w-auto translate-y-2 drop-shadow-[0_22px_30px_rgba(0,0,0,.42)] transition-transform duration-700 group-hover:-translate-y-1 group-hover:scale-[1.03]" />
      </div>
    );
  }

  if (type.includes("bearing")) {
    return (
      <div className="relative flex h-full items-center justify-center overflow-hidden bg-[#17191f]">
        <div className="h-36 w-36 rounded-full border-[22px] border-white/16 shadow-[inset_0_0_0_2px_rgba(255,255,255,.24),0_30px_45px_rgba(0,0,0,.35)] transition-transform duration-700 group-hover:rotate-12 group-hover:scale-105">
          <div className="m-auto mt-[31px] h-8 w-8 rounded-full border border-red/80" />
        </div>
      </div>
    );
  }

  if (type.includes("machin")) {
    return (
      <div className="relative h-full overflow-hidden bg-[#17191f]">
        <div className="absolute inset-x-[14%] bottom-[22%] top-[25%] border border-white/18">
          <span className="absolute left-[10%] top-1/2 h-12 w-[80%] -translate-y-1/2 border-y border-red/60" />
          <span className="absolute bottom-full left-[12%] h-[28%] w-px bg-white/35" />
          <span className="absolute bottom-full right-[12%] h-[28%] w-px bg-white/35" />
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full overflow-hidden bg-[#17191f]">
      <div className="weave-light absolute inset-0 scale-110 opacity-75 transition-transform duration-700 group-hover:scale-100" />
      <div className="absolute inset-x-[18%] bottom-[20%] h-px bg-red/80" />
    </div>
  );
}

export default async function HomePage() {
  const [proof, featured, anatomy, quality, process, why, news, activities, industries, partners, company] =
    await Promise.all([
      getProofPoints(),
      getFeaturedProducts(6),
      getBagAnatomy(),
      getQualityPillars(),
      getProcessSteps(),
      getWhyPoints(),
      getNews(),
      getActivities(),
      getIndustries(),
      getPartners(),
      getCompany(),
    ]);

  return (
    <>
      {/* 1, Hero, the assembled cement bag */}
      <AssembledBagHero />

      {/* 2, Compact company trust bridge */}
      <section className="relative bg-coal">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-20 -translate-y-full bg-gradient-to-b from-transparent to-coal" />
        <div className="container-x grid gap-12 pb-20 pt-14 lg:grid-cols-[1.1fr_.9fr]">
          <Reveal>
            <p className="eyebrow">The company</p>
            <h2 className="display mt-5 text-4xl text-bone sm:text-5xl">
              The supplier behind
              <br />
              the <span className="text-red">supply chain.</span>
            </h2>
            <p className="mt-7 max-w-md leading-relaxed text-bone-dim">
              Founded in 2008 and manufacturing since 1991, Kaung Thu Kha grew from Myanmar&apos;s
              authorized bearing distributor into its leading industrial-packaging maker. We run
              European STARLINGER lines at the San Kaung factory and supply the machinery,
              consumables, and service around every bag.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <h3 className="eyebrow">Industries we supply</h3>
            <div className="mt-6 flex flex-wrap gap-x-2 gap-y-3">
              {industries.map((ind) => (
                <div key={ind} className="border border-seam bg-iron/60 px-4 py-2.5 text-sm text-bone-dim">
                  {ind}
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal className="border-t border-seam pt-8 lg:col-span-2">
            <div className="grid grid-cols-2 gap-x-8 gap-y-7 sm:grid-cols-4">
              {proof.map((p) => (
                <div key={p.label}>
                  <p className="display text-3xl text-bone sm:text-4xl">{p.value}</p>
                  <p className="mono mt-2 text-[0.58rem] uppercase tracking-[0.16em] text-ash">
                    {p.label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* 3a, Product quality pillars */}
      <ProductQuality pillars={quality} />

      {/* 3b, Product anatomy — the dark teardown, evidence for the pillars */}
      <ProductAnatomyScroll data={anatomy} />

      {/* 4, Featured products */}
      <section className="border-t border-seam bg-coal">
        <div className="container-x py-24">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="eyebrow">Products</p>
                <h2 className="display mt-5 max-w-2xl text-4xl text-bone sm:text-5xl">
                  Built for the bag, and everything around it.
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
          <div className="mt-12 grid gap-px bg-seam sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 3) * 0.08} className="bg-iron">
                <Link
                  href={`/products/${p.slug}`}
                  className="group flex h-full flex-col p-7 transition-colors hover:bg-coal"
                >
                  <div className="relative mb-6 aspect-[4/3] overflow-hidden border border-seam bg-coal realshadow">
                    <ProductVisual category={p.category} />
                  </div>
                  <span className="mono text-[0.6rem] uppercase tracking-[0.2em] text-red">
                    {p.category}
                  </span>
                  <h3 className="mt-2 text-xl font-semibold leading-tight text-bone transition-colors group-hover:text-red">
                    {p.name}
                  </h3>
                  <p className="mono mt-2 text-[0.62rem] uppercase tracking-[0.16em] text-ash">
                    {p.applications[0]}
                  </p>
                  <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-ash">
                    {p.summary}
                  </p>
                  <span className="mono mt-6 inline-flex items-center gap-2 text-[0.62rem] uppercase tracking-[0.18em] text-red opacity-100 transition-opacity lg:opacity-0 lg:group-hover:opacity-100">
                    View product <span className="transition-transform group-hover:translate-x-1">→</span>
                  </span>
                </Link>
              </Reveal>
            ))}

            {/* browse-all card always fills the remaining columns, for any featured count */}
            <Reveal
              delay={0.16}
              className={`bg-iron ${featured.length % 2 === 0 ? "sm:col-span-2" : "sm:col-span-1"} ${
                featured.length % 3 === 0
                  ? "lg:col-span-3"
                  : featured.length % 3 === 1
                    ? "lg:col-span-2"
                    : "lg:col-span-1"
              }`}
            >
              <Link
                href="/products"
                className="group flex h-full flex-col justify-between p-7 transition-colors hover:bg-coal"
              >
                <div>
                  <span className="mono text-[0.6rem] uppercase tracking-[0.2em] text-red">
                    The full range
                  </span>
                  <h3 className="display mt-2 text-xl text-bone transition-colors group-hover:text-red">
                    Browse all products
                  </h3>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-ash">
                    Cement sacks, PP woven bags, fillers and thread, machinery, and bearings, with
                    specs and applications on every product.
                  </p>
                </div>
                <span className="mono mt-10 inline-flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.18em] text-red">
                  Open catalog
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </span>
              </Link>
            </Reveal>
          </div>

          <Reveal>
            <div className="mt-14 border-t border-seam pt-9">
              <p className="mono text-[0.6rem] uppercase tracking-[0.22em] text-ash">
                Technology & brand partners
              </p>
              <div className="mt-7 grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
                {partners.map((p) => (
                  <div key={p.name}>
                    <p className="text-sm font-semibold text-bone">{p.name}</p>
                    <p className="mono mt-1 text-[0.57rem] uppercase tracking-[0.12em] text-ash">
                      {p.origin} · {p.note}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 5, Manufacturing process timeline (dark cinematic) */}
      <ProcessTimeline steps={process.slice(0, 4)} />

      {/* 6, Why choose KTK */}
      <section className="border-t border-seam bg-mist">
        <div className="container-x py-24">
          <Reveal>
            <p className="eyebrow">Why KTK</p>
            <h2 className="display mt-5 max-w-2xl text-3xl text-bone sm:text-4xl">
              One partner. The whole line.
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {why.map((w, i) => (
              <Reveal key={w.title} delay={(i % 3) * 0.08}>
                <div className="h-full border-t border-seam py-6">
                  <span className="mono text-[0.64rem] text-red">0{i + 1}</span>
                  <h3 className="mt-4 text-base font-semibold text-bone">{w.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ash">{w.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 7, Latest news & activities */}
      <section className="border-t border-seam bg-coal">
        <div className="container-x grid gap-14 py-24 lg:grid-cols-2">
          <Reveal>
            <div className="flex items-end justify-between gap-6">
              <h2 className="display text-3xl text-bone">Latest news</h2>
              <Link href="/blog" className="mono text-[0.68rem] uppercase tracking-[0.18em] text-red hover:text-bone">
                Newsroom →
              </Link>
            </div>
            <div className="mt-8 divide-y divide-seam border-y border-seam">
              {news.slice(0, 3).map((n) => (
                <Link key={n.slug} href={`/blog/${n.slug}`} className="group block py-5">
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

      {/* 8, Two-lane inquiry CTA (product + dealer) */}
      <section className="border-t border-seam">
        <div className="container-x grid gap-px bg-seam md:grid-cols-2">
          {/* Lane A — Product inquiry (light) */}
          <Reveal className="bg-coal">
            <div className="weave flex h-full flex-col justify-between p-10 lg:p-14">
              <div>
                <p className="eyebrow">Product inquiry</p>
                <h2 className="display mt-4 max-w-sm text-3xl text-bone sm:text-4xl">
                  Need bags, specs, or a quote?
                </h2>
                <p className="mt-4 max-w-sm text-sm leading-relaxed text-ash">
                  Tell us your product, capacity, and volume. Our team will match the right bag and
                  filling-line spec.
                </p>
              </div>
              <Link
                href="/contact?type=product"
                className="press mono mt-10 inline-block bg-red px-8 py-4 text-[0.74rem] font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-ink"
              >
                Request a product quote
              </Link>
            </div>
          </Reveal>

          {/* Lane B — Dealer / distributor inquiry (blue, cinematic) */}
          <Reveal delay={0.1} className="bg-inst">
            <div className="relative flex h-full flex-col justify-between overflow-hidden p-10 lg:p-14">
              <div className="blueprint-light absolute inset-0 opacity-40" />
              <div className="relative">
                <p className="mono text-[0.68rem] uppercase tracking-[0.22em] text-white/70">
                  Dealer & distributor inquiry
                </p>
                <h2 className="display mt-4 max-w-sm text-3xl text-white sm:text-4xl">
                  Stock KTK. Build with us.
                </h2>
                <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/80">
                  We are expanding our dealer network across Myanmar. Talk to us about pricing,
                  territories, and supply programs.
                </p>
              </div>
              <Link
                href="/contact?type=dealer"
                className="press mono relative mt-10 inline-block bg-white px-8 py-4 text-[0.74rem] font-semibold uppercase tracking-[0.16em] text-ink transition-colors hover:bg-red hover:text-white"
              >
                Become a partner
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 9b, Contact strip (wired to CMS company) */}
      <section className="border-t border-seam bg-coal">
        <div className="container-x grid gap-10 py-24 md:grid-cols-3">
          <Reveal>
            <h3 className="eyebrow">Call</h3>
            {company.phones.map((phone) => (
              <p key={phone} className="mono mt-3 text-lg text-bone">
                {phone}
              </p>
            ))}
          </Reveal>
          <Reveal delay={0.08}>
            <h3 className="eyebrow">Write</h3>
            {company.emails.map((email) => (
              <p key={email} className="mono mt-3 text-lg text-bone">
                {email}
              </p>
            ))}
          </Reveal>
          <Reveal delay={0.16}>
            <h3 className="eyebrow">Visit</h3>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-bone-dim">
              {company.hq.line1}, {company.hq.line2}{" "}
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
