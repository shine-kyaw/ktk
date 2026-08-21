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
  tagline: "Industrial strength. One trusted group.",
  foundedTrading: 2008,
  foundedManufacturing: 1991, // San Kaung factory
  factory: "San Kaung Factory",

  // Approved group profile, supplied August 2026.
  oneLiner:
    "A Myanmar industrial group spanning trading, manufacturing, packaging solutions, electrical engineering, machinery, and components.",

  hq: {
    line1: "No. 178, Corner of Twin Thin Taik Wun U Htun Nyo Street & Matkhayar Minthar Gyi Maung Pyo Street",
    line2: "Hlaing Thar Yar Industrial Zone (2), Yangon, Myanmar",
  },
  mapsUrl: "https://maps.app.goo.gl/X7xHEKg5PM1ER9zf9",
  officeHours: "Monday - Saturday, 8:00 AM - 4:00 PM; closed Sundays and public holidays",
  phones: ["(+95 9) 264 817 108", "(+95 9) 457 497 347", "(+95 9) 264 817 101-109"],
  viber: "+95 89 277 3203",
  emails: ["sales@ktk.com.mm"],
  facebook: "https://www.facebook.com/share/1DNLN1Hor6/",
  responseTimes: {
    email: "Within 24 business hours",
    phone: "Instant or same-day response",
  },
  contacts: [
    { name: "U Arkar Htet", title: "Assistant Manager", phone: "+95 9 264 817 107" },
    { name: "U Mann Nay Wunn Aung", title: "Assistant Senior Supervisor", phone: "+95 9 264 817 104" },
    { name: "Daw Zin Mar Htwe", title: "Junior Supervisor", phone: "+95 9 264 817 102" },
  ],
} as const;

export const COMPANY_PROFILE = {
  executiveSummary: [
    "Established in 2008, Kaung Thu Kha Group of Companies is one of Myanmar's leading business groups, specializing in industrial trading, manufacturing, packaging solutions, and electrical engineering. Through its diversified group companies, the organization supplies industrial components, sewing equipment, industrial threads, and advanced packaging solutions to customers across a wide range of industries.",
    "Driven by a commitment to quality, innovation, and customer satisfaction, Kaung Thu Kha Group provides reliable products and professional services, builds long-term customer partnerships, and contributes to Myanmar's industrial development.",
  ],
  businessActivities: [
    "Industrial trading",
    "Manufacturing",
    "Packaging solutions",
    "Electrical engineering",
    "Industrial machinery and components",
  ],
  productsServices: {
    industrial: ["HCH / TR bearings", "Industrial sewing machines", "Sewing-machine spare parts", "Industrial threads", "Industrial machinery accessories"],
    packaging: ["PP woven bags", "Laminated PP woven bags", "BOPP laminated bags", "Printed PP woven bags", "Cement bags", "Rice bags", "Fertilizer bags", "Animal-feed bags", "Flour bags", "Sugar bags", "Custom-designed packaging bags"],
  },
  groupCompanies: [
    {
      name: "Kabar Kyaw Trading Co., Ltd.",
      focus: "Industrial trading and distribution of machinery, industrial components, and raw materials.",
      website: null,
    },
    {
      name: "San Kaung Industry Limited",
      focus: "Manufacturing of industrial products and packaging solutions.",
      website: null,
    },
    {
      name: "San Kaung Bag Manufacturing Co., Ltd.",
      focus: "Manufacturer of PP woven bags, laminated bags, BOPP bags, cement bags, and other industrial packaging products.",
      website: null,
    },
    {
      name: "Asia General Electric Holding Co., Ltd.",
      focus: "Engineering, manufacturing, and distribution of electrical equipment, power solutions, transformers, and switchgear panels.",
      website: "https://www.agholding.com",
    },
    {
      name: "Peace Myanmar Electric Holding Co., Ltd.",
      focus: "Distribution of electrical products, energy solutions, and Mitsubishi Electric products.",
      website: "https://pmeholding.com/",
    },
  ],
  reasons: [
    "Established and trusted since 2008",
    "Diverse business portfolio across multiple industries",
    "High-quality products and reliable services",
    "Modern manufacturing facilities",
    "Experienced management and technical teams",
    "Strong nationwide distribution network",
    "Competitive pricing and timely delivery",
    "Customer-oriented business approach",
  ],
} as const;

