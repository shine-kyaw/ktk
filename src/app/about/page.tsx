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
    title: "Core values",
    body: "Quality without compromise. Reliability in every delivery. Partnership after the sale. Respect for our people and community.",
  },
];

const HISTORY = [
  { year: "2008", text: "Kaung Thu Kha founded in Yangon — bearings and industrial trading." },
  { year: "2009", text: "Appointed distributor for NEWLONG bag-closing machinery (Japan)." },
  { year: "2012", text: "Own cement sack production begins on STARLINGER European lines." },
  { year: "2013", text: "YAO HAN (Taiwan) machinery partnership; product range expands." },
  { year: "Today", text: "Full industrial packaging supplier — sacks, bags, fillers, thread, machinery." },
];

const TEAM = [
  { role: "Managing Director", name: "To be published" },
  { role: "Head of Production", name: "To be published" },
  { role: "Head of Sales & Distribution", name: "To be published" },
  { role: "Head of Quality", name: "To be published" },
];

export default function AboutPage() {
  return (
    <div className="container-x pb-28 pt-40">
      {/* Overview */}
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

      {/* Vision / mission / values */}
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

      {/* History */}
      <Reveal className="mt-20">
        <h2 className="eyebrow">Company history</h2>
        <ol className="relative mt-10 border-l border-seam pl-8">
          {HISTORY.map((m) => (
            <li key={m.year} className="relative pb-10 last:pb-0">
              <span className="absolute -left-[2.31rem] top-1 h-2.5 w-2.5 bg-amber" />
              <p className="mono text-[0.7rem] uppercase tracking-[0.2em] text-amber">{m.year}</p>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-bone-dim">{m.text}</p>
            </li>
          ))}
        </ol>
      </Reveal>

      {/* Management team */}
      <Reveal className="mt-20">
        <h2 className="eyebrow">Management team</h2>
        <div className="mt-8 grid gap-px bg-seam sm:grid-cols-2 lg:grid-cols-4">
          {TEAM.map((t) => (
            <div key={t.role} className="bg-iron p-7">
              <div className="weave grain relative aspect-square border border-seam bg-coal" />
              <h3 className="mt-5 text-base font-semibold text-bone">{t.name}</h3>
              <p className="mono mt-1 text-[0.64rem] uppercase tracking-[0.16em] text-ash">
                {t.role}
              </p>
            </div>
          ))}
        </div>
        <p className="mono mt-5 text-[0.64rem] uppercase tracking-[0.14em] text-ash">
          Profiles & organization chart — being prepared with the KTK team.
        </p>
      </Reveal>

      {/* Offices & certifications */}
      <div className="mt-20 grid gap-px bg-seam lg:grid-cols-2">
        <Reveal className="bg-iron">
          <div className="h-full p-8">
            <h2 className="eyebrow">Offices & plant</h2>
            <p className="mt-5 text-sm font-semibold text-bone">Head office & factory</p>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-bone-dim">
              No. (178), Twin Thin Taik U Htun Nyo Street, Zone (2), Hlaing Thar Yar Township,
              Yangon, Myanmar
            </p>
            <p className="mono mt-5 text-[0.64rem] uppercase tracking-[0.14em] text-ash">
              Branch network — to be published.
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.08} className="bg-iron">
          <div className="h-full p-8">
            <h2 className="eyebrow">Certifications & awards</h2>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-bone-dim">
              Quality documentation and certifications are being compiled for publication.
              Production runs to specification on European STARLINGER technology with
              lot-level inspection.
            </p>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
