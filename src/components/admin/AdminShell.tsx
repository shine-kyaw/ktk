"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ADMIN_SECTIONS } from "@/lib/admin-content";
import { LogoutButton } from "./LogoutButton";

const icons: Record<string, string> = {
  products: "▦", "product-categories": "⌗", services: "◇", news: "◫",
  activities: "◎", "company-content": "⚙", management: "♙",
  certificates: "✓", "media-library": "▧",
};

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div className="admin-app">
      <aside className={`admin-sidebar ${open ? "is-open" : ""}`}>
        <div className="admin-brand">
          <Link href="/admin" onClick={() => setOpen(false)}>
            <span className="admin-brand-mark">KTK</span>
            <span><b>Content Studio</b><small>Website administration</small></span>
          </Link>
          <button className="admin-close" onClick={() => setOpen(false)} aria-label="Close menu">×</button>
        </div>
        <nav className="admin-nav" aria-label="Admin navigation">
          <p>Workspace</p>
          <Link className={pathname === "/admin" ? "active" : ""} href="/admin" onClick={() => setOpen(false)}>
            <span>⌂</span> Overview
          </Link>
          <p>Content</p>
          {ADMIN_SECTIONS.map((section) => {
            const href = `/admin/content/${section.slug}`;
            return <Link key={section.slug} className={pathname.startsWith(href) ? "active" : ""} href={href} onClick={() => setOpen(false)}><span>{icons[section.slug]}</span>{section.label}</Link>;
          })}
        </nav>
        <div className="admin-sidebar-footer">
          <Link href="/" target="_blank">View live website <span>↗</span></Link>
          <LogoutButton />
        </div>
      </aside>
      {open ? <button className="admin-scrim" aria-label="Close menu" onClick={() => setOpen(false)} /> : null}
      <div className="admin-main">
        <header className="admin-topbar">
          <button className="admin-menu" onClick={() => setOpen(true)} aria-label="Open menu">☰</button>
          <div><b>KTK Website</b><span className="admin-live"><i /> Live</span></div>
          <Link href="/" target="_blank">Open site ↗</Link>
        </header>
        {children}
      </div>
    </div>
  );
}
