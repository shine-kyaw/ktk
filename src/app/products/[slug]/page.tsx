import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/Reveal";
import { ProductMedia } from "@/components/products/ProductMedia";
import { ProductGallery } from "@/components/products/ProductGallery";
import { getCompany, getProduct, getProductSlugs, getRelatedProducts } from "@/lib/cms";
import { getSiteUrl } from "@/lib/site";

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
  return {
    title: product ? product.name : "Product",
    description: product?.summary,
    alternates: product ? { canonical: `/products/${product.slug}` } : undefined,
    openGraph: product
      ? {
          title: product.name,
          description: product.summary,
          url: `/products/${product.slug}`,
          images: product.image ? [{ url: product.image, alt: product.name }] : undefined,
        }
      : undefined,
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();
  const [related, company] = await Promise.all([getRelatedProducts(slug), getCompany()]);
  const salesEmail = company.emails[0];
  const benefits = product.benefits ?? [];
  const gallery = product.gallery ?? [];
  const productUrl = new URL(`/products/${product.slug}`, getSiteUrl()).toString();

  return (
    <div className="pb-28 pt-32 sm:pt-40">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.name,
            description: product.summary,
            category: product.category,
            brand: product.brand ? { "@type": "Brand", name: product.brand } : undefined,
            image: product.image ? [new URL(product.image, getSiteUrl()).toString()] : undefined,
            url: productUrl,
          }).replace(/</g, "\\u003c"),
        }}
      />
      <div className="container-x">
        <Reveal>
          <Link
            href="/products"
            className="mono text-[0.66rem] uppercase tracking-[0.18em] text-ash transition-colors hover:text-red"
          >
            ← All products
          </Link>
          <div className="mt-8 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <p className="eyebrow">{product.eyebrow ?? product.category}</p>
              <h1 className="display mt-5 max-w-4xl text-5xl text-bone sm:text-7xl">{product.name}</h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-bone-dim">{product.summary}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {product.brand && <span className="data-chip">{product.brand}</span>}
                {product.model && <span className="data-chip">{product.model}</span>}
                {product.qualityAttributes?.map((attribute) => <span key={attribute} className="data-chip">{attribute}</span>)}
                <span className="data-chip">{product.image ? "Official product imagery" : "Official image pending"}</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Link
                href={`/contact?type=product&product=${encodeURIComponent(product.name)}`}
                className="press mono bg-red px-6 py-3.5 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-white hover:bg-red-deep"
              >
                Request a quote
              </Link>
              <a
                href="#specifications"
                className="press mono border border-seam bg-iron px-6 py-3.5 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-bone hover:border-bone"
              >
                View specifications
              </a>
              {product.brochureUrl ? (
                <a
                  href={product.brochureUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="press mono border border-seam bg-iron px-6 py-3.5 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-bone hover:border-red"
                >
                  Download brochure
                </a>
              ) : null}
            </div>
          </div>
        </Reveal>
      </div>

      <div className="container-x mt-12">
        <Reveal delay={0.06}>
          <div className="grid gap-4 lg:grid-cols-[1.55fr_0.85fr]">
            <ProductMedia image={product.image ?? null} alt={`${product.name}, official KTK product photograph`} />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {[
                product.bestFor ? ["Best for", product.bestFor] : null,
                product.printing ? ["Printing / finish", product.printing] : null,
                ["Category", product.category],
              ]
                .filter((fact): fact is [string, string] => Boolean(fact))
                .map(([label, value]) => (
                  <div key={label} className="border border-seam bg-iron p-6">
                    <p className="mono text-[0.58rem] uppercase tracking-[0.18em] text-red">{label}</p>
                    <p className="mt-3 text-base leading-relaxed text-bone">{value}</p>
                  </div>
                ))}
            </div>
          </div>
        </Reveal>
      </div>

      {(product.longDescription || product.uniqueValue) && (
        <div className="container-x mt-20 grid gap-12 lg:grid-cols-[1.25fr_0.75fr]">
          {product.longDescription && (
            <Reveal>
              <p className="eyebrow">Product overview</p>
              <p className="mt-6 max-w-3xl text-lg leading-relaxed text-bone-dim">{product.longDescription}</p>
            </Reveal>
          )}
          {product.uniqueValue && (
            <Reveal delay={0.08} className="border-l border-red pl-6">
              <p className="eyebrow">What makes it different</p>
              <p className="mt-5 text-xl leading-relaxed text-bone">{product.uniqueValue}</p>
            </Reveal>
          )}
        </div>
      )}

      {product.variants?.length ? (
        <div className="container-x mt-20">
          <Reveal>
            <p className="eyebrow">Available sizes</p>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {product.variants.map((variant, index) => (
                <div key={variant.name} className="group border border-seam bg-iron p-7 transition-colors hover:border-red hover:bg-coal">
                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <p className="mono text-[0.58rem] uppercase tracking-[0.18em] text-red">Thread format 0{index + 1}</p>
                      <h2 className="display mt-3 text-4xl text-bone">{variant.name}</h2>
                    </div>
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-seam text-red transition-colors group-hover:border-red">↗</span>
                  </div>
                  <p className="mt-5 max-w-lg text-sm leading-relaxed text-bone-dim">{variant.description}</p>
                  {variant.attributes?.length ? (
                    <div className="mt-6 flex flex-wrap gap-2">
                      {variant.attributes.map((attribute) => <span key={attribute} className="data-chip">{attribute}</span>)}
                    </div>
                  ) : null}
                  <Link
                    href={`/contact?type=product&product=${encodeURIComponent(`${product.name} — ${variant.name}`)}`}
                    className="mono mt-7 inline-flex text-[0.62rem] uppercase tracking-[0.16em] text-red hover:text-bone"
                  >
                    Enquire about {variant.name} →
                  </Link>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      ) : null}

      {product.colorOptions?.length ? (
        <div className="container-x mt-20">
          <Reveal className="border-y border-seam py-8">
            <div className="grid gap-7 lg:grid-cols-[0.7fr_1.3fr] lg:items-center">
              <div>
                <p className="eyebrow">Available colors</p>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-bone-dim">
                  Confirm the required color and availability with KTK when requesting a quotation.
                </p>
              </div>
              <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
                {product.colorOptions.map((color) => (
                  <li key={color.name} className="flex items-center gap-3 border border-seam bg-iron px-4 py-3">
                    <span
                      className="h-5 w-5 shrink-0 rounded-full border border-white/20 shadow-[0_0_0_1px_rgba(0,0,0,0.22)]"
                      style={{ backgroundColor: color.hex }}
                      aria-hidden="true"
                    />
                    <span className="mono text-[0.6rem] uppercase tracking-[0.14em] text-bone">{color.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      ) : null}

      {benefits.length > 0 && (
        <div className="container-x mt-20">
          <Reveal>
            <p className="eyebrow">Why buyers specify it</p>
          </Reveal>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit, index) => (
              <Reveal key={benefit.title} delay={index * 0.05} className="border border-seam bg-iron p-7">
                <span className="mono text-[0.64rem] text-red">{String(index + 1).padStart(2, "0")}</span>
                <h2 className="display mt-4 text-xl text-bone">{benefit.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-bone-dim">{benefit.detail}</p>
              </Reveal>
            ))}
          </div>
        </div>
      )}

      <div id="specifications" className="container-x mt-24 scroll-mt-24">
        <Reveal>
          <p className="eyebrow">Specifications & applications</p>
          <div className="mt-6 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
            <dl className="grid gap-3 sm:grid-cols-2">
              {product.specs.map((spec) => (
                <div key={spec.label} className="border border-seam bg-iron p-6">
                  <dt className="mono text-[0.58rem] uppercase tracking-[0.18em] text-ash">{spec.label}</dt>
                  <dd className="mt-2 text-lg leading-snug text-bone">{spec.value}</dd>
                </div>
              ))}
            </dl>
            <div className="border border-seam bg-coal p-7">
              <p className="mono text-[0.58rem] uppercase tracking-[0.18em] text-red">Applications</p>
              <ul className="mt-5 space-y-3">
                {product.applications.map((application) => (
                  <li key={application} className="flex items-start gap-3 text-sm leading-relaxed text-bone-dim">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-red" />
                    {application}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="mono mt-6 max-w-2xl text-[0.62rem] leading-relaxed text-ash">
            Product imagery is from the supplied KTK Drive asset set. Final dimensions, grades, capacities, and line compatibility are confirmed against the buyer’s requirements.
          </p>
        </Reveal>
      </div>

      {gallery.length > 0 && (
        <div className="container-x mt-24">
          <Reveal>
            <p className="eyebrow">Supplied product gallery</p>
            <h2 className="display mt-4 max-w-2xl text-3xl text-bone sm:text-4xl">The actual range, clearly shown.</h2>
          </Reveal>
          <ProductGallery items={gallery} />
        </div>
      )}

      <div className="container-x mt-24 grid gap-4 lg:grid-cols-2">
        <div className="border border-seam bg-iron p-8">
          <p className="eyebrow">Need a product match?</p>
          <h2 className="display mt-4 text-3xl text-bone">Tell KTK what your line needs.</h2>
          <p className="mt-4 max-w-lg text-sm leading-relaxed text-bone-dim">
            Send the product, capacity, quantity, and timing. The team can confirm the right format, imagery, and next specification step.
          </p>
          <Link
            href={`/contact?type=product&product=${encodeURIComponent(product.name)}`}
            className="press mono mt-7 inline-flex bg-red px-6 py-3.5 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-white hover:bg-red-deep"
          >
            Enquire about this product
          </Link>
        </div>
        <div className="border border-seam bg-coal p-8">
          <p className="eyebrow">Direct contact</p>
          <h2 className="display mt-4 break-all text-3xl text-bone">{salesEmail}</h2>
          <p className="mt-4 max-w-lg text-sm leading-relaxed text-bone-dim">For product availability, exact specifications, and quotation requests.</p>
          <a href={`mailto:${salesEmail}`} className="mono mt-7 inline-flex border border-seam px-6 py-3.5 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-bone hover:border-red hover:text-red">
            Email sales
          </a>
        </div>
      </div>

      {related.length > 0 && (
        <div className="container-x mt-24">
          <Reveal>
            <p className="eyebrow">Continue exploring</p>
          </Reveal>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item, index) => (
              <Reveal key={item.slug} delay={index * 0.05}>
                <Link href={`/products/${item.slug}`} className="group block h-full border border-seam bg-iron p-4 transition-colors hover:bg-coal">
                  <div className="relative aspect-[4/3] overflow-hidden bg-coal">
                    {item.image ? <Image src={item.image} alt={item.name} fill sizes="(min-width: 1024px) 30vw, 100vw" className="object-contain p-4 transition-transform duration-500 group-hover:scale-105" /> : null}
                  </div>
                  <p className="eyebrow mt-5">{item.category}</p>
                  <h2 className="display mt-3 text-xl text-bone transition-colors group-hover:text-red">{item.name}</h2>
                  <span className="mono mt-5 inline-flex text-[0.62rem] uppercase tracking-[0.16em] text-ash group-hover:text-red">View product →</span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
