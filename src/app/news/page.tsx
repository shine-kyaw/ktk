import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = { title: "News" };

// Placeholder posts — this page becomes CMS/API-driven (same shape) later.
const POSTS = [
  {
    date: "2026",
    title: "New website launches",
    excerpt: "KTK's redesigned digital presence goes live, built for our dealers and partners.",
  },
  {
    date: "2025",
    title: "Capacity expansion at Hlaing Thar Yar",
    excerpt: "Additional conversion capacity comes online to meet construction-sector demand.",
  },
  {
    date: "2024",
    title: "Dealer network grows",
    excerpt: "New distribution partners onboarded across Upper and Lower Myanmar.",
  },
];

export default function NewsPage() {
  return (
    <div className="container-x pb-28 pt-40">
      <Reveal>
        <p className="eyebrow">News & updates</p>
        <h1 className="display mt-5 text-5xl text-bone sm:text-7xl">Activity</h1>
      </Reveal>

      <div className="mt-16 divide-y divide-seam border-y border-seam">
        {POSTS.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.06}>
            <article className="group grid gap-3 py-9 transition-colors hover:bg-iron sm:grid-cols-[6rem_1fr] sm:px-4">
              <span className="mono text-[0.7rem] text-amber">{p.date}</span>
              <div>
                <h2 className="display text-2xl text-bone transition-colors group-hover:text-amber">
                  {p.title}
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-ash">{p.excerpt}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-12">
        <p className="mono text-[0.66rem] uppercase tracking-[0.16em] text-ash">
          Posts shown are placeholders — this feed becomes CMS-driven.
        </p>
      </Reveal>
    </div>
  );
}
