"use client";

import { useState } from "react";

/**
 * Inquiry form — UI complete; submission currently opens a pre-filled email.
 * Swaps to a POST /api/inquiry route once a backend/CRM target is chosen.
 */
export function InquiryForm() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const subject = encodeURIComponent(`Website inquiry — ${data.get("company") || data.get("name")}`);
    const body = encodeURIComponent(
      `Name: ${data.get("name")}\nCompany: ${data.get("company")}\nPhone: ${data.get("phone")}\n\n${data.get("message")}`,
    );
    window.location.href = `mailto:kaungthukha@ktk.com.mm?subject=${subject}&body=${body}`;
    setSent(true);
  };

  const field =
    "w-full border border-seam bg-iron px-4 py-3.5 text-sm text-bone placeholder:text-ash focus:border-red focus:outline-none";

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <input name="name" required placeholder="Your name" aria-label="Your name" className={field} />
        <input name="company" placeholder="Company" aria-label="Company" className={field} />
      </div>
      <input name="phone" placeholder="Phone" aria-label="Phone" className={field} />
      <textarea
        name="message"
        required
        rows={6}
        placeholder="Tell us what you need — product, quantity, timeline…"
        aria-label="Message"
        className={field}
      />
      <button
        type="submit"
        className="press mono bg-red px-7 py-4 text-[0.74rem] font-semibold uppercase tracking-[0.16em] text-bone transition-colors hover:bg-bone hover:text-coal"
      >
        Send inquiry
      </button>
      {sent && (
        <p className="mono text-[0.68rem] uppercase tracking-[0.14em] text-red">
          Your email app should open with the message ready — or write us directly at
          kaungthukha@ktk.com.mm
        </p>
      )}
    </form>
  );
}
