import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { use } from "react";
import { Link } from "@/i18n/navigation";

// Demo placeholder roles — to be managed by the AG Holding team later.
const ROLES = [
  { id: "field-eng", title: "Field Service Engineer", location: "Yangon", type: "Full-time" },
  { id: "design-eng", title: "Transformer Design Engineer", location: "Yangon", type: "Full-time" },
  { id: "qa-inspector", title: "QA Inspector", location: "Yangon", type: "Full-time" },
] as const;

export default function CareersPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params);
  setRequestLocale(locale);
  return <CareersContent />;
}

function CareersContent() {
  const t = useTranslations("careers");
  const tn = useTranslations("nav");

  return (
    <div className="container-x pb-20 pt-28">
      <p className="mono text-[0.66rem] uppercase tracking-[0.14em] text-red">{tn("careers")}</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-ink">{t("title")}</h1>
      <p className="mt-3 max-w-2xl text-sm text-ink-soft">{t("sub")}</p>

      <h2 className="mono mt-12 text-[0.66rem] uppercase tracking-[0.14em] text-ink-mute">
        {t("openRoles")}
      </h2>
      <div className="mt-4 divide-y divide-hair rounded-2xl border border-hair">
        {ROLES.map((r) => (
          <div key={r.id} className="flex flex-wrap items-center justify-between gap-3 p-6">
            <div>
              <h3 className="text-base font-semibold text-ink">{r.title}</h3>
              <p className="mono mt-1 text-xs text-ink-mute">
                {t("location")}: {r.location} · {t("type")}: {r.type}
              </p>
            </div>
            <Link
              href="/contact"
              className="press rounded-md border border-hair-strong px-4 py-2 text-xs font-medium text-ink hover:border-blue hover:text-blue"
            >
              {t("apply")}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
