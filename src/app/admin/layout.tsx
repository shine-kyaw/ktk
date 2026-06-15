import Link from "next/link";
import { isAuthenticated } from "@/lib/auth";
import { LogoutButton } from "@/components/admin/LogoutButton";

export const metadata = {
  title: "KTK Admin",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const authed = await isAuthenticated();

  return (
    <div className="min-h-screen bg-coal text-bone">
      {authed && (
        <header className="border-b border-seam">
          <div className="container-x flex h-16 items-center justify-between">
            <Link href="/admin" className="mono text-sm uppercase tracking-[0.18em] text-bone">
              KTK <span className="text-red">Admin</span>
            </Link>
            <nav className="flex items-center gap-6">
              <Link
                href="/"
                target="_blank"
                className="mono text-[0.66rem] uppercase tracking-[0.16em] text-ash transition-colors hover:text-bone"
              >
                View site ↗
              </Link>
              <LogoutButton />
            </nav>
          </div>
        </header>
      )}
      {children}
    </div>
  );
}
