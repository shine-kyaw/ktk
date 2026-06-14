"use client";

import { useState } from "react";

/** Social share row — Facebook (dominant in Myanmar), generic share, copy link. */
export function ShareLinks({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  const url = typeof window !== "undefined" ? window.location.href : "";

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable — the visible URL bar is the fallback.
    }
  };

  const nativeShare = async () => {
    try {
      await navigator.share({ title, url: window.location.href });
    } catch {
      // User dismissed or unsupported — no-op.
    }
  };

  const btn =
    "mono press border border-seam px-4 py-2.5 text-[0.64rem] uppercase tracking-[0.16em] text-ash transition-colors hover:border-red hover:text-red";

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="mono text-[0.64rem] uppercase tracking-[0.18em] text-ash">Share:</span>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className={btn}
      >
        Facebook
      </a>
      {typeof navigator !== "undefined" && "share" in navigator && (
        <button onClick={nativeShare} className={btn}>
          Share…
        </button>
      )}
      <button onClick={copy} className={btn}>
        {copied ? "Copied ✓" : "Copy link"}
      </button>
    </div>
  );
}
