import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/Reveal";
import { ShareLinks } from "@/components/ShareLinks";
import { getNewsPost, getNewsSlugs, getNews } from "@/lib/cms";

export async function generateStaticParams() {
  const slugs = await getNewsSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getNewsPost(slug);
  return post ? { title: post.title, description: post.excerpt } : { title: "News" };
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getNewsPost(slug);
  if (!post) notFound();

  const all = await getNews();
  const related = all.filter((n) => n.slug !== post.slug).slice(0, 2);

  return (
    <div className="container-x pb-28 pt-40">
      <Reveal>
        <Link
          href="/news"
          className="mono text-[0.66rem] uppercase tracking-[0.18em] text-ash hover:text-amber"
        >
          ← Newsroom
        </Link>
        <p className="eyebrow mt-8">
          {post.category} · {post.date}
        </p>
        <h1 className="display mt-5 max-w-4xl text-4xl text-bone sm:text-6xl">{post.title}</h1>
      </Reveal>

      <Reveal delay={0.08} className="mt-12 max-w-2xl">
        {post.body.map((para) => (
          <p key={para.slice(0, 32)} className="mt-6 leading-relaxed text-bone-dim">
            {para}
          </p>
        ))}
        <div className="mt-12 border-t border-seam pt-8">
          <ShareLinks title={post.title} />
        </div>
      </Reveal>

      {related.length > 0 && (
        <Reveal className="mt-20">
          <h2 className="eyebrow">More news</h2>
          <div className="mt-6 grid gap-px bg-seam sm:grid-cols-2">
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/news/${r.slug}`}
                className="group bg-coal p-7 transition-colors hover:bg-iron"
              >
                <span className="mono text-[0.64rem] text-amber">{r.date}</span>
                <h3 className="display mt-3 text-xl text-bone transition-colors group-hover:text-amber">
                  {r.title}
                </h3>
              </Link>
            ))}
          </div>
        </Reveal>
      )}
    </div>
  );
}
