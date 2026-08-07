import type { Metadata } from "next";
import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { InquiryForm } from "@/components/InquiryForm";
import { getCompany, getProducts } from "@/lib/cms";

export const metadata: Metadata = { title: "Contact", alternates: { canonical: "/contact" } };

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const query = await searchParams;
  const initialProduct = typeof query.product === "string" ? query.product : "";
  const [company, products] = await Promise.all([getCompany(), getProducts()]);
  const productOptions = products.flatMap((product) => [
    product.name,
    ...(product.variants?.map((variant) => `${product.name} — ${variant.name}`) ?? []),
  ]);
  const fullAddress = `${company.hq.line1}, ${company.hq.line2}`;
  const mapsQuery = encodeURIComponent(`${company.legalName}, ${fullAddress}`);
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;
  const mapsEmbedUrl = `https://www.google.com/maps?q=${mapsQuery}&output=embed`;

  return (
    <div className="container-x pb-28 pt-40">
      <Reveal>
        <p className="eyebrow">Contact</p>
        <h1 className="display mt-5 max-w-3xl text-5xl text-bone sm:text-7xl">
          Talk to <span className="text-red">KTK.</span>
        </h1>
      </Reveal>

      <Reveal delay={0.06} className="mt-12">
        <div className="relative min-h-[260px] overflow-hidden border border-seam sm:min-h-[340px]">
          <Image
            src="/assets/cement/cement-bag-double-rhinos-first.webp"
            alt="KTK industrial packaging range"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/45 to-transparent" />
          <div className="absolute inset-y-0 left-0 flex max-w-xl items-end p-7 sm:p-10">
            <p className="display text-2xl leading-tight text-white sm:text-4xl">
              Packaging, machinery, bearings, and local support—start the conversation here.
            </p>
          </div>
        </div>
      </Reveal>

      <div className="mt-16 grid gap-12 lg:grid-cols-2">
        <Reveal>
          <InquiryForm initialProduct={initialProduct} productOptions={productOptions} salesEmail={company.emails[0]} />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="border border-seam p-8">
            <h2 className="eyebrow">Head office & factory</h2>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-bone-dim">
              {company.hq.line1}, {company.hq.line2}
            </p>
            <div className="mt-6 space-y-2">
              {company.phones.map((phone) => <p key={phone} className="mono text-sm text-bone">{phone}</p>)}
              {company.emails.map((email) => (
                <a key={email} href={`mailto:${email}`} className="mono block text-sm text-bone transition-colors hover:text-red">
                  {email}
                </a>
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      <Reveal className="mt-20">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="eyebrow">Find KTK</p>
            <h2 className="display mt-3 text-3xl text-bone sm:text-5xl">Head office & factory</h2>
          </div>
          <a
            href={mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="press mono bg-red px-6 py-3.5 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-white hover:bg-bone hover:text-coal"
          >
            Open in Google Maps ↗
          </a>
        </div>

        <a
          href={mapsUrl}
          target="_blank"
          rel="noreferrer"
          aria-label={`Open ${company.legalName} location in Google Maps`}
          className="group relative block h-[480px] overflow-hidden border border-seam bg-iron sm:h-[580px]"
        >
          <iframe
            title={`${company.legalName} location map`}
            src={mapsEmbedUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="pointer-events-none h-full w-full border-0 grayscale-[20%] transition duration-500 group-hover:grayscale-0"
          />
          <span className="pointer-events-none absolute bottom-5 left-5 bg-ink/90 px-4 py-3 mono text-[0.62rem] uppercase tracking-[0.14em] text-white shadow-xl">
            Click anywhere to open Google Maps ↗
          </span>
        </a>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ash">{fullAddress}</p>
      </Reveal>
    </div>
  );
}
