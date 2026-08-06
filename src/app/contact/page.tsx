import type { Metadata } from "next";
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

  return (
    <div className="container-x pb-28 pt-40">
      <Reveal>
        <p className="eyebrow">Contact</p>
        <h1 className="display mt-5 max-w-3xl text-5xl text-bone sm:text-7xl">
          Talk to <span className="text-red">KTK.</span>
        </h1>
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
    </div>
  );
}