export const LEADERSHIP_PORTRAITS = [
  "/assets/company/leadership/leadership-01.webp",
  "/assets/company/leadership/leadership-02.webp",
  "/assets/company/leadership/leadership-03.webp",
  "/assets/company/leadership/leadership-04.webp",
  "/assets/company/leadership/leadership-05.webp",
] as const;

export const LEADERSHIP_PROFILES = [
  { name: "San Nyein", image: LEADERSHIP_PORTRAITS[0] },
  { name: "Khin Maung Myat", image: LEADERSHIP_PORTRAITS[1] },
  { name: "Swe Zar Lwin", image: LEADERSHIP_PORTRAITS[2] },
  { name: "Soe Myat Thu", image: LEADERSHIP_PORTRAITS[3] },
  { name: "Zar Ni Lin", image: LEADERSHIP_PORTRAITS[4] },
] as const;

export const TEAM_PORTRAITS = [
  "/assets/company/team/staff-01.webp",
  "/assets/company/team/staff-02.webp",
  "/assets/company/team/staff-03.webp",
  "/assets/company/team/staff-04.webp",
  "/assets/company/team/staff-05.webp",
  "/assets/company/team/staff-06.webp",
] as const;

export const LEADERSHIP_DIRECTORY = [
  "Khin Maung Myat",
  "San Nyein",
  "Soe Myat Thu",
  "Swe Zar Lwin",
  "Zar Ni Lin",
] as const;

export const CERTIFICATES = [
  {
    id: "10000000-0000-4000-8000-000000000001",
    title: "NEWLONG Zone Agent Authorization",
    issuer: "Newlong (Thailand) Limited",
    reference_number: null,
    scope: "Authorization for Kaung Thu Kha Trading Co., Ltd. to act as zone agent for NEWLONG products in the Union of Myanmar since 20 February 2009.",
    issued_on: "2009-02-20",
    expires_on: null,
    image: "/assets/company/certificates/newlong-authorization.webp",
    document_url: "/assets/company/certificates/newlong-authorization.webp",
    permission_confirmed: true,
  },
  {
    id: "10000000-0000-4000-8000-000000000002",
    title: "YAO HAN Sole Distributor Certificate",
    issuer: "Yao Han Industries Co., Ltd.",
    reference_number: null,
    scope: "Sole-distributor appointment for bag-closing machine series and S8 series in Myanmar. The supplied certificate covers 1 September 2024 through 31 October 2025 and is displayed as an authorization record.",
    issued_on: "2024-09-12",
    expires_on: "2025-10-31",
    image: "/assets/company/certificates/yaohan-authorization.webp",
    document_url: "/assets/company/certificates/yaohan-authorization.webp",
    permission_confirmed: true,
  },
  {
    id: "10000000-0000-4000-8000-000000000003",
    title: "HCH Sole Distributor Certificate",
    issuer: "Huanchi Bearing Group Co., Ltd.",
    reference_number: null,
    scope: "Sole-distributor authorization for HCH brand bearings in Myanmar, including marketing, promotion, sales, and technical service. The supplied certificate covers 1 March 2025 through 28 February 2026.",
    issued_on: "2025-03-01",
    expires_on: "2026-02-28",
    image: "/assets/company/certificates/hch-authorization.webp",
    document_url: "/assets/company/certificates/hch-authorization.webp",
    permission_confirmed: true,
  },
  {
    id: "10000000-0000-4000-8000-000000000004",
    title: "TR Official Distributor Authorization",
    issuer: "DongGuan TR Bearing Co., Ltd.",
    reference_number: null,
    scope: "Official distributor appointment for the registered TR brand in Myanmar. The supplied certificate states a two-year validity beginning 18 October 2026.",
    issued_on: "2026-10-01",
    expires_on: "2028-10-17",
    image: "/assets/company/certificates/tr-authorization.webp",
    document_url: "/assets/company/documents/tr-certificate-2026.pdf",
    permission_confirmed: true,
  },
] as const;

