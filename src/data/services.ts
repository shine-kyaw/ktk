// Service catalog, CMS-driven later; same API-ready shape as products.
export type Service = {
  slug: string;
  name: string;
  summary: string;
  points: string[];
};

export const SERVICES: Service[] = [
  {
    slug: "custom-bag-manufacturing",
    name: "Custom Bag Manufacturing",
    summary:
      "OEM cement sacks and PP woven bags produced to your specification, size, ply, denier, lamination, and capacity engineered for your filling line.",
    points: ["Specification engineering", "STARLINGER production", "Lot-level QC", "Scheduled supply programs"],
  },
  {
    slug: "printing-branding",
    name: "Printing & Branding",
    summary:
      "Multi-color flexographic printing that puts your brand on every bag, artwork support, color matching, and print-quality inspection included.",
    points: ["Up to 6 colors", "Artwork & plate support", "Color consistency control"],
  },
  {
    slug: "machinery-sales-service",
    name: "Machinery Sales & Service",
    summary:
      "NEWLONG (Japan) and YAO HAN (Taiwan) bag-closing machinery, supplied, installed, and serviced by our technicians to keep filling lines running.",
    points: ["Authorized distribution", "Installation & training", "After-sales service"],
  },
  {
    slug: "spare-parts-consumables",
    name: "Spare Parts & Consumables",
    summary:
      "Genuine machine parts, bag-closing thread, needles, and HCH / TR bearings, stocked locally for rapid replacement.",
    points: ["Genuine parts stock", "Thread & needles", "HCH / TR bearings"],
  },
  {
    slug: "technical-consulting",
    name: "Technical Consulting",
    summary:
      "Packaging and filling-line consulting, bag specification reviews, trial runs, and troubleshooting from a team that manufactures what it recommends.",
    points: ["Spec review", "Trial production", "Line troubleshooting"],
  },
];
