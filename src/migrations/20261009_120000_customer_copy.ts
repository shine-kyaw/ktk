import type { MigrateDownArgs, MigrateUpArgs } from "@payloadcms/db-postgres";
import { CUSTOMER_COPY_2026_10 } from "./data/customer-copy-2026-10";

/*
 * Content-only migration: rewrites public text that had been written as
 * internal notes (see ./data/customer-copy-2026-10.ts).
 *
 * A text value is replaced only when it still matches the old wording
 * exactly, so anything an editor has rewritten in the admin is left alone.
 * No schema changes.
 */

const COLLECTIONS = [
  "products",
  "certificates",
  "milestones",
  "partners",
  "services",
  "group-companies",
  "leadership",
  "activities",
  "news",
] as const;
const GLOBALS = ["company", "page-content"] as const;

type Swap = Map<string, string>;

/* Returns the value with every exactly-matching string swapped, or the same
   reference when nothing inside it changed. */
function swapStrings(value: unknown, swap: Swap): unknown {
  if (typeof value === "string") return swap.get(value) ?? value;
  if (Array.isArray(value)) {
    let changed = false;
    const next = value.map((item) => {
      const out = swapStrings(item, swap);
      if (out !== item) changed = true;
      return out;
    });
    return changed ? next : value;
  }
  if (value && typeof value === "object") {
    let changed = false;
    const next: Record<string, unknown> = {};
    for (const [key, item] of Object.entries(value)) {
      const out = swapStrings(item, swap);
      if (out !== item) changed = true;
      next[key] = out;
    }
    return changed ? next : value;
  }
  return value;
}

/* Only the top-level fields that changed, so untouched fields (uploads,
   relationships, ordering) are never written back. */
function changedFields(doc: Record<string, unknown>, swap: Swap) {
  const data: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(doc)) {
    if (["id", "createdAt", "updatedAt", "_order", "globalType"].includes(key)) continue;
    const out = swapStrings(value, swap);
    if (out !== value) data[key] = out;
  }
  return data;
}

async function run({ payload, req }: MigrateUpArgs, swap: Swap) {
  let updated = 0;
  for (const collection of COLLECTIONS) {
    const { docs } = await payload.find({
      collection,
      depth: 0,
      limit: 0,
      pagination: false,
      overrideAccess: true,
      req,
    });
    for (const doc of docs) {
      const data = changedFields(doc as unknown as Record<string, unknown>, swap);
      if (!Object.keys(data).length) continue;
      await payload.update({ collection, id: doc.id, data, depth: 0, overrideAccess: true, req });
      updated++;
    }
  }
  for (const slug of GLOBALS) {
    const doc = await payload.findGlobal({ slug, depth: 0, overrideAccess: true, req });
    const data = changedFields(doc as unknown as Record<string, unknown>, swap);
    if (!Object.keys(data).length) continue;
    await payload.updateGlobal({ slug, data, depth: 0, overrideAccess: true, req });
    updated++;
  }
  payload.logger.info(`customer copy: ${updated} document(s) updated`);
}

export async function up(args: MigrateUpArgs): Promise<void> {
  await run(args, new Map(CUSTOMER_COPY_2026_10.map((c) => [c.from, c.to])));
}

export async function down(args: MigrateDownArgs): Promise<void> {
  await run(args as unknown as MigrateUpArgs, new Map(CUSTOMER_COPY_2026_10.map((c) => [c.to, c.from])));
}
