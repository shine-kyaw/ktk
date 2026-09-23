import React from "react";

/*
 * Shown at /admin when no database is configured. The public website is
 * unaffected in this state — it keeps serving its built-in content — so this
 * screen only needs to say what is missing and how to fix it.
 */
export const CmsSetup = () => (
  <main
    style={{
      minHeight: "100vh",
      display: "grid",
      placeItems: "center",
      padding: 24,
      background: "#F4F2EA",
      fontFamily: "system-ui, -apple-system, Segoe UI, sans-serif",
      color: "#16171d",
    }}
  >
    <div
      style={{
        maxWidth: 560,
        width: "100%",
        background: "#fff",
        border: "1px solid #e2dfd4",
        borderTop: "4px solid #ED1C24",
        padding: "36px 32px",
      }}
    >
      <img src="/brand/ktk-logo.png" alt="Kaung Thu Kha Group" style={{ width: 220, height: "auto", display: "block" }} />
      <h1 style={{ fontSize: 22, margin: "28px 0 8px", color: "#2F3192" }}>The website admin is not connected yet</h1>
      <p style={{ margin: 0, lineHeight: 1.6, color: "#4a4b55" }}>
        The public website is working normally and showing its built-in content. Editing switches on once the
        website is connected to its database.
      </p>
      <p style={{ margin: "20px 0 8px", fontWeight: 600 }}>Set these in the hosting environment (Vercel → Settings → Environment Variables):</p>
      <ul style={{ margin: 0, paddingLeft: 20, lineHeight: 1.9, color: "#4a4b55" }}>
        <li>
          <code>DATABASE_URL</code> — the Postgres connection string
        </li>
        <li>
          <code>PAYLOAD_SECRET</code> — a long random value that signs sign-in sessions
        </li>
      </ul>
      <p style={{ margin: "20px 0 0", lineHeight: 1.6, color: "#4a4b55", fontSize: 14 }}>
        Then redeploy. The first person to open this page afterwards is asked to create the first admin account.
      </p>
    </div>
  </main>
);

export default CmsSetup;
