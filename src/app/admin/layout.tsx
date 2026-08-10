import { isAuthenticated } from "@/lib/auth";
import { AdminShell } from "@/components/admin/AdminShell";
import "./admin.css";

export const metadata = {
  title: "KTK Admin",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const authed = await isAuthenticated();

  return authed ? <AdminShell>{children}</AdminShell> : <>{children}</>;
}
