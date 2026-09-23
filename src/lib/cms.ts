// ─────────────────────────────────────────────────────────────────────────
// CMS ACCESS LAYER
//
// The ONLY place the rest of the app reads content from. Every page awaits
// these getters, so pages never need to know whether content came from the
// CMS or not.
//
//   CMS on  (DATABASE_URL set)  → content comes from Payload.
//   CMS off                      → the built-in content in src/data and
//                                  src/content, exactly as the site shipped.
//
// Two rules that the previous layer broke, and this one keeps:
//
//   1. The CMS is the source of truth. Nothing here quietly overrides what an
//      editor saved. (The old layer forced every director back to the title
//      "Director", re-inserted the hard-coded activities list on top of the
//      CMS one, and patched company fields back to local values.)
//
//   2. A database failure degrades, it does not break. A failed read is logged
//      and the built-in content is shown instead, so the public site stays up.
//
// Reads are cached and tagged "cms"; every save in the admin invalidates the
// tag (see src/payload/revalidate.ts). Pages therefore load at static speed
// rather than querying the database on every visit, yet show edits at once.
// ─────────────────────────────────────────────────────────────────────────

import { unstable_cache } from "next/cache";
import type { Payload } from "payload";
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import { getCms } from "@/lib/payload";
import type * as P from "@/payload-types";

import { PRODUCTS, CATEGORY_META, type Product, type ProductCategory, type ProductCategoryMeta } from "@/data/products";
import { SERVICES, type Service } from "@/data/services";
import { RECRUITMENT_PROCESS, type Job } from "@/data/careers";
import { NEWS, ACTIVITIES, type NewsPost, type Activity } from "@/data/blog";
import { BAG_ANATOMY, type BagAnatomy, type BagLayer } from "@/data/anatomy";
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
} from "@/content/company";
import { SITE_VISIBILITY, type SiteVisibility } from "@/content/site";

export type { Product, ProductCategory, Service, Job, NewsPost, Activity, BagAnatomy, BagLayer };

export const CMS_CACHE_TAG = "cms";

// ── Shared types (widened from the built-in `as const` literals, so edited
//    values type-check) ───────────────────────────────────────────────────────

export type CompanyInfo = {
  legalName: string;
  group: string;
  short: string;
  tagline: string;
  foundedTrading: number;
  foundedManufacturing: number;
  factory: string;
  oneLiner: string;
  hq: { line1: string; line2: string };
  mapsUrl: string;
  officeHours: string;
  phones: string[];
  viber: string;
  emails: string[];
  facebook: string;
  responseTimes: { email: string; phone: string };
  contacts: { name: string; title: string; phone: string }[];
};

export type CompanyProfile = {
  executiveSummary: string[];
  businessActivities: string[];
  productsServices: { industrial: string[]; packaging: string[] };
  reasons: string[];
};

export type LeadershipProfile = { name: string; title: string; image: string };
export type GroupCompany = { name: string; focus: string; website: string | null };

export type Certificate = {
  id: string;
  title: string;
  issuer?: string | null;
  reference_number?: string | null;
  scope?: string | null;
  issued_on?: string | null;
  expires_on?: string | null;
  image?: string | null;
  document_url?: string | null;
  permission_confirmed?: boolean;
};

/** Kept for callers of the old API; leadership now lives in getLeadership(). */
export type ManagementProfile = {
  id: string;
  name: string;
  title: string;
  bio?: string | null;
  image?: string | null;
};

// ── Internal helpers ───────────────────────────────────────────────────────

/**
 * Run a CMS read, cached under the "cms" tag. Returns null when the CMS is off
 * or the read fails, which tells the caller to use built-in content. Failures
 * are thrown inside the cache and caught outside it, so a passing database
 * error is never cached as if it were real content.
 */
async function read<T>(key: string, query: (cms: Payload) => Promise<T>): Promise<T | null> {
  const cms = await getCms();
  if (!cms) return null;
  try {
    return await unstable_cache(() => query(cms), ["cms", key], { tags: [CMS_CACHE_TAG] })();
  } catch (error) {
    console.error(`[cms] ${key}:`, error instanceof Error ? error.message : error);
    return null;
  }
}

/** Every published item in a collection, in the order set in the admin. */
function readCollection<T>(collection: keyof P.Config["collections"]) {
  return read<T[]>(`collection:${collection}`, async (cms) => {
    const result = await cms.find({
      collection: collection as never,
      where: { status: { equals: "published" } } as never,
      sort: "_order",
      depth: 1,
      pagination: false,
    });
    return result.docs as unknown as T[];
  });
}

function readGlobal<T>(slug: string) {
  return read<T>(`global:${slug}`, async (cms) => (await cms.findGlobal({ slug: slug as never, depth: 1 })) as unknown as T);
}

