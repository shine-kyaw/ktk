// ─────────────────────────────────────────────────────────────────────────
// CMS ACCESS LAYER
//
// The ONLY place the rest of the app reads content from. Every page awaits
// these getters. Each getter tries Supabase first; if the CMS is not yet
// configured (no env vars) or a query fails, it falls back to the local seed
// data in src/data and src/content. That fallback means the live site keeps
// working at every step while the backend is being connected, and degrades
// gracefully if the database is ever unreachable.
//
// To populate Supabase from the seed data, run the one-time seed route:
//   POST /api/admin/seed   (guarded by SEED_SECRET)
// ─────────────────────────────────────────────────────────────────────────

import { readClient } from "@/lib/supabase";

import { PRODUCTS, CATEGORY_META, type Product, type ProductCategory } from "@/data/products";
import { SERVICES, type Service } from "@/data/services";
import { JOBS, RECRUITMENT_PROCESS, type Job } from "@/data/careers";
import { NEWS, ACTIVITIES, type NewsPost, type Activity } from "@/data/blog";
import { BAG_ANATOMY, type BagAnatomy, type BagLayer } from "@/data/anatomy";
import {
  COMPANY,
  STATS,
  PROOF,
  MILESTONES,
  VALUES,
  INDUSTRIES,
  PARTNERS,
} from "@/content/company";

export type { Product, ProductCategory, Service, Job, NewsPost, Activity, BagAnatomy, BagLayer };

// Pages can opt into ISR with `export const revalidate = N`.
export const CMS_REVALIDATE_SECONDS = 300;

// ── Internal helpers ───────────────────────────────────────────────────────

/** Read a whole collection ordered by sort_order. Returns null to signal fallback. */
async function fetchCollection<T>(tableName: string): Promise<T[] | null> {
  const db = readClient();
  if (!db) return null;
  const { data, error } = await db.from(tableName).select("*").order("sort_order", { ascending: true });
  if (error) {
    console.error(`[cms] ${tableName}:`, error.message);
    return null;
  }
  return (data as T[]) ?? null;
}

/** Read a single JSON singleton by key. Returns null to signal fallback. */
async function fetchSingleton<T>(key: string): Promise<T | null> {
  const db = readClient();
  if (!db) return null;
  const { data, error } = await db.from("singletons").select("data").eq("key", key).maybeSingle();
  if (error || !data) {
    if (error) console.error(`[cms] singleton ${key}:`, error.message);
    return null;
  }
  return (data.data as T) ?? null;
}

// ── Company / stats ─────────────────────────────────────────────────────────
export async function getCompany() {
  return (await fetchSingleton<typeof COMPANY>("company")) ?? COMPANY;
}
export async function getStats() {
  return (await fetchSingleton<typeof STATS>("stats")) ?? STATS;
}
export async function getProofPoints() {
  return (await fetchSingleton<typeof PROOF>("proof")) ?? PROOF;
}
export async function getMilestones() {
  return (await fetchSingleton<typeof MILESTONES>("milestones")) ?? MILESTONES;
}
export async function getValues() {
  return (await fetchSingleton<typeof VALUES>("values")) ?? VALUES;
}
export async function getIndustries() {
  return (await fetchSingleton<typeof INDUSTRIES>("industries")) ?? INDUSTRIES;
}
export async function getPartners() {
  return (await fetchSingleton<typeof PARTNERS>("partners")) ?? PARTNERS;
}

// ── Products ────────────────────────────────────────────────────────────────
export async function getProducts(): Promise<Product[]> {
  return (await fetchCollection<Product>("products")) ?? PRODUCTS;
}
export async function getFeaturedProducts(limit = 6): Promise<Product[]> {
  const all = await getProducts();
  return all.filter((p) => p.featured).slice(0, limit);
}
export async function getProduct(slug: string): Promise<Product | null> {
  const all = await getProducts();
  return all.find((p) => p.slug === slug) ?? null;
}
export async function getProductSlugs(): Promise<string[]> {
  const all = await getProducts();
  return all.map((p) => p.slug);
}
export async function getProductCategories() {
  return (await fetchCollection<(typeof CATEGORY_META)[number]>("product_categories")) ?? CATEGORY_META;
}
export async function getRelatedProducts(slug: string, limit = 3): Promise<Product[]> {
  const all = await getProducts();
  const product = all.find((p) => p.slug === slug);
  if (!product) return [];
  return all.filter((p) => p.category === product.category && p.slug !== slug).slice(0, limit);
}

// ── Services ──────────────────────────────────────────────────────────────
export async function getServices(): Promise<Service[]> {
  return (await fetchCollection<Service>("services")) ?? SERVICES;
}

// ── Careers ───────────────────────────────────────────────────────────────
export async function getJobs(): Promise<Job[]> {
  return (await fetchCollection<Job>("jobs")) ?? JOBS;
}
export async function getJob(slug: string): Promise<Job | null> {
  const all = await getJobs();
  return all.find((j) => j.slug === slug) ?? null;
}
export async function getJobSlugs(): Promise<string[]> {
  const all = await getJobs();
  return all.map((j) => j.slug);
}
export async function getRecruitmentProcess() {
  return (
    (await fetchSingleton<typeof RECRUITMENT_PROCESS>("recruitment")) ?? RECRUITMENT_PROCESS
  );
}

// ── News & activities ─────────────────────────────────────────────────────
export async function getNews(): Promise<NewsPost[]> {
  return (await fetchCollection<NewsPost>("news")) ?? NEWS;
}
export async function getNewsPost(slug: string): Promise<NewsPost | null> {
  const all = await getNews();
  return all.find((n) => n.slug === slug) ?? null;
}
export async function getNewsSlugs(): Promise<string[]> {
  const all = await getNews();
  return all.map((n) => n.slug);
}
export async function getActivities(): Promise<Activity[]> {
  return (await fetchCollection<Activity>("activities")) ?? ACTIVITIES;
}

// ── Product anatomy (material breakdown) ────────────────────────────────────
type AnatomyMeta = Omit<BagAnatomy, "layers">;
type BagLayerRow = Omit<BagLayer, "order"> & { sort_order: number };

export async function getBagAnatomy(): Promise<BagAnatomy> {
  const rows = await fetchCollection<BagLayerRow>("bag_layers");
  const meta = await fetchSingleton<AnatomyMeta>("anatomy_meta");

  if (rows && meta) {
    const layers: BagLayer[] = rows.map((r) => ({
      id: r.id,
      order: r.sort_order,
      name: r.name,
      tag: r.tag,
      description: r.description,
      note: r.note,
      variant: r.variant,
      image: r.image ?? null,
      callout: r.callout,
    }));
    return { ...meta, layers };
  }

  return { ...BAG_ANATOMY, layers: [...BAG_ANATOMY.layers].sort((a, b) => a.order - b.order) };
}
