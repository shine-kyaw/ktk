// News and activities are intentionally empty until KTK publishes approved
// entries through the CMS. Seed/demo stories must never appear publicly.
export type NewsPost = {
  slug: string;
  date: string;
  category: "Company" | "Production" | "Partnership" | "CSR";
  title: string;
  excerpt: string;
  body: string[];
  image?: string | null;
};

export const NEWS: NewsPost[] = [];

export type Activity = {
  slug: string;
  category: "CSR" | "Events" | "Exhibitions" | "Training";
  title: string;
  date: string;
  detail: string;
  image?: string | null;
};

export const ACTIVITIES: Activity[] = [];
