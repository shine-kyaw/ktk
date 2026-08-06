import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { getProductCategories, getProducts } from "@/lib/cms";
import type { Product } from "@/data/products";

export const metadata: Metadata = {
  title: "Products",
  description: "KTK cement sacks, PP woven bags, fillers, thread, machinery, and bearings.",
  alternates: { canonical: "/products" },
};

function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex h-full flex-col border border-seam bg-coal p-4 transition-colors hover:border-red hover:bg-iron"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-iron">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(min-width: 1280px) 28vw, (min-width: 640px) 45vw, 100vw"
            className="object-contain p-3 transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="weave blueprint flex h-full flex-col items-center justify-center px-8 text-center">
            <span className="mono text-[0.58rem] uppercase tracking-[0.18em] text-red">{product.brand ?? product.name}</span>
            <span className="mt-3 text-sm leading-relaxed text-ash">Official product image pending</span>
          </div>
        )}
        <span className="absolute left-3 top-3 bg-ink/80 px-2.5 py-1 mono text-[0.54rem] uppercase tracking-[0.16em] text-white">
          {product.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col px-2 pb-2 pt-5">
        <h3 className="display text-xl leading-tight text-bone transition-colors group-hover:text-red">{product.name}</h3>
        {product.qualityAttributes?.length ? (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {product.qualityAttributes.map((attribute) => (
              <span key={attribute} className="mono border border-seam px-2 py-1 text-[0.5rem] uppercase tracking-[0.12em] text-bone-dim">
                {attribute}
              </span>
            ))}
          </div>
        ) : null}
        {product.bestFor && <p className="mono mt-3 text-[0.58rem] uppercase tracking-[0.14em] text-red">{product.bestFor}</p>}
        <p className="mt-3 flex-1 text-sm leading-relaxed text-bone-dim">{product.summary}</p>
        <div className="mt-5 flex items-center justify-between border-t border-seam pt-4">
          <span className="mono text-[0.58rem] uppercase tracking-[0.16em] text-ash">{product.specs[0]?.value}</span>
          <span className="mono text-[0.62rem] uppercase tracking-[0.16em] text-red">View detail →</span>
        </div>
      </div>
    </Link>
  );
}

