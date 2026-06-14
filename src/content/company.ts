// ─────────────────────────────────────────────────────────────────────────
// COMPANY FACTS — single source of truth for everything KTK-specific.
// Every value here is sourced from ktk.com.mm (discovery, 2026-06). When the
// admin backend ships, this file becomes the shape the API returns from
// `GET /company` and `GET /stats`. Keep it factual — no invented claims.
// ─────────────────────────────────────────────────────────────────────────

export const COMPANY = {
  legalName: "Kaung Thu Kha Trading Co., Ltd",
  group: "Kaung Thu Kha Group",
  short: "KTK",
  tagline: "Key To Smart Power",
  foundedTrading: 2008,
  foundedManufacturing: 1991, // San Kaung factory
  factory: "San Kaung Factory",

  // The business in one line (discovery thesis)
  oneLiner:
    "Myanmar's packaging runs on KTK — more than half the country's woven bags, produced at scale and supplied with everything around the bag.",

  hq: {
    line1: "No. (178), Twin Thin Taik U Htun Nyo Street",
    line2: "Zone (2), Hlaing Thar Yar Township, Yangon, Myanmar",
  },
  phones: ["(959) 264 817 108", "(959) 264 817 109"],
  emails: ["kaungthukha@ktk.com.mm", "sales@ktk.com.mm"],
  facebook: "https://www.facebook.com/",
} as const;

// Headline numbers — the brand. Used in hero + about. (cement-sack page)
export const STATS: { value: number; suffix?: string; label: string; isYear?: boolean }[] = [
  { value: 55, suffix: "%", label: "of Myanmar's PP woven-bag market" },
  { value: 27, suffix: "M", label: "bags produced every month" },
  { value: 2000, suffix: "+", label: "people across the group" },
  { value: 1991, label: "manufacturing since", isYear: true },
];

// Secondary proof points (about / why-KTK)
export const PROOF: { value: string; label: string }[] = [
  { value: "15M", label: "Cement bags / month" },
  { value: "12M", label: "Other woven bags / month" },
  { value: "6×", label: "Bearing sales growth, 2008–2020" },
  { value: "100%", label: "Quality assurance pledge" },
];

export const MILESTONES: { year: string; title: string; text: string }[] = [
  {
    year: "1991",
    title: "San Kaung factory",
    text: "Manufacturing heritage begins — the production base that today runs European STARLINGER lines.",
  },
  {
    year: "2008",
    title: "KTK founded",
    text: "Established in Yangon as the sole authorized Myanmar distributor for HCH Bearing and TR Bearing.",
  },
  {
    year: "2009",
    title: "NEWLONG machinery",
    text: "Appointed distributor for NEWLONG bag-closing machinery (Japan); own service center opens.",
  },
  {
    year: "2012",
    title: "Bag manufacturing",
    text: "In-house cement sack and PP woven bag production begins on European STARLINGER technology.",
  },
  {
    year: "2013",
    title: "YAO HAN partnership",
    text: "Sole Myanmar distributor for YAO HAN (Taiwan) machinery, with full after-sales support.",
  },
  {
    year: "2020",
    title: "Market leadership",
    text: "Bearing sales reach 1.8M units/year (6× since 2008); ~55% of the national woven-bag market.",
  },
];

export const VALUES: { title: string; body: string }[] = [
  {
    title: "Quality without compromise",
    body: "Food-grade virgin resin from SABIC, European STARLINGER machines, European-trained operators, and a 100% quality-assurance pledge on every lot.",
  },
  {
    title: "One-stop partnership",
    body: "The bag, the thread that closes it, the filler that makes it, the machine that seals it, and the parts that keep it running — from one accountable supplier.",
  },
  {
    title: "Responsible service",
    body: "A door-to-door marketing team and a strong after-sales team that solves problems on-site, fast — supporting partners with technical advice and market information.",
  },
  {
    title: "Value beyond price",
    body: "We aim to give value more than the price — building long-term relationships with the industries that build Myanmar.",
  },
];

// Industries KTK explicitly names across the site
export const INDUSTRIES: string[] = [
  "Cement & construction",
  "Animal feed",
  "Seafood",
  "Agriculture",
  "Fertilizer",
  "Flour & salt",
  "Logistics & ports",
  "Engineering & minerals",
];

// Brand / technology partners (with the credentials the site cites)
export const PARTNERS: { name: string; origin: string; note: string }[] = [
  { name: "STARLINGER", origin: "Austria / Europe", note: "Bag manufacturing technology" },
  { name: "SABIC", origin: "Saudi Arabia", note: "Food-grade resin — world's 4th-largest chemical producer" },
  { name: "HCH Bearing", origin: "China", note: "Sole Myanmar distributor · ISO/TS 16949 (TÜV)" },
  { name: "TR Bearing", origin: "China", note: "2,000+ variants · est. 1979" },
  { name: "NEWLONG", origin: "Japan", note: "Bag-closing machinery · est. 1984" },
  { name: "YAO HAN", origin: "Taiwan", note: "Sole Myanmar distributor · 70,000 parts · CE / ISO9002" },
];
