import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/Reveal";
import { ApplicationForm } from "@/components/ApplicationForm";
import { JOBS } from "@/data/careers";

export function generateStaticParams() {
  return JOBS.map((j) => ({ slug: j.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const job = JOBS.find((j) => j.slug === slug);
  return { title: job ? `${job.title} — Careers` : "Careers" };
}

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const job = JOBS.find((j) => j.slug === slug);
  if (!job) notFound();

  return (
    <div className="container-x pb-28 pt-40">
      <Reveal>
        <Link
          href="/careers"
          className="mono text-[0.66rem] uppercase tracking-[0.18em] text-ash hover:text-amber"
        >
          ← All positions
        </Link>
        <p className="eyebrow mt-8">
          {job.department} · {job.location} · {job.type}
        </p>
        <h1 className="display mt-5 max-w-3xl text-5xl text-bone sm:text-6xl">{job.title}</h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-bone-dim">{job.summary}</p>
      </Reveal>

      <div className="mt-16 grid gap-12 lg:grid-cols-2">
        <Reveal>
          <h2 className="eyebrow">Responsibilities</h2>
          <ul className="mt-6 space-y-4">
            {job.responsibilities.map((r) => (
              <li key={r} className="flex gap-4 text-sm leading-relaxed text-bone-dim">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-amber" />
                {r}
              </li>
            ))}
          </ul>

          <h2 className="eyebrow mt-12">Requirements</h2>
          <ul className="mt-6 space-y-4">
            {job.requirements.map((r) => (
              <li key={r} className="flex gap-4 text-sm leading-relaxed text-bone-dim">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-seam" />
                {r}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="border border-seam p-8">
            <h2 className="display text-2xl text-bone">Apply for this role</h2>
            <div className="mt-6">
              <ApplicationForm position={job.title} />
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
