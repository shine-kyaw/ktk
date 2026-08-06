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
    <main className="container-x py-12">
      <Link href="/admin" className="mono text-[0.64rem] uppercase tracking-[0.14em] text-ash hover:text-red">← Dashboard</Link>
      <p className="eyebrow mt-8">Content section</p>
      <h1 className="display mt-4 text-4xl text-bone">{config.label}</h1>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ash">{config.description}</p>
      <div className="mt-10">
        {config.slug === "media-library" && isAdminConfigured() ? <AdminMediaUploader /> : null}
        <AdminCollectionList section={config} enabled={isAdminConfigured()} />
      </div>
    </main>
  );
}
