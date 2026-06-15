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
import { JOBS, RECRUITMENT_PROCESS } from "@/data/careers";
import { NEWS, ACTIVITIES } from "@/data/blog";
import { BAG_ANATOMY } from "@/data/anatomy";
import {
  COMPANY,
  STATS,
  PROOF,
  MILESTONES,
  VALUES,
  INDUSTRIES,
  PARTNERS,
} from "@/content/company";

export const dynamic = "force-dynamic";

const slugify = (s: string) =>
  s.toLowerCase().replace(/&/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");

export async function POST(req: Request) {
  const secret = process.env.SEED_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "SEED_SECRET is not set on the server." }, { status: 500 });
  }
  const provided = req.headers.get("x-seed-secret") ?? new URL(req.url).searchParams.get("secret");
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
      specs: p.specs,
      applications: p.applications,
      image: p.image ?? null,
      featured: p.featured ?? false,
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
      sort_order: i,
    }));
    await up(db, "services", services, "slug");
    counts.services = services.length;

    // jobs
    const jobs = JOBS.map((j, i) => ({
      slug: j.slug,
      title: j.title,
      department: j.department,
      location: j.location,
      type: j.type,
      summary: j.summary,
      responsibilities: j.responsibilities,
      requirements: j.requirements,
      sort_order: i,
    }));
    await up(db, "jobs", jobs, "slug");
    counts.jobs = jobs.length;

    // news
    const news = NEWS.map((n, i) => ({
      slug: n.slug,
      date: n.date,
      category: n.category,
      title: n.title,
      excerpt: n.excerpt,
      body: n.body,
      image: null,
      sort_order: i,
    }));
    await up(db, "news", news, "slug");
    counts.news = news.length;

    // activities
    const activities = ACTIVITIES.map((a, i) => ({
      slug: a.slug,
      category: a.category,
      title: a.title,
      date: a.date,
      detail: a.detail,
      image: null,
      sort_order: i,
    }));
    await up(db, "activities", activities, "slug");
    counts.activities = activities.length;

    // bag anatomy layers
    const layers = BAG_ANATOMY.layers.map((l, i) => ({
      slug: l.id,
      name: l.name,
      tag: l.tag,
      description: l.description,
      note: l.note,
      variant: l.variant,
      image: l.image ?? null,
      callout: l.callout ?? "right",
      sort_order: l.order ?? i,
    }));
    await up(db, "bag_layers", layers, "slug");
    counts.bag_layers = layers.length;

    // singletons
    const { layers: _omit, ...anatomyMeta } = BAG_ANATOMY;
    const singletons = [
      { key: "company", data: COMPANY },
      { key: "stats", data: STATS },
      { key: "proof", data: PROOF },
      { key: "milestones", data: MILESTONES },
      { key: "values", data: VALUES },
      { key: "industries", data: INDUSTRIES },
      { key: "partners", data: PARTNERS },
      { key: "recruitment", data: RECRUITMENT_PROCESS },
      { key: "anatomy_meta", data: anatomyMeta },
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
