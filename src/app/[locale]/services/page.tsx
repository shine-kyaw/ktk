import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { use } from "react";

export default function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params);
  setRequestLocale(locale);
  return <ServicesContent />;
}

function ServicesContent() {
  const t = useTranslations("services");
  const tn = useTranslations("nav");

  const services = [
    { title: t("s1Title"), desc: t("s1Desc") },
    { title: t("s2Title"), desc: t("s2Desc") },
    { title: t("s3Title"), desc: t("s3Desc") },
    { title: t("s4Title"), desc: t("s4Desc") },
  ];

  return (
    <div className="container-x pb-20 pt-28">
      <p className="mono text-[0.66rem] uppercase tracking-[0.14em] text-red">{tn("services")}</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-ink">{t("title")}</h1>
      <p className="mt-3 max-w-2xl text-sm text-ink-soft">{t("sub")}</p>

      <div className="mt-12 grid gap-5 md:grid-cols-2">
        {services.map((s, i) => (
          <div key={s.title} className="rounded-2xl border border-hair bg-canvas p-8 transition-shadow hover:shadow-lift">
            <span className="mono text-[0.66rem] text-ink-mute">0{i + 1}</span>
            <h2 className="mt-3 text-lg font-semibold text-ink">{s.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
