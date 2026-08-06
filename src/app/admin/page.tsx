import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { isCmsConfigured, isAdminConfigured } from "@/lib/supabase";
import { ADMIN_SECTIONS } from "@/lib/admin-content";

export default async function AdminDashboard() {
  await requireAdmin();

  const dbReady = isCmsConfigured();
  const writeReady = isAdminConfigured();

  return (
    <div className="container-x py-14">
      <p className="eyebrow">Dashboard</p>
      <h1 className="display mt-4 text-4xl text-bone">Content</h1>
      <p className="mt-3 max-w-xl text-sm leading-relaxed text-ash">
        Manage the product catalog, company content, newsroom, activities, leadership, and
        publication-controlled documents. Drafts remain private until an administrator publishes them.
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
        {ADMIN_SECTIONS.map((section) => (
          <Link key={section.slug} href={`/admin/content/${section.slug}`} className="group bg-coal p-6 transition-colors hover:bg-iron">
            <h2 className="display text-lg text-bone group-hover:text-red">{section.label}</h2>
            <p className="mt-2 text-sm leading-relaxed text-ash">{section.description}</p>
            <span
              className={`mono mt-5 inline-block text-[0.62rem] uppercase tracking-[0.16em] ${
                writeReady ? "text-red" : "text-ash/60"
              }`}
            >
              {writeReady ? "Open editor →" : "Waiting for database"}
            </span>
          </Link>
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
