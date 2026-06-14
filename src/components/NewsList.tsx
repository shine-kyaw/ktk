"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { NewsPost } from "@/lib/cms";

const CATS = ["All", "Company", "Production", "Partnership", "CSR"] as const;

/** Filterable, searchable news index. Posts arrive from the CMS layer as props. */
export function NewsList({ posts }: { posts: NewsPost[] }) {
  const [cat, setCat] = useState<string>("All");
  const [q, setQ] = useState("");

  const items = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return posts.filter(
      (n) =>
        (cat === "All" || n.category === cat) &&
        (!needle ||
          n.title.toLowerCase().includes(needle) ||
          n.excerpt.toLowerCase().includes(needle)),
    );
  }, [posts, cat, q]);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {CATS.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`mono press px-4 py-2 text-[0.66rem] uppercase tracking-[0.16em] transition-colors ${
                cat === c
                  ? "bg-amber text-coal"
                  : "border border-seam text-ash hover:border-amber hover:text-amber"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search news…"
          aria-label="Search news"
          className="w-full max-w-xs border border-seam bg-iron px-4 py-2.5 text-sm text-bone placeholder:text-ash focus:border-amber focus:outline-none"
        />
      </div>

      <div className="mt-10 divide-y divide-seam border-y border-seam">
        {items.map((n) => (
          <Link
            key={n.slug}
            href={`/news/${n.slug}`}
            className="group grid gap-2 py-8 transition-colors hover:bg-iron sm:grid-cols-[7rem_9rem_1fr] sm:items-baseline sm:gap-6 sm:px-4"
          >
            <span className="mono text-[0.68rem] text-amber">{n.date}</span>
            <span className="mono text-[0.62rem] uppercase tracking-[0.16em] text-ash">
              {n.category}
            </span>
            <div>
              <h2 className="display text-2xl text-bone transition-colors group-hover:text-amber">
                {n.title}
              </h2>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-ash">{n.excerpt}</p>
            </div>
          </Link>
        ))}
        {items.length === 0 && (
          <p className="mono py-10 text-center text-[0.7rem] uppercase tracking-[0.16em] text-ash">
            No posts match your search.
          </p>
        )}
      </div>
    </div>
  );
}
