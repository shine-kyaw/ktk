import type { Metadata } from "next";
import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { Stat } from "@/components/Stat";
import {
  COMPANY_PROFILE,
  GROUP_COMPANY_COUNT_WORD,
  LEADERSHIP_PROFILES,
  TEAM_PORTRAITS,
} from "@/content/company";
import { AboutScrollStory } from "@/components/about/AboutScrollStory";
import {
  getCertificates,
  getCompany,
  getIndustries,
  getManagement,
  getMilestones,
  getPartners,
  getStats,
} from "@/lib/cms";

export const metadata: Metadata = { title: "About KTK", alternates: { canonical: "/about" } };

const CORE_VALUES = ["Quality", "Integrity", "Innovation", "Customer Focus", "Teamwork", "Excellence", "Sustainability"];

function displayDate(value?: string | null) {
  if (!value) return null;
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(`${value}T00:00:00Z`));
}

export default async function AboutPage() {
  const [stats, milestones, partners, company, management, certificates, industries] = await Promise.all([
    getStats(), getMilestones(), getPartners(), getCompany(), getManagement(), getCertificates(), getIndustries(),
  ]);
  const displayedStats = stats.filter((stat) => stat.value !== 1991 && stat.label.toLowerCase() !== "manufacturing since");
  // The 2012 wording now lives in the milestone data itself (revision sheet 2,
  // item 5), so only the 1991 entry still needs filtering out here for CMS rows
  // that predate its removal.
  const displayedMilestones = milestones.filter((milestone) => milestone.year !== "1991");

  return (
    <div className="container-x pb-28 pt-40">
      <Reveal>
        <p className="eyebrow">About Kaung Thu Kha Group</p>
        <h1 className="display mt-5 max-w-5xl text-5xl text-bone sm:text-7xl">One group. <span className="text-red">{GROUP_COMPANY_COUNT_WORD} specialist companies.</span></h1>
        <div className="mt-8 max-w-4xl space-y-5 text-lg leading-relaxed text-bone-dim">
          {COMPANY_PROFILE.executiveSummary.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
      </Reveal>

      <Reveal delay={0.08} className="mt-14">
        <div className="grid gap-4 lg:grid-cols-[1.45fr_0.55fr]">
          <div className="relative min-h-[360px] overflow-hidden border border-seam bg-[#f2f1eb] sm:min-h-[500px]">
            {/* KTK's mock-up for revision sheet 2, item 1: the head-office and
                plant exterior leads this block, with the loom hall as the lower
                thumbnail. The Starlinger conversion-line photo that used to sit
                there was rejected in revision sheet 1, item 6. */}
            <Image src="/assets/company/factory/factory-exterior.webp" alt="Kaung Thu Kha Group head office and plant entrance" fill priority sizes="(min-width: 1024px) 70vw, 100vw" className="object-cover" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 to-transparent p-8 pt-28">
              <p className="eyebrow text-white">Manufacturing, trading & industrial supply</p>
              <p className="display mt-3 max-w-2xl text-3xl text-white">Built around the industries that move Myanmar.</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-1">
            <div className="relative min-h-[170px] overflow-hidden border border-seam bg-[#f2f1eb]"><Image src="/assets/company/factory/factory-1.webp" alt="Circular weaving equipment at the KTK manufacturing operation" fill sizes="(min-width: 1024px) 30vw, 50vw" className="object-cover" /></div>
            <div className="relative min-h-[170px] overflow-hidden border border-seam bg-[#f2f1eb]"><Image src="/assets/company/factory/factory-2.webp" alt="Starlinger circular loom hall and yarn creels at the KTK manufacturing operation" fill sizes="(min-width: 1024px) 30vw, 50vw" className="object-cover" /></div>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.1} className="mt-16"><div className="grid grid-cols-1 gap-10 border-y border-seam py-12 sm:grid-cols-3">{displayedStats.map((s) => <Stat key={s.label} value={s.value} label={s.label} suffix={s.suffix} isYear={s.isYear} />)}</div></Reveal>

      <AboutScrollStory />

      <Reveal className="mt-20">
        <p className="eyebrow">Products & services</p><h2 className="display mt-4 text-4xl text-bone sm:text-5xl">Industrial supply and packaging solutions</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="border border-seam bg-iron p-7"><h3 className="display text-2xl text-red">Industrial components & machinery</h3><ul className="mt-5 grid gap-2 text-sm text-bone-dim sm:grid-cols-2">{COMPANY_PROFILE.productsServices.industrial.map((item) => <li key={item}>• {item}</li>)}</ul></div>
          <div className="border border-seam bg-iron p-7"><h3 className="display text-2xl text-red">Packaging solutions</h3><ul className="mt-5 grid gap-2 text-sm text-bone-dim sm:grid-cols-2">{COMPANY_PROFILE.productsServices.packaging.map((item) => <li key={item}>• {item}</li>)}</ul></div>
        </div>
      </Reveal>

      <Reveal id="group-companies" className="mt-20 scroll-mt-28">
        <p className="eyebrow">Group structure</p><h2 className="display mt-4 text-4xl text-bone sm:text-5xl">Our group companies</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {COMPANY_PROFILE.groupCompanies.map((member, index) => <article key={member.name} className="group border border-seam bg-iron p-7 transition duration-300 hover:-translate-y-1 hover:border-red hover:bg-coal hover:shadow-lift"><p className="mono text-[0.62rem] uppercase tracking-[0.16em] text-red">Company {String(index + 1).padStart(2, "0")}</p><h3 className="display mt-3 text-2xl text-bone transition-colors group-hover:text-red">{member.name}</h3><p className="mt-4 text-sm leading-relaxed text-ash">{member.focus}</p>{member.website ? <a href={member.website} target="_blank" rel="noreferrer" className="mono mt-5 inline-flex text-[0.62rem] uppercase tracking-[0.14em] text-red hover:text-bone">Visit company website ↗</a> : null}</article>)}
        </div>
      </Reveal>

      <section id="leadership" className="mt-20 scroll-mt-28">
        <Reveal><p className="eyebrow">Leadership</p><h2 className="display mt-4 text-4xl text-bone sm:text-5xl">Directors & management</h2></Reveal>
        {management.length > 0 ? <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">{management.map((person, i) => <Reveal key={person.id} delay={(i % 5) * 0.05}><article className="group h-full border border-seam bg-iron p-4 transition duration-300 hover:-translate-y-1 hover:border-red hover:shadow-lift">{person.image ? <div className="relative aspect-[4/5] overflow-hidden bg-coal"><Image src={person.image} alt={person.name} fill sizes="(min-width: 1024px) 20vw, 50vw" className="object-cover transition duration-700 group-hover:scale-[1.03]" /></div> : null}<h3 className="mt-4 text-base font-semibold text-white">{person.name}</h3><p className="mt-1 text-sm font-medium text-white">{person.title}</p>{person.bio ? <p className="mt-4 text-sm leading-relaxed text-ash">{person.bio}</p> : null}</article></Reveal>)}</div> : <>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">{LEADERSHIP_PROFILES.map((person, index) => <Reveal key={person.name} delay={(index % 5) * 0.04}><article className="group relative mx-auto aspect-[4/5] w-full max-w-[15rem] overflow-hidden border border-seam bg-iron transition duration-300 hover:-translate-y-1 hover:border-red"><Image src={person.image} alt={`${person.name}, KTK director`} fill sizes="240px" className="object-cover transition duration-700 group-hover:scale-[1.03] group-focus-within:scale-[1.03]" /><div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/75 to-transparent p-4 pt-16"><h3 className="text-base font-semibold text-white">{person.name}</h3><p className="mt-1 text-sm font-medium text-white">Director</p></div></article></Reveal>)}</div>
        </>}
      </section>

      <Reveal className="mt-20">
        <p className="eyebrow">Our people</p>
        <h2 className="display mt-4 text-4xl text-bone sm:text-5xl">Sales & Marketing team</h2>
        <p className="mt-5 max-w-3xl text-sm leading-relaxed text-ash">The supplied staff archive does not include names or job titles, so the portraits are presented without invented labels.</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-3 xl:grid-cols-6">
          {TEAM_PORTRAITS.map((portrait, index) => <div key={portrait} className="group relative mx-auto aspect-[3/4] w-full max-w-[13rem] overflow-hidden border border-seam bg-iron"><Image src={portrait} alt={`KTK Sales and Marketing team portrait ${index + 1}`} fill sizes="208px" className="object-cover transition duration-500 group-hover:scale-105" /></div>)}
        </div>
      </Reveal>

      <Reveal className="mt-20"><p className="eyebrow">Core values</p><div className="mt-8 grid gap-px bg-seam sm:grid-cols-2 lg:grid-cols-4">{CORE_VALUES.map((value, index) => <div key={value} className="group relative bg-iron p-7 transition duration-300 hover:bg-coal"><p className="mono text-[0.62rem] text-ash transition-colors group-hover:text-red">{String(index + 1).padStart(2, "0")}</p><h3 className="display mt-3 text-2xl text-red transition-transform duration-300 group-hover:translate-x-1">{value}</h3><span className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-red transition-transform duration-300 group-hover:scale-x-100" /></div>)}</div></Reveal>
      <Reveal className="mt-20"><p className="eyebrow">Why choose KTK</p><div className="mt-8 grid gap-px bg-seam sm:grid-cols-2 lg:grid-cols-4">{COMPANY_PROFILE.reasons.map((reason) => <div key={reason} className="group bg-iron p-6 text-sm leading-relaxed text-bone-dim transition duration-300 hover:bg-coal hover:text-bone"><span className="mono mr-2 text-red transition-colors">＋</span>{reason}</div>)}</div></Reveal>
      <Reveal className="mt-20"><p className="eyebrow">Industries served</p><div className="mt-7 flex flex-wrap gap-2">{industries.map((industry) => <span key={industry} className="border border-seam bg-iron px-4 py-2 text-sm text-bone-dim transition duration-200 hover:-translate-y-0.5 hover:border-red hover:text-bone">{industry}</span>)}</div></Reveal>

      <Reveal id="history" className="mt-20 scroll-mt-28"><p className="eyebrow">Company history</p><ol className="relative mt-10 border-l border-seam pl-8">{displayedMilestones.map((milestone) => <li key={`${milestone.year}-${milestone.title}`} className="group relative pb-10 last:pb-0"><span className="absolute -left-[2.31rem] top-1 h-2.5 w-2.5 bg-red transition-transform duration-300 group-hover:scale-150" /><p className="mono text-[0.76rem] uppercase tracking-[0.16em] text-red">{milestone.year}</p><h3 className="mt-2 text-lg font-semibold text-bone transition-colors group-hover:text-red">{milestone.title}</h3><p className="mt-2 max-w-xl text-base leading-relaxed text-bone-dim">{milestone.text}</p></li>)}</ol></Reveal>

      <Reveal id="partners" className="mt-20 scroll-mt-28"><p className="eyebrow">Technology & brand partners</p><div className="mt-8 grid gap-px bg-seam sm:grid-cols-2 lg:grid-cols-3">{partners.map((partner) => <div key={partner.name} className="group bg-iron p-6 transition duration-300 hover:-translate-y-1 hover:bg-coal hover:shadow-lift"><p className="display text-lg text-bone transition-colors group-hover:text-red">{partner.name}</p><p className="mono mt-1 text-[0.6rem] uppercase tracking-[0.14em] text-red">{partner.origin}</p><p className="mt-3 text-sm leading-relaxed text-ash">{partner.note}</p></div>)}</div></Reveal>

      <Reveal id="certificates" className="mt-20 scroll-mt-28">
        <p className="eyebrow">Certificates & authorizations</p><h2 className="display mt-4 text-4xl text-bone sm:text-5xl">Supplied official records</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2">{certificates.map((certificate) => <article id={certificate.id} key={certificate.id} className={`group scroll-mt-28 grid gap-6 border border-seam bg-iron p-6 transition duration-300 hover:-translate-y-1 hover:border-red hover:shadow-lift ${certificate.image ? "sm:grid-cols-[9rem_1fr]" : ""}`}>{certificate.image ? <div className="relative aspect-[3/4] overflow-hidden border border-seam bg-white"><Image src={certificate.image} alt={`${certificate.title} document preview`} fill sizes="144px" className="object-contain transition duration-500 group-hover:scale-[1.03]" /></div> : null}<div><p className="mono text-[0.58rem] uppercase tracking-[0.14em] text-red">{certificate.issuer || "Official document"}</p><h3 className="display mt-3 text-xl text-bone">{certificate.title}</h3>{certificate.scope ? <p className="mt-3 text-sm leading-relaxed text-ash">{certificate.scope}</p> : null}<dl className="mt-4 space-y-1 text-xs text-bone-dim">{certificate.issued_on ? <div><dt className="inline text-ash">Issued: </dt><dd className="inline">{displayDate(certificate.issued_on)}</dd></div> : null}{certificate.expires_on ? <div><dt className="inline text-ash">Expiry stated: </dt><dd className="inline">{displayDate(certificate.expires_on)}</dd></div> : null}</dl>{certificate.document_url ? <a href={certificate.document_url} target="_blank" rel="noreferrer" className="mono mt-5 inline-flex text-[0.62rem] uppercase tracking-[0.14em] text-red hover:text-bone">View supplied document →</a> : null}</div></article>)}</div>
      </Reveal>

      <Reveal className="mt-20 border border-seam bg-iron p-8"><p className="eyebrow">Head office</p><p className="mt-5 text-sm font-semibold text-bone">{company.legalName}</p><p className="mt-2 max-w-2xl text-sm leading-relaxed text-bone-dim">{company.hq.line1}, {company.hq.line2}</p><a href={company.mapsUrl} target="_blank" rel="noreferrer" className="mono mt-5 inline-flex text-[0.62rem] uppercase tracking-[0.14em] text-red hover:text-bone">Open map ↗</a></Reveal>
    </div>
  );
}
