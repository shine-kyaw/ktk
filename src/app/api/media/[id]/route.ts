import { NextResponse } from "next/server";
import { adminClient, MEDIA_BUCKET } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const db = adminClient();
  const { data: media } = await db
    .from("media_library")
    .select("storage_path,status")
    .eq("id", id)
    .eq("status", "published")
    .maybeSingle();
  if (!media?.storage_path) return new NextResponse("Not found", { status: 404 });

  const { data, error } = await db.storage.from(MEDIA_BUCKET).createSignedUrl(media.storage_path, 60 * 10);
  if (error || !data?.signedUrl) return new NextResponse("Not found", { status: 404 });
  return NextResponse.redirect(data.signedUrl, {
    headers: { "Cache-Control": "public, max-age=300, stale-while-revalidate=300" },
  });
}
