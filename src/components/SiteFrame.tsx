"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import type { SiteVisibility } from "@/content/site";
import type { COMPANY } from "@/content/company";

/**
 * Wraps the public site chrome. The /admin area has its own layout, so the
 * marketing Header and Footer are hidden there. `children` is passed through
 * untouched, so pages keep rendering on the server.
 */
export function SiteFrame({ children, visibility, company }: { children: React.ReactNode; visibility: SiteVisibility; company: typeof COMPANY }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) return <>{children}</>;

  return (
    <>
      <Header visibility={visibility} />
      <main>{children}</main>
      <Footer visibility={visibility} company={company} />
    </>
  );
}
