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
    <form onSubmit={save} className="admin-form">
      <div className="admin-card admin-form-main">{section.fields.filter((field) => field.key !== "status").map((field) => (
        <AdminInput
          key={field.key}
          field={field}
          value={values[field.key]}
          disabled={!isNew && field.key === section.idField}
          onChange={(value) => setValues((current) => ({ ...current, [field.key]: value }))}
        />
      ))}</div>
      <aside className="admin-card admin-form-side"><h3>Publish settings</h3>
        {section.fields.filter((field) => field.key === "status").map((field) => <AdminInput key={field.key} field={field} value={values[field.key]} onChange={(value) => setValues((current) => ({...current,[field.key]:value}))} />)}
        {error ? <p className="admin-error" style={{marginTop:14}}>{error}</p> : null}
        <div className="admin-form-actions" style={{marginTop:18}}><button disabled={busy} className="admin-primary">{busy ? "Saving…" : "Save changes"}</button><button type="button" onClick={() => router.back()} className="admin-secondary">Cancel</button>{!isNew ? <button type="button" onClick={archive} disabled={busy} className="admin-danger">Archive record</button> : null}</div>
      </aside>
    </form>
  );
}

function AdminInput({ field, value, disabled, onChange }: { field: AdminField; value: unknown; disabled?: boolean; onChange: (value: unknown) => void }) {
  const base = "";
  const stringValue = value === undefined || value === null ? "" : String(value);

  return (
    <label className="admin-field">
      <span>{field.label}{field.required ? " *" : ""}</span>
      {field.type === "boolean" ? (
        <span style={{display:"flex",alignItems:"center",gap:10}}>
          <input type="checkbox" checked={Boolean(value)} onChange={(event) => onChange(event.target.checked)} className="h-5 w-5 accent-red" />
          <span>Enabled</span>
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
      {field.help ? <small>{field.help}</small> : null}
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
