import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { isCmsConfigured, isAdminConfigured } from "@/lib/supabase";
import { ADMIN_SECTIONS } from "@/lib/admin-content";

export default async function AdminDashboard() {
  await requireAdmin();

  const dbReady = isCmsConfigured();
  const writeReady = isAdminConfigured();

  return (
    <main className="admin-content">
      <div className="admin-page-head"><div><h1>Good day, KTK</h1><p>Manage the website, keep product information current, and publish approved company updates.</p></div></div>
      <div className="admin-stat-grid">
        <div className="admin-card admin-stat"><span>Content areas</span><strong>{ADMIN_SECTIONS.length}</strong><small>Products, pages and media</small></div>
        <div className="admin-card admin-stat"><span>Product catalogue</span><strong>11</strong><small>Current public catalogue</small></div>
        <div className="admin-card admin-stat"><span>Website status</span><strong style={{fontSize:18,marginTop:15}}>Online</strong><small>Production website available</small></div>
        <div className="admin-card admin-stat"><span>Publishing</span><strong style={{fontSize:18,marginTop:15}}>{writeReady ? "Ready" : "Setup needed"}</strong><small>Database write access</small></div>
      </div>
      <div className="admin-status-row">
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
        <div className="admin-card admin-setup" style={{marginTop:16}}>
          The site is currently serving its built-in seed content. To switch to the database, add{" "}
          <code className="mono text-bone">NEXT_PUBLIC_SUPABASE_URL</code>,{" "}
          <code className="mono text-bone">NEXT_PUBLIC_SUPABASE_ANON_KEY</code>, and{" "}
          <code className="mono text-bone">SUPABASE_SERVICE_ROLE_KEY</code> in Vercel, run{" "}
          <code className="mono text-bone">supabase/schema.sql</code>, then trigger the seed. Editing
          opens up once the database is connected.
        </div>
      )}

      <div className="admin-section-grid">
        {ADMIN_SECTIONS.map((section) => (
          <Link key={section.slug} href={`/admin/content/${section.slug}`} className="admin-card admin-section-card">
            <span>→</span><h2>{section.label}</h2><p>{section.description}</p><small>
              {writeReady ? "Open editor →" : "Waiting for database"}
            </small>
          </Link>
        ))}
      </div>
    </main>
  );
}

function StatusPill({ ok, label }: { ok: boolean; label: string }) {
  return (
    <span className={`admin-pill ${ok ? "" : "off"}`}>{label}</span>
  );
}
