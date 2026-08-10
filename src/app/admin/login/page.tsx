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
    <div className="admin-login"><div className="admin-login-panel">
      <div className="admin-login-story"><span>KTK</span><div><p>Website content studio</p><h2>Keep every product, page and company update in one place.</h2><small>Secure administration for KTK Group.</small></div></div>
      <form onSubmit={onSubmit} className="admin-login-form">
        <div className="admin-login-logo">KTK</div><p>CONTENT STUDIO</p><h1>Welcome back</h1><small>Sign in to manage the KTK website.</small>
        <label>Password</label>
        <input
          type="password"
          autoFocus
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
        />

        {error && <div className="admin-error">{error}</div>}

        <button
          type="submit"
          disabled={busy}
        >
          {busy ? "Signing in…" : "Sign in"}
        </button>
      </form></div><span className="admin-login-foot">© 2026 KTK Group · Website administration</span>
    </div>
  );
}
