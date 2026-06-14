// Product catalog, seed content shaped exactly like the future API response.
// Read through the async getters in src/lib/cms.ts; pages never import this
// directly. When the admin backend ships, the getter bodies swap to fetch()
// and this file can be deleted.

export type Product = {
  slug: string;
  name: string;
  category: ProductCategory;
  summary: string;
  specs: { label: string; value: string }[];
  applications: string[];
  /** Optional media path, drop a file in /public and set this; UI reveals it. */
  image?: string | null;
  featured?: boolean;
};

export type ProductCategory =
  | "Cement Sacks"
  | "PP Woven Bags"
  | "Fillers & Thread"
  | "Machinery"
  | "Bearings";

export const CATEGORY_META: { name: ProductCategory; tagline: string; blurb: string }[] = [
  {
    name: "Cement Sacks",
    tagline: "15 million a month",
    blurb:
      "AD-star block-bottom valve sacks produced on European STARLINGER lines, engineered for high-speed automated filling at cement plants.",
  },
  {
    name: "PP Woven Bags",
    tagline: "Food-grade, SABIC resin",
    blurb:
      "Plain and printed polypropylene woven bags from virgin food-grade resin, light, heavy-duty, and brand-printed up to six colors.",
  },
  {
    name: "Fillers & Thread",
    tagline: "The consumables around the bag",
    blurb:
      "Calcium-carbonate filler from century-old Vietnamese limestone, plus high-tenacity bag-closing thread, the inputs and consumables that complete the line.",
  },
  {
    name: "Machinery",
    tagline: "NEWLONG · YAO HAN",
    blurb:
      "Bag-closing and converting machinery from Japan and Taiwan, distributed, installed, and serviced by KTK's own technicians.",
  },
  {
    name: "Bearings",
    tagline: "Sole HCH distributor in Myanmar",
    blurb:
      "HCH and TR precision bearings for industry, the distribution business KTK was built on, grown 6× since 2008.",
  },
];

