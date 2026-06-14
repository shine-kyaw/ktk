import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { getProductCategories, getProducts } from "@/lib/cms";

export const metadata: Metadata = { title: "Products" };

export default async function ProductsPage() {
  const [categories, products] = await Promise.all([getProductCategories(), getProducts()]);

  return (
    <div className="container-x pb-28 pt-40">
      <Reveal>
        <p className="eyebrow">Catalog</p>
        <h1 className="display mt-5 text-5xl text-bone sm:text-7xl">Products</h1>
        <p className="mt-6 max-w-xl leading-relaxed text-ash">
          Industrial packaging and everything around it — bags, the consumables that make them,
          the machinery that fills them, and the bearings KTK was built on. Managed through our
          admin backend, this catalog updates continuously.
        </p>
      </Reveal>

      {categories.map((cat, ci) => {
        const items = products.filter((p) => p.category === cat.name);
        if (items.length === 0) return null;
        const id = cat.name.toLowerCase().replace(/&/g, "").replace(/\s+/g, "-");
        return (
          <section key={cat.name} id={id} className="mt-20">
            <Reveal delay={0.05}>
              <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-seam pb-4">
                <div className="flex items-baseline gap-4">
                  <span className="mono text-[0.64rem] text-amber">0{ci + 1}</span>
                  <h2 className="display text-2xl text-bone sm:text-3xl">{cat.name}</h2>
                </div>
                <span className="mono text-[0.62rem] uppercase tracking-[0.16em] text-amber">
                  {cat.tagline}
                </span>
              </div>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ash">{cat.blurb}</p>
            </Reveal>
            <div className="mt-6 grid gap-px bg-seam sm:grid-cols-2 lg:grid-cols-3">
              {items.map((p) => (
                <Reveal key={p.slug} className="bg-coal">
                  <Link
                    href={`/products/${p.slug}`}
                    className="group flex h-full flex-col p-7 transition-colors hover:bg-iron"
                  >
                    <h3 className="display text-xl text-bone transition-colors group-hover:text-amber">
                      {p.name}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-ash">{p.summary}</p>
                    <dl className="mono mt-6 grid grid-cols-2 gap-x-4 gap-y-2 border-t border-seam pt-4">
                      {p.specs.slice(0, 2).map((s) => (
                        <div key={s.label}>
                          <dt className="text-[0.56rem] uppercase tracking-[0.18em] text-ash">
                            {s.label}
                          </dt>
                          <dd className="mt-1 text-xs text-bone-dim">{s.value}</dd>
                        </div>
                      ))}
                    </dl>
                  </Link>
                </Reveal>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
