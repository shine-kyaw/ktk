"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { AdminField, AdminSection } from "@/lib/admin-content";

export function AdminRecordForm({
  section,
  record,
}: {
  section: AdminSection;
  record: Record<string, unknown> | null;
}) {
  const router = useRouter();
  const isNew = !record;
  const [values, setValues] = useState<Record<string, unknown>>(() => initialValues(section, record));
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function save(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      const id = record ? String(record[section.idField]) : "";
      const response = await fetch(
        isNew ? `/api/admin/content/${section.slug}` : `/api/admin/content/${section.slug}/${encodeURIComponent(id)}`,
        {
          method: isNew ? "POST" : "PUT",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(values),
        },
      );
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || "Unable to save content.");
      router.push(`/admin/content/${section.slug}`);
      router.refresh();
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Unable to save content.");
    } finally {
      setBusy(false);
    }
  }

  async function archive() {
    if (!record || !window.confirm("Archive this record? It will no longer appear publicly.")) return;
    setBusy(true);
    setError("");
    try {
      const id = String(record[section.idField]);
      const response = await fetch(`/api/admin/content/${section.slug}/${encodeURIComponent(id)}`, { method: "DELETE" });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || "Unable to archive content.");
      router.push(`/admin/content/${section.slug}`);
      router.refresh();
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Unable to archive content.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={save} className="grid gap-6">
      {section.fields.map((field) => (
        <AdminInput
          key={field.key}
          field={field}
          value={values[field.key]}
          disabled={!isNew && field.key === section.idField}
          onChange={(value) => setValues((current) => ({ ...current, [field.key]: value }))}
        />
      ))}

      {error ? <p className="border border-red/40 bg-red/5 p-4 text-sm text-red">{error}</p> : null}
      <div className="flex flex-wrap items-center gap-3 border-t border-seam pt-6">
        <button disabled={busy} className="press mono bg-red px-6 py-3.5 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-white disabled:opacity-50">
          {busy ? "Saving…" : "Save and return to list"}
        </button>
        <button type="button" onClick={() => router.back()} className="press mono border border-seam px-6 py-3.5 text-[0.68rem] uppercase tracking-[0.14em] text-bone">
          Cancel
        </button>
        {!isNew ? (
          <button type="button" onClick={archive} disabled={busy} className="mono ml-auto px-4 py-3 text-[0.64rem] uppercase tracking-[0.14em] text-ash hover:text-red">
            Archive record
          </button>
        ) : null}
      </div>
    </form>
  );
}

function AdminInput({ field, value, disabled, onChange }: { field: AdminField; value: unknown; disabled?: boolean; onChange: (value: unknown) => void }) {
  const base = "mt-2 w-full border border-seam bg-iron px-4 py-3 text-sm text-bone outline-none focus:border-red disabled:opacity-50";
  const stringValue = value === undefined || value === null ? "" : String(value);

  return (
    <label className="block">
      <span className="mono text-[0.62rem] uppercase tracking-[0.14em] text-bone-dim">{field.label}{field.required ? " *" : ""}</span>
      {field.type === "boolean" ? (
        <span className="mt-3 flex items-center gap-3">
          <input type="checkbox" checked={Boolean(value)} onChange={(event) => onChange(event.target.checked)} className="h-5 w-5 accent-red" />
          <span className="text-sm text-ash">Enabled</span>
        </span>
      ) : field.type === "select" ? (
        <select disabled={disabled} value={stringValue} onChange={(event) => onChange(event.target.value)} className={base}>
          <option value="">Select…</option>
          {field.options?.map((option) => <option key={option} value={option}>{option}</option>)}
        </select>
      ) : field.type === "textarea" || field.type === "json" ? (
        <textarea disabled={disabled} rows={field.type === "json" ? 9 : 5} value={stringValue} onChange={(event) => onChange(event.target.value)} className={`${base} ${field.type === "json" ? "font-mono" : "font-sans"}`} />
      ) : (
        <input disabled={disabled} type={field.type === "number" ? "number" : field.type === "date" ? "date" : "text"} value={stringValue} onChange={(event) => onChange(field.type === "number" ? Number(event.target.value) : event.target.value)} className={base} />
      )}
      {field.help ? <span className="mt-2 block text-xs leading-relaxed text-ash">{field.help}</span> : null}
    </label>
  );
}

function initialValues(section: AdminSection, record: Record<string, unknown> | null): Record<string, unknown> {
  return Object.fromEntries(section.fields.map((field) => {
    const raw = record?.[field.key];
    if (field.type === "json") return [field.key, JSON.stringify(raw ?? (field.required ? {} : []), null, 2)];
    if (raw !== undefined && raw !== null) return [field.key, raw];
    if (field.type === "boolean") return [field.key, false];
    if (field.type === "number") return [field.key, 0];
    if (field.key === "status") return [field.key, "draft"];
    return [field.key, ""];
  }));
}
