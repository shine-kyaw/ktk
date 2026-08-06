import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { adminApiGuard, CMS_ACTOR } from "@/lib/admin-api";
import { getAdminSection, sanitizeAdminPayload } from "@/lib/admin-content";
import { adminClient } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function GET(request: Request, { params }: { params: Promise<{ section: string }> }) {
  const denied = await adminApiGuard(request);
  if (denied) return denied;
  const config = getAdminSection((await params).section);
  if (!config) return NextResponse.json({ error: "Unknown CMS section." }, { status: 404 });

  let query = adminClient().from(config.table).select("*");
  if (config.idField !== "key") query = query.order("sort_order", { ascending: true });
  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ records: data ?? [] });
}

export async function POST(request: Request, { params }: { params: Promise<{ section: string }> }) {
  const denied = await adminApiGuard(request, true);
  if (denied) return denied;
  const config = getAdminSection((await params).section);
  if (!config) return NextResponse.json({ error: "Unknown CMS section." }, { status: 404 });

  try {
    const payload = sanitizeAdminPayload(config, await request.json());
    payload.updated_by = CMS_ACTOR;
    payload.updated_at = new Date().toISOString();
    if (payload.status === "published") payload.published_at = new Date().toISOString();
    const { data, error } = await adminClient().from(config.table).insert(payload).select("*").single();
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    await audit("create", config.table, String(data[config.idField]), null, data);
    for (const path of config.revalidate) revalidatePath(path);
    return NextResponse.json({ record: data }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to create record." }, { status: 400 });
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