export const BURMESE_PROFILE = {
  title: "ကောင်းသုခလုပ်ငန်းစု ကုမ္ပဏီအကြောင်း",
  summary: [
    "Kaung Thu Kha Group of Companies ကို ၂၀၀၈ ခုနှစ်တွင် စတင်တည်ထောင်ခဲ့ပြီး မြန်မာနိုင်ငံ၏ စက်မှုကုန်သွယ်ရေး၊ ထုတ်လုပ်ရေး၊ ထုပ်ပိုးမှုဆိုင်ရာလုပ်ငန်းများနှင့် လျှပ်စစ်အင်ဂျင်နီယာကဏ္ဍများတွင် ဦးဆောင်လုပ်ကိုင်လျက်ရှိသော စီးပွားရေးအုပ်စုတစ်ခုဖြစ်ပါသည်။",
    "အုပ်စုဝင်ကုမ္ပဏီများမှတစ်ဆင့် စက်မှုသုံးအစိတ်အပိုင်းများ၊ စက်မှုသုံးချုပ်စက်များ၊ အထည်ချုပ်နှင့် အိတ်ချုပ်လုပ်ငန်းသုံး အပ်ချည်များအပြင် အရည်အသွေးမြင့် ထုပ်ပိုးမှုဆိုင်ရာထုတ်ကုန်များကို လုပ်ငန်းကဏ္ဍအသီးသီးရှိ ဖောက်သည်များထံသို့ ပံ့ပိုးဖြန့်ဖြူးပေးလျက်ရှိပါသည်။",
    "အရည်အသွေး၊ ဆန်းသစ်တီထွင်မှုနှင့် ဖောက်သည်စိတ်ကျေနပ်မှုကို အဓိကထား၍ ယုံကြည်စိတ်ချရသော ထုတ်ကုန်များနှင့် ပရော်ဖက်ရှင်နယ်ဝန်ဆောင်မှုများကို ပေးအပ်ကာ ရေရှည်လက်တွဲနိုင်သော စီးပွားရေးမိတ်ဖက်ဆက်ဆံရေးများကို တည်ဆောက်လျက်ရှိပြီး မြန်မာနိုင်ငံ၏ စက်မှုကဏ္ဍဖွံ့ဖြိုးတိုးတက်ရေးအတွက်လည်း အစဉ်တစိုက် ပံ့ပိုးဆောင်ရွက်လျက်ရှိပါသည်။",
  ],
  established: "၂၀၀၈",
  address: "အမှတ် (၁၇၈)၊ တွင်းသင်းတိုက်ဝန်ဦးထွန်းညိုလမ်းနှင့် မက္ခရာမင်းသားကြီးမောင်ပျိုလမ်းထောင့်၊ လှိုင်သာယာစက်မှုဇုန် (၂)၊ ရန်ကုန်မြို့၊ မြန်မာနိုင်ငံ။",
  activities: ["စက်မှုကုန်သွယ်ရေး", "စက်မှုထုတ်လုပ်ရေး", "ထုပ်ပိုးမှုဆိုင်ရာလုပ်ငန်း", "လျှပ်စစ်အင်ဂျင်နီယာလုပ်ငန်း", "စက်မှုသုံးစက်ပစ္စည်းများနှင့် အစိတ်အပိုင်းများ"],
  productsIntro: "Kaung Thu Kha Group သည် စက်မှုလုပ်ငန်းကဏ္ဍအသီးသီး၏ လိုအပ်ချက်များကို ဖြည့်ဆည်းပေးနိုင်ရန် စက်မှုသုံးထုတ်ကုန်များနှင့် ထုပ်ပိုးမှုဆိုင်ရာ ဖြေရှင်းချက်များကို အပြည့်အစုံ ပံ့ပိုးပေးလျက်ရှိပါသည်။",
  industrialProducts: ["HCH / TR Bearings", "စက်မှုသုံးချုပ်စက်များ", "ချုပ်စက်အပိုပစ္စည်းများ", "စက်မှုသုံးအပ်ချည်များ", "စက်မှုသုံးစက်ပစ္စည်း အပိုပစ္စည်းများ"],
  packagingProducts: ["PP Woven Bags", "Laminated PP Woven Bags", "BOPP Laminated Bags", "Printed PP Woven Bags", "ဘိလပ်မြေအိတ်များ", "ဆန်အိတ်များ", "ဓာတ်မြေဩဇာအိတ်များ", "တိရစ္ဆာန်အစာအိတ်များ", "ဂျုံမှုန့်အိတ်များ", "သကြားအိတ်များ", "ဖောက်သည်လိုအပ်ချက်အလိုက် ဒီဇိုင်းထုတ်လုပ်သော ထုပ်ပိုးမှုအိတ်များ"],
  companiesIntro: "Kaung Thu Kha Group တွင် စက်မှုကုန်သွယ်ရေး၊ ထုတ်လုပ်ရေး၊ ထုပ်ပိုးမှုနှင့် လျှပ်စစ်အင်ဂျင်နီယာကဏ္ဍများတွင် အထူးပြုလုပ်ကိုင်လျက်ရှိသော အောက်ပါကုမ္ပဏီများ ပါဝင်လျက်ရှိပါသည်။",
  companies: [
    { name: "Kabar Kyaw Trading Co., Ltd.", focus: "စက်မှုသုံးစက်ပစ္စည်းများ၊ စက်မှုသုံးအစိတ်အပိုင်းများနှင့် ကုန်ကြမ်းများကို တင်သွင်း၊ ဖြန့်ဖြူးရောင်းချခြင်း။" },
    { name: "San Kaung Industry Limited", focus: "စက်မှုသုံးထုတ်ကုန်များနှင့် ထုပ်ပိုးမှုဆိုင်ရာထုတ်ကုန်များ ထုတ်လုပ်ခြင်း။" },
    { name: "San Kaung Bag Manufacturing Co., Ltd.", focus: "PP Woven Bags၊ Laminated Bags၊ BOPP Bags၊ ဘိလပ်မြေအိတ်များနှင့် အခြားစက်မှုသုံးထုပ်ပိုးမှုအိတ်များ ထုတ်လုပ်ခြင်း။" },
    { name: "Asia General Electric Holding Co., Ltd.", focus: "လျှပ်စစ်ပစ္စည်းများ၊ ပါဝါစနစ်များ၊ Transformer များနှင့် Switchgear Panel များကို ဒီဇိုင်းရေးဆွဲ၊ ထုတ်လုပ်နှင့် ဖြန့်ဖြူးခြင်း။" },
    { name: "Peace Myanmar Electric Holding Co., Ltd.", focus: "လျှပ်စစ်ပစ္စည်းများ၊ စွမ်းအင်ဆိုင်ရာဖြေရှင်းချက်များနှင့် Mitsubishi Electric ထုတ်ကုန်များကို ဖြန့်ဖြူးရောင်းချခြင်း။" },
  ],
  values: ["အရည်အသွေး", "ရိုးသားဖြောင့်မတ်မှု", "ဆန်းသစ်တီထွင်မှု", "ဖောက်သည်ဦးစားပေးမှု", "အသင်းအဖွဲ့ဖြင့် ပူးပေါင်းဆောင်ရွက်မှု", "ထူးချွန်ကောင်းမွန်မှု", "ရေရှည်တည်တံ့မှု"],
  reasons: ["၂၀၀၈ ခုနှစ်မှစတင်၍ ယုံကြည်စိတ်ချရသော လုပ်ငန်းအတွေ့အကြုံရှိခြင်း။", "လုပ်ငန်းကဏ္ဍအမျိုးမျိုးကို လွှမ်းခြုံထားသော စီးပွားရေးအုပ်စုဖြစ်ခြင်း။", "အရည်အသွေးမြင့် ထုတ်ကုန်များနှင့် ယုံကြည်စိတ်ချရသော ဝန်ဆောင်မှုများ။", "ခေတ်မီစက်ရုံများနှင့် ထုတ်လုပ်ရေးနည်းပညာများ။", "အတွေ့အကြုံရှိသော စီမံခန့်ခွဲရေးနှင့် နည်းပညာကျွမ်းကျင်အဖွဲ့။", "နိုင်ငံတစ်ဝန်း ဖြန့်ဖြူးနိုင်သော ကွန်ရက်။", "ယှဉ်ပြိုင်နိုင်သော ဈေးနှုန်းနှင့် အချိန်မီ ပို့ဆောင်ပေးနိုင်မှု။", "ဖောက်သည်ဗဟိုပြု ဝန်ဆောင်မှုပေးခြင်း။"],
  industries: ["ဘိလပ်မြေလုပ်ငန်း", "ဆန်စက်လုပ်ငန်း", "ဂျုံမှုန့်ထုတ်လုပ်ရေးလုပ်ငန်း", "ဓာတ်မြေဩဇာလုပ်ငန်း", "တိရစ္ဆာန်အစာထုတ်လုပ်ရေးလုပ်ငန်း", "သကြားထုတ်လုပ်ရေးလုပ်ငန်း", "ဆောက်လုပ်ရေးလုပ်ငန်း", "စက်မှုထုတ်လုပ်ရေးလုပ်ငန်း", "စိုက်ပျိုးရေးလုပ်ငန်း", "စက်မှုထုပ်ပိုးမှုလုပ်ငန်း"],
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
    text: "Kaung Thu Kha Group of Companies was established in Myanmar, building a diversified industrial trading and manufacturing business.",
  },
  {
    year: "2009",
    title: "NEWLONG machinery",
    text: "The supplied NEWLONG authorization records KTK as a Myanmar zone agent from 20 February 2009.",
  },
  {
    year: "2012",
    title: "Bag manufacturing",
    text: "In-house cement sack and PP woven bag production begins on European STARLINGER technology.",
  },
  {
    year: "2013",
    title: "YAO HAN partnership",
    text: "KTK developed its YAO HAN machinery offering; the supplied authorization archive includes a later appointment covering September 2024 through October 2025.",
  },
  {
    year: "2020",
    title: "Market leadership",
    text: "Bearing sales reach 1.8M units/year (6× since 2008); ~55% of the national woven-bag market.",
  },
];

