// ─────────────────────────────────────────────────────────────────────────
// SEED — copy the website's built-in content into the CMS.
//
//   npm run seed
//
// Run it once against a fresh database, after migrations. It fills every
// collection and settings page from src/data and src/content, so KTK starts
// with the website exactly as it is today rather than a blank admin.
//
// It runs automatically on the first deploy after DATABASE_URL is set (see
// scripts/migrate-if-configured.mjs), and records that it has run. After that
// it never runs again — otherwise an editor who deliberately emptied a list
// (say, removed every partner) would find it quietly refilled on the next
// deploy. Within a run it is also cautious: a collection that already holds
// anything is left untouched, and a settings page is only filled while empty.
//
// To seed again on purpose, e.g. a fresh database: `npm run seed -- --force`.
//
// Images are NOT copied into the database. Each keeps its built-in /public
// path in the matching "…Src" field (see imageField in src/payload/fields.ts),
// which keeps the database small enough for a free plan.
// ─────────────────────────────────────────────────────────────────────────

import { getPayload, type Payload } from "payload";
import config from "../src/payload.config";

import { PRODUCTS, CATEGORY_META } from "../src/data/products";
import { SERVICES } from "../src/data/services";
import { ACTIVITIES, NEWS } from "../src/data/blog";
import {
  COMPANY,
  COMPANY_PROFILE,
  CORE_VALUES,
  STATS,
  PROOF,
  MILESTONES,
  INDUSTRIES,
  PARTNERS,
  QUALITY_PILLARS,
  PROCESS_STEPS,
  WHY_POINTS,
  CERTIFICATES,
  LEADERSHIP_PROFILES,
  TEAM_PORTRAITS,
} from "../src/content/company";
import { SITE_VISIBILITY } from "../src/content/site";

const list = (items: readonly string[] | undefined) => (items ?? []).map((value) => ({ value }));
const published = "published" as const;

// A bare "YYYY-MM-DD" is read as local midnight on whatever machine runs the
// seed — on a Myanmar machine, the previous evening in UTC. Storing noon UTC
// lands on the intended calendar day in every timezone within ±12 hours, so
// the result is the same whoever runs this.
const day = (value?: string | null) => (value ? `${value}T12:00:00.000Z` : null);

/** Create each item in order — orderable collections keep insertion order. */
async function seedCollection<T>(
  payload: Payload,
  collection: string,
  items: readonly T[],
  toData: (item: T) => Record<string, unknown>,
) {
  const existing = await payload.count({ collection: collection as never });
  if (existing.totalDocs > 0) {
    console.log(`  ${collection.padEnd(20)} skipped — already has ${existing.totalDocs}`);
    return;
  }
  for (const item of items) {
    await payload.create({ collection: collection as never, data: toData(item) as never });
  }
  console.log(`  ${collection.padEnd(20)} ${items.length} added`);
}

/** Fill a settings page only while it is still empty. */
async function seedGlobal(payload: Payload, slug: string, isEmpty: (doc: Record<string, unknown>) => boolean, data: Record<string, unknown>) {
  const current = (await payload.findGlobal({ slug: slug as never })) as unknown as Record<string, unknown>;
  if (!isEmpty(current)) {
    console.log(`  ${slug.padEnd(20)} skipped — already filled in`);
    return;
  }
  await payload.updateGlobal({ slug: slug as never, data: data as never });
  console.log(`  ${slug.padEnd(20)} filled`);
}

// A one-row marker, outside Payload's own schema, recording that the seed ran.
const MARKER_TABLE = "ktk_cms_meta";

async function alreadySeeded(payload: Payload): Promise<boolean> {
  const pool = (payload.db as unknown as { pool: import("pg").Pool }).pool;
  await pool.query(`CREATE TABLE IF NOT EXISTS ${MARKER_TABLE} (key text PRIMARY KEY, value text, at timestamptz NOT NULL DEFAULT now())`);
  const { rows } = await pool.query(`SELECT at FROM ${MARKER_TABLE} WHERE key = 'seeded'`);
  return rows.length > 0;
}

async function markSeeded(payload: Payload) {
  const pool = (payload.db as unknown as { pool: import("pg").Pool }).pool;
  await pool.query(
    `INSERT INTO ${MARKER_TABLE} (key, value) VALUES ('seeded', 'built-in website content') ON CONFLICT (key) DO NOTHING`,
  );
}

