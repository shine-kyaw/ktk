import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function Footer() {
  const t = useTranslations("footer");
  const tc = useTranslations("common");
  const tn = useTranslations("nav");

  return (
    <footer className="border-t border-hair bg-panel">
      <div className="container-x grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            <Image src="/brand/agholding.png" alt="AG Holding" width={44} height={44} />
            <span className="mono text-[0.7rem] font-medium uppercase leading-tight tracking-wider text-ink">
              Asia General
              <br />
              Holding
            </span>
          </div>
          <p className="mono mt-4 text-xs uppercase tracking-[0.14em] text-red">{tc("tagline")}</p>
        </div>

        <div>
          <h3 className="mono text-[0.66rem] uppercase tracking-[0.14em] text-ink-mute">
            {t("addressLabel")}
          </h3>
          <p className="mt-3 text-sm text-ink-soft">{tc("company")}</p>
          <p className="mt-1 text-sm text-ink-soft">{t("address")}</p>
        </div>

        <div>
          <h3 className="mono text-[0.66rem] uppercase tracking-[0.14em] text-ink-mute">
            {t("phoneLabel")} / {t("emailLabel")}
          </h3>
          <p className="mt-3 text-sm text-ink-soft">+95 1 XXX XXX</p>
          <p className="mt-1 text-sm text-ink-soft">info@agholding.com</p>
        </div>

        <nav className="flex flex-col gap-2">
          {(
            [
              ["/products", "products"],
              ["/services", "services"],
              ["/careers", "careers"],
              ["/contact", "contact"],
            ] as const
          ).map(([href, key]) => (
            <Link key={key} href={href} className="text-sm text-ink-soft transition-colors hover:text-blue">
              {tn(key)}
            </Link>
          ))}
        </nav>
      </div>

      <div className="border-t border-hair">
        <div className="container-x flex flex-wrap items-center justify-between gap-2 py-5">
          <p className="mono text-[0.66rem] text-ink-mute">
            © {new Date().getFullYear()} {tc("company")} — {t("rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}
