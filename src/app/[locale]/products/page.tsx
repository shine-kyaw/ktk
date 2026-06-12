import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { use } from "react";
import { Link } from "@/i18n/navigation";
import { DEMO_PRODUCTS } from "@/data/demo-products";

export default function ProductsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params);
  setRequestLocale(locale);
  return <ProductsContent />;
}

function ProductsContent() {
  const t = useTranslations("products");
  const tn = useTranslations("nav");

  return (
    <div className="container-x pb-20 pt-28">
      <p className="mono text-[0.66rem] uppercase tracking-[0.14em] text-red">{tn("products")}</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-ink">{t("title")}</h1>
      <p className="mt-3 max-w-2xl text-sm text-ink-soft">{t("sub")}</p>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {DEMO_PRODUCTS.map((p) => (
          <div
            key={p.id}
            className="flex flex-col rounded-2xl border border-hair bg-canvas p-6 transition-shadow hover:shadow-lift"
          >
            <span className="mono text-[0.6rem] uppercase tracking-wider text-ink-mute">
              {p.category}
            </span>
            <h2 className="mt-2 text-base font-semibold text-ink">{p.name}</h2>
            <dl className="mono mt-4 grid flex-1 grid-cols-3 gap-2 border-t border-hair pt-4 text-center">
              {(
                [
                  [t("specVoltage"), p.voltage],
                  [t("specCapacity"), p.capacity],
                  [t("specStandard"), p.standard],
                ] as const
              ).map(([label, value]) => (
                <div key={label}>
                  <dd className="text-xs font-medium text-ink">{value}</dd>
                  <dt className="mt-1 text-[0.56rem] uppercase tracking-wider text-ink-mute">
                    {label}
                  </dt>
                </div>
              ))}
            </dl>
            <Link
              href="/contact"
              className="press mt-5 rounded-md border border-hair-strong px-4 py-2 text-center text-xs font-medium text-ink hover:border-blue hover:text-blue"
            >
              {t("enquire")}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