function PpComparison({ products }: { products: Product[] }) {
  const ordered = ["plain-printed-pp-woven-bag", "laminated-pp-woven-bag", "bopp-laminated-bag"]
    .map((slug) => products.find((product) => product.slug === slug))
    .filter((product): product is Product => Boolean(product));

  return (
    <section id="pp-woven-bags" className="mt-28 scroll-mt-24">
      <Reveal>
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            <p className="eyebrow">Product – PP Woven Bags</p>
            <h2 className="display mt-4 text-4xl text-bone sm:text-5xl">Industrial Packaging Range</h2>
          </div>
          <p className="max-w-2xl text-lg leading-relaxed text-bone-dim">
            All bags are engineered on European STARLINGER production lines using <span className="text-bone">100% Virgin SABIC Resin</span> — 0% recycled material, 100% odor-free.
          </p>
        </div>
      </Reveal>
      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        {ordered.map((product, index) => (
          <Reveal key={product.slug} delay={index * 0.06}>
            <Link href={`/products/${product.slug}`} className="group flex h-full flex-col border border-seam bg-iron p-4 transition-colors hover:border-red hover:bg-coal">
              <div className="relative aspect-[4/3] overflow-hidden bg-[#f2f1eb]">
                {product.image && <Image src={product.image} alt={product.name} fill sizes="(min-width: 1024px) 30vw, 100vw" className="object-contain p-3 transition-transform duration-700 group-hover:scale-105" />}
                <span className="absolute left-3 top-3 bg-red px-2.5 py-1 mono text-[0.54rem] uppercase tracking-[0.14em] text-white">0{index + 1}</span>
              </div>
              <div className="flex flex-1 flex-col px-2 pb-2 pt-6">
                <p className="mono text-[0.58rem] uppercase tracking-[0.16em] text-red">{product.eyebrow}</p>
                <h3 className="display mt-3 text-2xl leading-tight text-bone group-hover:text-red">{product.name}</h3>
                <p className="mt-4 text-sm leading-relaxed text-bone-dim">{product.summary}</p>
                <div className="mt-6 space-y-3 border-t border-seam pt-5 text-sm text-bone-dim">
                  <div><span className="mono text-[0.55rem] uppercase tracking-[0.14em] text-ash">Best for</span><p className="mt-1 text-bone">{product.bestFor}</p></div>
                  <div><span className="mono text-[0.55rem] uppercase tracking-[0.14em] text-ash">Printing</span><p className="mt-1 text-bone">{product.printing}</p></div>
                  <div><span className="mono text-[0.55rem] uppercase tracking-[0.14em] text-ash">Capacity</span><p className="mt-1 text-bone">{product.specs.find((spec) => spec.label === "Capacity")?.value}</p></div>
                </div>
                <span className="mono mt-6 text-[0.62rem] uppercase tracking-[0.16em] text-red">Compare this format →</span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export default async function ProductsPage() {
  const [categories, products] = await Promise.all([getProductCategories(), getProducts()]);
  const featured = products.filter((product) => product.featured).slice(0, 4);

  return (
    <div className="pb-28 pt-32 sm:pt-40">
      <div className="container-x">
        <Reveal>
          <p className="eyebrow">Catalog / KTK Group</p>
          <h1 className="display mt-5 max-w-5xl text-5xl text-bone sm:text-7xl">Products that hold the line together.</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-bone-dim">
            From the package itself to the thread, machines, filler, and bearings around it, explore the supplied KTK range through real product imagery and buyer-focused detail pages.
          </p>
        </Reveal>

        <nav aria-label="Product categories" className="mt-10 flex gap-2 overflow-x-auto border-y border-seam py-3">
          {categories.map((category) => (
            <a key={category.slug} href={`#${category.slug}`} className="mono shrink-0 border border-seam px-3 py-2 text-[0.58rem] uppercase tracking-[0.14em] text-ash transition-colors hover:border-red hover:text-red">
              {category.name}
            </a>
          ))}
        </nav>

        <section className="mt-16 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <Reveal className="relative min-h-[360px] overflow-hidden border border-seam bg-[#f2f1eb]">
            <Image src="/assets/cement/cement-bag.jpg" alt="Cement bag portfolio artwork from KTK asset set" fill priority sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent p-7 pt-24">
              <p className="eyebrow text-white">Supplied artwork / cement</p>
              <h2 className="display mt-3 max-w-xl text-3xl text-white sm:text-4xl">Real packaging references, ready for a better specification conversation.</h2>
            </div>
          </Reveal>
          <Reveal delay={0.08} className="flex flex-col justify-between border border-seam bg-iron p-7">
            <div>
              <p className="eyebrow">Start with the format</p>
              <h2 className="display mt-4 text-3xl text-bone">Choose the material, protection, or machine your line needs.</h2>
            </div>
            <div className="mt-10 grid grid-cols-2 gap-3">
              {featured.slice(0, 4).map((product) => <span key={product.slug} className="data-chip">{product.name}</span>)}
            </div>
          </Reveal>
        </section>

        <PpComparison products={products} />

        {categories.filter((category) => category.slug !== "pp-woven-bags").map((category, categoryIndex) => {
          const items = products.filter((product) => product.category === category.name);
          if (!items.length) return null;
          return (
            <section key={category.slug} id={category.slug} className="mt-28 scroll-mt-24">
              <Reveal>
                <div className="flex flex-wrap items-end justify-between gap-5 border-b border-seam pb-5">
                  <div>
                    <p className="eyebrow">0{categoryIndex + 1} / Catalog section</p>
                    <h2 className="display mt-3 text-4xl text-bone sm:text-5xl">{category.name}</h2>
                  </div>
                  <p className="mono max-w-sm text-right text-[0.62rem] uppercase leading-relaxed tracking-[0.12em] text-red">{category.tagline}</p>
                </div>
                <p className="mt-5 max-w-2xl text-base leading-relaxed text-bone-dim">{category.blurb}</p>
              </Reveal>
              <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((product, index) => (
                  <Reveal key={product.slug} delay={index * 0.05}><ProductCard product={product} /></Reveal>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
