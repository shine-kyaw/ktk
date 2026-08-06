import { NextResponse } from "next/server";
import { checkPassword, createSessionToken, ADMIN_COOKIE, ADMIN_COOKIE_MAX_AGE } from "@/lib/auth";

export const dynamic = "force-dynamic";

const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 5;
const attempts = new Map<string, { count: number; resetAt: number }>();

export async function POST(req: Request) {
  const key = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const now = Date.now();
  const current = attempts.get(key);
  if (current && current.resetAt > now && current.count >= MAX_ATTEMPTS) {
    return NextResponse.json({ error: "Too many login attempts. Try again later." }, { status: 429 });
  }
  if (current && current.resetAt <= now) attempts.delete(key);

  let password = "";
  try {
    const body = await req.json();
    password = String(body?.password ?? "");
  } catch {
    // empty body -> empty password -> 401 below
  }

  try {
    if (!checkPassword(password)) {
      const state = attempts.get(key);
      attempts.set(key, {
        count: (state?.resetAt && state.resetAt > now ? state.count : 0) + 1,
        resetAt: state?.resetAt && state.resetAt > now ? state.resetAt : now + WINDOW_MS,
      });
      return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
    }
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }

  attempts.delete(key);

  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, createSessionToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: ADMIN_COOKIE_MAX_AGE,
  });
  return res;
}
