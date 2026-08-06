import Link from "next/link";
import { notFound } from "next/navigation";
import { AdminRecordForm } from "@/components/admin/AdminRecordForm";
import { getAdminSection } from "@/lib/admin-content";
import { requireAdmin } from "@/lib/auth";
import { adminClient, isAdminConfigured } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export default async function AdminRecordPage({ params }: { params: Promise<{ section: string; id: string }> }) {
  await requireAdmin();
  const { section, id } = await params;
  const config = getAdminSection(section);
  if (!config) notFound();
  if (!isAdminConfigured()) notFound();

  let record: Record<string, unknown> | null = null;
  if (id !== "new") {
    const { data } = await adminClient().from(config.table).select("*").eq(config.idField, decodeURIComponent(id)).maybeSingle();
    if (!data) notFound();
    record = data as Record<string, unknown>;
  }

  return (
    <main className="container-x max-w-4xl py-12">
      <Link href={`/admin/content/${config.slug}`} className="mono text-[0.64rem] uppercase tracking-[0.14em] text-ash hover:text-red">← {config.label}</Link>
      <p className="eyebrow mt-8">{id === "new" ? "Create content" : "Edit content"}</p>
      <h1 className="display mt-4 text-4xl text-bone">{id === "new" ? `New ${config.label}` : String(record?.[config.titleField] || "Edit record")}</h1>
      <div className="mt-10"><AdminRecordForm section={config} record={record} /></div>
    </main>
  );
}
