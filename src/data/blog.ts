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
      { src: "/assets/company/activities/archive/04.webp", alt: "KTK group team activity" },
      { src: "/assets/company/activities/archive/05.webp", alt: "KTK group team activity photograph" },
    ],
    sourceUrl: "https://drive.google.com/file/d/1j7bDnG2HyvLH1vqX6UX_LP81R7-Q7TSE/view?usp=sharing",
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
      { src: "/assets/company/activities/archive/08.webp", alt: "KTK staff group photograph" },
      { src: "/assets/company/activities/archive/09.webp", alt: "KTK staff at an outdoor destination" },
      { src: "/assets/company/activities/archive/10.webp", alt: "KTK staff outdoor group photograph" },
      { src: "/assets/company/activities/archive/11.webp", alt: "KTK staff outing group" },
    ],
    sourceUrl: "https://drive.google.com/file/d/1j7bDnG2HyvLH1vqX6UX_LP81R7-Q7TSE/view?usp=sharing",
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
    sourceUrl: "https://drive.google.com/file/d/1j7bDnG2HyvLH1vqX6UX_LP81R7-Q7TSE/view?usp=sharing",
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
      { src: "/assets/company/activities/archive/19.webp", alt: "KTK team celebration" },
      { src: "/assets/company/activities/archive/20.webp", alt: "KTK team dinner gathering" },
      { src: "/assets/company/activities/archive/21.webp", alt: "KTK team at a company dinner" },
      { src: "/assets/company/activities/archive/22.webp", alt: "KTK staff dinner photograph" },
      { src: "/assets/company/activities/archive/23.webp", alt: "KTK staff celebration" },
      { src: "/assets/company/activities/archive/24.webp", alt: "KTK team dinner archive" },
      { src: "/assets/company/activities/archive/25.webp", alt: "KTK team gathering" },
    ],
    videoUrl: "/assets/company/video/team-dinner-2019.mp4",
    videoPoster: "/assets/company/video/team-dinner-2019-poster.jpg",
    sourceUrl: "https://drive.google.com/file/d/1j7bDnG2HyvLH1vqX6UX_LP81R7-Q7TSE/view?usp=sharing",
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
  {
    slug: "phyu-phyu-htwe-hch-commercial",
    category: "Commercial",
    title: "Phyu Phyu Htwe — HCH Commercial",
    date: "Company archive",
    detail: "The supplied HCH commercial production retained in Google Drive for viewing at its original quality.",
    externalVideoUrl: "https://drive.google.com/file/d/1QVuS6jqrAaMR5ThUdefp7NDkMLLLKIRs/preview",
    sourceUrl: "https://drive.google.com/file/d/1QVuS6jqrAaMR5ThUdefp7NDkMLLLKIRs/view?usp=drivesdk",
  },
];
