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
    <form onSubmit={upload} className="admin-card admin-upload">
      <div>
        <h3>Upload approved media</h3>
        <p>Images up to 12 MB or PDF documents up to 20 MB. Files are drafts until published.</p>
      </div>
      <div className="admin-upload-grid"><input name="file" type="file" required accept="image/jpeg,image/png,image/webp,image/gif,application/pdf" /><input name="alt_text" placeholder="Alternative text" /><input name="caption" placeholder="Caption or source note" /><button disabled={busy} className="admin-primary">{busy ? "Uploading…" : "Upload file"}</button></div>
      {message ? <p>{message}</p> : null}
    </form>
  );
}
