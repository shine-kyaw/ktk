// News & activities — placeholder entries, CMS-driven later (same shape).
export type NewsPost = {
  slug: string;
  date: string;
  category: "Company" | "Production" | "Partnership" | "CSR";
  title: string;
  excerpt: string;
  body: string[];
};

export const NEWS: NewsPost[] = [
  {
    slug: "new-website-launch",
    date: "2026-06",
    category: "Company",
    title: "KTK launches its redesigned website",
    excerpt: "A new digital home for our dealers, customers, and partners.",
    body: [
      "Kaung Thu Kha Trading Co., Ltd has launched a fully redesigned corporate website, built to serve the dealers, contractors, and industrial customers who rely on our products every day.",
      "The new site brings the full product catalog, service information, careers, and company news into one place — with inquiry forms connected directly to our sales team.",
    ],
  },
  {
    slug: "capacity-expansion-2025",
    date: "2025-11",
    category: "Production",
    title: "Conversion capacity expands at Hlaing Thar Yar",
    excerpt: "Additional capacity comes online to meet construction-sector demand.",
    body: [
      "KTK has commissioned additional conversion capacity at its Hlaing Thar Yar plant, increasing monthly output of block-bottom cement sacks.",
      "The expansion responds to growing demand from Myanmar's construction sector and strengthens delivery reliability for our cement-industry customers.",
    ],
  },
  {
    slug: "dealer-network-growth",
    date: "2025-03",
    category: "Partnership",
    title: "Dealer network grows across Myanmar",
    excerpt: "New distribution partners onboarded in Upper and Lower Myanmar.",
    body: [
      "KTK welcomed new distribution partners this quarter, extending availability of our packaging products and machinery consumables.",
      "We continue to onboard dealers — contact our sales team to discuss territories and supply programs.",
    ],
  },
  {
    slug: "operator-training-program",
    date: "2024-12",
    category: "CSR",
    title: "Operator training program graduates new technicians",
    excerpt: "In-house training develops the next generation of plant operators.",
    body: [
      "Our in-house training program graduated its latest class of machine operators and service technicians.",
      "The program combines classroom instruction with supervised floor experience on STARLINGER production lines.",
    ],
  },
];

export type Activity = {
  slug: string;
  category: "CSR" | "Events" | "Exhibitions" | "Training";
  title: string;
  date: string;
  detail: string;
};

export const ACTIVITIES: Activity[] = [
  {
    slug: "community-donation-2025",
    category: "CSR",
    title: "Community support — Hlaing Thar Yar",
    date: "2025",
    detail: "Donations and support activities for communities around our plant and offices.",
  },
  {
    slug: "annual-staff-event",
    category: "Events",
    title: "Annual staff gathering",
    date: "2025",
    detail: "Company-wide event recognizing long-serving staff and production milestones.",
  },
  {
    slug: "construction-expo",
    category: "Exhibitions",
    title: "Myanmar construction industry exhibition",
    date: "2024",
    detail: "KTK exhibited cement sacks, woven bags, and bag-closing machinery.",
  },
  {
    slug: "operator-training",
    category: "Training",
    title: "Operator & technician training",
    date: "Ongoing",
    detail: "Continuous in-house training on production equipment and quality procedures.",
  },
];
