import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { use } from "react";
import { Hero } from "@/components/Hero";
import { Link } from "@/i18n/navigation";
import { DEMO_PRODUCTS } from "@/data/demo-products";

export default function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params);
  setRequestLocale(locale);
  return <HomeContent />;
}

function HomeContent() {
  const t = useTranslations("home");
  const tp = useTranslations("products");
  const tc = useTranslations("common");

  const pillars = [
    { title: t("pillar1Title"), desc: t("pillar1Desc") },
    { title: t("pillar2Title"), desc: t("pillar2Desc") },
    { title: t("pillar3Title"), desc: t("pillar3Desc") },
  ];

  return (
    <>
      <Hero />

      {/* Three disciplines */}
      <section className="container-x py-20">
        <p className="mono text-[0.66rem] uppercase tracking-[0.14em] text-red">
          {t("pillarsEyebrow")}
        </p>
        <h2 className="mt-3 max-w-xl text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          {t("pillarsTitle")}
        </h2>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {pillars.map((p, i) => (
            <div
              key={p.title}
              className="group rounded-2xl border border-hair bg-canvas p-7 transition-shadow hover:shadow-lift"
            >
              <span className="mono text-[0.66rem] text-ink-mute">0{i + 1}</span>
              <h3 className="mt-3 text-lg font-semibold text-ink group-hover:text-blue">
                {p.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Product teaser */}
      <section className="border-y border-hair bg-panel">
        <div className="container-x py-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="mono text-[0.66rem] uppercase tracking-[0.14em] text-red">
                {t("productsEyebrow")}
              </p>
              <h2 className="mt-3 max-w-xl text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                {t("productsTitle")}
              </h2>
              <p className="mt-3 max-w-lg text-sm text-ink-soft">{t("productsSub")}</p>
            </div>
            <Link
              href="/products"
              className="mono text-xs uppercase tracking-wider text-blue hover:text-red"
            >
              {tc("viewAll")} →
            </Link>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {DEMO_PRODUCTS.slice(0, 4).map((p) => (
              <Link
                key={p.id}
                href="/products"
                className="press rounded-xl border border-hair bg-canvas p-5 transition-shadow hover:shadow-lift"
              >
                <span className="mono text-[0.6rem] uppercase tracking-wider text-ink-mute">
                  {p.category}
                </span>
                <h3 className="mt-2 text-sm font-semibold text-ink">{p.name}</h3>
                <p className="mono mt-3 text-xs text-ink-soft">
                  {p.voltage} · {p.capacity}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* RFQ band */}
      <section className="container-x py-20">
        <div className="rounded-3xl bg-ink px-8 py-14 text-center sm:px-14">
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            {t("ctaTitle")}
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-white/70">{t("ctaSub")}</p>
          <Link
            href="/contact"
            className="press mt-8 inline-block rounded-md bg-red px-6 py-3 text-sm font-medium text-white hover:bg-red-soft"
          >
            {t("ctaButton")}
          </Link>
        </div>
      </section>
    </>
  );
}