async function main() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not set. Point it at the CMS database, then run `npm run seed` again.");
  }
  const force = process.argv.includes("--force");
  const payload = await getPayload({ config });

  if (!force && (await alreadySeeded(payload))) {
    console.log("[cms] Content was already seeded on an earlier deploy — leaving the CMS as editors have it.");
    process.exit(0);
  }
  console.log("Seeding the KTK CMS from the built-in website content…\n");

  await seedCollection(payload, "product-categories", CATEGORY_META, (c) => ({
    name: c.name,
    slug: c.slug,
    tagline: c.tagline,
    blurb: c.blurb,
    bannerSrc: c.banner ?? null,
    bannerCaption: c.bannerCaption ?? null,
  }));

  await seedCollection(payload, "products", PRODUCTS, (p) => ({
    name: p.name,
    slug: p.slug,
    category: p.category,
    status: published,
    featured: Boolean(p.featured),
    eyebrow: p.eyebrow ?? null,
    brand: p.brand ?? null,
    model: p.model ?? null,
    bestFor: p.bestFor ?? null,
    summary: p.summary,
    longDescription: p.longDescription ?? null,
    uniqueValue: p.uniqueValue ?? null,
    printing: p.printing ?? null,
    applications: list(p.applications),
    qualityAttributes: list(p.qualityAttributes),
    specs: p.specs.map(({ label, value }) => ({ label, value })),
    benefits: (p.benefits ?? []).map(({ title, detail }) => ({ title, detail })),
    variants: (p.variants ?? []).map(({ name, description, attributes }) => ({
      name,
      description,
      attributes: list(attributes),
    })),
    colorOptions: (p.colorOptions ?? []).map(({ name, hex }) => ({ name, hex })),
    imageSrc: p.image ?? null,
    gallery: (p.gallery ?? []).map(({ src, alt, caption }) => ({ imageSrc: src, alt, caption: caption ?? null })),
    resources: (p.resources ?? []).map(({ label, url, detail, preview }) => ({
      label,
      url,
      detail: detail ?? null,
      preview: preview ?? null,
    })),
    brochureUrl: p.brochureUrl ?? null,
  }));

  await seedCollection(payload, "leadership", LEADERSHIP_PROFILES, (l) => ({
    name: l.name,
    title: l.title,
    portraitSrc: l.image,
    status: published,
  }));

  await seedCollection(payload, "group-companies", COMPANY_PROFILE.groupCompanies, (g) => ({
    name: g.name,
    focus: g.focus,
    website: g.website ?? null,
    status: published,
  }));

  await seedCollection(payload, "certificates", CERTIFICATES, (c) => ({
    title: c.title,
    issuer: c.issuer ?? null,
    referenceNumber: c.reference_number ?? null,
    scope: c.scope ?? null,
    issuedOn: day(c.issued_on),
    expiresOn: day(c.expires_on),
    imageSrc: c.image ?? null,
    documentSrc: c.document_url ?? null,
    // Product pages link to certificates by this id — keep it.
    anchor: c.id,
    status: c.permission_confirmed ? published : "draft",
  }));

  await seedCollection(payload, "milestones", MILESTONES, (m) => ({ ...m, status: published }));
  await seedCollection(payload, "partners", PARTNERS, (p) => ({ ...p, status: published }));

  await seedCollection(payload, "services", SERVICES, (s) => ({
    name: s.name,
    slug: s.slug,
    summary: s.summary,
    points: list(s.points),
    status: published,
  }));

  await seedCollection(payload, "activities", ACTIVITIES, (a) => ({
    title: a.title,
    slug: a.slug,
    category: a.category,
    date: a.date,
    detail: a.detail,
    imageSrc: a.image ?? null,
    gallery: (a.gallery ?? []).map(({ src, alt }) => ({ imageSrc: src, alt })),
    videoSrc: a.videoUrl ?? null,
    videoPosterSrc: a.videoPoster ?? null,
    externalVideoUrl: a.externalVideoUrl ?? null,
    sourceUrl: a.sourceUrl ?? null,
    status: published,
  }));

  // The built-in news list is empty; posts are written in the CMS.
  if (NEWS.length) console.log(`  news                 ${NEWS.length} built-in posts left for manual entry (rich text)`);

  await seedGlobal(payload, "company", (doc) => !doc.legalName, {
    legalName: COMPANY.legalName,
    group: COMPANY.group,
    short: COMPANY.short,
    tagline: COMPANY.tagline,
    oneLiner: COMPANY.oneLiner,
    foundedTrading: COMPANY.foundedTrading,
    foundedManufacturing: COMPANY.foundedManufacturing,
    factory: COMPANY.factory,
    hq: { line1: COMPANY.hq.line1, line2: COMPANY.hq.line2 },
    mapsUrl: COMPANY.mapsUrl,
    officeHours: COMPANY.officeHours,
    phones: list(COMPANY.phones),
    viber: COMPANY.viber,
    emails: list(COMPANY.emails),
    facebook: COMPANY.facebook,
    responseTimes: { email: COMPANY.responseTimes.email, phone: COMPANY.responseTimes.phone },
    contacts: COMPANY.contacts.map(({ name, title, phone }) => ({ name, title, phone })),
    executiveSummary: list(COMPANY_PROFILE.executiveSummary),
    businessActivities: list(COMPANY_PROFILE.businessActivities),
    industrialProducts: list(COMPANY_PROFILE.productsServices.industrial),
    packagingProducts: list(COMPANY_PROFILE.productsServices.packaging),
    reasons: list(COMPANY_PROFILE.reasons),
    teamPortraits: TEAM_PORTRAITS.map((imageSrc) => ({ imageSrc })),
  });

  await seedGlobal(payload, "page-content", (doc) => !(doc.stats as unknown[] | undefined)?.length, {
    stats: STATS.map(({ value, suffix, label, isYear }) => ({ value, suffix: suffix ?? null, label, isYear: Boolean(isYear) })),
    proof: PROOF.map(({ value, label }) => ({ value, label })),
    whyPoints: WHY_POINTS.map(({ title, desc }) => ({ title, desc })),
    coreValues: list(CORE_VALUES),
    industries: list(INDUSTRIES),
    qualityPillars: QUALITY_PILLARS.map(({ tag, title, body }) => ({ tag, title, body })),
    processSteps: PROCESS_STEPS.map(({ no, stage, title, body }) => ({ no, stage, title, body })),
  });

  // Site settings have a real default (News off), so only write them if they
  // have never been saved.
  await seedGlobal(payload, "site-settings", (doc) => !doc.updatedAt, {
    showNews: SITE_VISIBILITY.news,
    showActivities: SITE_VISIBILITY.activities,
  });

  await markSeeded(payload);
  console.log("\nDone. Open /admin — if no account exists yet, it asks you to create the first one.");
  process.exit(0);
}

main().catch((error) => {
  console.error("\nSeed failed:", error instanceof Error ? error.message : error);
  process.exit(1);
});
