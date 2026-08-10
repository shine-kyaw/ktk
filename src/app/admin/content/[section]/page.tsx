import Link from "next/link";
import { notFound } from "next/navigation";
import { AdminCollectionList } from "@/components/admin/AdminCollectionList";
import { AdminMediaUploader } from "@/components/admin/AdminMediaUploader";
import { getAdminSection } from "@/lib/admin-content";
import { requireAdmin } from "@/lib/auth";
import { isAdminConfigured } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export default async function AdminSectionPage({ params }: { params: Promise<{ section: string }> }) {
  await requireAdmin();
  const config = getAdminSection((await params).section);
  if (!config) notFound();

  return (
    <main className="admin-content">
      <Link href="/admin" className="admin-breadcrumb">Overview <span>/</span> {config.label}</Link>
      <div className="admin-page-head"><div><h1>{config.label}</h1><p>{config.description}</p></div></div>
      <div>
        {config.slug === "media-library" && isAdminConfigured() ? <AdminMediaUploader /> : null}
        <AdminCollectionList section={config} enabled={isAdminConfigured()} />
      </div>
    </main>
  );
}
