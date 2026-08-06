"use client";

import { useState } from "react";

export function AdminMediaUploader() {
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  async function upload(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setMessage("");
    const form = event.currentTarget;
    try {
      const response = await fetch("/api/admin/media", { method: "POST", body: new FormData(form) });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || "Unable to upload file.");
      form.reset();
      setMessage("Upload complete. Refreshing the library…");
      window.location.reload();
    } catch (reason) {
      setMessage(reason instanceof Error ? reason.message : "Unable to upload file.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={upload} className="mb-8 grid gap-4 border border-seam bg-iron p-6 sm:grid-cols-2">
      <div className="sm:col-span-2">
        <p className="eyebrow">Upload approved media</p>
        <p className="mt-2 text-sm text-ash">Images up to 12 MB or PDF documents up to 20 MB. Files are drafts until published.</p>
      </div>
      <input name="file" type="file" required accept="image/jpeg,image/png,image/webp,image/gif,application/pdf" className="border border-seam bg-coal px-4 py-3 text-sm text-bone file:mr-4 file:border-0 file:bg-red file:px-3 file:py-2 file:text-white" />
      <input name="alt_text" placeholder="Alternative text" className="border border-seam bg-coal px-4 py-3 text-sm text-bone outline-none focus:border-red" />
      <input name="caption" placeholder="Caption or source note" className="border border-seam bg-coal px-4 py-3 text-sm text-bone outline-none focus:border-red sm:col-span-2" />
      <button disabled={busy} className="press mono bg-red px-5 py-3 text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-white disabled:opacity-50">{busy ? "Uploading…" : "Upload file"}</button>
      {message ? <p className="self-center text-sm text-ash">{message}</p> : null}
    </form>
  );
}
