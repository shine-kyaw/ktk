import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = { title: "Manufacturing", alternates: { canonical: "/manufacturing" } };

export default function ManufacturingPage() {
  return (
    <>
      <section className="grain weave relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 90% at 90% 100%, rgb(47 49 141 / 0.16) 0%, transparent 55%)",
          }}
        />
        <div className="container-x relative pb-24 pt-44">
          <Reveal>
            <p className="eyebrow">Manufacturing</p>
            <h1 className="display mt-5 max-w-4xl text-5xl text-bone sm:text-7xl">
              From resin to <span className="text-red">finished sack.</span>
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-bone-dim">
              KTK manufactures cement sacks and PP woven packaging in Yangon using European
              STARLINGER production technology. Product construction, printing, finishing, and
              line compatibility are confirmed for each customer requirement.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-seam">
        <div className="container-x py-24">
          <Reveal>
            <p className="eyebrow">Manufacturing capability</p>
            <div className="mt-8 grid gap-px bg-seam lg:grid-cols-3">
              {[
                ["Industrial packaging", "Cement sacks and PP woven formats built around the product, artwork, and filling environment."],
                ["European technology", "A production platform based on STARLINGER equipment and KTK's established manufacturing operation."],
                ["Specification support", "The KTK team confirms material, size, print, finish, order, and compatibility details before production."],
              ].map(([title, detail]) => (
                <div key={title} className="bg-iron p-8">
                  <h2 className="display text-2xl text-bone">{title}</h2>
                  <p className="mt-4 text-sm leading-relaxed text-ash">{detail}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal className="mt-12 flex flex-wrap gap-3">
            <Link href="/products" className="press mono bg-red px-6 py-3.5 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-white">
              Explore products
            </Link>
            <Link href="/contact?type=product" className="press mono border border-seam px-6 py-3.5 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-bone hover:border-red">
              Discuss a requirement
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
