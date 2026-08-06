import crypto from "node:crypto";
import { NextResponse } from "next/server";
import { adminApiGuard, CMS_ACTOR } from "@/lib/admin-api";
import { adminClient, MEDIA_BUCKET } from "@/lib/supabase";

export const dynamic = "force-dynamic";

const ALLOWED: Record<string, { extension: string; max: number }> = {
  "image/jpeg": { extension: "jpg", max: 12 * 1024 * 1024 },
  "image/png": { extension: "png", max: 12 * 1024 * 1024 },
  "image/webp": { extension: "webp", max: 12 * 1024 * 1024 },
  "image/gif": { extension: "gif", max: 12 * 1024 * 1024 },
  "application/pdf": { extension: "pdf", max: 20 * 1024 * 1024 },
};

export async function POST(request: Request) {
  const denied = await adminApiGuard(request, true);
  if (denied) return denied;

  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File)) return NextResponse.json({ error: "Choose a file to upload." }, { status: 400 });
  const rule = ALLOWED[file.type];
  if (!rule) return NextResponse.json({ error: "Only JPEG, PNG, WebP, GIF, and PDF files are accepted." }, { status: 415 });
  if (file.size <= 0 || file.size > rule.max) return NextResponse.json({ error: "The selected file exceeds the permitted size." }, { status: 413 });

  const safeBase = file.name.replace(/\.[^.]+$/, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 70) || "media";
  const storagePath = `${new Date().toISOString().slice(0, 7)}/${safeBase}-${crypto.randomUUID()}.${rule.extension}`;
  const db = adminClient();
  const bytes = Buffer.from(await file.arrayBuffer());
  if (!hasValidSignature(bytes, file.type)) {
    return NextResponse.json({ error: "The file contents do not match the selected file type." }, { status: 415 });
  }
  const { error: uploadError } = await db.storage.from(MEDIA_BUCKET).upload(storagePath, bytes, { contentType: file.type, upsert: false });
  if (uploadError) return NextResponse.json({ error: uploadError.message }, { status: 400 });

  const id = crypto.randomUUID();
  const { data, error } = await db.from("media_library").insert({
    id,
    file_name: file.name,
    public_url: `/api/media/${id}`,
    storage_path: storagePath,
    mime_type: file.type,
    size_bytes: file.size,
    alt_text: String(form.get("alt_text") || "").trim(),
    caption: String(form.get("caption") || "").trim(),
    status: "draft",
    updated_by: CMS_ACTOR,
  }).select("*").single();
  if (error) {
    await db.storage.from(MEDIA_BUCKET).remove([storagePath]);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
  await db.from("audit_events").insert({ actor: CMS_ACTOR, action: "upload", section: "media_library", record_id: data.id, after_data: data });
  return NextResponse.json({ record: data }, { status: 201 });
}

function hasValidSignature(bytes: Buffer, mime: string): boolean {
  if (mime === "image/jpeg") return bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
  if (mime === "image/png") return bytes.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]));
  if (mime === "image/webp") return bytes.subarray(0, 4).toString("ascii") === "RIFF" && bytes.subarray(8, 12).toString("ascii") === "WEBP";
  if (mime === "image/gif") return ["GIF87a", "GIF89a"].includes(bytes.subarray(0, 6).toString("ascii"));
  if (mime === "application/pdf") return bytes.subarray(0, 5).toString("ascii") === "%PDF-";
  return false;
}
