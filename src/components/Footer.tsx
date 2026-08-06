import Link from "next/link";
import Image from "next/image";
import type { SiteVisibility } from "@/content/site";
import type { COMPANY } from "@/content/company";

const LINKS: [string, string][] = [
  ["/about", "Company"],
  ["/services", "Services"],
  ["/products", "Products"],
  ["/contact", "Contact"],
];

export function Footer({ visibility, company }: { visibility: SiteVisibility; company: typeof COMPANY }) {
  const contact = LINKS[LINKS.length - 1]!;
  const links: [string, string][] = [
    ...LINKS.slice(0, -1),
    ...(visibility.activities ? [["/activities", "Activities"] as [string, string]] : []),
    ...(visibility.news ? [["/blog", "News"] as [string, string]] : []),
    contact,
  ];
  return (
    <footer className="border-t border-seam bg-coal">
      <div className="container-x flex flex-wrap items-center justify-between gap-6 py-9">
        <Link href="/" className="flex items-center">
          <span className="rounded-md bg-white px-2.5 py-1.5">
            <Image
              src="/brand/ktk-logo.png"
              alt="Kaung Thu Kha Group Co., Ltd."
              width={1600}
              height={357}
              className="h-7 w-auto max-w-[15rem]"
            />
          </span>
        </Link>

        <nav className="flex flex-wrap items-center gap-x-6 gap-y-2">
          {links.map(([href, label]) => (
            <Link
              key={href}
              href={href}
              className="mono text-[0.64rem] uppercase tracking-[0.14em] text-ash transition-colors hover:text-red"
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="border-t border-seam">
        <div className="container-x flex flex-wrap items-center justify-between gap-2 py-4">
          <p className="mono text-[0.6rem] uppercase tracking-[0.14em] text-ash">
            © {new Date().getFullYear()} Kaung Thu Kha Group Co., Ltd.
          </p>
          <div className="mono text-[0.6rem] uppercase tracking-[0.14em] text-ash">
            <a href={`mailto:${company.emails[0]}`} className="transition-colors hover:text-red">
              {company.emails[0]}
            </a>{" "}
            · {company.phones[0]}
          </div>
        </div>
      </div>
    </footer>
  );
}
