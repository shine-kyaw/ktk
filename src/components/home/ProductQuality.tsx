import { Reveal } from "@/components/Reveal";

type Pillar = { tag: string; title: string; body: string };

/**
 * "Product Quality" band — what makes a KTK bag dependable. Sits just before
 * the dark "Inside the bag" teardown so the teardown reads as the evidence
 * for these pillars. Content comes from getQualityPillars() (CMS seam).
 */
export function ProductQuality({ pillars }: { pillars: Pillar[] }) {
  return (
    <section className="paper relative overflow-hidden border-t border-seam">
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(90% 80% at 100% 0%, rgb(47 49 141 / 0.06) 0%, transparent 55%)" }}
      />
      <div className="container-x relative py-24">
        <Reveal>
          <div className="grid gap-7 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <p className="eyebrow">Product quality</p>
              <h2 className="section-title text-bone">
                Why KTK bags are <span className="text-red">dependable.</span>
              </h2>
            </div>
            <p className="section-copy border-l border-seam pl-5 text-sm text-ash lg:col-span-3 lg:col-start-10 lg:pl-7">
              Every bag is the sum of five decisions: material, strength, durability,
              consistency, and the line it is made on.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {pillars.map((p, i) => (
            <Reveal key={p.tag} delay={(i % 5) * 0.06}>
              <div className="flex h-full flex-col border-t border-seam py-6">
                <span className="mono text-[0.6rem] uppercase tracking-[0.2em] text-red">{p.tag}</span>
                <h3 className="mt-3 text-lg font-semibold leading-snug text-bone">{p.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-ash">{p.body}</p>
                <span className="mono mt-6 text-[0.62rem] text-bone-dim">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="mono mt-12 border-t border-seam pt-6 text-left text-[0.66rem] uppercase tracking-[0.18em] text-ash sm:text-right">
            See it taken apart, layer by layer <span className="text-red">↓</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
