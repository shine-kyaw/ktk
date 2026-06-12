import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { use } from "react";

export default function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params);
  setRequestLocale(locale);
  return <ContactContent />;
}

function ContactContent() {
  const t = useTranslations("footer");
  const tn = useTranslations("nav");
  const tc = useTranslations("common");

  return (
    <div className="container-x pb-20 pt-28">
      <p className="mono text-[0.66rem] uppercase tracking-[0.14em] text-red">{tn("contact")}</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-ink">{tn("contact")}</h1>

      <div className="mt-12 grid gap-5 md:grid-cols-2">
        <div className="rounded-2xl border border-hair p-8">
          <h2 className="mono text-[0.66rem] uppercase tracking-[0.14em] text-ink-mute">
            {t("addressLabel")}
          </h2>
          <p className="mt-3 text-sm text-ink-soft">{tc("company")}</p>
          <p className="mt-1 text-sm text-ink-soft">{t("address")}</p>
          <p className="mono mt-4 text-sm text-ink-soft">+95 1 XXX XXX</p>
          <p className="mono mt-1 text-sm text-ink-soft">info@agholding.com</p>
        </div>
        <div className="flex items-center justify-center rounded-2xl border border-dashed border-hair-strong bg-panel p-8">
          <p className="mono text-xs uppercase tracking-wider text-ink-mute">
            RFQ form — {tc("comingSoon")}
          </p>
        </div>
      </div>
    </div>
  );
}