/**
 * Resolve an image slot: an uploaded Media item wins, otherwise the built-in
 * /public path (see imageField in src/payload/fields.ts). Media URLs are made
 * site-relative so next/image treats them as local files.
 */
function img(upload: number | P.Media | null | undefined, src?: string | null): string | null {
  if (upload && typeof upload === "object" && upload.url) {
    try {
      return new URL(upload.url, "http://local").pathname;
    } catch {
      return upload.url;
    }
  }
  return src || null;
}

const values = (list?: { value: string }[] | null) => (list ?? []).map((item) => item.value);

// Dates are stored as instants, but mean a calendar day. KTK's editors are in
// Myanmar (UTC+6:30), so a day picked in the admin can be stored as that day's
// local midnight — which in UTC is the evening before. Reading the UTC date
// then shows every date one day early. Reading the day in KTK's own timezone
// gives the right answer however the instant was stored: local midnight, local
// noon and UTC noon all fall on the same Myanmar calendar day.
const KTK_TIME_ZONE = "Asia/Yangon";

/** The calendar day (YYYY-MM-DD) of a stored date, as KTK means it. */
const isoDay = (value?: string | null) => {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  // en-CA formats as YYYY-MM-DD.
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: KTK_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
};

// ── Company ─────────────────────────────────────────────────────────────────

export async function getCompany(): Promise<CompanyInfo> {
  const doc = await readGlobal<P.Company>("company");
  const fallback = COMPANY as unknown as CompanyInfo;
  if (!doc) return fallback;
  return {
    legalName: doc.legalName || fallback.legalName,
    group: doc.group || fallback.group,
    short: doc.short || fallback.short,
    tagline: doc.tagline || fallback.tagline,
    foundedTrading: doc.foundedTrading ?? fallback.foundedTrading,
    foundedManufacturing: doc.foundedManufacturing ?? fallback.foundedManufacturing,
    factory: doc.factory || fallback.factory,
    oneLiner: doc.oneLiner || fallback.oneLiner,
    hq: { line1: doc.hq?.line1 || "", line2: doc.hq?.line2 || "" },
    mapsUrl: doc.mapsUrl || "",
    officeHours: doc.officeHours || "",
    phones: values(doc.phones),
    viber: doc.viber || "",
    emails: values(doc.emails),
    facebook: doc.facebook || "",
    responseTimes: { email: doc.responseTimes?.email || "", phone: doc.responseTimes?.phone || "" },
    contacts: (doc.contacts ?? []).map(({ name, title, phone }) => ({ name, title, phone })),
  };
}

export async function getCompanyProfile(): Promise<CompanyProfile> {
  const doc = await readGlobal<P.Company>("company");
  if (!doc) {
    return {
      executiveSummary: [...COMPANY_PROFILE.executiveSummary],
      businessActivities: [...COMPANY_PROFILE.businessActivities],
      productsServices: {
        industrial: [...COMPANY_PROFILE.productsServices.industrial],
        packaging: [...COMPANY_PROFILE.productsServices.packaging],
      },
      reasons: [...COMPANY_PROFILE.reasons],
    };
  }
  return {
    executiveSummary: values(doc.executiveSummary),
    businessActivities: values(doc.businessActivities),
    productsServices: { industrial: values(doc.industrialProducts), packaging: values(doc.packagingProducts) },
    reasons: values(doc.reasons),
  };
}

export async function getTeamPortraits(): Promise<string[]> {
  const doc = await readGlobal<P.Company>("company");
  if (!doc) return [...TEAM_PORTRAITS];
  return (doc.teamPortraits ?? [])
    .map((row) => img(row.image, row.imageSrc))
    .filter((src): src is string => Boolean(src));
}

export async function getLeadership(): Promise<LeadershipProfile[]> {
  const docs = await readCollection<P.Leadership>("leadership");
  if (!docs) return LEADERSHIP_PROFILES.map(({ name, title, image }) => ({ name, title, image }));
  return docs.map((doc) => ({
    name: doc.name,
    title: doc.title,
    image: img(doc.portrait, doc.portraitSrc) ?? "",
  }));
}

export async function getGroupCompanies(): Promise<GroupCompany[]> {
  const docs = await readCollection<P.GroupCompany>("group-companies");
  if (!docs) return COMPANY_PROFILE.groupCompanies.map(({ name, focus, website }) => ({ name, focus, website }));
  return docs.map((doc) => ({ name: doc.name, focus: doc.focus, website: doc.website || null }));
}

/** @deprecated The About page reads directors from getLeadership(). */
export async function getManagement(): Promise<ManagementProfile[]> {
  return [];
}

// ── Page content ───────────────────────────────────────────────────────────

async function pageContent() {
  return readGlobal<P.PageContent>("page-content");
}

