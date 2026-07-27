// ─────────────────────────────────────────────────────────────────────────
// COMPANY FACTS, single source of truth for everything KTK-specific.
// Every value here is sourced from ktk.com.mm (discovery, 2026-06). When the
// admin backend ships, this file becomes the shape the API returns from
// `GET /company` and `GET /stats`. Keep it factual, no invented claims.
// ─────────────────────────────────────────────────────────────────────────

export const COMPANY = {
  legalName: "Kaung Thu Kha Group Co., Ltd.",
  group: "Kaung Thu Kha Group",
  short: "KTK",
  tagline: "Key To Smart Power",
  foundedTrading: 2008,
  foundedManufacturing: 1991, // San Kaung factory
  factory: "San Kaung Factory",

  // The business in one line (discovery thesis)
  oneLiner:
    "Myanmar's packaging runs on KTK, more than half the country's woven bags, produced at scale and supplied with everything around the bag.",

  hq: {
    line1: "No. (178), Twin Thin Taik U Htun Nyo Street",
    line2: "Zone (2), Hlaing Thar Yar Township, Yangon, Myanmar",
  },
  phones: ["(959) 264 817 108", "(959) 264 817 109"],
  emails: ["sales@ktk.com.mm"],
  facebook: "https://www.facebook.com/",
} as const;

// Headline numbers, the brand. Used in hero + about. (cement-sack page)
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
    text: "Manufacturing heritage begins, the production base that today runs European STARLINGER lines.",
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
    body: "The bag, the thread that closes it, the filler that makes it, the machine that seals it, and the parts that keep it running, from one accountable supplier.",
  },
  {
    title: "Responsible service",
    body: "A door-to-door marketing team and a strong after-sales team that solves problems on-site, fast, supporting partners with technical advice and market information.",
  },
  {
    title: "Value beyond price",
    body: "We aim to give value more than the price, building long-term relationships with the industries that build Myanmar.",
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

// Product-quality pillars (home "Product Quality" band). PLACEHOLDER copy —
// confident but traceable to verified facts above; not over-claiming.
export const QUALITY_PILLARS: { tag: string; title: string; body: string }[] = [
  {
    tag: "Material",
    title: "Virgin food-grade resin",
    body: "Bags are made from virgin SABIC polypropylene, no recycled content and no odor, so every lot starts from clean, consistent input.",
  },
  {
    tag: "Strength",
    title: "Engineered to carry load",
    body: "Tightly woven PP tape forms a load-bearing body built to resist tearing under weight, stacking, and repeated handling.",
  },
  {
    tag: "Durability",
    title: "Sealed against moisture",
    body: "A laminated film resists moisture, dust, and abrasion, keeping cement dry and intact from the plant to the pour.",
  },
  {
    tag: "Consistency",
    title: "Lot-level quality control",
    body: "Inspection runs at every stage from tape to finished sack, backed by KTK's 100% quality-assurance pledge on every lot.",
  },
  {
    tag: "Standards",
    title: "European production lines",
    body: "Sacks are produced on STARLINGER lines by European-trained operators, the global standard for bag plants.",
  },
];

// Manufacturing process timeline (home dark cinematic section). PLACEHOLDER:
// real STARLINGER stage names KTK cites; verify exact sequence before treating
// as confirmed fact.
export const PROCESS_STEPS: { no: string; stage: string; title: string; body: string }[] = [
  {
    no: "01",
    stage: "Raw materials",
    title: "Virgin resin in",
    body: "Food-grade SABIC polypropylene and calcium-carbonate filler arrive and are checked before extrusion.",
  },
  {
    no: "02",
    stage: "Weaving",
    title: "Tape to fabric",
    body: "Extruded PP tapes are woven on STARLINGER circular looms into the tight fabric that carries the load.",
  },
  {
    no: "03",
    stage: "Lamination",
    title: "Sealed surface",
    body: "A laminated film is bonded to the woven web, sealing it against moisture, dust, and abrasion.",
  },
  {
    no: "04",
    stage: "Printing",
    title: "Brand applied",
    body: "Flexographic printing lays down up to six colors that stay legible through handling and storage.",
  },
  {
    no: "05",
    stage: "Cutting",
    title: "Cut to size",
    body: "The laminated, printed web is cut to the exact bag dimensions engineered for each filling line.",
  },
  {
    no: "06",
    stage: "Stitching & sealing",
    title: "Closed and reinforced",
    body: "Seams are stitched or sealed at the bag's stress points; block-bottom valves self-seal on the line.",
  },
  {
    no: "07",
    stage: "Quality control",
    title: "Checked, lot by lot",
    body: "Inspection at every stage from tape to finished sack, behind a 100% quality-assurance pledge.",
  },
  {
    no: "08",
    stage: "Packing & delivery",
    title: "Out to site",
    body: "Finished bags are baled, palletized, and dispatched through KTK's door-to-door supply teams.",
  },
];

// Why-KTK points (home). Verified facts; moved here from page.tsx so they are
// CMS-editable like everything else.
export const WHY_POINTS: { title: string; desc: string }[] = [
  {
    title: "The scale leader",
    desc: "~55% of Myanmar's PP woven-bag market and 27 million bags a month. No domestic supplier matches the volume.",
  },
  {
    title: "European technology",
    desc: "Cement sacks and woven bags produced on STARLINGER lines by European-trained operators, the global bag-plant standard.",
  },
  {
    title: "Food-grade inputs",
    desc: "Virgin resin from SABIC, the world's fourth-largest chemical producer. No recycled content, no odor, reliable strength.",
  },
  {
    title: "One-stop supply",
    desc: "Bags, thread, filler, closing machinery, and 70,000+ spare parts, one accountable partner for the whole line.",
  },
  {
    title: "Exclusive agencies",
    desc: "Sole Myanmar distributor for HCH bearings and YAO HAN machinery, sources competitors can't get locally.",
  },
  {
    title: "Responsible service",
    desc: "Door-to-door teams and on-site problem-solving, backed by a 100% quality-assurance pledge on every lot.",
  },
];

// Brand / technology partners (with the credentials the site cites)
export const PARTNERS: { name: string; origin: string; note: string }[] = [
  { name: "STARLINGER", origin: "Austria / Europe", note: "Bag manufacturing technology" },
  { name: "SABIC", origin: "Saudi Arabia", note: "Food-grade resin, world's 4th-largest chemical producer" },
  { name: "HCH Bearing", origin: "China", note: "Sole Myanmar distributor · ISO/TS 16949 (TÜV)" },
  { name: "TR Bearing", origin: "China", note: "2,000+ variants · est. 1979" },
  { name: "NEWLONG", origin: "Japan", note: "Bag-closing machinery · est. 1984" },
  { name: "YAO HAN", origin: "Taiwan", note: "Sole Myanmar distributor · 70,000 parts · CE / ISO9002" },
];
