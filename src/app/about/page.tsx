import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { Stat } from "@/components/Stat";
import { STATS } from "@/data/products";

export const metadata: Metadata = { title: "Company" };

const VALUES = [
  {
    title: "Vision",
    body: "To be Myanmar's benchmark industrial packaging manufacturer — the supplier that national construction runs on.",
  },
  {
    title: "Mission",
    body: "Import and produce good-quality products only, with 100% quality assurance and one-stop service that fulfills customer satisfaction.",
  },
  {
    title: "Promise",
    body: "Every lot inspected. Every delivery on schedule. Every partner supported after the sale.",
  },
];

export default function AboutPage() {
  return (
    <div className="container-x pb-28 pt-40">
      <Reveal>
        <p className="eyebrow">Company</p>
        <h1 className="display mt-5 max-w-4xl text-5xl text-bone sm:text-7xl">
          Seventeen years of <span className="text-amber">industrial supply.</span>
        </h1>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-bone-dim">
          Kaung Thu Kha Trading Co., Ltd was founded in Yangon in 2008. What began as an
          industrial trading business — bearings, machinery, consumables — became a
          manufacturer in 2012, when our first STARLINGER cement sack lines were commissioned
          in Hlaing Thar Yar. Today KTK supplies sacks, woven bags, fillers, thread, and
          bag-closing machinery to construction and commodity industries across Myanmar.
        </p>
      </Reveal>

      <Reveal delay={0.1} className="mt-16">
        <div className="grid grid-cols-2 gap-10 border-y border-seam py-12 sm:grid-cols-4">
          {STATS.map((s) => (
            <Stat key={s.label} value={s.value} label={s.label} suffix={"suffix" in s ? s.suffix : ""} isYear={"isYear" in s && s.isYear} />
          ))}
        </div>
      </Reveal>

      <div className="mt-16 grid gap-px bg-seam md:grid-cols-3">
        {VALUES.map((v, i) => (
          <Reveal key={v.title} delay={i * 0.08} className="bg-iron">
            <div className="h-full p-8">
              <h2 className="display text-2xl text-amber">{v.title}</h2>
              <p className="mt-4 text-sm leading-relaxed text-bone-dim">{v.body}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-16">
        <h2 className="eyebrow">Leadership & facilities</h2>
        <p className="mt-5 max-w-xl text-sm leading-relaxed text-ash">
          Leadership profiles and facility documentation are being prepared with the KTK team
          and will be published here.
        </p>
      </Reveal>
    </div>
  );
}
