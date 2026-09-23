import { getPayload, type Payload } from "payload";
import config from "@payload-config";

/**
 * The CMS is on exactly when a database is configured. Everything else keys
 * off this one check, so the site behaves identically with or without it.
 */
export function isCmsEnabled(): boolean {
  return Boolean(process.env.DATABASE_URL);
}

/** The Payload instance (Payload caches it per process), or null when off. */
export async function getCms(): Promise<Payload | null> {
  if (!isCmsEnabled()) return null;
  return getPayload({ config });
}
