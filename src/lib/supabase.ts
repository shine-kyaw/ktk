// ─────────────────────────────────────────────────────────────────────────
// SUPABASE CLIENTS
//
// Two clients, two trust levels:
//   readClient()  - anon key, safe to use anywhere (public SELECTs only).
//   adminClient() - service-role key, SERVER ONLY, bypasses RLS for writes.
//
// Everything is optional: if the env vars are not set, isCmsConfigured() is
// false and the CMS layer falls back to local seed data, so the site keeps
// working before Supabase is connected. The service-role key must NEVER be
// exposed to the browser, only used in route handlers / server actions.
// ─────────────────────────────────────────────────────────────────────────

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const SERVICE = process.env.SUPABASE_SERVICE_ROLE_KEY;

/** True once the public read credentials are present. */
export function isCmsConfigured(): boolean {
  return Boolean(URL && ANON);
}

/** True once write credentials are present (admin operations possible). */
export function isAdminConfigured(): boolean {
  return Boolean(URL && SERVICE);
}

let _read: SupabaseClient | null = null;
/** Public, read-only client. Returns null when the CMS is not yet configured. */
export function readClient(): SupabaseClient | null {
  if (!isCmsConfigured()) return null;
  if (!_read) {
    _read = createClient(URL!, ANON!, { auth: { persistSession: false } });
  }
  return _read;
}

let _admin: SupabaseClient | null = null;
/** Privileged client for writes/uploads. Throws if not configured. */
export function adminClient(): SupabaseClient {
  if (!URL || !SERVICE) {
    throw new Error(
      "Supabase admin is not configured. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.",
    );
  }
  if (!_admin) {
    _admin = createClient(URL, SERVICE, { auth: { persistSession: false } });
  }
  return _admin;
}

/** Storage bucket where all uploaded media lives. */
export const MEDIA_BUCKET = "media";
