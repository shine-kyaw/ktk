"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { AdminSection } from "@/lib/admin-content";

export function AdminCollectionList({ section, enabled }: { section: AdminSection; enabled: boolean }) {
  const [records, setRecords] = useState<Record<string, unknown>[]>([]);
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(enabled);

  useEffect(() => {
    if (!enabled) return;
    fetch(`/api/admin/content/${section.slug}`, { cache: "no-store" })
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Unable to load content.");
        setRecords(data.records || []);
      })
      .catch((reason) => setError(reason instanceof Error ? reason.message : "Unable to load content."))
      .finally(() => setLoading(false));
  }, [enabled, section.slug]);

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return records;
    return records.filter((record) => JSON.stringify(record).toLowerCase().includes(needle));
  }, [query, records]);

  if (!enabled) {
    return <SetupNotice />;
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search this section"
          className="min-w-[16rem] flex-1 border border-seam bg-iron px-4 py-3 text-sm text-bone outline-none focus:border-red"
        />
        {section.slug !== "media-library" ? (
          <Link
            href={`/admin/content/${section.slug}/new`}
            className="press mono bg-red px-5 py-3 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-white"
          >
            Add content
          </Link>
        ) : null}
      </div>

      {loading ? <p className="mt-8 text-sm text-ash">Loading content…</p> : null}
      {error ? <p className="mt-8 border border-red/40 p-4 text-sm text-red">{error}</p> : null}

      {!loading && !error ? (
        <div className="mt-8 divide-y divide-seam border-y border-seam">
          {visible.map((record) => {
            const id = String(record[section.idField]);
            const title = String(record[section.titleField] || id);
            const status = String(record.status || "draft");
            return (
              <Link
                key={id}
                href={`/admin/content/${section.slug}/${encodeURIComponent(id)}`}
                className="group grid gap-3 py-5 transition-colors hover:bg-iron sm:grid-cols-[1fr_auto_auto] sm:items-center sm:px-4"
              >
                <div>
                  <p className="font-semibold text-bone group-hover:text-red">{title}</p>
                  <p className="mono mt-1 text-[0.58rem] uppercase tracking-[0.12em] text-ash">{id}</p>
                </div>
                <span className={`mono rounded-full border px-3 py-1 text-[0.56rem] uppercase tracking-[0.12em] ${status === "published" ? "border-emerald-500/50 text-emerald-300" : status === "archived" ? "border-seam text-ash" : "border-amber-500/50 text-amber-300"}`}>
                  {status}
                </span>
                <span className="mono text-[0.62rem] uppercase tracking-[0.14em] text-red">Edit →</span>
              </Link>
            );
          })}
          {visible.length === 0 ? <p className="py-10 text-center text-sm text-ash">No records found.</p> : null}
        </div>
      ) : null}
    </div>
  );
}

function SetupNotice() {
  return (
    <div className="border border-seam bg-iron p-6 text-sm leading-relaxed text-bone-dim">
      Editing is disabled until the KTK-owned Supabase database and server-side write key are configured. The public website continues to use its verified local content in the meantime.
    </div>
  );
}
