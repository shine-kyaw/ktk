import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { getJobs, getRecruitmentProcess } from "@/lib/cms";

export const metadata: Metadata = { title: "Careers" };

export default async function CareersPage() {
  const [jobs, process] = await Promise.all([getJobs(), getRecruitmentProcess()]);

  return (
    <div className="container-x pb-28 pt-40">
      <Reveal>
        <p className="eyebrow">Careers</p>
        <h1 className="display mt-5 max-w-3xl text-5xl text-bone sm:text-7xl">
          Build what the country <span className="text-red">builds with.</span>
        </h1>
        <p className="mt-6 max-w-xl leading-relaxed text-ash">
          Join a team of more than 2,000 people manufacturing Myanmar&apos;s industrial
          packaging, on the plant floor, in the field, and across the country.
        </p>
      </Reveal>

      <Reveal className="mt-16">
        <h2 className="eyebrow">Open positions</h2>
      </Reveal>
      <div className="mt-6 divide-y divide-seam border-y border-seam">
        {jobs.map((j, i) => (
          <Reveal key={j.slug} delay={i * 0.05}>
            <Link
              href={`/careers/${j.slug}`}
              className="group grid gap-2 py-7 transition-colors hover:bg-iron sm:grid-cols-[1fr_12rem_8rem_6rem] sm:items-baseline sm:gap-6 sm:px-4"
            >
              <h3 className="display text-xl text-bone transition-colors group-hover:text-red sm:text-2xl">
                {j.title}
              </h3>
              <span className="mono text-[0.66rem] uppercase tracking-[0.14em] text-ash">
                {j.department}
              </span>
              <span className="mono text-[0.66rem] uppercase tracking-[0.14em] text-ash">
                {j.location}
              </span>
              <span className="mono text-right text-[0.66rem] uppercase tracking-[0.14em] text-red opacity-0 transition-opacity group-hover:opacity-100">
                View →
              </span>
            </Link>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-20">
        <h2 className="eyebrow">How hiring works</h2>
        <div className="mt-8 grid gap-px bg-seam sm:grid-cols-2 lg:grid-cols-4">
          {process.map((p, i) => (
            <div key={p.step} className="bg-iron p-7">
              <span className="mono text-[0.64rem] text-red">0{i + 1}</span>
              <h3 className="display mt-3 text-xl text-bone">{p.step}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ash">{p.detail}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </div>
  );
}
