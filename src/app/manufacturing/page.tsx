import type { Metadata } from "next";
import Image from "next/image";
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
          <Reveal className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div>
            <p className="eyebrow">Manufacturing</p>
            <h1 className="display mt-5 max-w-4xl text-5xl text-bone sm:text-7xl">
              Inside KTK&apos;s <span className="text-red">manufacturing operation.</span>
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-bone-dim">
              The supplied factory archive shows KTK&apos;s circular weaving, bag conversion,
              handling, and packing facilities in Yangon. Product construction, printing,
              finishing, and line compatibility are confirmed for each customer requirement.
            </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {/* The aerial leads: it is the only supplied image that shows the
                  scale of the operation in one frame. */}
              <div className="relative col-span-2 min-h-[300px] overflow-hidden border border-seam bg-[#f2f1eb]">
                <Image src="/assets/company/factory/site-aerial-front.jpg" alt="Aerial view of the Kaung Thu Kha Group plant in Yangon" fill priority sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover" />
              </div>
              <div className="relative min-h-[190px] overflow-hidden border border-seam bg-[#f2f1eb]">
                <Image src="/assets/company/factory/factory-1.webp" alt="Starlinger RX 6.1 circular weaving looms at the KTK plant" fill sizes="30vw" className="object-cover" />
              </div>
              <div className="relative min-h-[190px] overflow-hidden border border-seam bg-[#f2f1eb]">
                <Image src="/assets/company/factory/warehouse-racking.jpg" alt="Racked pallet warehouse at the KTK plant" fill sizes="30vw" className="object-cover" />
              </div>
            </div>
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
                ["Production equipment", "The supplied archive documents circular weaving and bag-conversion equipment in KTK's established operation."],
                ["Specification support", "The KTK team confirms material, size, print, finish, order, and compatibility details before production."],
              ].map(([title, detail], index) => (
                <div key={title} className="group relative bg-iron p-8 transition duration-300 hover:-translate-y-1 hover:bg-coal hover:shadow-lift">
                  <p className="mono text-[0.62rem] text-red">{String(index + 1).padStart(2, "0")}</p>
                  <h2 className="display mt-3 text-2xl text-bone transition-colors group-hover:text-red">{title}</h2>
                  <p className="mt-4 text-sm leading-relaxed text-ash">{detail}</p>
                  <span className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-red transition-transform duration-300 group-hover:scale-x-100" />
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal className="mt-20">
            <p className="eyebrow">Factory gallery</p>
            <h2 className="display mt-4 text-4xl text-bone sm:text-5xl">Supplied production archive</h2>
            <p className="mt-5 max-w-3xl text-sm leading-relaxed text-ash">These images are presented with descriptive captions only. KTK asked that unverified process sequencing and technical factory claims remain unpublished.</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {/* Captions describe only what is visible in each supplied photograph.
                  Equipment is named where the machine itself carries the marking
                  (Starlinger RX 6.1 looms, twinTAPE winders). No production
                  sequence or capacity is inferred — KTK marked unverified factory
                  process claims as "Don't publish". */}
              {[
                ["site-aerial-front.jpg", "Aerial view of the KTK plant, Yangon"],
                ["site-aerial-full.jpg", "Full site from the air"],
                ["hall-overview.jpg", "Main hall with overhead travelling crane"],
                ["warehouse-racking.jpg", "Racked pallet warehouse"],
                ["factory-1.webp", "Starlinger RX 6.1 circular weaving looms"],
                ["factory-2.webp", "Loom hall and yarn creels"],
                ["tape-winder-line.jpg", "twinTAPE winding line"],
                ["factory-3.webp", "Woven fabric roll store"],
                ["printed-bag-conversion.jpg", "Printed bag cutting and conversion"],
                ["factory-4.webp", "Bag finishing and bundling"],
                ["site-aerial-top.jpg", "Plant footprint from directly above"],
                ["factory-exterior.webp", "Head office and plant entrance"],
              ].map(([file, caption]) => (
                <figure key={file} className="group border border-seam bg-iron p-3 transition-colors duration-300 hover:border-red">
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#f2f1eb]"><Image src={`/assets/company/factory/${file}`} alt={caption} fill sizes="(min-width: 1024px) 33vw, 50vw" className="object-cover transition duration-700 group-hover:scale-105" /></div>
                  <figcaption className="mono px-2 pb-1 pt-4 text-[0.62rem] uppercase tracking-[0.12em] text-bone-dim transition-colors group-hover:text-bone">{caption}</figcaption>
                </figure>
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
