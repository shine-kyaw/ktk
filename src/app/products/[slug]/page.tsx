import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/Reveal";
import { getProduct, getProductSlugs, getRelatedProducts } from "@/lib/cms";

export async function generateStaticParams() {
  const slugs = await getProductSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  return { title: product ? product.name : "Product" };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();
  const related = await getRelatedProducts(slug);

  return (
    <div className="container-x pb-28 pt-40">
      <Reveal>
        <Link
          href="/products"
          className="mono text-[0.66rem] uppercase tracking-[0.18em] text-ash hover:text-red"
        >
          ← All products
        </Link>
        <p className="eyebrow mt-8">{product.category}</p>
        <h1 className="display mt-5 max-w-3xl text-5xl text-bone sm:text-6xl">{product.name}</h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-bone-dim">{product.summary}</p>
      </Reveal>

      {/* Media slot — receives product photography via the CMS later */}
      <Reveal delay={0.08} className="mt-12">
        <div className="weave grain relative flex aspect-[21/9] items-end overflow-hidden border border-seam bg-iron p-5">
          <span className="mono text-[0.6rem] uppercase tracking-[0.18em] text-ash">
            Product image — coming via CMS
          </span>
        </div>
      </Reveal>

      <div className="mt-16 grid gap-12 lg:grid-cols-3">
        <Reveal className="lg:col-span-2">
          <h2 className="eyebrow">Technical specification</h2>
          <dl className="mt-6 grid gap-px bg-seam sm:grid-cols-2">
            {product.specs.map((s) => (
              <div key={s.label} className="bg-iron p-6">
                <dt className="mono text-[0.62rem] uppercase tracking-[0.18em] text-ash">
                  {s.label}
                </dt>
                <dd className="mono mt-2 text-lg text-bone">{s.value}</dd>
              </div>
            ))}
          </dl>

          <h2 className="eyebrow mt-12">Applications</h2>
          <ul className="mt-6 flex flex-wrap gap-2">
            {product.applications.map((a) => (
              <li
                key={a}
                className="mono border border-seam px-4 py-2 text-[0.68rem] uppercase tracking-[0.14em] text-bone-dim"
              >
                {a}
              </li>
            ))}
          </ul>

          <p className="mono mt-12 border border-dashed border-seam p-5 text-[0.66rem] uppercase tracking-[0.16em] text-ash">
            Datasheet download — available on request
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="border border-seam p-7">
            <h2 className="display text-2xl text-bone">Request pricing</h2>
            <p className="mt-3 text-sm leading-relaxed text-ash">
              Send your specification and volumes — our sales team responds with a quotation and
              lead time.
            </p>
            <Link
              href="/contact"
              className="press mono mt-6 block bg-red px-5 py-3.5 text-center text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-bone hover:bg-bone hover:text-coal"
            >
              Enquire now
            </Link>
            <p className="mono mt-5 text-center text-[0.64rem] text-ash">sales@ktk.com.mm</p>
          </div>

          {related.length > 0 && (
            <div className="mt-8">
              <h3 className="eyebrow">Related</h3>
              <ul className="mt-4 divide-y divide-seam border-y border-seam">
                {related.map((r) => (
                  <li key={r.slug}>
                    <Link
                      href={`/products/${r.slug}`}
                      className="block py-4 text-sm text-bone-dim transition-colors hover:text-red"
                    >
                      {r.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Reveal>
      </div>
    </div>
  );
}
