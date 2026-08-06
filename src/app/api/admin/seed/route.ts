// One-time seed: copies the local seed data (src/data, src/content) into
// Supabase. Idempotent (upserts on slug/key), so it is safe to re-run.
//
//   curl -X POST "https://<site>/api/admin/seed" -H "x-seed-secret: <SEED_SECRET>"
//
// Guarded by the SEED_SECRET env var. Remove this route, or rotate the secret,
// once the database is populated and the real admin is in place.

import { NextResponse } from "next/server";
import { adminClient, isAdminConfigured } from "@/lib/supabase";

import { PRODUCTS, CATEGORY_META } from "@/data/products";
import { SERVICES } from "@/data/services";
import {
  COMPANY,
  STATS,
  PROOF,
  MILESTONES,
  VALUES,
  INDUSTRIES,
  PARTNERS,
} from "@/content/company";
import { SITE_VISIBILITY } from "@/content/site";

export const dynamic = "force-dynamic";

const slugify = (s: string) =>
  s.toLowerCase().replace(/&/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");

export async function POST(req: Request) {
  const secret = process.env.SEED_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "SEED_SECRET is not set on the server." }, { status: 500 });
  }
  const provided = req.headers.get("x-seed-secret");
  if (provided !== secret) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  if (!isAdminConfigured()) {
    return NextResponse.json(
      { error: "Supabase admin not configured (NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY)." },
      { status: 500 },
    );
  }

  const db = adminClient();
  const counts: Record<string, number> = {};

  try {
    // product categories
    const categories = CATEGORY_META.map((c, i) => ({
      slug: slugify(c.name),
      name: c.name,
      tagline: c.tagline,
      blurb: c.blurb,
      status: "published",
      sort_order: i,
    }));
    await up(db, "product_categories", categories, "slug");
    counts.product_categories = categories.length;

    // products
    const products = PRODUCTS.map((p, i) => ({
      slug: p.slug,
      name: p.name,
      category: p.category,
      summary: p.summary,
      eyebrow: p.eyebrow ?? null,
      long_description: p.longDescription ?? null,
      best_for: p.bestFor ?? null,
      unique_value: p.uniqueValue ?? null,
      printing: p.printing ?? null,
      specs: p.specs,
      applications: p.applications,
      benefits: p.benefits ?? [],
      gallery: p.gallery ?? [],
      model: p.model ?? null,
      brand: p.brand ?? null,
      quality_attributes: p.qualityAttributes ?? [],
      variants: p.variants ?? [],
      color_options: p.colorOptions ?? [],
      material_layers: p.materialLayers ?? [],
      brochure_url: p.brochureUrl ?? null,
      image: p.image ?? null,
      featured: p.featured ?? false,
      status: "published",
      sort_order: i,
    }));
    await up(db, "products", products, "slug");
    counts.products = products.length;

    // services
    const services = SERVICES.map((s, i) => ({
      slug: s.slug,
      name: s.name,
      summary: s.summary,
      points: s.points,
      status: "published",
      sort_order: i,
    }));
    await up(db, "services", services, "slug");
    counts.services = services.length;

    // singletons
    const singletons = [
      { key: "company", data: COMPANY, status: "published" },
      { key: "stats", data: STATS, status: "published" },
      { key: "proof", data: PROOF, status: "published" },
      { key: "milestones", data: MILESTONES, status: "published" },
      { key: "values", data: VALUES, status: "published" },
      { key: "industries", data: INDUSTRIES, status: "published" },
      { key: "partners", data: PARTNERS, status: "published" },
      { key: "site_visibility", data: SITE_VISIBILITY, status: "published" },
    ];
    await up(db, "singletons", singletons, "key");
    counts.singletons = singletons.length;

    return NextResponse.json({ ok: true, seeded: counts });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ ok: false, error: message, partial: counts }, { status: 500 });
  }
}

async function up(
  db: ReturnType<typeof adminClient>,
  table: string,
  rows: Record<string, unknown>[],
  onConflict: string,
) {
  const { error } = await db.from(table).upsert(rows, { onConflict });
  if (error) throw new Error(`${table}: ${error.message}`);
}
