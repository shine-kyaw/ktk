import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { InquiryForm } from "@/components/InquiryForm";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <div className="container-x pb-28 pt-40">
      <Reveal>
        <p className="eyebrow">Contact</p>
        <h1 className="display mt-5 max-w-3xl text-5xl text-bone sm:text-7xl">
          Talk to <span className="text-amber">KTK.</span>
        </h1>
      </Reveal>

      <div className="mt-16 grid gap-12 lg:grid-cols-2">
        <Reveal>
          <InquiryForm />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="border border-seam p-8">
            <h2 className="eyebrow">Head office & factory</h2>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-bone-dim">
              No. (178), Twin Thin Taik U Htun Nyo Street, Zone (2), Hlaing Thar Yar Township,
              Yangon, Myanmar
            </p>
            <p className="mono mt-6 text-sm text-bone">(959) 264 817 108 · (959) 264 817 109</p>
            <p className="mono mt-2 text-sm text-bone">kaungthukha@ktk.com.mm</p>
          </div>
          <div className="mt-6 aspect-[4/3] w-full overflow-hidden border border-seam grayscale contrast-110">
            <iframe
              title="KTK location — Hlaing Thar Yar, Yangon"
              src="https://maps.google.com/maps?q=Hlaing%20Thar%20Yar%20Township%2C%20Yangon%2C%20Myanmar&z=12&output=embed"
              className="h-full w-full"
              loading="lazy"
            />
          </div>
        </Reveal>
      </div>
    </div>
  );
}
