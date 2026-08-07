import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { getServices } from "@/lib/cms";

export const metadata: Metadata = { title: "Services", alternates: { canonical: "/services" } };

const serviceImages = [
  "/assets/products/pp-woven/general/master-chef-dinurado.webp",
  "/assets/products/pp-woven/bopp/kujaku-fertilizer.webp",
  "/assets/products/machinery/newlong/np-7.webp",
  "/assets/products/thread/ktk-multicolor.webp",
  "/assets/products/machinery/yaohan/facc-n980ac.webp",
];

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <div className="container-x pb-28 pt-40">
      <Reveal>
        <p className="eyebrow">Services</p>
        <h1 className="display mt-5 max-w-3xl text-5xl text-bone sm:text-7xl">
          One-stop service to fulfill <span className="text-red">customer satisfaction.</span>
        </h1>
        <p className="mt-6 max-w-xl leading-relaxed text-ash">
          A professional marketing team that serves door-to-door, a strong after-sales team that
          solves problems on-site, and technical support that gives value beyond the price , 
          from specification to spare parts.
        </p>
      </Reveal>

      <Reveal delay={0.08} className="mt-14">
        <div className="grid min-h-[360px] overflow-hidden border border-seam sm:grid-cols-3">
          {[
            ["/assets/products/machinery/yaohan/facc-n980ac.webp", "YAO HAN industrial bag-closing machinery"],
            ["/assets/products/thread/ktk-multicolor.webp", "KTK bag-closing thread range"],
            ["/assets/products/bearings/tr/omega-unit-bearing.webp", "TR Omega bearing supplied by KTK"],
          ].map(([src, alt]) => (
            <div key={src} className="relative min-h-[240px] bg-[#f2f1eb] sm:min-h-[360px]">
              <Image src={src} alt={alt} fill sizes="(min-width: 640px) 33vw, 100vw" className="object-contain p-6" />
            </div>
          ))}
        </div>
      </Reveal>

      <div className="mt-16 divide-y divide-seam border-y border-seam">
        {services.map((s, i) => (
          <Reveal key={s.slug} delay={i * 0.05}>
            <article className="group grid gap-6 py-10 transition-colors hover:bg-iron sm:px-4 lg:grid-cols-[5rem_minmax(0,17rem)_9rem_1fr] lg:items-center">
              <span className="mono text-[0.7rem] text-red">0{i + 1}</span>
              <h2 className="display text-2xl text-bone transition-colors group-hover:text-red sm:text-3xl">
                {s.name}
              </h2>
              <div className="relative aspect-square overflow-hidden border border-seam bg-[#f2f1eb]">
                <Image src={serviceImages[i % serviceImages.length]} alt={`${s.name} at KTK`} fill sizes="9rem" className="object-contain p-3 transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div>
                <p className="max-w-xl text-sm leading-relaxed text-ash">{s.summary}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {s.points.map((p) => (
                    <li
                      key={p}
                      className="mono border border-seam px-3 py-1.5 text-[0.62rem] uppercase tracking-[0.14em] text-bone-dim"
                    >
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-14">
        <div className="flex flex-wrap items-center justify-between gap-6 border border-seam bg-iron p-8">
          <p className="display max-w-md text-2xl text-bone">Need a service not listed here?</p>
          <Link
            href="/contact"
            className="press mono bg-red px-7 py-4 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-bone hover:bg-bone hover:text-coal"
          >
            Send an inquiry
          </Link>
        </div>
      </Reveal>
    </div>
  );
}
