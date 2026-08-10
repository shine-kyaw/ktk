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
      <div className="admin-card admin-toolbar">
        <div className="admin-search"><input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search this section"
        /></div>
        {section.slug !== "media-library" ? (
          <Link
            href={`/admin/content/${section.slug}/new`}
            className="admin-primary"
          >
            + Add new
          </Link>
        ) : null}
      </div>

      {loading ? <div className="admin-card admin-empty">Loading content…</div> : null}
      {error ? <p className="admin-error" style={{marginTop:14}}>{error}</p> : null}

      {!loading && !error ? (
        <div className="admin-card admin-list">
          <div className="admin-list-head"><span>Title</span><span>Identifier</span><span>Status</span><span>Action</span></div>
          {visible.map((record) => {
            const id = String(record[section.idField]);
            const title = String(record[section.titleField] || id);
            const status = String(record.status || "draft");
            return (
              <Link
                key={id}
                href={`/admin/content/${section.slug}/${encodeURIComponent(id)}`}
                className="admin-list-row"
              >
                <div>
                  <p className="admin-record-title">{title}</p>
                </div>
                <span className="admin-record-id">{id}</span>
                <span className={`admin-badge ${status}`}>
                  {status}
                </span>
                <span className="admin-edit">Edit →</span>
              </Link>
            );
          })}
          {visible.length === 0 ? <p className="admin-empty">No records found.</p> : null}
        </div>
      ) : null}
    </div>
  );
}

function SetupNotice() {
  return (
    <div className="admin-card admin-setup">
      Editing is disabled until the KTK-owned Supabase database and server-side write key are configured. The public website continues to use its verified local content in the meantime.
    </div>
  );
}
