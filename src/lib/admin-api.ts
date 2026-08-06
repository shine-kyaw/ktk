import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { isAdminConfigured } from "@/lib/supabase";

export async function adminApiGuard(request: Request, mutation = false): Promise<NextResponse | null> {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  }
  if (!isAdminConfigured()) {
    return NextResponse.json({ error: "The CMS database is not configured." }, { status: 503 });
  }
  if (mutation && !isSameOrigin(request)) {
    return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  }
  return null;
}

function isSameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return process.env.NODE_ENV !== "production";
  try {
    return new URL(origin).host === new URL(request.url).host;
  } catch {
    return false;
  }
}

export const CMS_ACTOR = process.env.CMS_ADMIN_NAME || "KTK administrator";
