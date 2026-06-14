// ─────────────────────────────────────────────────────────────────────────
// CMS ACCESS LAYER
//
// This is the ONLY place the rest of the app reads content from. Every page
// awaits these getters, so the whole site is already written as if a remote
// CMS/API exists. Today the getters return local seed data; when KTK's admin
// backend ships, each body becomes a single fetch() and nothing else changes.
//
//   const API = process.env.NEXT_PUBLIC_CMS_URL!;
//   export async function getProducts(): Promise<Product[]> {
//     const res = await fetch(`${API}/products`, { next: { revalidate: 300 } });
//     if (!res.ok) throw new Error("CMS: products");
//     return res.json();
//   }
//
// The shapes returned here are the API contract. Keep them stable.
// ─────────────────────────────────────────────────────────────────────────

import { PRODUCTS, CATEGORY_META, type Product, type ProductCategory } from "@/data/products";
import { SERVICES, type Service } from "@/data/services";
import { JOBS, RECRUITMENT_PROCESS, type Job } from "@/data/careers";
import { NEWS, ACTIVITIES, type NewsPost, type Activity } from "@/data/news";
import {
  COMPANY,
  STATS,
  PROOF,
  MILESTONES,
  VALUES,
  INDUSTRIES,
  PARTNERS,
} from "@/content/company";

export type { Product, ProductCategory, Service, Job, NewsPost, Activity };

// Pages can opt into ISR with `export const revalidate = N`; with local data
// it's effectively static. Exposed here so the cadence lives in one place.
export const CMS_REVALIDATE_SECONDS = 300;

// ── Company / stats ───────────────────────────────────────────────────────
export async function getCompany() {
  return COMPANY;
}
export async function getStats() {
  return STATS;
}
export async function getProofPoints() {
  return PROOF;
}
export async function getMilestones() {
  return MILESTONES;
}
export async function getValues() {
  return VALUES;
}
export async function getIndustries() {
  return INDUSTRIES;
}
export async function getPartners() {
  return PARTNERS;
}

// ── Products ──────────────────────────────────────────────────────────────
export async function getProducts(): Promise<Product[]> {
  return PRODUCTS;
}
export async function getFeaturedProducts(limit = 6): Promise<Product[]> {
  return PRODUCTS.filter((p) => p.featured).slice(0, limit);
}
export async function getProduct(slug: string): Promise<Product | null> {
  return PRODUCTS.find((p) => p.slug === slug) ?? null;
}
export async function getProductSlugs(): Promise<string[]> {
  return PRODUCTS.map((p) => p.slug);
}
export async function getProductCategories() {
  return CATEGORY_META;
}
export async function getRelatedProducts(slug: string, limit = 3): Promise<Product[]> {
  const product = PRODUCTS.find((p) => p.slug === slug);
  if (!product) return [];
  return PRODUCTS.filter((p) => p.category === product.category && p.slug !== slug).slice(0, limit);
}

// ── Services ──────────────────────────────────────────────────────────────
export async function getServices(): Promise<Service[]> {
  return SERVICES;
}

// ── Careers ───────────────────────────────────────────────────────────────
export async function getJobs(): Promise<Job[]> {
  return JOBS;
}
export async function getJob(slug: string): Promise<Job | null> {
  return JOBS.find((j) => j.slug === slug) ?? null;
}
export async function getJobSlugs(): Promise<string[]> {
  return JOBS.map((j) => j.slug);
}
export async function getRecruitmentProcess() {
  return RECRUITMENT_PROCESS;
}

// ── News & activities ─────────────────────────────────────────────────────
export async function getNews(): Promise<NewsPost[]> {
  return NEWS;
}
export async function getNewsPost(slug: string): Promise<NewsPost | null> {
  return NEWS.find((n) => n.slug === slug) ?? null;
}
export async function getNewsSlugs(): Promise<string[]> {
  return NEWS.map((n) => n.slug);
}
export async function getActivities(): Promise<Activity[]> {
  return ACTIVITIES;
}
