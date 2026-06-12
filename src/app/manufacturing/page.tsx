import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = { title: "Manufacturing" };

const PROCESS = [
  { step: "Extrusion", detail: "PP tape extruded and drawn to specified denier on STARLINGER lines." },
  { step: "Weaving", detail: "Circular looms weave tape into tubular fabric, width to order." },
  { step: "Lamination & printing", detail: "Optional coating for moisture protection; flexo printing up to 6 colors." },
  { step: "Conversion", detail: "Cutting, folding, block-bottom forming, and stitching into finished sacks." },
  { step: "Quality control", detail: "Lot-level inspection — weight, tensile, print, and dimension checks before dispatch." },
];

export default function ManufacturingPage() {
  return (
    <>
      <section className="grain weave relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 90% at 90% 100%, rgb(242 169 0 / 0.13) 0%, transparent 55%)",
          }}
        />
        <div className="container-x relative pb-24 pt-44">
          <Reveal>
            <p className="eyebrow">Manufacturing</p>
            <h1 className="display mt-5 max-w-4xl text-5xl text-bone sm:text-7xl">
              From resin to <span className="text-amber">finished sack.</span>
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-bone-dim">
              Our Hlaing Thar Yar plant runs the full conversion chain on European STARLINGER
              technology — commissioned in 2012 and expanded since.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-seam">
        <div className="container-x py-24">
          <Reveal>
            <h2 className="eyebrow">The process</h2>
          </Reveal>
          <ol className="mt-10 divide-y divide-seam border-y border-seam">
            {PROCESS.map((p, i) => (
              <Reveal key={p.step} delay={i * 0.05}>
                <li className="group grid gap-3 py-8 transition-colors hover:bg-iron sm:grid-cols-[6rem_16rem_1fr] sm:items-baseline sm:px-4">
                  <span className="mono text-[0.7rem] text-amber">0{i + 1}</span>
                  <h3 className="display text-2xl text-bone transition-colors group-hover:text-amber">
                    {p.step}
                  </h3>
                  <p className="max-w-lg text-sm leading-relaxed text-ash">{p.detail}</p>
                </li>
              </Reveal>
            ))}
          </ol>

          <Reveal className="mt-16">
            <p className="mono max-w-2xl border border-dashed border-seam p-6 text-[0.68rem] uppercase leading-relaxed tracking-[0.14em] text-ash">
              Facility photography & equipment gallery — scheduled with the KTK team. This
              section is built to receive a cinematic photo set of the plant floor.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
