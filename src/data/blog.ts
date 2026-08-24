// News stays empty until KTK publishes approved entries through the CMS.
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
  category: "CSR" | "Events" | "Exhibitions" | "Training" | "Commercial";
  title: string;
  date: string;
  detail: string;
  image?: string | null;
  gallery?: { src: string; alt: string }[];
  videoUrl?: string | null;
  videoPoster?: string | null;
  externalVideoUrl?: string | null;
  sourceUrl?: string | null;
};

const suppliedPhoto = (number: number, alt: string) => ({
  src: `/assets/company/activities/repair-2026/${String(number).padStart(2, "0")}.webp`,
  alt,
});

const suppliedGallery = (start: number, end: number, label: string) =>
  Array.from({ length: end - start + 1 }, (_, index) =>
    suppliedPhoto(start + index, `${label} ${index + 1}`),
  );

export const ACTIVITIES: Activity[] = [
  {
    slug: "ktk-team-outing",
    category: "Events",
    title: "KTK Team Outing",
    date: "Company archive",
    detail: "A team gathering from KTK's supplied company activity archive.",
    image: "/assets/company/activities/activity-1.webp",
  },
  {
    slug: "outdoor-team-activity",
    category: "Events",
    title: "Outdoor Team Activity",
    date: "Company archive",
    detail: "KTK colleagues taking part in an outdoor group activity.",
    image: "/assets/company/activities/activity-2.webp",
  },
  {
    slug: "staff-recognition-gathering",
    category: "Events",
    title: "Staff Recognition & Gathering",
    date: "Company archive",
    detail: "A staff recognition and group gathering held at the KTK building.",
    image: "/assets/company/activities/activity-3.webp",
  },
  {
    slug: "company-team-programme",
    category: "Events",
    title: "Company Team Programme",
    date: "Company archive",
    detail: "A supplied KTK programme, group dinner, and team activity archive.",
    image: "/assets/company/activities/archive/01.webp",
    gallery: [
      { src: "/assets/company/activities/archive/02.webp", alt: "KTK company programme" },
      { src: "/assets/company/activities/archive/03.webp", alt: "KTK team dinner group photograph" },
    ],
  },
  {
    slug: "company-outing-archive",
    category: "Events",
    title: "Company Outing Archive",
    date: "Company archive",
    detail: "Group photographs from a supplied KTK company outing and staff gathering.",
    image: "/assets/company/activities/archive/06.webp",
    gallery: [
      { src: "/assets/company/activities/archive/07.webp", alt: "KTK staff group at a company outing" },
      { src: "/assets/company/activities/archive/09.webp", alt: "KTK staff at an outdoor destination" },
      { src: "/assets/company/activities/archive/11.webp", alt: "KTK staff outing group" },
    ],
  },
  {
    slug: "staff-health-programme-2022",
    category: "CSR",
    title: "Staff Health & Vaccination Programme",
    date: "January–February 2022",
    detail: "Representative photographs from the supplied staff COVID-19 health and vaccination activity. The full source archive remains linked below.",
    image: "/assets/company/activities/archive/12.webp",
    gallery: [
      { src: "/assets/company/activities/archive/13.webp", alt: "KTK staff health and vaccination activity" },
      { src: "/assets/company/activities/archive/14.webp", alt: "KTK staff vaccination programme" },
      { src: "/assets/company/activities/archive/15.webp", alt: "KTK staff receiving vaccination support" },
      { src: "/assets/company/activities/archive/16.webp", alt: "KTK staff health programme" },
    ],
  },
  {
    slug: "team-dinner-2019",
    category: "Events",
    title: "KTK Team Dinner",
    date: "5 October 2019",
    detail: "A supplied team dinner archive with group photographs and a short celebration video.",
    image: "/assets/company/activities/archive/17.webp",
    gallery: [
      { src: "/assets/company/activities/archive/18.webp", alt: "KTK team dinner group" },
      { src: "/assets/company/activities/archive/20.webp", alt: "KTK team dinner gathering" },
      { src: "/assets/company/activities/archive/22.webp", alt: "KTK staff dinner photograph" },
      { src: "/assets/company/activities/archive/24.webp", alt: "KTK team dinner archive" },
    ],
    videoUrl: "/assets/company/video/team-dinner-2019.mp4",
    videoPoster: "/assets/company/video/team-dinner-2019-poster.jpg",
  },
  {
    slug: "latest-company-outings",
    category: "Events",
    title: "Company Outings & Team Activities",
    date: "New supplied archive",
    detail: "The latest company-outing and team-activity photographs supplied by KTK.",
    image: suppliedPhoto(1, "KTK company outing and team activity").src,
    gallery: suppliedGallery(2, 10, "KTK company outing photograph"),
  },
  {
    slug: "golf-community-programme",
    category: "CSR",
    title: "Golf & Community Programme",
    date: "New supplied archive",
    detail: "A newly supplied photograph from KTK's golf and community programme.",
    image: suppliedPhoto(11, "KTK golf and community programme").src,
  },
  {
    slug: "team-programmes-and-gatherings",
    category: "Events",
    title: "Team Programmes & Gatherings",
    date: "New supplied archive",
    detail: "Recent team programmes, staff gatherings, and company celebrations supplied by KTK.",
    image: suppliedPhoto(12, "KTK team programme and gathering").src,
    gallery: suppliedGallery(13, 21, "KTK team programme photograph"),
  },
  {
    slug: "staff-meals-and-company-highlights",
    category: "Events",
    title: "Staff Meals & Company Highlights",
    date: "New supplied archive",
    detail: "New photographs of staff meals, company gatherings, and recent KTK highlights.",
    image: suppliedPhoto(22, "KTK staff meal and company highlight").src,
    gallery: suppliedGallery(23, 31, "KTK staff and company photograph"),
  },
  {
    slug: "staff-appreciation-event",
    category: "Events",
    title: "Staff Appreciation Event",
    date: "Company archive",
    detail: "KTK team members and recognition recipients photographed at a supplied company event.",
    image: "/assets/company/events/event-01.webp",
    gallery: [{ src: "/assets/company/events/event-02.webp", alt: "KTK team and recognition recipients at a company event" }],
  },
  {
    slug: "novotel-company-event",
    category: "Events",
    title: "KTK Company Event at Novotel",
    date: "21 February 2020",
    detail: "A supplied KTK and San Kaung company-event film featuring company representatives, manufacturing footage, and the Novotel event venue.",
    image: "/assets/company/events/event-03.webp",
    videoUrl: "/assets/company/video/novotel-event.mp4",
    videoPoster: "/assets/company/video/novotel-event-poster.jpg",
  },
  {
    slug: "company-opening-ceremony",
    category: "Events",
    title: "Company Opening Ceremony",
    date: "Company archive",
    detail: "Ribbon-cutting and group photographs from a supplied Kaung Thu Kha company-opening archive.",
    image: "/assets/company/events/event-04.webp",
    gallery: [
      { src: "/assets/company/events/event-05.webp", alt: "Guests and company representatives at the opening ceremony" },
      { src: "/assets/company/events/event-06.webp", alt: "Kaung Thu Kha company-opening group photograph" },
    ],
  },
  {
    slug: "corporate-recognition-ceremony",
    category: "Events",
    title: "Corporate Recognition Ceremony",
    date: "Company archive",
    detail: "KTK representatives photographed on stage during a supplied corporate recognition event.",
    image: "/assets/company/events/event-07.webp",
  },
  {
    slug: "ktk-commercial-film",
    category: "Commercial",
    title: "KTK Commercial Film",
    date: "Company archive",
    detail: "The supplied KTK commercial film, retained in Google Drive for streaming at its original quality.",
    externalVideoUrl: "https://drive.google.com/file/d/1Edm1g6uM7fKzibs309TRvrvjVv9ZXwDi/preview",
    sourceUrl: "https://drive.google.com/file/d/1Edm1g6uM7fKzibs309TRvrvjVv9ZXwDi/view?usp=drivesdk",
  },
  {
    slug: "moon-ma-hnin-commercial",
    category: "Commercial",
    title: "Moon + Ma Hnin Commercial",
    date: "Company archive",
    detail: "A supplied commercial production retained in Google Drive for streaming at its original quality.",
    externalVideoUrl: "https://drive.google.com/file/d/18710yOz2_tkQAh7Nl7lyjLgPG5DfdW1E/preview",
    sourceUrl: "https://drive.google.com/file/d/18710yOz2_tkQAh7Nl7lyjLgPG5DfdW1E/view?usp=drivesdk",
  },
  ...[
    "1lkSn8tUE55CHqxl4ylYvttCjnouyfiMJ",
    "1UhHkRGT1Bs68shihoFmpER8i3Q8AFziV",
    "1zVWVevtfbzNnCMYAyMToK1l6_JUZqmuX",
    "1AERnhHt52TVS7F1RL9-9vVOW7J7j-6yX",
    "1j7jvk0RZAieLKPED5sGumWy3AMh2qYuT",
    "1W_MJFAoI1sRF2U1eqiwRwXKtqZsxK_V2",
  ].map((id, index): Activity => ({
    slug: `ktk-ai-commercial-${String(index + 1).padStart(2, "0")}`,
    category: "Commercial",
    title: `KTK AI Commercial ${String(index + 1).padStart(2, "0")}`,
    date: "New supplied archive",
    detail: "A newly supplied KTK AI commercial, streamed from the original Google Drive file.",
    externalVideoUrl: `https://drive.google.com/file/d/${id}/preview`,
    sourceUrl: `https://drive.google.com/file/d/${id}/view`,
  })),
];
