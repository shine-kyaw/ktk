import React from "react";
import { getPayload } from "payload";
import config from "@payload-config";

// The admin home screen. Every number here is a live count from the database —
// nothing is hard-coded, so what KTK sees is what the website is serving.
// Markup follows the Power Tagun dashboard so it picks up the shared theme in
// app/(payload)/custom.scss.

const SECTIONS = [
  { collection: "products", label: "Products", titleField: "name" },
  { collection: "activities", label: "Activities", titleField: "title" },
  { collection: "leadership", label: "Directors & management", titleField: "name" },
  { collection: "certificates", label: "Certificates", titleField: "title" },
  { collection: "group-companies", label: "Group companies", titleField: "name" },
  { collection: "news", label: "News posts", titleField: "title" },
] as const;

const COMMON_EDITS = [
  { href: "/admin/globals/company", label: "Phone numbers, address and email", note: "Company details" },
  { href: "/admin/collections/products", label: "Product specifications and photos", note: "Products" },
  { href: "/admin/collections/activities", label: "Add an event or CSR programme", note: "Activities" },
  { href: "/admin/globals/page-content", label: "Headline figures and homepage lists", note: "Page content" },
  { href: "/admin/globals/site-settings", label: "Switch the News page on or off", note: "Site settings" },
];

type Recent = { id: string | number; title: string; collection: string; label: string; updatedAt?: string };

const fmtDate = (value?: string) => {
  if (!value) return "";
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? ""
    : date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
};

export const Dashboard = async ({ user }: { user?: { email?: string; name?: string } }) => {
  const payload = await getPayload({ config });

  let unavailable = false;
  const published: Record<string, number> = {};
  const drafts: Record<string, number> = {};
  let media = 0;
  let recent: Recent[] = [];

  try {
    const [, latest, mediaCount] = await Promise.all([
      Promise.all(
        SECTIONS.map(async ({ collection }) => {
          const [live, draft] = await Promise.all([
            payload.count({ collection, where: { status: { equals: "published" } } }),
            payload.count({ collection, where: { status: { equals: "draft" } } }),
          ]);
          published[collection] = live.totalDocs;
          drafts[collection] = draft.totalDocs;
        }),
      ),
      Promise.all(
        SECTIONS.map(async ({ collection, label, titleField }) => {
          const result = await payload.find({ collection, depth: 0, limit: 3, sort: "-updatedAt" });
          return (result.docs as unknown as Array<Record<string, unknown>>).map((doc) => ({
            id: doc.id as string | number,
            title: String(doc[titleField] ?? "Untitled"),
            collection,
            label,
            updatedAt: doc.updatedAt as string | undefined,
          }));
        }),
      ),
      payload.count({ collection: "media" }),
    ]);
    media = mediaCount.totalDocs;
    recent = latest
      .flat()
      .sort((a, b) => new Date(b.updatedAt || 0).getTime() - new Date(a.updatedAt || 0).getTime())
      .slice(0, 6);
  } catch (error) {
    unavailable = true;
    console.error("[admin-dashboard] Unable to load overview", error);
  }

  const name = (user?.name || user?.email?.split("@")[0] || "there").replace(/^\w/, (c) => c.toUpperCase());
  const totalDrafts = Object.values(drafts).reduce((sum, n) => sum + n, 0);
  const shown = (value: number | undefined) => (unavailable || value === undefined ? "—" : value);

  const stats = [
    { label: "Products", value: shown(published.products), meta: drafts.products ? `${drafts.products} in draft` : "All published", tone: "red" },
    { label: "Activities", value: shown(published.activities), meta: "Events, CSR and commercials", tone: "navy" },
    { label: "Drafts waiting", value: shown(totalDrafts), meta: totalDrafts ? "Not yet on the website" : "Nothing waiting", tone: "gold" },
    { label: "Media files", value: shown(media), meta: "Uploaded through the CMS", tone: "green" },
  ];

  return (
    <div className="ktk-command">
      <header className="ktk-command__hero">
        <div>
          <span className="ktk-eyebrow">Kaung Thu Kha Group · website</span>
          <h1 className="ktk-hello__title">Good to see you, {name}.</h1>
          <p className="ktk-hello__sub">
            Everything on the website is edited from the menu on the left. Saved changes appear on the live site straight away.
          </p>
        </div>
        <div className="ktk-live">
          <span className="ktk-live__dot" aria-hidden="true" />
          <span>Website live</span>
          <a href="/" target="_blank" rel="noreferrer">Open site ↗</a>
        </div>
      </header>

      {unavailable && (
        <p className="ktk-dashboard-alert" role="status">
          The overview could not be loaded just now. Editing still works from the menu on the left.
        </p>
      )}

      <section className="ktk-stats" aria-label="Website overview">
        {stats.map((stat) => (
          <div key={stat.label} className={`ktk-stat ktk-stat--${stat.tone}`}>
            <span className="ktk-stat__label">{stat.label}</span>
            <strong className="ktk-stat__value">{stat.value}</strong>
            <span className="ktk-stat__meta">{stat.meta}</span>
          </div>
        ))}
      </section>

      <div className="ktk-grid ktk-grid--operations">
        <section className="ktk-panel" aria-labelledby="ktk-common-title">
          <div className="ktk-panel__head">
            <div>
              <span className="ktk-kicker">Shortcuts</span>
              <h2 id="ktk-common-title" className="ktk-panel__title">Common edits</h2>
            </div>
          </div>
          <div className="ktk-recent">
            {COMMON_EDITS.map((item) => (
              <a key={item.href} className="ktk-recent__row" href={item.href}>
                <span>
                  <strong className="ktk-recent__name">{item.label}</strong>
                  <small className="ktk-recent__meta">{item.note}</small>
                </span>
                <span className="ktk-row-arrow" aria-hidden="true">→</span>
              </a>
            ))}
          </div>
        </section>

        <section className="ktk-panel" aria-labelledby="ktk-library-title">
          <div className="ktk-panel__head">
            <div>
              <span className="ktk-kicker">On the website</span>
              <h2 id="ktk-library-title" className="ktk-panel__title">Website library</h2>
            </div>
            <span className="ktk-panel__note">Published</span>
          </div>
          <div className="ktk-library">
            {SECTIONS.map(({ collection, label }) => (
              <a className="ktk-library__row" key={collection} href={`/admin/collections/${collection}`}>
                <span>{label}</span>
                <strong>{shown(published[collection])}</strong>
              </a>
            ))}
          </div>
        </section>
      </div>

      <section className="ktk-panel ktk-panel--recent" aria-labelledby="ktk-recent-title">
        <div className="ktk-panel__head">
          <div>
            <span className="ktk-kicker">Activity</span>
            <h2 id="ktk-recent-title" className="ktk-panel__title">Recently edited</h2>
          </div>
          <span className="ktk-panel__note">Newest first</span>
        </div>
        {recent.length === 0 ? (
          <div className="ktk-panel__empty">Nothing has been edited yet.</div>
        ) : (
          <div className="ktk-content-list">
            {recent.map((item) => (
              <a
                className="ktk-content-row"
                href={`/admin/collections/${item.collection}/${item.id}`}
                key={`${item.collection}-${item.id}`}
              >
                <span className="ktk-content-row__main">
                  <strong>{item.title}</strong>
                  <small className="ktk-content-row__type">{item.label}</small>
                </span>
                <time>{fmtDate(item.updatedAt)}</time>
                <span className="ktk-row-arrow" aria-hidden="true">→</span>
              </a>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
