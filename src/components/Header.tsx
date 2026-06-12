"use client";

import Image from "next/image";
import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";

const NAV = [
  { href: "/products", key: "products" },
  { href: "/services", key: "services" },
  { href: "/careers", key: "careers" },
  { href: "/contact", key: "contact" },
] as const;

export function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-hair bg-canvas/85 backdrop-blur-md">
      <div className="container-x flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <Image src="/brand/agholding.png" alt="AG Holding" width={40} height={40} priority />
          <span className="mono hidden text-[0.7rem] font-medium uppercase leading-tight tracking-wider text-ink sm:block">
            Asia General
            <br />
            Holding
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className={`text-sm transition-colors hover:text-blue ${
                pathname.startsWith(item.href) ? "font-medium text-ink" : "text-ink-soft"
              }`}
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {/* Locale switch — full reload is fine here; it keeps the header a simple component */}
          <div className="mono flex items-center overflow-hidden rounded-md border border-hair text-[0.7rem]">
            {(["en", "zh"] as const).map((l) => (
              <Link
                key={l}
                href={pathname}
                locale={l}
                className={`px-2.5 py-1.5 transition-colors ${
                  locale === l ? "bg-ink text-white" : "text-ink-soft hover:text-ink"
                }`}
              >
                {l === "en" ? "EN" : "中文"}
              </Link>
            ))}
          </div>

          <Link
            href="/contact"
            className="press hidden rounded-md bg-red px-4 py-2 text-sm font-medium text-white hover:bg-red-soft sm:block"
          >
            {t("requestQuote")}
          </Link>

          <button
            aria-label={open ? t("close") : t("menu")}
            onClick={() => setOpen((o) => !o)}
            className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 md:hidden"
          >
            <span
              className={`h-0.5 w-5 bg-ink transition-transform ${open ? "translate-y-1 rotate-45" : ""}`}
            />
            <span
              className={`h-0.5 w-5 bg-ink transition-transform ${open ? "-translate-y-1 -rotate-45" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <nav className="border-t border-hair bg-canvas md:hidden">
          <div className="container-x flex flex-col py-3">
            {NAV.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-hair py-3 text-sm text-ink-soft last:border-0"
              >
                {t(item.key)}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="press mt-3 rounded-md bg-red px-4 py-2.5 text-center text-sm font-medium text-white"
            >
              {t("requestQuote")}
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
