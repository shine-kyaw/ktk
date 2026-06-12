// Product catalog — shaped like a future CMS/API response so swapping the
// source later is a one-line change. Slugs are stable identifiers.
export type Product = {
  slug: string;
  name: string;
  category: string;
  summary: string;
  specs: { label: string; value: string }[];
  /** Demo placeholder content — the KTK team will replace via CMS later. */
  applications: string[];
};

export const CATEGORIES = [
  "Cement Sacks",
  "PP Woven Bags",
  "Fillers & Thread",
  "Machinery",
  "Bearings",
] as const;

export const PRODUCTS: Product[] = [
  {
    slug: "cement-sack-2ply",
    name: "2-Ply Cement Sack",
    category: "Cement Sacks",
    summary:
      "High-strength block-bottom cement sack produced on European STARLINGER lines — engineered for automated filling at high line speeds.",
    specs: [
      { label: "Capacity", value: "50 kg" },
      { label: "Construction", value: "2-ply, block bottom" },
      { label: "Technology", value: "STARLINGER (EU)" },
      { label: "Printing", value: "Up to 6 colors" },
    ],
    applications: ["Cement plants", "Automated filling lines", "Bulk distribution"],
  },
  {
    slug: "cement-sack-1ply",
    name: "1-Ply Cement Sack",
    category: "Cement Sacks",
    summary:
      "Cost-efficient single-ply sack for standard filling operations, with full custom print branding.",
    specs: [
      { label: "Capacity", value: "50 kg" },
      { label: "Construction", value: "1-ply" },
      { label: "Technology", value: "STARLINGER (EU)" },
      { label: "Printing", value: "Up to 6 colors" },
    ],
    applications: ["Cement plants", "Regional distribution"],
  },
  {
    slug: "pp-woven-plain",
    name: "Plain PP Woven Bag",
    category: "PP Woven Bags",
    summary:
      "General-purpose polypropylene woven bag for agricultural and industrial filling — uncoated or laminated.",
    specs: [
      { label: "Sizes", value: "Custom" },
      { label: "Finish", value: "Plain / laminated" },
      { label: "Denier", value: "To specification" },
      { label: "MOQ", value: "On request" },
    ],
    applications: ["Rice & grain", "Animal feed", "Fertilizer", "Resins"],
  },
  {
    slug: "pp-woven-printed",
    name: "Printed PP Woven Bag",
    category: "PP Woven Bags",
    summary:
      "Brand-printed PP woven bag with multi-color flexographic printing for retail-facing packaging.",
    specs: [
      { label: "Sizes", value: "Custom" },
      { label: "Printing", value: "Multi-color flexo" },
      { label: "Finish", value: "Plain / laminated" },
      { label: "MOQ", value: "On request" },
    ],
    applications: ["Branded commodities", "Feed & seed", "Consumer staples"],
  },
  {
    slug: "filler-masterbatch",
    name: "Filler",
    category: "Fillers & Thread",
    summary:
      "Calcium-carbonate filler for PP extrusion — consistent dispersion for stable tape quality.",
    specs: [
      { label: "Base", value: "CaCO₃ / PP" },
      { label: "Form", value: "Granule" },
      { label: "Packing", value: "25 kg bag" },
    ],
    applications: ["Tape extrusion", "Lamination", "Injection"],
  },
  {
    slug: "sewing-thread",
    name: "Bag-Closing Thread",
    category: "Fillers & Thread",
    summary:
      "High-tenacity thread engineered for bag-closing machines — consistent runnability at speed.",
    specs: [
      { label: "Material", value: "Spun polyester" },
      { label: "Put-up", value: "Cone" },
      { label: "Compatibility", value: "NEWLONG / YAO HAN" },
    ],
    applications: ["Bag closing", "Sack stitching"],
  },
  {
    slug: "newlong-machines",
    name: "NEWLONG Bag Closers",
    category: "Machinery",
    summary:
      "Japanese NEWLONG bag-closing machinery — distributed and supported by KTK since 2009.",
    specs: [
      { label: "Origin", value: "Japan" },
      { label: "Partner since", value: "2009" },
      { label: "Support", value: "Parts & service" },
    ],
    applications: ["Filling lines", "Packing stations"],
  },
  {
    slug: "yaohan-machines",
    name: "YAO HAN Bag Closers",
    category: "Machinery",
    summary:
      "Taiwanese YAO HAN portable and pedestal bag closers — distributed and supported by KTK since 2013.",
    specs: [
      { label: "Origin", value: "Taiwan" },
      { label: "Partner since", value: "2013" },
      { label: "Support", value: "Parts & service" },
    ],
    applications: ["Field packing", "Warehouse operations"],
  },
  {
    slug: "hch-bearings",
    name: "HCH Bearings",
    category: "Bearings",
    summary:
      "Authorized distribution of HCH precision ball bearings for industrial and automotive applications.",
    specs: [
      { label: "Brand", value: "HCH" },
      { label: "Status", value: "Authorized distributor" },
      { label: "Range", value: "Deep groove & more" },
    ],
    applications: ["Machinery maintenance", "Automotive", "Electric motors"],
  },
  {
    slug: "tr-bearings",
    name: "TR Bearings",
    category: "Bearings",
    summary:
      "Authorized distribution of TR bearings with stock availability for industrial customers.",
    specs: [
      { label: "Brand", value: "TR" },
      { label: "Status", value: "Authorized distributor" },
      { label: "Range", value: "Industrial series" },
    ],
    applications: ["Plant maintenance", "OEM supply"],
  },
];

export const STATS = [
  { value: 2008, label: "Established", isYear: true },
  { value: 17, label: "Years in operation" },
  { value: 6, label: "Product categories" },
  { value: 100, label: "% quality assurance", suffix: "%" },
] as const;
