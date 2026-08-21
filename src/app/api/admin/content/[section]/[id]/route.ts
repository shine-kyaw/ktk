import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { adminApiGuard, CMS_ACTOR } from "@/lib/admin-api";
import { getAdminSection, sanitizeAdminPayload } from "@/lib/admin-content";
import { adminClient } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ section: string; id: string }> },
) {
  const denied = await adminApiGuard(request, true);
  if (denied) return denied;
  const { section, id } = await params;
  const config = getAdminSection(section);
  if (!config) return NextResponse.json({ error: "Unknown CMS section." }, { status: 404 });

  try {
    const db = adminClient();
    const { data: before } = await db.from(config.table).select("*").eq(config.idField, id).maybeSingle();
    if (!before) return NextResponse.json({ error: "Record not found." }, { status: 404 });
    const payload = sanitizeAdminPayload(config, await request.json());
    payload.updated_by = CMS_ACTOR;
    payload.updated_at = new Date().toISOString();
    if (payload.status === "published" && before.status !== "published") payload.published_at = new Date().toISOString();
    const { data, error } = await db.from(config.table).update(payload).eq(config.idField, id).select("*").single();
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    await audit("update", config.table, id, before, data);
    revalidate(config.revalidate, config.table, before, data);
    return NextResponse.json({ record: data });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to update record." }, { status: 400 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ section: string; id: string }> },
) {
  const denied = await adminApiGuard(request, true);
  if (denied) return denied;
  const { section, id } = await params;
  const config = getAdminSection(section);
  if (!config) return NextResponse.json({ error: "Unknown CMS section." }, { status: 404 });

  const db = adminClient();
  const { data: before } = await db.from(config.table).select("*").eq(config.idField, id).maybeSingle();
  if (!before) return NextResponse.json({ error: "Record not found." }, { status: 404 });
  const { data, error } = await db
    .from(config.table)
    .update({ status: "archived", updated_by: CMS_ACTOR, updated_at: new Date().toISOString() })
    .eq(config.idField, id)
    .select("*")
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  await audit("archive", config.table, id, before, data);
  revalidate(config.revalidate, config.table, before, data);
  return NextResponse.json({ record: data });
}

function revalidate(paths: string[], table: string, before: Record<string, unknown>, after: Record<string, unknown>) {
  for (const path of paths) revalidatePath(path);
  const prefix = table === "products" ? "/products" : table === "news" ? "/blog" : table === "jobs" ? "/careers" : "";
  if (!prefix) return;
  for (const slug of new Set([before.slug, after.slug].filter(Boolean).map(String))) {
    revalidatePath(`${prefix}/${slug}`);
  }
}

async function audit(action: string, section: string, recordId: string, before: unknown, after: unknown) {
  const { error } = await adminClient().from("audit_events").insert({
    actor: CMS_ACTOR,
    action,
    section,
    record_id: recordId,
    before_data: before,
    after_data: after,
  });
  if (error) console.error("[cms audit]", error.message);
}
