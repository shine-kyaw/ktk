import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { getServices } from "@/lib/cms";

export const metadata: Metadata = { title: "Services" };

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <div className="container-x pb-28 pt-40">
      <Reveal>
        <p className="eyebrow">Services</p>
        <h1 className="display mt-5 max-w-3xl text-5xl text-bone sm:text-7xl">
          One-stop service to fulfill <span className="text-amber">customer satisfaction.</span>
        </h1>
        <p className="mt-6 max-w-xl leading-relaxed text-ash">
          A professional marketing team that serves door-to-door, a strong after-sales team that
          solves problems on-site, and technical support that gives value beyond the price —
          from specification to spare parts.
        </p>
      </Reveal>

      <div className="mt-16 divide-y divide-seam border-y border-seam">
        {services.map((s, i) => (
          <Reveal key={s.slug} delay={i * 0.05}>
            <article className="group grid gap-6 py-10 transition-colors hover:bg-iron sm:px-4 lg:grid-cols-[5rem_minmax(0,22rem)_1fr]">
              <span className="mono text-[0.7rem] text-amber">0{i + 1}</span>
              <h2 className="display text-2xl text-bone transition-colors group-hover:text-amber sm:text-3xl">
                {s.name}
              </h2>
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
            className="press mono bg-amber px-7 py-4 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-coal hover:bg-bone"
          >
            Send an inquiry
          </Link>
        </div>
      </Reveal>
    </div>
  );
}
