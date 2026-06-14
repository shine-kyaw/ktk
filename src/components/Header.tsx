"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

const NAV: NavItem[] = [
  {
    label: "Company",
    href: "/about",
    children: [
      { label: "Overview", href: "/about" },
      { label: "Company history", href: "/about#history" },
      { label: "Partners", href: "/about#partners" },
      { label: "Leadership", href: "/about#team" },
    ],
  },
  {
    label: "Products",
    href: "/products",
    children: [
      { label: "Cement Sacks", href: "/products#cement-sacks" },
      { label: "PP Woven Bags", href: "/products#pp-woven-bags" },
      { label: "Fillers & Thread", href: "/products#fillers-thread" },
      { label: "Machinery", href: "/products#machinery" },
      { label: "Bearings", href: "/products#bearings" },
      { label: "All products", href: "/products" },
    ],
  },
  { label: "Services", href: "/services" },
  { label: "Manufacturing", href: "/manufacturing" },
  { label: "Careers", href: "/careers" },
  {
    label: "News",
    href: "/news",
    children: [
      { label: "Newsroom", href: "/news" },
      { label: "Activities", href: "/activities" },
    ],
  },
  { label: "Contact", href: "/contact" },
];

function Chevron() {
  return (
    <svg width="9" height="9" viewBox="0 0 10 10" fill="none" className="mt-px opacity-60">
      <path d="M2 3.5 5 6.5 8 3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false); // mobile drawer
  const [openSection, setOpenSection] = useState<string | null>(null); // mobile accordion

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeAll = () => {
    setOpen(false);
    setOpenSection(null);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open ? "border-b border-seam bg-coal/90 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="container-x flex h-[4.5rem] items-center justify-between">
        <Link href="/" className="group flex items-baseline gap-2.5" onClick={closeAll}>
          <span className="display text-2xl text-bone">
            KTK<span className="text-amber">.</span>
          </span>
          <span className="mono hidden text-[0.6rem] uppercase tracking-[0.2em] text-ash transition-colors group-hover:text-bone sm:block">
            Kaung Thu Kha
          </span>
        </Link>

        {/* Desktop nav with dropdowns */}
        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) => {
            const active = pathname.startsWith(item.href) && item.href !== "/";
            if (!item.children) {
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`mono px-3 py-2 text-[0.66rem] uppercase tracking-[0.14em] transition-colors hover:text-amber ${
                    active ? "text-bone" : "text-ash"
                  }`}
                >
                  {item.label}
                </Link>
              );
            }
            return (
              <div key={item.href} className="group relative">
                <Link
                  href={item.href}
                  className={`mono flex items-center gap-1.5 px-3 py-2 text-[0.66rem] uppercase tracking-[0.14em] transition-colors group-hover:text-amber ${
                    active ? "text-bone" : "text-ash"
                  }`}
                >
                  {item.label}
                  <Chevron />
                </Link>
                {/* pt-3 bridges the hover gap to the panel */}
                <div className="invisible absolute left-0 top-full pt-3 opacity-0 transition-all duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                  <div className="min-w-[13rem] border border-seam bg-coal/95 p-1.5 shadow-lift backdrop-blur-md">
                    {item.children.map((c) => (
                      <Link
                        key={c.href}
                        href={c.href}
                        className="mono block px-3 py-2.5 text-[0.66rem] uppercase tracking-[0.12em] text-ash transition-colors hover:bg-iron hover:text-amber"
                      >
                        {c.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
          <Link
            href="/contact"
            className="press mono ml-2 border border-amber px-3.5 py-2 text-[0.66rem] uppercase tracking-[0.14em] text-amber transition-colors hover:bg-amber hover:text-coal"
          >
            Become a dealer
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
        >
          <span className={`h-px w-6 bg-bone transition-transform ${open ? "translate-y-[3.5px] rotate-45" : ""}`} />
          <span className={`h-px w-6 bg-bone transition-transform ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
        </button>
      </div>

      {/* Mobile drawer with accordions */}
      {open && (
        <nav className="max-h-[80vh] overflow-y-auto border-t border-seam bg-coal lg:hidden">
          <div className="container-x flex flex-col py-3">
            {NAV.map((item) =>
              item.children ? (
                <div key={item.href} className="border-b border-seam">
                  <button
                    onClick={() => setOpenSection((s) => (s === item.label ? null : item.label))}
                    className="mono flex w-full items-center justify-between py-4 text-[0.75rem] uppercase tracking-[0.16em] text-bone-dim"
                  >
                    {item.label}
                    <span className={`transition-transform ${openSection === item.label ? "rotate-180" : ""}`}>
                      <Chevron />
                    </span>
                  </button>
                  {openSection === item.label && (
                    <div className="pb-3">
                      {item.children.map((c) => (
                        <Link
                          key={c.href}
                          href={c.href}
                          onClick={closeAll}
                          className="mono block py-2.5 pl-4 text-[0.7rem] uppercase tracking-[0.12em] text-ash hover:text-amber"
                        >
                          {c.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeAll}
                  className="mono border-b border-seam py-4 text-[0.75rem] uppercase tracking-[0.16em] text-bone-dim"
                >
                  {item.label}
                </Link>
              ),
            )}
            <Link
              href="/contact"
              onClick={closeAll}
              className="press mono mt-4 border border-amber px-4 py-3 text-center text-[0.75rem] uppercase tracking-[0.16em] text-amber"
            >
              Become a dealer
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
