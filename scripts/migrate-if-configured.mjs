// Prepares the CMS database before `next build` — but only when one is
// configured.
//
// Without DATABASE_URL the website builds and serves its built-in content, so
// a deploy must never fail merely because the CMS has not been connected yet.
//
// With it:
//   1. Pending migrations are applied, so the site is never deployed against a
//      database whose tables it does not understand.
//   2. On the very first deploy, the database is filled with the website's
//      current content (scripts/seed.ts). The seed records that it has run and
//      does nothing on every later deploy, so it can never undo an editor.
//
// Connecting the CMS is therefore just: set DATABASE_URL and PAYLOAD_SECRET,
// then redeploy. Nothing has to be run by hand.

import { spawnSync } from "node:child_process";

if (!process.env.DATABASE_URL) {
  console.log("[cms] DATABASE_URL not set — skipping migrations; the site builds with its built-in content.");
  process.exit(0);
}

const env = { ...process.env, PAYLOAD_CONFIG_PATH: "src/payload.config.ts" };
const run = (label, command, args) => {
  console.log(`[cms] ${label}…`);
  const result = spawnSync(command, args, { stdio: "inherit", shell: process.platform === "win32", env });
  if (result.status !== 0) {
    console.error(`[cms] ${label} failed.`);
    process.exit(result.status ?? 1);
  }
};

run("Applying database migrations", "npx", ["payload", "migrate"]);
run("Filling the CMS with the website content, if this is the first deploy", "npx", ["tsx", "scripts/seed.ts"]);
