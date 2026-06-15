"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        router.push("/admin");
        router.refresh();
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data.error ?? "Login failed.");
      }
    } catch {
      setError("Network error.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-coal px-6">
      <form onSubmit={onSubmit} className="w-full max-w-sm">
        <div className="flex items-center gap-3">
          <span className="h-px w-10 bg-red" />
          <p className="mono text-[0.68rem] uppercase tracking-[0.24em] text-bone-dim">KTK Admin</p>
        </div>
        <h1 className="display mt-5 text-3xl text-bone">Sign in</h1>
        <p className="mt-2 text-sm text-ash">Enter the admin password to manage site content.</p>

        <label className="mono mt-8 block text-[0.66rem] uppercase tracking-[0.18em] text-ash">
          Password
        </label>
        <input
          type="password"
          autoFocus
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-2 w-full border border-seam bg-iron px-4 py-3 text-bone outline-none focus:border-red"
          placeholder="••••••••"
        />

        {error && <p className="mono mt-3 text-[0.72rem] text-red">{error}</p>}

        <button
          type="submit"
          disabled={busy}
          className="press mono mt-6 w-full bg-red px-7 py-4 text-[0.74rem] font-semibold uppercase tracking-[0.16em] text-bone transition-colors hover:bg-bone hover:text-coal disabled:opacity-60"
        >
          {busy ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
