// Job vacancies, placeholder entries the KTK team will manage via CMS.
export type Job = {
  slug: string;
  title: string;
  department: string;
  location: string;
  type: string;
  summary: string;
  responsibilities: string[];
  requirements: string[];
};

export const JOBS: Job[] = [
  {
    slug: "sales-executive",
    title: "Sales Executive",
    department: "Sales & Distribution",
    location: "Yangon",
    type: "Full-time",
    summary:
      "Grow KTK's dealer and direct-customer base for sacks, bags, and machinery across an assigned territory.",
    responsibilities: [
      "Manage and expand dealer relationships",
      "Prepare quotations and negotiate supply programs",
      "Coordinate with production on delivery schedules",
    ],
    requirements: [
      "2+ years B2B sales experience",
      "Strong communication in Burmese; working English",
      "Willingness to travel within Myanmar",
    ],
  },
  {
    slug: "machine-operator",
    title: "Machine Operator",
    department: "Production",
    location: "Hlaing Thar Yar, Yangon",
    type: "Full-time",
    summary:
      "Operate STARLINGER extrusion, weaving, or conversion equipment on the plant floor.",
    responsibilities: [
      "Run assigned production line to schedule",
      "Perform first-line quality checks",
      "Follow safety and housekeeping procedures",
    ],
    requirements: [
      "Technical school background preferred",
      "Shift-work availability",
      "Attention to detail",
    ],
  },
  {
    slug: "service-technician",
    title: "Service Technician",
    department: "Machinery & After-Sales",
    location: "Yangon (field)",
    type: "Full-time",
    summary:
      "Install and service NEWLONG and YAO HAN bag-closing machinery at customer sites.",
    responsibilities: [
      "Install and commission machinery",
      "Diagnose and repair faults on site",
      "Train customer operators",
    ],
    requirements: [
      "Electromechanical experience",
      "Driving license",
      "Customer-facing attitude",
    ],
  },
  {
    slug: "qa-inspector",
    title: "QA Inspector",
    department: "Quality",
    location: "Hlaing Thar Yar, Yangon",
    type: "Full-time",
    summary:
      "Inspect production lots against specification, weight, tensile, print, and dimensions.",
    responsibilities: [
      "Sample and test production lots",
      "Record and report quality data",
      "Hold non-conforming stock",
    ],
    requirements: [
      "QC experience in manufacturing",
      "Basic data-recording skills",
      "Integrity and consistency",
    ],
  },
];

export const RECRUITMENT_PROCESS = [
  { step: "Apply", detail: "Submit the application form or email your CV to kaungthukha@ktk.com.mm." },
  { step: "Screening", detail: "Our HR team reviews applications and shortlists within two weeks." },
  { step: "Interview", detail: "One or two interviews, practical assessment for technical roles." },
  { step: "Offer", detail: "Successful candidates receive an offer and onboarding schedule." },
] as const;