export async function getStats() {
  const doc = await pageContent();
  if (!doc?.stats?.length) return STATS;
  return doc.stats.map(({ value, suffix, label, isYear }) => ({
    value,
    suffix: suffix || undefined,
    label,
    isYear: Boolean(isYear),
  }));
}
export async function getProofPoints() {
  const doc = await pageContent();
  if (!doc?.proof?.length) return PROOF;
  return doc.proof.map(({ value, label }) => ({ value, label }));
}
export async function getWhyPoints() {
  const doc = await pageContent();
  if (!doc?.whyPoints?.length) return WHY_POINTS;
  return doc.whyPoints.map(({ title, desc }) => ({ title, desc }));
}
export async function getCoreValues(): Promise<string[]> {
  const doc = await pageContent();
  if (!doc) return CORE_VALUES;
  const list = values(doc.coreValues);
  return list.length ? list : CORE_VALUES;
}
export async function getIndustries() {
  const doc = await pageContent();
  if (!doc) return INDUSTRIES;
  const list = values(doc.industries);
  return list.length ? list : INDUSTRIES;
}
export async function getQualityPillars() {
  const doc = await pageContent();
  if (!doc?.qualityPillars?.length) return QUALITY_PILLARS;
  return doc.qualityPillars.map(({ tag, title, body }) => ({ tag, title, body }));
}
export async function getProcessSteps() {
  const doc = await pageContent();
  if (!doc?.processSteps?.length) return PROCESS_STEPS;
  return doc.processSteps.map(({ no, stage, title, body }) => ({ no, stage, title, body }));
}

export async function getSiteVisibility(): Promise<SiteVisibility> {
  const doc = await readGlobal<P.SiteSetting>("site-settings");
  if (!doc) return SITE_VISIBILITY;
  return { news: Boolean(doc.showNews), activities: doc.showActivities !== false };
}

// ── Company lists ──────────────────────────────────────────────────────────

export async function getMilestones() {
  const docs = await readCollection<P.Milestone>("milestones");
  if (!docs) return MILESTONES;
  return docs.map(({ year, title, text }) => ({ year, title, text }));
}

export async function getPartners() {
  const docs = await readCollection<P.Partner>("partners");
  if (!docs) return PARTNERS;
  return docs.map(({ name, origin, note }) => ({ name, origin, note }));
}

export async function getCertificates(): Promise<Certificate[]> {
  const docs = await readCollection<P.Certificate>("certificates");
  if (!docs) return CERTIFICATES.filter((record) => record.permission_confirmed);
  return docs.map((doc) => ({
    // Product pages link to certificates by this anchor, e.g. /about#<anchor>.
    id: doc.anchor || String(doc.id),
    title: doc.title,
    issuer: doc.issuer ?? null,
    reference_number: doc.referenceNumber ?? null,
    scope: doc.scope ?? null,
    issued_on: isoDay(doc.issuedOn),
    expires_on: isoDay(doc.expiresOn),
    image: img(doc.image, doc.imageSrc),
    document_url: img(doc.document, doc.documentSrc),
    permission_confirmed: true,
  }));
}

// ── Products ────────────────────────────────────────────────────────────────

function toProduct(doc: P.Product): Product {
  return {
    slug: doc.slug,
    name: doc.name,
    category: doc.category as ProductCategory,
    eyebrow: doc.eyebrow ?? undefined,
    summary: doc.summary,
    longDescription: doc.longDescription ?? undefined,
    bestFor: doc.bestFor ?? undefined,
    uniqueValue: doc.uniqueValue ?? undefined,
    printing: doc.printing ?? undefined,
    applications: values(doc.applications),
    specs: (doc.specs ?? []).map(({ label, value }) => ({ label, value })),
    benefits: (doc.benefits ?? []).map(({ title, detail }) => ({ title, detail })),
    image: img(doc.image, doc.imageSrc),
    gallery: (doc.gallery ?? []).flatMap((row) => {
      const src = img(row.image, row.imageSrc);
      return src ? [{ src, alt: row.alt, caption: row.caption ?? undefined }] : [];
    }),
    featured: Boolean(doc.featured),
    model: doc.model ?? undefined,
    brand: doc.brand ?? undefined,
    qualityAttributes: values(doc.qualityAttributes),
    variants: (doc.variants ?? []).map(({ name, description, attributes }) => ({
      name,
      description,
      attributes: values(attributes),
    })),
    colorOptions: (doc.colorOptions ?? []).map(({ name, hex }) => ({ name, hex })),
    brochureUrl: doc.brochureUrl ?? null,
    resources: (doc.resources ?? []).map(({ label, url, detail, preview }) => ({
      label,
      url,
      detail: detail ?? undefined,
      preview: preview ?? undefined,
    })),
  };
}

