import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/Reveal";
import { getActivities } from "@/lib/cms";

export const metadata: Metadata = { title: "Activities", alternates: { canonical: "/activities" } };

const CATS = ["CSR", "Events", "Exhibitions", "Training"] as const;

export default async function ActivitiesPage() {
  const activities = await getActivities();
  if (activities.length === 0) notFound();

  return (
    <div className="container-x pb-28 pt-40">
      <Reveal>
        <p className="eyebrow">Activities</p>
        <h1 className="display mt-5 max-w-3xl text-5xl text-bone sm:text-7xl">
          Beyond the <span className="text-red">plant floor.</span>
        </h1>
        <p className="mt-6 max-w-xl leading-relaxed text-ash">
          CSR programs, company events, exhibitions, and training, the work that builds the
          company behind the products.
        </p>
      </Reveal>

      {CATS.map((cat) => {
        const items = activities.filter((a) => a.category === cat);
        if (items.length === 0) return null;
        return (
          <section key={cat} className="mt-16">
            <Reveal>
              <h2 className="display border-b border-seam pb-4 text-2xl text-bone sm:text-3xl">
                {cat}
              </h2>
            </Reveal>
            <div className="mt-px grid gap-px bg-seam sm:grid-cols-2">
              {items.map((a) => (
                <Reveal key={a.slug} className="bg-coal">
                  <article className="group h-full p-7 transition-colors hover:bg-iron">
                    <div className="relative aspect-[16/9] overflow-hidden border border-seam bg-iron">
                      {a.image ? <Image src={a.image} alt={a.title} fill sizes="(min-width: 640px) 50vw, 100vw" className="object-cover" /> : null}
                    </div>
                    <p className="mono mt-5 text-[0.64rem] uppercase tracking-[0.18em] text-red">
                      {a.date}
                    </p>
                    <h3 className="mt-2 text-lg font-semibold text-bone">{a.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ash">{a.detail}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
