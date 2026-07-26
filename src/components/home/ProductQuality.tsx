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
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow">Product quality</p>
              <h2 className="display mt-5 max-w-2xl text-4xl text-bone sm:text-5xl">
                Why KTK bags are <span className="text-red">dependable.</span>
              </h2>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-ash">
              Every bag is the sum of five decisions: material, strength, durability,
              consistency, and the line it is made on.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-x-7 gap-y-8 sm:grid-cols-2 lg:grid-cols-5">
          {pillars.map((p, i) => (
            <Reveal key={p.tag} delay={(i % 5) * 0.06}>
              <div className="flex h-full flex-col border-t border-seam py-6">
                <span className="mono text-[0.6rem] uppercase tracking-[0.2em] text-red">{p.tag}</span>
                <h3 className="mt-3 text-lg font-semibold leading-tight text-bone">{p.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-ash">{p.body}</p>
                <span className="mono mt-6 text-[0.62rem] text-bone-dim">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="mono mt-10 text-right text-[0.66rem] uppercase tracking-[0.18em] text-ash">
            See it taken apart, layer by layer <span className="text-red">↓</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