export async function getProducts(): Promise<Product[]> {
  const docs = await readCollection<P.Product>("products");
  return docs ? docs.map(toProduct) : PRODUCTS;
}
export async function getFeaturedProducts(limit = 6): Promise<Product[]> {
  return (await getProducts()).filter((p) => p.featured).slice(0, limit);
}
export async function getProduct(slug: string): Promise<Product | null> {
  return (await getProducts()).find((p) => p.slug === slug) ?? null;
}
export async function getProductSlugs(): Promise<string[]> {
  return (await getProducts()).map((p) => p.slug);
}
export async function getRelatedProducts(slug: string, limit = 3): Promise<Product[]> {
  const all = await getProducts();
  const product = all.find((p) => p.slug === slug);
  if (!product) return [];
  return all.filter((p) => p.category === product.category && p.slug !== slug).slice(0, limit);
}

export async function getProductCategories(): Promise<ProductCategoryMeta[]> {
  const docs = await read<P.ProductCategory[]>("collection:product-categories", async (cms) => {
    // Categories carry no draft state: every one is a live Products-page section.
    const result = await cms.find({ collection: "product-categories", sort: "_order", depth: 1, pagination: false });
    return result.docs;
  });
  if (!docs) return CATEGORY_META;
  return docs.map((doc) => ({
    name: doc.name as ProductCategory,
    slug: doc.slug,
    tagline: doc.tagline,
    blurb: doc.blurb,
    banner: img(doc.banner, doc.bannerSrc) ?? undefined,
    bannerCaption: doc.bannerCaption ?? undefined,
  }));
}

// ── Services ──────────────────────────────────────────────────────────────

export async function getServices(): Promise<Service[]> {
  const docs = await readCollection<P.Service>("services");
  if (!docs) return SERVICES;
  return docs.map(({ slug, name, summary, points }) => ({ slug, name, summary, points: values(points) }));
}

// ── Activities ────────────────────────────────────────────────────────────

export async function getActivities(): Promise<Activity[]> {
  const docs = await readCollection<P.Activity>("activities");
  if (!docs) return ACTIVITIES;
  return docs.map((doc) => ({
    slug: doc.slug,
    category: doc.category,
    title: doc.title,
    date: doc.date,
    detail: doc.detail,
    image: img(doc.image, doc.imageSrc),
    gallery: (doc.gallery ?? []).flatMap((row) => {
      const src = img(row.image, row.imageSrc);
      return src ? [{ src, alt: row.alt }] : [];
    }),
    videoUrl: img(doc.video, doc.videoSrc),
    videoPoster: img(doc.videoPoster, doc.videoPosterSrc),
    externalVideoUrl: doc.externalVideoUrl || null,
    sourceUrl: doc.sourceUrl || null,
  }));
}

// ── News ────────────────────────────────────────────────────────────────────

export type NewsArticle = NewsPost & { content?: SerializedEditorState | null };

// Read in KTK's timezone for the same reason as isoDay above.
const newsDate = (value: string) =>
  new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: KTK_TIME_ZONE }).format(
    new Date(value),
  );

export async function getNews(): Promise<NewsArticle[]> {
  const docs = await read<P.News[]>("collection:news", async (cms) => {
    const result = await cms.find({
      collection: "news",
      where: { status: { equals: "published" } },
      sort: "-date",
      depth: 1,
      pagination: false,
    });
    return result.docs;
  });
  if (!docs) return NEWS;
  return docs.map((doc) => ({
    slug: doc.slug,
    date: newsDate(doc.date),
    category: doc.category,
    title: doc.title,
    excerpt: doc.excerpt,
    body: [],
    image: img(doc.image, doc.imageSrc),
    content: doc.content as unknown as SerializedEditorState,
  }));
}
export async function getNewsPost(slug: string): Promise<NewsArticle | null> {
  return (await getNews()).find((n) => n.slug === slug) ?? null;
}
export async function getNewsSlugs(): Promise<string[]> {
  return (await getNews()).map((n) => n.slug);
}

// ── Not managed in the CMS ─────────────────────────────────────────────────
// Careers is switched off on the site (the page calls notFound()), and the bag
// anatomy section is not rendered anywhere, so neither has an editor. These
// keep their previous built-in behaviour.

export async function getJobs(): Promise<Job[]> {
  return [];
}
export async function getJob(_slug: string): Promise<Job | null> {
  return null;
}
export async function getJobSlugs(): Promise<string[]> {
  return [];
}
export async function getRecruitmentProcess() {
  return RECRUITMENT_PROCESS;
}
export async function getBagAnatomy(): Promise<BagAnatomy> {
  return { ...BAG_ANATOMY, layers: [...BAG_ANATOMY.layers].sort((a, b) => a.order - b.order) };
}
