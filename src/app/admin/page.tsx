import { requireAdmin } from "@/lib/auth";
import { isCmsConfigured, isAdminConfigured } from "@/lib/supabase";

const SECTIONS: { name: string; desc: string }[] = [
  { name: "Products", desc: "Catalog items, specs, applications, images, featured flag" },
  { name: "Product categories", desc: "The five category cards and their copy" },
  { name: "Services", desc: "Service offerings and bullet points" },
  { name: "Careers", desc: "Job openings, responsibilities, requirements" },
  { name: "News / Blog", desc: "Articles, excerpts, and body copy" },
  { name: "Activities", desc: "CSR, events, exhibitions, training" },
  { name: "Bag anatomy", desc: "Inside-the-bag layers and technical notes" },
  { name: "Company & stats", desc: "Company facts, stats, milestones, partners" },
];

export default async function AdminDashboard() {
  await requireAdmin();

  const dbReady = isCmsConfigured();
  const writeReady = isAdminConfigured();

  return (
    <div className="container-x py-14">
      <p className="eyebrow">Dashboard</p>
      <h1 className="display mt-4 text-4xl text-bone">Content</h1>
      <p className="mt-3 max-w-xl text-sm leading-relaxed text-ash">
        Edit the content that powers ktk-umber.vercel.app. Changes save to the database and
        appear on the live site.
      </p>

      {/* connection status */}
      <div className="mt-8 flex flex-wrap gap-3">
        <StatusPill
          ok={dbReady}
          label={dbReady ? "Database connected" : "Database not connected"}
        />
        <StatusPill
          ok={writeReady}
          label={writeReady ? "Write access ready" : "Write key missing"}
        />
      </div>

      {!dbReady && (
        <div className="mt-6 max-w-2xl border border-seam bg-iron p-5 text-sm leading-relaxed text-bone-dim">
          The site is currently serving its built-in seed content. To switch to the database, add{" "}
          <code className="mono text-bone">NEXT_PUBLIC_SUPABASE_URL</code>,{" "}
          <code className="mono text-bone">NEXT_PUBLIC_SUPABASE_ANON_KEY</code>, and{" "}
          <code className="mono text-bone">SUPABASE_SERVICE_ROLE_KEY</code> in Vercel, run{" "}
          <code className="mono text-bone">supabase/schema.sql</code>, then trigger the seed. Editing
          opens up once the database is connected.
        </div>
      )}

      {/* sections */}
      <div className="mt-12 grid gap-px bg-seam sm:grid-cols-2 lg:grid-cols-3">
        {SECTIONS.map((s) => (
          <div key={s.name} className="bg-coal p-6">
            <h2 className="display text-lg text-bone">{s.name}</h2>
            <p className="mt-2 text-sm leading-relaxed text-ash">{s.desc}</p>
            <span
              className={`mono mt-5 inline-block text-[0.62rem] uppercase tracking-[0.16em] ${
                dbReady ? "text-red" : "text-ash/60"
              }`}
            >
              {dbReady ? "Ready to edit" : "Waiting for database"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function StatusPill({ ok, label }: { ok: boolean; label: string }) {
  return (
    <span
      className={`mono inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-[0.62rem] uppercase tracking-[0.16em] ${
        ok ? "border-red/40 text-bone" : "border-seam text-ash"
      }`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${ok ? "bg-red" : "bg-ash"}`} />
      {label}
    </span>
  );
}
