"use client";

import { useState } from "react";

/**
 * Job application form, UI complete; submission opens a pre-filled email
 * (CV attaches in the applicant's mail app). Swaps to POST /api/apply with
 * real file upload once the CMS/backend target is chosen.
 */
export function ApplicationForm({ position }: { position: string }) {
  const [sent, setSent] = useState(false);
  const [cvName, setCvName] = useState<string | null>(null);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const subject = encodeURIComponent(`Application, ${position}, ${data.get("name")}`);
    const body = encodeURIComponent(
      `Position: ${position}\nName: ${data.get("name")}\nPhone: ${data.get("phone")}\nEmail: ${data.get("email")}\n\n${data.get("cover")}\n\n(Please attach your CV to this email before sending.)`,
    );
    window.location.href = `mailto:kaungthukha@ktk.com.mm?subject=${subject}&body=${body}`;
    setSent(true);
  };

  const field =
    "w-full border border-seam bg-iron px-4 py-3.5 text-sm text-bone placeholder:text-ash focus:border-red focus:outline-none";

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <input name="name" required placeholder="Full name" aria-label="Full name" className={field} />
      <div className="grid gap-4 sm:grid-cols-2">
        <input name="phone" required placeholder="Phone" aria-label="Phone" className={field} />
        <input name="email" type="email" placeholder="Email" aria-label="Email" className={field} />
      </div>
      <textarea
        name="cover"
        rows={4}
        placeholder="Briefly tell us about your experience…"
        aria-label="Cover note"
        className={field}
      />
      <label className="mono cursor-pointer border border-dashed border-seam px-4 py-4 text-center text-[0.68rem] uppercase tracking-[0.14em] text-ash transition-colors hover:border-red hover:text-red">
        {cvName ?? "Attach CV (PDF / DOC)"}
        <input
          type="file"
          name="cv"
          accept=".pdf,.doc,.docx"
          className="hidden"
          onChange={(e) => setCvName(e.target.files?.[0]?.name ?? null)}
        />
      </label>
      <button
        type="submit"
        className="press mono bg-red px-7 py-4 text-[0.74rem] font-semibold uppercase tracking-[0.16em] text-bone transition-colors hover:bg-bone hover:text-coal"
      >
        Submit application
      </button>
      {sent && (
        <p className="mono text-[0.66rem] uppercase leading-relaxed tracking-[0.14em] text-red">
          Your email app should open, attach your CV before sending, or write directly to
          kaungthukha@ktk.com.mm
        </p>
      )}
    </form>
  );
}
