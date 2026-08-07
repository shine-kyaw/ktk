import type { Metadata } from "next";
import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { Stat } from "@/components/Stat";
import { getStats, getMilestones, getValues, getPartners, getCompany, getManagement, getCertificates } from "@/lib/cms";

export const metadata: Metadata = { title: "Company", alternates: { canonical: "/about" } };

export default async function AboutPage() {
  const [stats, milestones, values, partners, company, management, certificates] = await Promise.all([
    getStats(),
    getMilestones(),
    getValues(),
    getPartners(),
    getCompany(),
    getManagement(),
    getCertificates(),
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
          Kaung Thu Kha Group Co., Ltd. operates as both a manufacturer and an authorized
          distribution house. We produce high-strength cement sacks and PP woven bags at our San
          Kaung factory on European STARLINGER lines—supplying approximately 55% of
          Myanmar&apos;s woven-bag market. Additionally, KTK serves as the sole authorized
          distributor for HCH bearings and YAO HAN machinery, providing a true one-stop supply
          chain partner for Myanmar&apos;s industrial sector.
        </p>
      </Reveal>

      <Reveal delay={0.08} className="mt-14">
        <div className="grid gap-4 lg:grid-cols-[1.45fr_0.55fr]">
          <div className="relative min-h-[360px] overflow-hidden border border-seam bg-[#f2f1eb] sm:min-h-[480px]">
            <Image src="/assets/cement/cement-bag-double-rhinos-first.webp" alt="KTK cement sack portfolio" fill priority sizes="(min-width: 1024px) 70vw, 100vw" className="object-cover" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 to-transparent p-8 pt-28">
              <p className="eyebrow text-white">Manufacturing & distribution</p>
              <p className="display mt-3 max-w-2xl text-3xl text-white">Built around the industries that move Myanmar.</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-1">
            <div className="relative min-h-[170px] overflow-hidden border border-seam bg-[#f2f1eb]">
              <Image src="/assets/products/machinery/newlong/ks16.webp" alt="NEWLONG bag-closing machinery supplied by KTK" fill sizes="(min-width: 1024px) 30vw, 50vw" className="object-contain p-5" />
            </div>
            <div className="relative min-h-[170px] overflow-hidden border border-seam bg-[#f2f1eb]">
              <Image src="/assets/products/bearings/hch/deep-groove.webp" alt="HCH bearings distributed by KTK" fill sizes="(min-width: 1024px) 30vw, 50vw" className="object-contain p-5" />
            </div>
          </div>
        </div>
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

      {management.length > 0 ? (
        <Reveal id="team" className="mt-20">
          <h2 className="eyebrow">Management team</h2>
          <div className="mt-8 grid gap-px bg-seam sm:grid-cols-2 lg:grid-cols-4">
            {management.map((person) => (
              <article key={person.id} className="bg-iron p-6">
                {person.image ? (
                  <div className="relative aspect-square overflow-hidden border border-seam bg-coal">
                    <Image src={person.image} alt={person.name} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" />
                  </div>
                ) : null}
                <h3 className="mt-5 text-base font-semibold text-bone">{person.name}</h3>
                <p className="mono mt-1 text-[0.64rem] uppercase tracking-[0.14em] text-red">{person.title}</p>
                {person.bio ? <p className="mt-4 text-sm leading-relaxed text-ash">{person.bio}</p> : null}
              </article>
            ))}
          </div>
        </Reveal>
      ) : null}

      {certificates.length > 0 ? (
        <Reveal className="mt-20">
          <h2 className="eyebrow">Certificates & authorizations</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {certificates.map((certificate) => (
              <article key={certificate.id} className="border border-seam bg-iron p-6">
                <p className="mono text-[0.58rem] uppercase tracking-[0.14em] text-red">{certificate.issuer || "Official document"}</p>
                <h3 className="display mt-3 text-xl text-bone">{certificate.title}</h3>
                {certificate.scope ? <p className="mt-3 text-sm leading-relaxed text-ash">{certificate.scope}</p> : null}
                {certificate.document_url ? <a href={certificate.document_url} target="_blank" rel="noreferrer" className="mono mt-5 inline-flex text-[0.62rem] uppercase tracking-[0.14em] text-red hover:text-bone">View document →</a> : null}
              </article>
            ))}
          </div>
        </Reveal>
      ) : null}

      {/* Office */}
      <div className="mt-20 border border-seam">
        <Reveal className="bg-iron">
          <div className="h-full p-8">
            <h2 className="eyebrow">Head office & plant</h2>
            <p className="mt-5 text-sm font-semibold text-bone">San Kaung factory · Yangon</p>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-bone-dim">
              {company.hq.line1}, {company.hq.line2}
            </p>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
