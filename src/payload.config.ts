import path from "path";
import { fileURLToPath } from "url";
import { buildConfig, type CollectionConfig, type GlobalConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { s3Storage } from "@payloadcms/storage-s3";
import sharp from "sharp";

import { postgresStorage } from "./payload/postgresStorage";
import { Users } from "./payload/collections/Users";
import { Media } from "./payload/collections/Media";
import { Products } from "./payload/collections/Products";
import { ProductCategories } from "./payload/collections/ProductCategories";
import { Certificates } from "./payload/collections/Certificates";
import { Leadership } from "./payload/collections/Leadership";
import { GroupCompanies, Milestones, Partners, Services } from "./payload/collections/CompanyLists";
import { Activities } from "./payload/collections/Activities";
import { News } from "./payload/collections/News";
import { Company } from "./payload/globals/Company";
import { PageContent } from "./payload/globals/PageContent";
import { SiteSettings } from "./payload/globals/SiteSettings";
import { refreshAfterChange, refreshAfterDelete, refreshAfterGlobalChange } from "./payload/revalidate";

// Every save or delete refreshes the public site (see ./payload/revalidate).
const withRefresh = (collection: CollectionConfig): CollectionConfig => ({
  ...collection,
  hooks: {
    ...collection.hooks,
    afterChange: [...(collection.hooks?.afterChange ?? []), refreshAfterChange],
    afterDelete: [...(collection.hooks?.afterDelete ?? []), refreshAfterDelete],
  },
});
const withGlobalRefresh = (global: GlobalConfig): GlobalConfig => ({
  ...global,
  hooks: {
    ...global.hooks,
    afterChange: [...(global.hooks?.afterChange ?? []), refreshAfterGlobalChange],
  },
});

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

// ─────────────────────────────────────────────────────────────────────────
// The CMS switches on when DATABASE_URL is set.
//
// Without it the website still builds and serves its built-in content exactly
// as before (see src/lib/cms.ts), so the site can never be taken down by the
// CMS being unconfigured. The placeholder secret below exists only so the
// config can load in that state — and it is refused in production as soon as
// a database is configured, so a live admin can never run on it.
// ─────────────────────────────────────────────────────────────────────────
const databaseUrl = process.env.DATABASE_URL || "";
const isProduction = process.env.NODE_ENV === "production";

if (databaseUrl && isProduction && !process.env.PAYLOAD_SECRET) {
  throw new Error(
    "PAYLOAD_SECRET must be set in production when DATABASE_URL is configured.",
  );
}
const secret = process.env.PAYLOAD_SECRET || "ktk-cms-not-configured";

// Payload needs at least two connections at once: an operation holds one for
// its transaction while looking something up on another. With a single
// connection it waits on itself until the connect timeout — even sign-in fails
// — so the floor is 2, whatever DATABASE_POOL_MAX says.
const configuredPoolMax = Number.parseInt(process.env.DATABASE_POOL_MAX || "3", 10);
const poolMax = Number.isFinite(configuredPoolMax)
  ? Math.min(10, Math.max(2, configuredPoolMax))
  : 3;

// Media storage. Uploads go into the same Postgres database by default, so
// the whole CMS needs nothing but DATABASE_URL. If uploads ever outgrow the
// database, setting the R2_* variables moves them to Cloudflare R2 (or any
// S3-compatible store) instead.
const storage =
  process.env.R2_BUCKET && process.env.R2_ACCESS_KEY_ID && process.env.R2_SECRET_ACCESS_KEY
    ? s3Storage({
        collections: { media: true },
        bucket: process.env.R2_BUCKET,
        config: {
          endpoint: process.env.R2_ENDPOINT,
          region: "auto",
          forcePathStyle: true,
          credentials: {
            accessKeyId: process.env.R2_ACCESS_KEY_ID,
            secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
          },
        },
      })
    : postgresStorage();

export default buildConfig({
  // No serverURL: the admin talks to its own API with relative URLs, so it
  // works unchanged on production, Vercel preview deployments and localhost.
  admin: {
    user: Users.slug,
    theme: "light",
    meta: {
      titleSuffix: " — KTK website admin",
      icons: [{ rel: "icon", type: "image/png", url: "/brand/ktk-logo.png" }],
    },
    importMap: { baseDir: path.resolve(dirname) },
    components: {
      graphics: {
        Icon: "/components/admin/Icon#Icon",
        Logo: "/components/admin/Logo#Logo",
      },
      beforeDashboard: ["/components/admin/Dashboard#Dashboard"],
    },
  },
  collections: [
    ...[
      Products,
      ProductCategories,
      Leadership,
      GroupCompanies,
      Certificates,
      Milestones,
      Partners,
      Services,
      Activities,
      News,
      Media,
    ].map(withRefresh),
    // Editing a user account never changes what the public site shows.
    Users,
  ],
  globals: [Company, PageContent, SiteSettings].map(withGlobalRefresh),
  editor: lexicalEditor(),
  upload: {
    abortOnLimit: true,
    limits: { fileSize: 25 * 1024 * 1024 },
  },
  secret,
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: databaseUrl || "postgres://cms-not-configured/unused",
      max: poolMax,
      connectionTimeoutMillis: 10_000,
      idleTimeoutMillis: 30_000,
    },
    // Schema changes go through migration files (src/migrations), never an
    // automatic push, so a deploy can never silently rewrite production tables.
    push: false,
    migrationDir: path.resolve(dirname, "migrations"),
  }),
  plugins: [storage],
  sharp,
});
