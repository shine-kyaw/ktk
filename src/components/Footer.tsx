import Link from "next/link";
import Image from "next/image";

const LINKS: [string, string][] = [
  ["/about", "Company"],
  ["/products", "Products"],
  ["/services", "Services"],
  ["/careers", "Careers"],
  ["/news", "News"],
  ["/contact", "Contact"],
];

export function Footer() {
  return (
    <footer className="border-t border-seam bg-coal">
      <div className="container-x flex flex-wrap items-center justify-between gap-6 py-9">
        <Link href="/" className="flex items-center">
          <span className="rounded-md bg-white px-2.5 py-1.5">
            <Image
              src="/brand/ktk-logo.png"
              alt="Kaung Thu Kha Trading Co., Ltd."
              width={543}
              height={93}
              className="h-6 w-auto"
            />
          </span>
        </Link>

        <nav className="flex flex-wrap items-center gap-x-6 gap-y-2">
          {LINKS.map(([href, label]) => (
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
            © {new Date().getFullYear()} Kaung Thu Kha Trading Co., Ltd
          </p>
          <p className="mono text-[0.6rem] uppercase tracking-[0.14em] text-ash">
            sales@ktk.com.mm · (959) 264 817 108
          </p>
        </div>
      </div>
    </footer>
  );
}
