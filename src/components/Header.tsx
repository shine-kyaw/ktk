"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const NAV = [
  { href: "/about", label: "Company" },
  { href: "/products", label: "Products" },
  { href: "/manufacturing", label: "Manufacturing" },
  { href: "/news", label: "News" },
  { href: "/contact", label: "Contact" },
] as const;

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open ? "border-b border-seam bg-coal/90 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="container-x flex h-[4.5rem] items-center justify-between">
        <Link href="/" className="group flex items-baseline gap-2.5" onClick={() => setOpen(false)}>
          <span className="display text-2xl text-bone">
            KTK<span className="text-amber">.</span>
          </span>
          <span className="mono hidden text-[0.6rem] uppercase tracking-[0.2em] text-ash transition-colors group-hover:text-bone sm:block">
            Kaung Thu Kha
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`mono text-[0.7rem] uppercase tracking-[0.16em] transition-colors hover:text-amber ${
                pathname.startsWith(item.href) ? "text-bone" : "text-ash"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="press mono border border-amber px-4 py-2 text-[0.7rem] uppercase tracking-[0.16em] text-amber transition-colors hover:bg-amber hover:text-coal"
          >
            Become a dealer
          </Link>
        </nav>

        <button
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span className={`h-px w-6 bg-bone transition-transform ${open ? "translate-y-[3.5px] rotate-45" : ""}`} />
          <span className={`h-px w-6 bg-bone transition-transform ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
        </button>
      </div>

      {open && (
        <nav className="border-t border-seam bg-coal md:hidden">
          <div className="container-x flex flex-col py-4">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="mono border-b border-seam py-4 text-[0.75rem] uppercase tracking-[0.16em] text-bone-dim last:border-0"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
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
