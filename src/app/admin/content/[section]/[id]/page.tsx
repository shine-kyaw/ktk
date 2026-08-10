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
    <main className="admin-content">
      <Link href={`/admin/content/${config.slug}`} className="admin-breadcrumb">{config.label} <span>/</span> {id === "new" ? "New" : "Edit"}</Link>
      <div className="admin-page-head"><div><h1>{id === "new" ? `New ${config.label}` : String(record?.[config.titleField] || "Edit record")}</h1><p>{id === "new" ? "Create a new entry and choose when it should be published." : "Update the content below. Changes are applied when you save."}</p></div></div>
      <AdminRecordForm section={config} record={record} />
    </main>
  );
}
