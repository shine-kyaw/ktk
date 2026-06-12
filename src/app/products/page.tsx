import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { CATEGORIES, PRODUCTS } from "@/data/products";

export const metadata: Metadata = { title: "Products" };

export default function ProductsPage() {
  return (
    <div className="container-x pb-28 pt-40">
      <Reveal>
        <p className="eyebrow">Catalog</p>
        <h1 className="display mt-5 text-5xl text-bone sm:text-7xl">Products</h1>
        <p className="mt-6 max-w-xl leading-relaxed text-ash">
          Industrial packaging and the machinery that fills it. Structured for our upcoming
          product API — categories and entries below will be managed by the KTK team.
        </p>
      </Reveal>

      {CATEGORIES.map((cat, ci) => {
        const items = PRODUCTS.filter((p) => p.category === cat);
        if (items.length === 0) return null;
        return (
          <section key={cat} className="mt-20">
            <Reveal delay={0.05}>
              <div className="flex items-baseline gap-4 border-b border-seam pb-4">
                <span className="mono text-[0.64rem] text-amber">0{ci + 1}</span>
                <h2 className="display text-2xl text-bone sm:text-3xl">{cat}</h2>
              </div>
            </Reveal>
            <div className="mt-px grid gap-px bg-seam sm:grid-cols-2 lg:grid-cols-3">
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
