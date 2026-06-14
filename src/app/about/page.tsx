import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { Stat } from "@/components/Stat";
import { getStats, getMilestones, getValues, getPartners, getCompany } from "@/lib/cms";

export const metadata: Metadata = { title: "Company" };

const TEAM = [
  { role: "Managing Director", name: "To be published" },
  { role: "Head of Production", name: "To be published" },
  { role: "Head of Sales & Distribution", name: "To be published" },
  { role: "Head of Quality", name: "To be published" },
];

export default async function AboutPage() {
  const [stats, milestones, values, partners, company] = await Promise.all([
    getStats(),
    getMilestones(),
    getValues(),
    getPartners(),
    getCompany(),
  ]);

  return (
    <div className="container-x pb-28 pt-40">
      {/* Overview */}
      <Reveal>
        <p className="eyebrow">Company</p>
        <h1 className="display mt-5 max-w-4xl text-5xl text-bone sm:text-7xl">
          Two businesses.
          <br />
          One <span className="text-red">supply chain.</span>
        </h1>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-bone-dim">
          {company.legalName}, part of the {company.group}, is both a manufacturer and a
          distribution house. It manufactures cement sacks and PP woven bags at the San Kaung
          factory on European STARLINGER lines — holding roughly 55% of Myanmar&apos;s woven-bag
          market — and it is the country&apos;s sole authorized distributor for HCH bearings and
          YAO HAN machinery. Together that makes KTK a one-stop partner for the industries that
          build Myanmar.
        </p>
      </Reveal>

      <Reveal delay={0.1} className="mt-16">
        <div className="grid grid-cols-2 gap-10 border-y border-seam py-12 sm:grid-cols-4">
          {stats.map((s) => (
            <Stat key={s.label} value={s.value} label={s.label} suffix={s.suffix} isYear={s.isYear} />
          ))}
        </div>
      </Reveal>

      {/* Vision / mission / values */}
      <Reveal className="mt-20">
        <h2 className="eyebrow">What we stand for</h2>
      </Reveal>
      <div className="mt-8 grid gap-px bg-seam md:grid-cols-2">
        {values.map((v, i) => (
          <Reveal key={v.title} delay={(i % 2) * 0.08} className="bg-iron">
            <div className="h-full p-8">
              <h3 className="display text-2xl text-red">{v.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-bone-dim">{v.body}</p>
            </div>
          </Reveal>
        ))}
      </div>

      {/* History */}
      <Reveal id="history" className="mt-20">
        <h2 className="eyebrow">Company history</h2>
        <ol className="relative mt-10 border-l border-seam pl-8">
          {milestones.map((m) => (
            <li key={m.year} className="relative pb-10 last:pb-0">
              <span className="absolute -left-[2.31rem] top-1 h-2.5 w-2.5 bg-red" />
              <p className="mono text-[0.7rem] uppercase tracking-[0.2em] text-red">{m.year}</p>
              <h3 className="mt-2 font-semibold text-bone">{m.title}</h3>
              <p className="mt-1 max-w-md text-sm leading-relaxed text-bone-dim">{m.text}</p>
            </li>
          ))}
        </ol>
      </Reveal>

      {/* Partners */}
      <Reveal id="partners" className="mt-20">
        <h2 className="eyebrow">Technology & brand partners</h2>
        <div className="mt-8 grid gap-px bg-seam sm:grid-cols-2 lg:grid-cols-3">
          {partners.map((p) => (
            <div key={p.name} className="bg-iron p-6">
              <p className="display text-lg text-bone">{p.name}</p>
              <p className="mono mt-1 text-[0.6rem] uppercase tracking-[0.14em] text-red">
                {p.origin}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ash">{p.note}</p>
            </div>
          ))}
        </div>
      </Reveal>

      {/* Management team */}
      <Reveal id="team" className="mt-20">
        <h2 className="eyebrow">Management team</h2>
        <div className="mt-8 grid gap-px bg-seam sm:grid-cols-2 lg:grid-cols-4">
          {TEAM.map((t) => (
            <div key={t.role} className="bg-iron p-7">
              <div className="weave grain relative aspect-square border border-seam bg-coal" />
              <h3 className="mt-5 text-base font-semibold text-bone">{t.name}</h3>
              <p className="mono mt-1 text-[0.64rem] uppercase tracking-[0.16em] text-ash">{t.role}</p>
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
            <h2 className="eyebrow">Head office & plant</h2>
            <p className="mt-5 text-sm font-semibold text-bone">San Kaung factory · Yangon</p>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-bone-dim">
              {company.hq.line1}, {company.hq.line2}
            </p>
            <p className="mono mt-5 text-[0.64rem] uppercase tracking-[0.14em] text-ash">
              Branch & dealer network — to be published.
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.08} className="bg-iron">
          <div className="h-full p-8">
            <h2 className="eyebrow">Certifications & quality</h2>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-bone-dim">
              Production runs to specification on European STARLINGER technology using virgin
              food-grade SABIC resin, with a 100% quality-assurance pledge and lot-level
              inspection. Distributed brands carry their own credentials — HCH bearings are
              ISO/TS 16949 certified by TÜV; YAO HAN machinery is CE / ISO9002. KTK&apos;s own
              certifications are being compiled for publication.
            </p>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