export const VALUES: { title: string; body: string }[] = [
  { title: "Quality", body: "Delivering products and services that meet dependable quality standards." },
  { title: "Integrity", body: "Building trusted business relationships through responsible conduct." },
  { title: "Innovation", body: "Improving products, services, and industrial solutions." },
  { title: "Customer Focus", body: "Keeping customer requirements and satisfaction at the center of the work." },
  { title: "Teamwork", body: "Working together across the group and with long-term partners." },
  { title: "Excellence", body: "Pursuing strong performance in every business area." },
  { title: "Sustainability", body: "Supporting durable growth and Myanmar's industrial development." },
];

// Industries KTK explicitly names across the site
export const INDUSTRIES: string[] = [
  "Cement",
  "Rice",
  "Flour milling",
  "Fertilizer",
  "Animal feed",
  "Sugar",
  "Construction",
  "Manufacturing",
  "Agriculture",
  "Industrial packaging",
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
  { title: "Trusted since 2008", desc: "An established Myanmar industrial group with long-term customer relationships." },
  { title: "Diverse portfolio", desc: "Trading, manufacturing, packaging, electrical engineering, machinery, and components across one group." },
  { title: "Quality & reliability", desc: "Products and professional services selected around dependable customer requirements." },
  { title: "Modern facilities", desc: "Established manufacturing resources for industrial products and packaging solutions." },
  { title: "Experienced teams", desc: "Management and technical teams supporting industrial customers and applications." },
  { title: "Nationwide distribution", desc: "A strong distribution network serving customers across Myanmar." },
  { title: "Competitive delivery", desc: "Competitive pricing combined with a focus on timely delivery." },
  { title: "Customer-oriented", desc: "A business approach centered on customer needs, service, and long-term partnership." },
];

// Brand / technology partners (with the credentials the site cites)
export const PARTNERS: { name: string; origin: string; note: string }[] = [
  { name: "STARLINGER", origin: "Austria / Europe", note: "Bag manufacturing technology" },
  { name: "SABIC", origin: "Saudi Arabia", note: "Resin source stated in the supplied PP product records" },
  { name: "HCH Bearing", origin: "China", note: "Bearing supply · authorization record displayed with its stated dates" },
  { name: "TR Bearing", origin: "China", note: "Spherical roller and mounted unit bearing ranges" },
  { name: "NEWLONG", origin: "Japan", note: "Bag-closing machinery and thread · Myanmar zone-agent record since 2009" },
  { name: "YAO HAN", origin: "Taiwan", note: "Bag-closing machinery · authorization record displayed with its stated dates" },
];
