import type { Pool } from "pg";
import type { Adapter } from "@payloadcms/plugin-cloud-storage/types";
import { cloudStoragePlugin } from "@payloadcms/plugin-cloud-storage";

// Stores uploaded files directly in the Postgres database instead of on disk.
// Vercel's filesystem is read-only, so without a real storage backend every
// upload would silently fail. Keeping the bytes in the same database means the
// whole CMS is portable behind one DATABASE_URL — nothing else to provision.
//
// Ported from the Power Tagun CMS, which runs this in production.
//
// Only new uploads land here. The site's existing photography stays as static
// files in /public (see imageField in ./fields), which is what keeps this
// small enough for a free database plan. If uploads ever outgrow the database,
// set the R2_* variables and payload.config.ts switches to S3-compatible
// storage instead.

const TABLE = "ktk_media_blobs";

// Reuse the node-postgres pool Payload's adapter already manages rather than
// opening a second one.
const getPool = (req: { payload: { db: unknown } }): Pool =>
  (req.payload.db as { pool: Pool }).pool;

// Created once per process. It lives outside Payload's own schema, so it needs
// no migration and cannot collide with generated tables.
let ensured: Promise<unknown> | null = null;
const ensureTable = (pool: Pool): Promise<unknown> => {
  if (!ensured) {
    ensured = pool.query(
      `CREATE TABLE IF NOT EXISTS ${TABLE} (
        filename   text PRIMARY KEY,
        mime_type  text NOT NULL,
        byte_size  integer,
        data       bytea NOT NULL,
        created_at timestamptz NOT NULL DEFAULT now()
      )`,
    );
  }
  return ensured;
};

const postgresAdapter: Adapter = () => ({
  name: "postgres",

  handleUpload: async ({ file, data, req }) => {
    const pool = getPool(req);
    await ensureTable(pool);
    await pool.query(
      `INSERT INTO ${TABLE} (filename, mime_type, byte_size, data)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (filename) DO UPDATE
         SET mime_type = EXCLUDED.mime_type,
             byte_size = EXCLUDED.byte_size,
             data      = EXCLUDED.data`,
      [file.filename, file.mimeType, file.filesize, file.buffer],
    );
    return data;
  },

  handleDelete: async ({ filename, req }) => {
    const pool = getPool(req);
    await ensureTable(pool);
    await pool.query(`DELETE FROM ${TABLE} WHERE filename = $1`, [filename]);
  },

  generateURL: ({ filename }) => `/api/media/file/${encodeURIComponent(filename)}`,

  staticHandler: async (req, { headers, params }) => {
    const pool = getPool(req);
    await ensureTable(pool);
    // Only serve bytes that still belong to a Media record, so a deleted item
    // cannot keep being served from an orphaned blob.
    const { rows } = await pool.query(
      `SELECT b.mime_type, b.data FROM ${TABLE} b
       INNER JOIN media m ON m.filename = b.filename
       WHERE b.filename = $1`,
      [params.filename],
    );
    if (rows.length === 0) {
      return new Response(null, { status: 404, statusText: "Not Found" });
    }
    const { mime_type: mimeType, data } = rows[0] as { mime_type: string; data: Buffer };
    const out = new Headers(headers);
    out.set("Content-Type", mimeType || "application/octet-stream");
    out.set("Content-Length", String(data.length));
    // Cacheable, but not immutable: an editor may replace an image under the
    // same filename, so the URL must be allowed to refresh.
    out.set("Cache-Control", "public, max-age=3600, must-revalidate");
    if (mimeType === "image/svg+xml") {
      out.set("Content-Security-Policy", "script-src 'none'");
    }
    return new Response(new Uint8Array(data), { headers: out, status: 200 });
  },
});

export const postgresStorage = () =>
  cloudStoragePlugin({
    collections: {
      media: { adapter: postgresAdapter },
    },
  });
