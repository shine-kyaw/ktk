import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { AssembledBagHero } from "@/components/home/AssembledBagHero";
import { Reveal } from "@/components/Reveal";
import {
  getProofPoints,
  getFeaturedProducts,
  getWhyPoints,
  getIndustries,
  getPartners,
  getCompany,
} from "@/lib/cms";

export const metadata: Metadata = { alternates: { canonical: "/" } };

function ProductVisual({ product }: { product: { name: string; image?: string | null; category: string } }) {
  return (
    <div className="relative flex h-full items-center justify-center overflow-hidden bg-[#f2f1eb]">
      {product.image ? (
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
          className="object-contain p-4 transition-transform duration-700 group-hover:scale-105"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-coal text-sm text-ash">{product.category}</div>
      )}
      <span className="absolute bottom-3 left-3 bg-ink/75 px-2.5 py-1 mono text-[0.54rem] uppercase tracking-[0.15em] text-white">Official image</span>
    </div>
  );
}

export default async function HomePage() {
  const [proof, featured, why, industries, partners, company] =
    await Promise.all([
      getProofPoints(),
      getFeaturedProducts(6),
      getWhyPoints(),
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
        <div className="container-x grid gap-x-10 gap-y-14 py-20 lg:grid-cols-12 lg:py-24">
          <Reveal className="lg:col-span-7">
            <p className="eyebrow">The company</p>
            <h2 className="section-title text-bone">
              The supplier behind the <span className="text-red">supply chain.</span>
            </h2>
            <p className="section-copy mt-7 text-bone-dim">
              Founded in 2008 and manufacturing since 1991, Kaung Thu Kha grew from Myanmar&apos;s
              authorized bearing distributor into its leading industrial-packaging maker. We run
              European STARLINGER lines at the San Kaung factory and supply the machinery,
              consumables, and service around every bag.
            </p>
          </Reveal>

          <Reveal delay={0.15} className="lg:col-span-4 lg:col-start-9 lg:pt-20">
            <div className="border-l border-seam pl-5 sm:pl-7">
              <h3 className="eyebrow">Industries we supply</h3>
              <div className="mt-6 flex flex-wrap gap-2.5">
                {industries.map((ind) => (
                  <div
                    key={ind}
                    className="border border-seam bg-iron/70 px-3.5 py-2 text-sm leading-snug text-bone-dim"
                  >
                    {ind}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal className="border-t border-seam pt-9 lg:col-span-12">
            <div className="grid grid-cols-2 gap-x-8 gap-y-9 sm:grid-cols-4">
              {proof.map((p) => (
                <div key={p.label}>
                  <p className="font-display text-3xl font-extrabold leading-none tracking-mega text-bone sm:text-4xl">
                    {p.value}
                  </p>
                  <p className="mono mt-3 max-w-[10rem] text-[0.6rem] uppercase leading-relaxed tracking-[0.16em] text-ash">
                    {p.label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* 4, Featured products */}
      <section className="border-t border-seam bg-coal">
        <div className="container-x py-24 lg:py-28">
          <Reveal>
            <div className="grid gap-7 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-8">
                <p className="eyebrow">Products</p>
                <h2 className="section-title text-bone">
                  Built for the bag, and everything around it.
                </h2>
              </div>
              <div className="border-l border-seam pl-5 lg:col-span-3 lg:col-start-10 lg:pl-7">
                <p className="text-sm leading-relaxed text-ash">
                  Explore specifications, applications, and material options across our industrial
                  range.
                </p>
                <Link
                  href="/products"
                  className="mono mt-4 inline-flex items-center gap-2 text-[0.68rem] uppercase tracking-[0.18em] text-red hover:text-bone"
                >
                  Full catalog <span>→</span>
                </Link>
              </div>
            </div>
          </Reveal>
          <div className="mt-14 grid gap-px bg-seam sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 3) * 0.08} className="bg-iron">
                <Link
                  href={`/products/${p.slug}`}
                  className="group flex h-full flex-col p-7 transition-colors hover:bg-coal"
                >
                  <div className="relative mb-6 aspect-[4/3] overflow-hidden border border-seam bg-coal realshadow">
                    <ProductVisual product={p} />
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

      {/* 6, Why choose KTK */}
      <section className="border-t border-seam bg-mist">
        <div className="container-x py-24 lg:py-28">
          <Reveal>
            <div className="grid gap-7 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-7">
                <p className="eyebrow">Why KTK</p>
                <h2 className="section-title text-bone">One partner. The whole line.</h2>
              </div>
              <p className="section-copy border-l border-seam pl-5 text-sm text-ash lg:col-span-4 lg:col-start-9 lg:pl-7">
                Manufacturing scale, proven equipment, and accountable local service—connected
                through one industrial partner.
              </p>
            </div>
          </Reveal>
          <div className="mt-14 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {why.map((w, i) => (
              <Reveal key={w.title} delay={(i % 3) * 0.08}>
                <div className="h-full border-t border-seam py-7">
                  <span className="mono text-[0.64rem] text-red">0{i + 1}</span>
                  <h3 className="mt-4 text-lg font-semibold leading-snug text-bone">{w.title}</h3>
                  <p className="mt-3 max-w-sm text-sm leading-relaxed text-ash">{w.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 7, Product inquiry CTA */}
      <section className="border-t border-seam">
        <div className="container-x py-14 lg:py-20">
          <Reveal className="bg-coal">
            <div className="grid gap-10 border border-seam p-10 lg:grid-cols-[1fr_auto] lg:items-end lg:p-14">
              <div>
                <p className="eyebrow">Product inquiry</p>
                <h2 className="display mt-4 max-w-2xl text-3xl text-bone sm:text-4xl">
                  Need bags, specs, or a quote?
                </h2>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ash">
                  Tell us your product, capacity, and volume. Our team will match the right bag and
                  filling-line spec.
                </p>
              </div>
              <Link
                href="/contact?type=product"
                className="press mono inline-flex bg-red px-8 py-4 text-center text-[0.74rem] font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-ink"
              >
                Request a product quote
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 9b, Contact strip (wired to CMS company) */}
      <section className="border-t border-seam bg-coal">
        <div className="container-x grid gap-12 py-20 md:grid-cols-3 lg:py-24">
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
              <a
                key={email}
                href={`mailto:${email}`}
                className="mono mt-3 block text-lg text-bone transition-colors hover:text-red"
              >
                {email}
              </a>
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
