import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-seam bg-coal">
      <div className="container-x grid gap-12 py-16 md:grid-cols-3">
        <div>
          <p className="display text-3xl text-bone">
            KTK<span className="text-amber">.</span>
          </p>
          <p className="mono mt-3 max-w-xs text-[0.7rem] uppercase leading-relaxed tracking-[0.16em] text-ash">
            Kaung Thu Kha Trading Co., Ltd
            <br />
            Industrial packaging · Est. 2008
          </p>
        </div>

        <div>
          <h3 className="eyebrow">Head office</h3>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-bone-dim">
            No. (178), Twin Thin Taik U Htun Nyo Street, Zone (2), Hlaing Thar Yar Township,
            Yangon, Myanmar
          </p>
          <p className="mono mt-4 text-sm text-bone-dim">(959) 264 817 108</p>
          <p className="mono mt-1 text-sm text-bone-dim">kaungthukha@ktk.com.mm</p>
        </div>

        <nav className="flex flex-col gap-3">
          <h3 className="eyebrow">Site</h3>
          {(
            [
              ["/about", "Company"],
              ["/products", "Products"],
              ["/manufacturing", "Manufacturing"],
              ["/news", "News"],
              ["/contact", "Contact"],
            ] as const
          ).map(([href, label]) => (
            <Link
              key={href}
              href={href}
              className="mono text-[0.72rem] uppercase tracking-[0.16em] text-ash transition-colors hover:text-amber"
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="border-t border-seam">
        <div className="container-x flex flex-wrap items-center justify-between gap-2 py-6">
          <p className="mono text-[0.64rem] uppercase tracking-[0.14em] text-ash">
            © {new Date().getFullYear()} Kaung Thu Kha Trading Co., Ltd
          </p>
          <p className="mono text-[0.64rem] uppercase tracking-[0.14em] text-ash">
            100% quality assurance
          </p>
        </div>
      </div>
    </footer>
  );
}
