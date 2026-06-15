import Link from "next/link";
import { AssembledBagHero } from "@/components/home/AssembledBagHero";
import { ProductQuality } from "@/components/home/ProductQuality";
import { ProductAnatomyScroll } from "@/components/home/ProductAnatomyScroll";
import { ProcessTimeline } from "@/components/home/ProcessTimeline";
import { Reveal } from "@/components/Reveal";
import {
  getProofPoints,
  getFeaturedProducts,
  getBagAnatomy,
  getQualityPillars,
  getProcessSteps,
  getWhyPoints,
  getJobs,
  getNews,
  getActivities,
  getIndustries,
  getPartners,
  getCompany,
} from "@/lib/cms";

export default async function HomePage() {
  const [proof, featured, anatomy, quality, process, why, jobs, news, activities, industries, partners, company] =
    await Promise.all([
      getProofPoints(),
      getFeaturedProducts(6),
      getBagAnatomy(),
      getQualityPillars(),
      getProcessSteps(),
      getWhyPoints(),
      getJobs(),
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

      {/* 2, Company trust introduction */}
      <section className="border-t border-seam bg-coal">
        <div className="container-x grid gap-14 py-24 lg:grid-cols-2">
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

      {/* 3a, Product quality pillars */}
      <ProductQuality pillars={quality} />

      {/* 3b, Product anatomy — the dark teardown, evidence for the pillars */}
      <ProductAnatomyScroll data={anatomy} />

      {/* 3c, Quality close-line */}
      <section className="border-t border-seam bg-coal">
        <div className="container-x py-14">
          <Reveal>
            <p className="eyebrow text-center">Engineered to be trusted</p>
            <p className="mx-auto mt-4 max-w-2xl text-center text-lg leading-relaxed text-bone-dim">
              Five layers, one job: protect what is inside, from our factory floor to your site.
            </p>
          </Reveal>
        </div>
      </section>

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
                  <div className="weave relative mb-6 aspect-[4/3] overflow-hidden border border-seam bg-coal realshadow" />
                  <span className="mono text-[0.6rem] uppercase tracking-[0.2em] text-red">
                    {p.category}
                  </span>
                  <h3 className="display mt-2 text-xl leading-tight text-bone transition-colors group-hover:text-red">
                    {p.name}
                  </h3>
                  <p className="mono mt-2 text-[0.62rem] uppercase tracking-[0.16em] text-ash">
                    {p.applications[0]}
                  </p>
                  <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-ash">
                    {p.summary}
                  </p>
                  <span className="mono mt-6 inline-flex items-center gap-2 text-[0.62rem] uppercase tracking-[0.18em] text-red opacity-0 transition-opacity group-hover:opacity-100">
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
        </div>
      </section>

      {/* 4b, Technology & brand partners (credibility footnote to products) */}
      <section className="border-t border-seam bg-coal">
        <div className="container-x py-14">
          <Reveal>
            <p className="mono text-center text-[0.62rem] uppercase tracking-[0.24em] text-ash">
              Technology & brand partners
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-14 gap-y-6">
              {partners.map((p) => (
                <span
                  key={p.name}
                  title={`${p.origin}, ${p.note}`}
                  className="display text-xl tracking-wide text-bone/60 transition-colors hover:text-bone"
                >
                  {p.name}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* 5, Manufacturing process timeline (dark cinematic) */}
      <ProcessTimeline steps={process} />

      {/* 6, Why choose KTK */}
      <section className="border-t border-seam bg-mist">
        <div className="container-x py-24">
          <Reveal>
            <p className="eyebrow">Why KTK</p>
            <h2 className="display mt-5 max-w-2xl text-4xl text-bone sm:text-5xl">
              Market leader, by the numbers.
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-px bg-seam sm:grid-cols-2 lg:grid-cols-3">
            {why.map((w, i) => (
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

      {/* 8, Careers preview */}
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

      {/* 9, Two-lane inquiry CTA (product + dealer) */}
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