export const PRODUCTS: Product[] = [
  // ── Cement Sacks ──────────────────────────────────────────────────────
  {
    slug: "ad-star-cement-sack",
    name: "AD-Star Block-Bottom Cement Sack",
    category: "Cement Sacks",
    summary:
      "High-strength block-bottom valve sack produced on STARLINGER AD-Star lines, coated for moisture resistance and engineered for automated cement filling at high line speeds.",
    specs: [
      { label: "Capacity", value: "50 kg" },
      { label: "Construction", value: "Block-bottom valve" },
      { label: "Technology", value: "STARLINGER AD-Star" },
      { label: "Printing", value: "Up to 6 colors" },
    ],
    applications: ["Cement plants", "Automated filling lines", "Bulk distribution"],
    featured: true,
  },
  {
    slug: "cement-sack-standard",
    name: "Standard Cement Sack",
    category: "Cement Sacks",
    summary:
      "Cost-efficient woven cement sack for standard filling operations, with full custom-print branding and consistent lot quality.",
    specs: [
      { label: "Capacity", value: "50 kg" },
      { label: "Construction", value: "Woven PP" },
      { label: "Technology", value: "STARLINGER (EU)" },
      { label: "Printing", value: "Up to 6 colors" },
    ],
    applications: ["Cement plants", "Regional distribution"],
  },
  // ── PP Woven Bags ─────────────────────────────────────────────────────
  {
    slug: "pp-woven-printed",
    name: "Printed PP Woven Bag",
    category: "PP Woven Bags",
    summary:
      "Brand-printed polypropylene woven bag from virgin food-grade SABIC resin, flexo-printed both sides for retail-facing packaging. No recycled content, no odor.",
    specs: [
      { label: "Capacity", value: "5–50 kg" },
      { label: "Resin", value: "Virgin food-grade (SABIC)" },
      { label: "Printing", value: "Flexo, both sides" },
      { label: "Finish", value: "Plain / laminated" },
    ],
    applications: ["Animal feed", "Flour & salt", "Fertilizer", "Seafood"],
    featured: true,
  },
  {
    slug: "pp-woven-plain",
    name: "Plain PP Woven Bag",
    category: "PP Woven Bags",
    summary:
      "General-purpose woven bag in white or colored PP, light, strong, and heavy-duty for agricultural and industrial filling.",
    specs: [
      { label: "Capacity", value: "5–50 kg" },
      { label: "Resin", value: "Virgin food-grade (SABIC)" },
      { label: "Finish", value: "Plain / laminated" },
      { label: "Bottom", value: "Folded, open mouth" },
    ],
    applications: ["Rice & grain", "Animal feed", "Fertilizer", "Agriculture"],
  },
  // ── Fillers & Thread ──────────────────────────────────────────────────
  {
    slug: "caco3-filler",
    name: "Calcium-Carbonate Filler",
    category: "Fillers & Thread",
    summary:
      "Filler masterbatch from century-old high-calcium Vietnamese limestone, reduces production cost across woven sacks, film, extrusion coating, and molding. Custom grades and color masterbatch available.",
    specs: [
      { label: "Base", value: "High-calcium CaCO₃" },
      { label: "Source", value: "Vietnam limestone" },
      { label: "Forms", value: "Filler / color / compound" },
    ],
    applications: ["Woven sacks", "Blown film", "Extrusion coating", "Injection & blow molding"],
  },
  {
    slug: "bag-closing-thread",
    name: "Bag-Closing Thread",
    category: "Fillers & Thread",
    summary:
      "High-tenacity thread engineered for bag-closing machines, consistent runnability at speed, compatible with NEWLONG and YAO HAN closers.",
    specs: [
      { label: "Material", value: "Spun polyester" },
      { label: "Put-up", value: "Cone" },
      { label: "Compatibility", value: "NEWLONG / YAO HAN" },
    ],
    applications: ["Bag closing", "Sack stitching"],
  },
  // ── Machinery ─────────────────────────────────────────────────────────
  {
    slug: "newlong-bag-closers",
    name: "NEWLONG Bag-Closing Machinery",
    category: "Machinery",
    summary:
      "Japanese NEWLONG printing, converting, bag-making and sealing machinery, distributed and serviced by KTK since 2009, with a dedicated service center.",
    specs: [
      { label: "Origin", value: "Japan" },
      { label: "Partner since", value: "2009" },
      { label: "Support", value: "Service center · parts" },
    ],
    applications: ["Filling lines", "Packing stations", "Food & chemical", "Retail bags"],
    featured: true,
  },
  {
    slug: "yaohan-bag-closers",
    name: "YAO HAN Bag Closers",
    category: "Machinery",
    summary:
      "Taiwanese YAO HAN portable and high-speed automatic bag closers, plus 70,000+ spare-part varieties. KTK is the sole authorized Myanmar distributor.",
    specs: [
      { label: "Origin", value: "Taiwan" },
      { label: "Partner since", value: "2013" },
      { label: "Spare parts", value: "70,000+ varieties" },
    ],
    applications: ["Field packing", "Warehouse operations", "Carpet over-edging"],
  },
  // ── Bearings ──────────────────────────────────────────────────────────
  {
    slug: "hch-bearings",
    name: "HCH Bearings",
    category: "Bearings",
    summary:
      "Sole authorized Myanmar distributor since 2008. HCH runs one of the world's largest miniature-bearing operations (15–25M/month), certified ISO/TS 16949 by TÜV Germany.",
    specs: [
      { label: "Brand", value: "HCH (sole MM distributor)" },
      { label: "Certification", value: "ISO/TS 16949 (TÜV)" },
      { label: "Types", value: "Deep-groove, tapered, spherical, unit" },
    ],
    applications: ["Ventilation", "Agriculture", "Logistics", "Construction", "Ports", "Minerals"],
    featured: true,
  },
  {
    slug: "tr-bearings",
    name: "TR Bearings",
    category: "Bearings",
    summary:
      "TR bearing units and spherical roller bearings, 2,000+ variants, 9M units/year capacity, Chinese Famous Brand. Stocked locally for industrial customers.",
    specs: [
      { label: "Brand", value: "TR" },
      { label: "Established", value: "1979" },
      { label: "Range", value: "2,000+ variants" },
    ],
    applications: ["Plant maintenance", "OEM supply", "Engineering"],
  },
];
