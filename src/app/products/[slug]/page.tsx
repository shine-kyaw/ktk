import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/Reveal";
import { ProductMedia } from "@/components/products/ProductMedia";
import { MaterialBreakdown } from "@/components/products/MaterialBreakdown";
import { ProductGallery } from "@/components/products/ProductGallery";
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

  const useCases = product.useCases ?? [];
  const benefits = product.benefits ?? [];
  const gallery = product.gallery ?? [];
  const layers = [...(product.materialLayers ?? [])].sort((a, b) => a.order - b.order);
  const hasBrochure = Boolean(product.brochureUrl);

  return (
    <div className="pb-28 pt-40">
      {/* 1, Header */}
      <div className="container-x">
        <Reveal>
          <Link
            href="/products"
            className="mono text-[0.66rem] uppercase tracking-[0.18em] text-ash hover:text-red"
          >
            ← All products
          </Link>
          <div className="mt-8 grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-end">
            <div>
              <p className="eyebrow">{product.category}</p>
              <h1 className="display mt-5 max-w-3xl text-5xl text-bone sm:text-6xl">
                {product.name}
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-bone-dim">
                {product.summary}
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Link
                href="/contact"
                className="press mono bg-red px-6 py-3.5 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-white hover:bg-red-deep"
              >
                Contact sales
              </Link>
              <a
                href="#specifications"
                className="press mono border border-seam bg-iron px-6 py-3.5 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-bone hover:border-bone"
              >
                View specs
              </a>
            </div>
          </div>
        </Reveal>
      </div>

      {/* 2, Media + quick-facts rail */}
      <div className="container-x mt-12">
        <Reveal delay={0.06}>
          <div className="grid gap-px bg-seam lg:grid-cols-[1.6fr_1fr]">
            <ProductMedia
              image={product.image ?? null}
              alt={`${product.name}, KTK industrial packaging`}
            />
            <dl className="grid grid-cols-1 bg-iron">
              {product.specs.slice(0, 3).map((s) => (
                <div key={s.label} className="border-b border-seam p-6 last:border-b-0">
                  <dt className="mono text-[0.6rem] uppercase tracking-[0.18em] text-ash">
                    {s.label}
                  </dt>
                  <dd className="mono mt-2 text-lg text-bone">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>

      {/* 3, Overview + best use cases */}
      {(product.longDescription || useCases.length > 0) && (
        <div className="container-x mt-20 grid gap-12 lg:grid-cols-[1.3fr_1fr]">
          {product.longDescription && (
            <Reveal>
              <h2 className="eyebrow">Overview</h2>
              <p className="mt-6 max-w-2xl whitespace-pre-line text-lg leading-relaxed text-bone-dim">
                {product.longDescription}
              </p>
            </Reveal>
          )}
          {useCases.length > 0 && (
            <Reveal delay={0.08}>
              <h2 className="eyebrow">Best for</h2>
              <ul className="mt-6 space-y-px bg-seam">
                {useCases.map((u) => (
                  <li
                    key={u}
                    className="flex items-start gap-3 bg-coal p-4 text-sm leading-relaxed text-bone"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-red" />
                    {u}
                  </li>
                ))}
              </ul>
            </Reveal>
          )}
        </div>
      )}

      {/* 4, Key benefits */}
      {benefits.length > 0 && (
        <div className="container-x mt-20">
          <Reveal>
            <h2 className="eyebrow">Key benefits</h2>
          </Reveal>
          <div className="mt-6 grid gap-px bg-seam sm:grid-cols-2">
            {benefits.map((b, i) => (
              <Reveal key={b.title} delay={i * 0.05} className="bg-iron p-7">
                <span className="mono text-[0.64rem] text-red">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="display mt-4 text-xl text-bone">{b.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-bone-dim">{b.detail}</p>
              </Reveal>
            ))}
          </div>
        </div>
      )}

      {/* 5, Material breakdown, dark cinematic band */}
      {layers.length > 0 && (
        <div className="mt-24">
          <MaterialBreakdown productName={product.name} layers={layers} />
        </div>
      )}

      {/* 6, Specifications */}
      <div id="specifications" className="container-x mt-24 scroll-mt-24">
        <Reveal>
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
                className="mono border border-seam bg-iron px-4 py-2 text-[0.68rem] uppercase tracking-[0.14em] text-bone-dim"
              >
                {a}
              </li>
            ))}
          </ul>

          <p className="mono mt-8 text-[0.62rem] leading-relaxed text-ash">
            Specifications are representative and subject to confirmation against KTK&apos;s verified
            product data.
          </p>
        </Reveal>
      </div>

      {/* 7, Gallery */}
      {gallery.length > 0 && (
        <div className="container-x mt-24">
          <Reveal>
            <h2 className="eyebrow">Gallery</h2>
          </Reveal>
          <ProductGallery items={gallery} />
        </div>
      )}

      {/* 8, Brochure + inquiry */}
      <div className="container-x mt-24 grid gap-px bg-seam lg:grid-cols-2">
        <div className="bg-iron p-8">
          <h2 className="display text-2xl text-bone">Product brochure</h2>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-bone-dim">
            Full specification sheet, dimensions, and print options in one PDF.
          </p>
          {hasBrochure ? (
            <a
              href={product.brochureUrl!}
              target="_blank"
              rel="noopener noreferrer"
              className="press mono mt-6 inline-block border border-bone bg-iron px-6 py-3.5 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-bone hover:bg-bone hover:text-coal"
            >
              Download brochure (PDF)
            </a>
          ) : (
            <span
              aria-disabled="true"
              title="Brochure coming soon"
              className="mono mt-6 inline-block cursor-not-allowed border border-seam bg-coal px-6 py-3.5 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-ash"
            >
              Brochure coming soon
            </span>
          )}
        </div>
        <div className="bg-iron p-8">
          <h2 className="display text-2xl text-bone">Request pricing</h2>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-bone-dim">
            Send your specification and volumes, our sales team responds with a quotation and lead
            time.
          </p>
          <Link
            href="/contact"
            className="press mono mt-6 inline-block bg-red px-6 py-3.5 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-white hover:bg-red-deep"
          >
            Enquire now
          </Link>
          <a
            href="mailto:sales@ktk.com.mm"
            className="mono mt-5 inline-block text-[0.64rem] text-ash transition-colors hover:text-red"
          >
            sales@ktk.com.mm
          </a>
        </div>
      </div>

      {/* 9, Related products */}
      {related.length > 0 && (
        <div className="container-x mt-24">
          <Reveal>
            <h2 className="eyebrow">Related products</h2>
          </Reveal>
          <div className="mt-6 grid gap-px bg-seam sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r, i) => (
              <Reveal key={r.slug} delay={i * 0.05} className="bg-coal">
                <Link
                  href={`/products/${r.slug}`}
                  className="group flex h-full flex-col p-7 transition-colors hover:bg-iron"
                >
                  <span className="mono text-[0.6rem] uppercase tracking-[0.16em] text-red">
                    {r.category}
                  </span>
                  <h3 className="display mt-3 text-xl text-bone transition-colors group-hover:text-red">
                    {r.name}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-bone-dim">{r.summary}</p>
                  <span className="mono mt-6 text-[0.62rem] uppercase tracking-[0.16em] text-ash group-hover:text-red">
                    View product →
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
