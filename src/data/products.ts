import type { BagLayerVariant } from "./anatomy";

export type ProductMedia = {
  src: string;
  alt: string;
  caption?: string;
};

export type ProductBenefit = {
  title: string;
  detail: string;
};

export type ProductSpec = {
  label: string;
  value: string;
};

export type ProductVariant = {
  name: string;
  description: string;
  attributes?: string[];
};

export type ProductColor = {
  name: string;
  hex: string;
};

export type ProductResource = {
  label: string;
  url: string;
  preview?: string;
  detail?: string;
};

export type Product = {
  slug: string;
  name: string;
  category: ProductCategory;
  eyebrow?: string;
  summary: string;
  longDescription?: string;
  bestFor?: string;
  uniqueValue?: string;
  printing?: string;
  applications: string[];
  specs: ProductSpec[];
  benefits?: ProductBenefit[];
  image?: string | null;
  gallery?: ProductMedia[];
  featured?: boolean;
  model?: string;
  brand?: string;
  qualityAttributes?: string[];
  variants?: ProductVariant[];
  colorOptions?: ProductColor[];
  materialLayers?: ProductMaterialLayer[];
  brochureUrl?: string | null;
  resources?: ProductResource[];
};

export type ProductCategory =
  | "Cement Sacks"
  | "PP Woven Bags"
  | "Fillers"
  | "Thread"
  | "Machinery"
  | "Bearings";

export type ProductCategoryMeta = {
  name: ProductCategory;
  slug: string;
  tagline: string;
  blurb: string;
};

export const CATEGORY_META: ProductCategoryMeta[] = [
  {
    name: "Cement Sacks",
    slug: "cement-sacks",
    tagline: "AD*STAR-ready packaging",
    blurb:
      "Block-bottom and woven valve sacks for cement and other powdered products, with artwork and structures suited to automated filling lines.",
  },
  {
    name: "PP Woven Bags",
    slug: "pp-woven-bags",
    tagline: "Three performance levels",
    blurb:
      "Plain and printed, laminated, and BOPP laminated packaging made on European STARLINGER lines from 100% Virgin SABIC Resin.",
  },
  {
    name: "Fillers",
    slug: "fillers",
    tagline: "Color · cost · consistency",
    blurb:
      "Calcium-carbonate filler and color masterbatch for woven sacks, film, extrusion coating, and molding applications.",
  },
  {
    name: "Thread",
    slug: "thread",
    tagline: "High quality · food grade",
    blurb:
      "High Quality, Food Grade bag-closing thread from KTK and NEWLONG, with KTK available in 200 g and 1 kg sizes and color options for production-line identification.",
  },
  {
    name: "Machinery",
    slug: "machinery",
    tagline: "NEWLONG · YAO HAN",
    blurb:
      "Portable, automatic, and conveyor bag-closing equipment from Japan and Taiwan, with parts, maintenance, repair, and service support.",
  },
  {
    name: "Bearings",
    slug: "bearings",
    tagline: "HCH · TR distribution",
    blurb:
      "HCH and TR bearing products for industrial equipment, supported by KTK’s authorized distribution and sourcing capability in Myanmar.",
  },
];

const media = (src: string, alt: string, caption?: string): ProductMedia => ({ src, alt, caption });

const ppGallery = (folder: "bopp" | "general" | "lamination", files: string[], label: string) =>
  files.map((file) => media(`/assets/products/pp-woven/${folder}/${file}.webp`, `${label} product photograph`));

const threadGallery = [
  media(
    "/assets/products/thread/ktk-multicolor.webp",
    "KTK High Quality Thread campaign showing bag-closing machinery and multiple KTK thread spools",
    "KTK Strong Thread, Stronger Performance campaign",
  ),
  ...["1-1", "1-2", "1-3", "1-4", "1-5", "1-6"].map((file, index) =>
    media(`/assets/products/thread/${file}.webp`, `Individual bag-closing thread spool in ${["orange", "yellow", "red", "green", "pink", "blue"][index]}`, ["Orange", "Yellow", "Red", "Green", "Pink", "Blue"][index]),
  ),
];

const newlongThreadGallery = ["1", "2", "3", "4", "5", "6"].map((file, index) =>
  media(
    `/assets/products/thread/newlong/${file}.webp`,
    `NEWLONG polyester bag-closing thread color ${index + 1}`,
    ["Orange", "Yellow", "Red", "Green", "Pink", "Blue"][index],
  ),
);

const ktkThreadColors = [
  { name: "White", hex: "#F4F2EA" },
  { name: "Red", hex: "#C7282D" },
  { name: "Yellow", hex: "#E8C62B" },
  { name: "Green", hex: "#19945C" },
  { name: "Blue", hex: "#184E9D" },
  { name: "Orange", hex: "#E56D22" },
];

const newlongGallery = [
  media("/assets/products/machinery/newlong/ks16.webp", "NEWLONG KS16 conveyor bag-closing system", "KS16 conveyor system"),
  media("/assets/products/machinery/newlong/ds-6ac.webp", "NEWLONG DS-6AC bag-closing machine", "DS-6AC"),
  media("/assets/products/machinery/newlong/ds-9c.webp", "NEWLONG DS-9C bag-closing machine", "DS-9C"),
  media("/assets/products/machinery/newlong/np-3ii.webp", "NEWLONG NP-3II portable bag-closing machine", "NP-3II"),
  media("/assets/products/machinery/newlong/np-7.webp", "NEWLONG NP-7 portable bag-closing machine", "NP-7"),
];

const yaohanGallery = [
  ["facc-n980ac", "YAOHAN FACC-N980AC automatic conveyor bag closer"],
  ["fn600a", "YAOHAN FN600A bag-closing machine"],
  ["n-600-a", "YAOHAN N 600 A bag-closing machine"],
  ["n320a", "YAOHAN N320A bag-closing machine"],
  ["n600ac", "YAOHAN N600AC bag-closing machine"],
  ["n620a", "YAOHAN N620A bag-closing machine"],
  ["n980a", "YAOHAN N980A bag-closing machine"],
  ["n980aw", "YAOHAN N980AW bag-closing machine"],
  ["u700c", "YAOHAN U700C bag-closing machine"],
].map(([file, alt]) => media(`/assets/products/machinery/yaohan/${file}.webp`, alt, file.toUpperCase()));

const hchGallery = [
  media("/assets/products/bearings/hch/deep-groove.webp", "HCH deep groove ball bearings", "Deep groove ball bearing"),
  media("/assets/products/bearings/hch/tapered-roller.webp", "HCH tapered roller bearings", "Tapered roller bearing"),
  media("/assets/products/bearings/hch/slideshow-1.webp", "HCH bearing product photography"),
  media("/assets/products/bearings/hch/slideshow-2.webp", "HCH bearing product photography"),
  media("/assets/products/bearings/hch/slideshow-3.webp", "HCH bearing product photography"),
  media("/assets/products/bearings/hch/slideshow-5.webp", "HCH bearing product photography"),
];

const trGallery = [
  media("/assets/products/bearings/tr/spherical-roller.webp", "TR spherical roller bearing", "Spherical roller bearing"),
  media("/assets/products/bearings/tr/unit-bearing.webp", "TR unit bearing", "Unit bearing"),
  media("/assets/products/bearings/tr/slideshow-1.webp", "TR bearing product photography"),
  media("/assets/products/bearings/tr/slideshow-2.webp", "TR bearing product photography"),
  media("/assets/products/bearings/tr/slideshow-3.webp", "TR bearing product photography"),
  media("/assets/products/bearings/tr/slideshow-4.webp", "TR bearing product photography"),
  media("/assets/products/bearings/tr/slideshow-5.webp", "TR bearing product photography"),
];

export const PRODUCTS: Product[] = [
  {
    slug: "ad-star-cement-sacks",
    name: "AD*STAR Woven Valve Sacks",
    category: "Cement Sacks",
    eyebrow: "Cement packaging",
    summary: "Block-bottom woven valve sacks for cement and powdered products, presented in the supplied AD*STAR artwork set.",
    longDescription:
      "The supplied AD*STAR artwork shows a structured woven valve sack format designed for automated filling and clean stacking. KTK can support artwork-led packaging discussions around dimensions, print, capacity, and filling-line requirements.",
    applications: ["Cement", "Powdered materials", "Automated filling lines"],
    specs: [
      { label: "Construction", value: "Single or double layer PP woven cement bag" },
      { label: "Material", value: "100% virgin PP · optional inner kraft paper" },
      { label: "Capacity", value: "20–50 kg" },
      { label: "Width", value: "355–500 mm" },
      { label: "Length", value: "390–610 mm" },
      { label: "Opening / bottom", value: "Valve or open mouth · sewn bottom or easy-open finish" },
      { label: "Printing", value: "Flexo or BOPP · 1–6 colors" },
      { label: "Filling lines", value: "Automatic and semi-automatic" },
      { label: "MOQ / lead time", value: "20,000 bags · approximately 30 days" },
      { label: "Tests stated", value: "Drop · tensile · air-perforation" },
    ],
    benefits: [
      { title: "Automation-ready direction", detail: "A block-bottom valve format suited to high-throughput filling conversations." },
      { title: "Clear brand surface", detail: "The supplied artwork demonstrates how a finished cement sack can carry strong front and side branding." },
      { title: "Specification-led", detail: "Confirm size, construction, and line compatibility with KTK before production." },
    ],
    image: "/assets/cement/ad-star-cement-bag.jpg",
    gallery: [
      media(
        "/assets/cement/cement-bag-double-rhinos-first.webp",
        "Cement bag portfolio with Double Rhinos shown before Rhino",
        "Double Rhinos first · Rhino follows",
      ),
      media("/assets/cement/cement-bag.jpg", "Rhino and cement bag portfolio artwork", "Rhino and supplied cement range"),
      media("/assets/cement/ad-star-cement-bag.jpg", "AD*STAR woven valve sack artwork", "AD*STAR woven valve sack"),
    ],
    featured: true,
  },
  {
    slug: "plain-printed-pp-woven-bag",
    name: "Plain & Printed PP Woven Bag",
    category: "PP Woven Bags",
    eyebrow: "Standard PP woven bag",
    bestFor: "Bulk storage & breathable crops",
    uniqueValue: "High-strength woven polypropylene allows air circulation to help keep contents dry and fresh.",
    printing: "Flexo printing up to 6 colors",
    summary: "The standard breathable option for agricultural and food-related bulk packaging, available plain or printed.",
    longDescription:
      "Standard PP woven bags are built for dependable bulk handling where breathable woven fabric is the right fit. The supplied general product set shows rice, food, and agricultural packaging examples; final size, construction, and print artwork are confirmed per order.",
    applications: ["Export rice", "Local rice", "Livestock feed", "Fertilizer", "Export beans", "Flour"],
    specs: [
      { label: "GSM", value: "Customizable" },
      { label: "Plain size range", value: "Width 25–132 cm · length 33–284 cm" },
      { label: "Printed size range", value: "Width 25–81 cm · length 30–127 cm" },
      { label: "Printing", value: "Flexo · up to 6 colors on one side" },
      { label: "Top finish", value: "Heat cut · cold cut · hemmed" },
      { label: "Bottom finish", value: "Single or double folded and stitched" },
      { label: "Options", value: "Side gusset · PE liner" },
      { label: "MOQ / lead time", value: "10,000 bags · 14–21 working days" },
      { label: "Packing", value: "500 or 1,000 pieces per compressed bale, depending on size" },
      { label: "Quality records", value: "SABIC food-grade certificate · internal tensile report" },
    ],
    benefits: [
      { title: "Breathable construction", detail: "Woven fabric supports airflow for dry goods and agricultural contents." },
      { title: "Flexible branding", detail: "Plain or flexo-printed finishes support both operational and branded packaging." },
      { title: "STARLINGER production", detail: "Manufactured on European STARLINGER lines using the specified virgin resin standard." },
    ],
    image: "/assets/products/pp-woven/general/143.webp",
    gallery: [
      ...ppGallery("general", ["143", "207", "208", "209", "210"], "Standard PP woven bag"),
      media(
        "/assets/products/pp-woven/general/master-chef-dinurado.webp",
        "Master Chef Dinurado plain and printed PP woven rice bag",
        "Master Chef Dinurado",
      ),
    ],
    featured: true,
  },
  {
    slug: "laminated-pp-woven-bag",
    name: "Laminated PP Woven Bag",
    category: "PP Woven Bags",
    eyebrow: "Protective PP woven bag",
    bestFor: "Moisture & dust protection",
    uniqueValue: "Woven fabric coated with an extra protective resin layer, engineered to deliver maximum resistance against humidity, moisture, and dust.",
    printing: "Flexo printing with enhanced moisture barrier",
    summary: "A protective woven format for fertilizer, feed, chemicals, and fine powders that need an added film layer.",
    longDescription:
      "Laminated PP woven bags feature an extrusion-coated protective layer over the woven substrate to seal the weave and form an effective moisture barrier. The supplied lamination set shows feed, pet food, and fine-product packaging examples; barrier performance and final structure are customized to suit your product and filling environment.",
    applications: ["Livestock feed", "Sugar", "Milled rice", "Fine chemicals", "Flour", "Cement"],
    specs: [
      { label: "GSM", value: "Customizable" },
      { label: "Lamination", value: "Single or double-side PE / PP extrusion lamination" },
      { label: "Size range", value: "Width 25–114 cm · length 30–132 cm" },
      { label: "Barrier", value: "High moisture barrier · dust-proof coating" },
      { label: "Printing", value: "Flexo · up to 6 colors on one side" },
      { label: "Top finish", value: "Valve · hemmed · easy-open" },
      { label: "Bottom finish", value: "Block bottom or stitched" },
      { label: "MOQ / lead time", value: "10,000 bags · 18–26 working days" },
      { label: "Packing", value: "500 or 1,000 pieces per compressed bale" },
    ],
    benefits: [
      { title: "Added barrier layer", detail: "Designed to provide stronger protection against humidity, dust, and surface contamination." },
      { title: "Product-led selection", detail: "The structure can be matched to powders, feed, fertilizer, and other filling requirements." },
      { title: "Print-ready surface", detail: "Flexo printing keeps packaging clear and recognizable through handling." },
    ],
    image: "/assets/products/pp-woven/lamination/7.webp",
    gallery: [
      ...ppGallery("lamination", ["7", "0157", "0162", "0188", "6"], "Laminated PP woven bag"),
      media(
        "/assets/products/pp-woven/lamination/myo-hla-sugar-green.webp",
        "Myo Hla Sugar green laminated PP woven bag",
        "Myo Hla Sugar · Green",
      ),
    ],
    featured: true,
  },
  {
    slug: "bopp-laminated-bag",
    name: "BOPP Laminated Bag",
    category: "PP Woven Bags",
    eyebrow: "Premium packaging",
    bestFor: "Photo-quality retail branding",
    uniqueValue: "A three-layer structure with high-definition reverse-printed BOPP film sealed beneath the surface for highly scratch-resistant and water-resistant graphics.",
    printing: "HD gravure photo-realistic printing · Glossy or Matt finish",
    summary: "The premium retail-facing option for rice, pet food, aquafeed, and consumer products where the pack is part of the brand experience.",
    longDescription:
      "BOPP laminated bags combine a high-strength PP woven base with an outer reverse-printed film layer, delivering premium photo-quality graphics alongside superior moisture and puncture resistance. The supplied BOPP set shows colorful retail and food packaging examples; finish, artwork, and dimensions are custom-tailored around your intended shelf presentation.",
    applications: ["Premium retail rice", "Pet food", "Specialty fertilizer", "Livestock feed", "Seed"],
    specs: [
      { label: "Layer structure", value: "Customizable" },
      { label: "Finish", value: "Glossy · matte · metallic / holographic" },
      { label: "Printing", value: "Reverse rotogravure · up to 13 colors on both sides" },
      { label: "Sizing", value: "Custom size; confirm final width and length with KTK" },
      { label: "Options", value: "Handle punch · side-gusset printing · ultrasonic or sewn hemming · EZ-open seam" },
      { label: "Protection stated", value: "Waterproof and puncture-resistant construction" },
      { label: "MOQ / lead time", value: "15,000 bags · 30–45 working days" },
      { label: "Packing", value: "500–1,000 pieces per compressed bale" },
    ],
    benefits: [
      { title: "Retail-first presentation", detail: "Photo-realistic gravure printing is designed for high-impact shelf branding." },
      { title: "Protected graphics", detail: "The reverse-printed film places artwork beneath the surface for durable presentation." },
      { title: "Finish choice", detail: "Glossy or Matt finish lets the package match the intended brand character." },
    ],
    image: "/assets/products/pp-woven/bopp/0153.webp",
    gallery: [
      ...ppGallery("bopp", ["18", "0144", "0153", "0203", "211"], "BOPP laminated bag"),
      media(
        "/assets/products/pp-woven/bopp/kujaku-fertilizer.webp",
        "Kujaku BOPP laminated fertilizer bag",
        "Kujaku fertilizer",
      ),
    ],
    featured: true,
  },
  {
    slug: "calcium-carbonate-filler",
    name: "Calcium-Carbonate Filler",
    category: "Fillers",
    eyebrow: "Material input",
    summary: "PE, PP, transparent, and thermoforming calcium-carbonate filler masterbatch grades for film, raffia, molding, and sheet applications.",
    longDescription:
      "The supplied technical sheet covers PE filler for film and bottles, PP filler for woven bags, raffia, molding and nonwoven, transparent filler for clarity-sensitive packaging, and thermoforming filler for PS or PP sheet. Select the grade and dosage against the polymer, process temperature, and target finish.",
    applications: ["Blown and agricultural film", "PP woven bags and raffia tape", "Injection molding", "HDPE bottles", "Nonwoven", "Thermoforming sheet"],
    specs: [
      { label: "PE grade", value: "LDPE / LLDPE / HDPE carrier · 75–82% CaCO₃" },
      { label: "PP grade", value: "PP homopolymer carrier · 75–85% CaCO₃" },
      { label: "Transparent grade", value: "PE / PP carrier · sodium sulphate / fine CaCO₃" },
      { label: "Thermoforming grade", value: "PS / PP carrier · 70–80% mineral content" },
      { label: "Whiteness", value: "≥96–98%" },
      { label: "Particle size", value: "PE 1.5–2.5 µm · PP 1.8–2.8 µm" },
      { label: "MFI", value: "PE 2–5 g/10 min · PP 5–15 g/10 min" },
      { label: "Density", value: "PE 1.60–1.85 · PP 1.65–1.90 g/cm³" },
      { label: "Moisture", value: "<0.15%" },
      { label: "Processing temperature", value: "PE 160–240°C · PP 180–280°C" },
      { label: "Typical dosage", value: "PE film 10–35% · PP woven / raffia 15–40% · injection 10–45% · blow molding 5–20%" },
    ],
    benefits: [
      { title: "Process-aware supply", detail: "Discuss the grade around your production process and target finish." },
      { title: "Color flexibility", detail: "The supplied image set includes color material examples for a visual starting point." },
      { title: "Inquiry-led specifications", detail: "Contact KTK for grade, loading, and application-specific information." },
    ],
    image: "/assets/products/filler/filler-bag.webp",
    gallery: [media("/assets/products/filler/filler-bag.webp", "KTK filler bag"), media("/assets/products/filler/filler.webp", "Color calcium-carbonate filler material")],
    brochureUrl: "/assets/company/documents/caco3-filler-masterbatch.pdf",
    resources: [{ label: "CaCO₃ Filler Masterbatch technical sheet", url: "/assets/company/documents/caco3-filler-masterbatch.pdf" }],
    featured: true,
  },
  {
    slug: "ktk-thread",
    name: "KTK High Quality Bag-Closing Thread",
    category: "Thread",
    eyebrow: "Bag-closing consumable",
    bestFor: "Reliable bag closure across common sewing systems",
    summary: "High Quality, Food Grade KTK thread in six colors and separate 200 g and 1 kg sizes, compatible with NEWLONG, YAO HAN, and other bag-closing machines.",
    longDescription:
      "KTK High Quality, Food Grade bag-closing thread is available in white, red, yellow, green, blue, and orange. Choose between the 200 g and 1 kg formats according to your operation, then confirm the sewing-line requirement with the KTK sales team.",
    applications: ["Cement sacks", "PP woven bags", "Bag-closing machines", "Sack stitching"],
    specs: [
      { label: "Brand", value: "KTK" },
      { label: "Available sizes", value: "200 g · 1 kg" },
      { label: "Quality", value: "High Quality Thread" },
      { label: "Product standard", value: "Food Grade" },
      { label: "Available colors", value: "White · Red · Yellow · Green · Blue · Orange" },
      { label: "Compatibility", value: "NEWLONG · YAO HAN · other closers" },
    ],
    benefits: [
      { title: "Two practical sizes", detail: "Select the compact 200 g format or the larger 1 kg format for your bag-closing workflow." },
      { title: "Six color references", detail: "Choose from white, red, yellow, green, blue, and orange for production-line identification." },
      { title: "Line-compatible direction", detail: "Suitable for inquiry across common Newlong, Yao Han, and other bag-closing machines." },
    ],
    image: "/assets/products/thread/ktk-multicolor.webp",
    gallery: threadGallery,
    qualityAttributes: ["High Quality Thread", "Food Grade"],
    variants: [
      { name: "200 g", description: "Compact thread format for bag-closing operations.", attributes: ["KTK", "High Quality", "Food Grade"] },
      { name: "1 kg", description: "Larger thread format for production-line use.", attributes: ["KTK", "High Quality", "Food Grade"] },
    ],
    colorOptions: ktkThreadColors,
    resources: [
      {
        label: "Sewing Thread Specification",
        url: "/assets/products/thread/certificates/sewing-thread-specification.pdf",
        preview: "/assets/products/thread/certificates/sewing-thread-specification.webp",
        detail: "Supplied polyester thread construction, strength, elongation, twist, roll length, weight, and color record.",
      },
      {
        label: "NEWLONG Authorization Record",
        url: "/assets/company/certificates/newlong-authorization.webp",
        preview: "/assets/company/certificates/newlong-authorization.webp",
        detail: "Supplied NEWLONG Industrial Co., Ltd. zone-agent authorization record for KTK Co., Ltd.",
      },
    ],
    featured: true,
  },
  {
    slug: "newlong-thread",
    name: "NEWLONG Bag-Closing Thread",
    category: "Thread",
    eyebrow: "Japan brand thread",
    brand: "NEWLONG",
    bestFor: "Bag-closing systems requiring NEWLONG thread",
    summary: "High Quality, Food Grade NEWLONG thread from Japan, compatible with NEWLONG, YAO HAN, and other bag-closing machines.",
    longDescription:
      "NEWLONG Thread is a Japan-brand High Quality, Food Grade bag-closing thread. It is presented separately from KTK Thread so buyers can clearly identify the brand and compare the available color range before requesting a quotation.",
    applications: ["Cement sacks", "PP woven bags", "Bag-closing machines", "Sack stitching"],
    specs: [
      { label: "Brand", value: "NEWLONG" },
      { label: "Origin", value: "Japan" },
      { label: "Material / construction", value: "100% polyester · 20/1 × 6" },
      { label: "Strength", value: "7 ± 1 kg" },
      { label: "Elongation", value: "20 ± 5%" },
      { label: "Twist", value: "6.90 ± 0.03 TPI" },
      { label: "Roll formats", value: "1 kg / 5,200 m · 2 kg / 10,400 m · 200 g / 1,040 m" },
      { label: "Quality", value: "High Quality Thread" },
      { label: "Product standard", value: "Food Grade" },
      { label: "Available colors", value: "White · Red · Yellow · Green · Blue · Orange · Pink" },
      { label: "Compatibility", value: "NEWLONG · YAO HAN · other closers" },
    ],
    benefits: [
      { title: "Japan brand", detail: "NEWLONG Thread is identified separately with its confirmed Japan origin." },
      { title: "High Quality & Food Grade", detail: "The two requested product attributes are presented clearly for buyer review." },
      { title: "Seven color options", detail: "Available colors are shown as white, red, yellow, green, blue, orange, and pink." },
    ],
    image: "/assets/products/thread/newlong/1.webp",
    gallery: newlongThreadGallery,
    qualityAttributes: ["High Quality Thread", "Food Grade", "Japan"],
    variants: [
      { name: "200 g", description: "Approximately 1,040 metres per roll.", attributes: ["100% polyester", "20/1 × 6"] },
      { name: "1 kg", description: "Approximately 5,200 metres per roll.", attributes: ["100% polyester", "20/1 × 6"] },
      { name: "2 kg", description: "Approximately 10,400 metres per roll.", attributes: ["100% polyester", "20/1 × 6"] },
    ],
    resources: [
      {
        label: "Sewing Thread Specification",
        url: "/assets/products/thread/certificates/sewing-thread-specification.pdf",
        preview: "/assets/products/thread/certificates/sewing-thread-specification.webp",
        detail: "The supplied thread document covering 100% polyester construction and all stated performance values.",
      },
      {
        label: "NEWLONG Authorization Record",
        url: "/assets/company/certificates/newlong-authorization.webp",
        preview: "/assets/company/certificates/newlong-authorization.webp",
        detail: "The supplied NEWLONG authorization record naming KTK Co., Ltd.",
      },
    ],
    colorOptions: [...ktkThreadColors, { name: "Pink", hex: "#D94C8A" }],
    featured: false,
  },
  {
    slug: "newlong-bag-closing-machinery",
    name: "NEWLONG Bag-Closing Machinery",
    category: "Machinery",
    eyebrow: "Authorized machinery",
    brand: "NEWLONG",
    summary: "Japanese bag-closing equipment ranging from portable sewing heads to conveyor systems, with parts, maintenance, repair, and service support.",
    longDescription:
      "The supplied NEWLONG set includes portable and standalone sewing heads as well as the KS16 conveyor system. KTK can help match the machine format to the bag, line speed, filling environment, and service requirements.",
    applications: ["Cement filling lines", "PP woven bag closing", "Packing stations", "Industrial sewing"],
    specs: [
      { label: "Origin", value: "Japan" },
      { label: "NP-7A", value: "5–8 sec/bag · 8.5 mm stitch · #25 needle · 5.3 kg · 60 W single phase" },
      { label: "NP-3II", value: "Double-chain stitch · 1,350 ± 150 rpm · automatic cutter · pump lubrication" },
      { label: "DS-6AC", value: "1,400 rpm · 7–10.5 mm stitch · single needle · air cutter" },
      { label: "DS-6WAC", value: "2,000 rpm · two needles · semi-automatic lubrication" },
      { label: "DS-9C", value: "2,700 rpm · fully automatic lubrication · DR-H30 #26 needle" },
      { label: "KS-16 conveyor system", value: "7.5 kW · 3,000 × 1,090 × 2,052 mm · approximately 760 kg · DS-7A sewing head" },
      { label: "Support", value: "Parts · maintenance · repair" },
      { label: "Materials supported", value: "Kraft paper · cotton · hessian · jute · PP / PE woven" },
    ],
    benefits: [
      { title: "Portable and conveyor formats", detail: "The gallery includes NP, DS, and KS16 references for different operating setups." },
      { title: "Service-backed supply", detail: "KTK supports parts, maintenance, and repair around the supplied equipment range." },
      { title: "Specification matching", detail: "Confirm the correct model against bag format, thread, and production line requirements." },
    ],
    image: "/assets/products/machinery/newlong/ks16.webp",
    gallery: newlongGallery,
    model: "KS-16 · DS-6AC · DS-6WAC · DS-9C · NP-3II · NP-7A",
    variants: [
      { name: "NP-7A", description: "Portable single-needle closer; two-thread version also available.", attributes: ["5–8 sec/bag", "8.5 mm stitch", "60 W"] },
      { name: "NP-3II", description: "Portable double-chain-stitch closer with automatic cutter.", attributes: ["1,350 ± 150 rpm", "Pump lubrication"] },
      { name: "DS series", description: "DS-6AC, DS-6WAC, and DS-9C industrial sewing heads.", attributes: ["1,400–2,700 rpm", "Single and two-needle options"] },
      { name: "KS-16", description: "Conveyor bag-closing system for heat sealing and sewing.", attributes: ["7.5 kW", "DS-7A head"] },
    ],
    featured: true,
  },
  {
    slug: "yaohan-bag-closing-machinery",
    name: "YAO HAN Bag-Closing Machinery",
    category: "Machinery",
    eyebrow: "Authorized machinery",
    brand: "YAO HAN",
    summary: "Taiwanese portable, automatic, and conveyor bag-closing equipment, supplied with spare parts and after-sales service support.",
    longDescription:
      "The supplied YAO HAN set includes conveyor, automatic, and portable machine references. KTK presents the actual models and leaves capacity, configuration, and line suitability to a proper inquiry rather than inventing specifications from the photographs.",
    applications: ["Bag closing", "Cement and woven sacks", "Conveyor packing lines", "Industrial sewing"],
    specs: [
      { label: "Origin", value: "Taiwan" },
      { label: "N600A", value: "1 thread · 250–350 bags/hour · 7.2 mm stitch · DN×1 #25" },
      { label: "N620A", value: "2 thread · 250–350 bags/hour · 7.2 mm stitch · FD-5 #25" },
      { label: "N600AC", value: "1 thread · 1,500 rpm · 7.2 mm stitch · DN×1 #25" },
      { label: "N320A", value: "2 thread · 1,350 rpm · 8.5 mm stitch · DN×1 #25" },
      { label: "FN602A", value: "2 thread · 1,500 rpm · 7.2 mm stitch · DN×1 #25" },
      { label: "U700C", value: "2 thread · 1,800 rpm · 6.5–11 mm stitch · 11 mm presser lift" },
      { label: "N980AW", value: "2,500 rpm · up to 8 mm material · 2 needle / 4 thread · plain closing" },
      { label: "FAC-N980AC", value: "500–600 bags/hour · 7–11 mm stitch · pneumatic thread and tape cutting · 3-phase 220/380 V" },
      { label: "Support", value: "Spare parts · maintenance · repair" },
    ],
    benefits: [
      { title: "A broad supplied set", detail: "The gallery covers FACC-N980AC, FN600A, N-series, and U700C references." },
      { title: "One-stop support", detail: "KTK can support machinery, thread, spare parts, and service conversations together." },
      { title: "Model-led inquiry", detail: "Ask KTK to confirm the correct model for your bag, line, and closure method." },
    ],
    image: "/assets/products/machinery/yaohan/facc-n980ac.webp",
    gallery: yaohanGallery,
    model: "FAC-N980AC · FN602A · N320A · N600A · N600AC · N620A · N980AW · U700C",
    variants: [
      { name: "Portable N-series", description: "N600A, N620A, N600AC, and N320A portable bag closers.", attributes: ["1 or 2 thread", "Mechanical cutter options"] },
      { name: "FN602A", description: "Two-thread industrial bag closer.", attributes: ["1,500 rpm", "7.2 mm stitch"] },
      { name: "U700C", description: "Two-thread bag-closing head with adjustable stitch length.", attributes: ["1,800 rpm", "6.5–11 mm"] },
      { name: "N980AW", description: "High-speed, two-needle, four-thread plain-closing head.", attributes: ["2,500 rpm", "Up to 8 mm material"] },
      { name: "FAC-N980AC", description: "Height-adjustable conveyor closer with pneumatic thread and tape cutting.", attributes: ["500–600 bags/hour", "3-phase"] },
    ],
    featured: true,
  },
  {
    slug: "hch-bearings",
    name: "HCH Bearings",
    category: "Bearings",
    eyebrow: "Authorized distribution",
    brand: "HCH",
    summary: "Deep-groove ball and tapered roller bearings from HCH, supplied through KTK’s authorized Myanmar distribution relationship.",
    longDescription:
      "The supplied bearing document identifies deep-groove ball bearings and tapered roller bearings, and describes HCH’s quality systems and manufacturing capability. KTK has distributed HCH bearing products in Myanmar since 2008; confirm the exact series and dimensions for your application.",
    applications: ["Industrial equipment", "High-speed applications", "Radial and axial loads", "Maintenance stock"],
    specs: [
      { label: "Brand", value: "HCH" },
      { label: "Formats", value: "Deep-groove ball · tapered roller" },
      { label: "Seal options", value: "Open · 2RS · ZZ" },
      { label: "Deep-groove series", value: "16 · 60 · 62 · 63 · 68 · 69 · inch · 88" },
      { label: "Tapered-roller series", value: "302 · 303 · 320 · 322 · JL · L · LM" },
      { label: "Authorization record", value: "Supplied sole-distributor certificate: 1 Mar 2025–28 Feb 2026" },
    ],
    benefits: [
      { title: "Two core formats", detail: "The supplied gallery separates deep-groove and tapered roller bearing references." },
      { title: "Industrial fit", detail: "Deep-groove formats support radial and axial load conversations across common equipment." },
      { title: "Local distribution", detail: "KTK provides a Myanmar route for HCH sourcing and inquiry." },
    ],
    image: "/assets/products/bearings/hch/deep-groove.webp",
    gallery: hchGallery,
    brochureUrl: "https://drive.google.com/file/d/1nfws3cRo-Vkou0fwoKagxRqphWfcYPlB/view?usp=drivesdk",
    resources: [{ label: "HCH bearing specifications", url: "https://drive.google.com/file/d/1nfws3cRo-Vkou0fwoKagxRqphWfcYPlB/view?usp=drivesdk" }],
    featured: true,
  },
  {
    slug: "tr-bearings",
    name: "TR Bearings",
    category: "Bearings",
    eyebrow: "Industrial bearing supply",
    brand: "TR",
    summary: "TR spherical roller and unit bearing products for ventilation, agriculture, logistics, construction, engineering, and minerals.",
    longDescription:
      "The supplied TR archive includes spherical roller and unit bearing references, plus a product photography set. The companion document describes TR’s bearing-unit and spherical-roller range; confirm dimensions, seals, load requirements, and availability with KTK.",
    applications: ["Ventilation", "Agriculture", "Logistics", "Construction", "Engineering", "Minerals"],
    specs: [
      { label: "Brand", value: "TR" },
      { label: "Formats", value: "Spherical roller · mounted unit bearing" },
      { label: "Spherical-roller series", value: "222 · 223" },
      { label: "Mounted-unit families", value: "UCF · UCFL · UCT · UCFC · UCP · UKP · UKFC · UKT · UKF" },
      { label: "Insert-bearing series", value: "UC / UK 2 and 3 series" },
      { label: "Authorization record", value: "Supplied appointment states validity begins 18 Oct 2026" },
    ],
    benefits: [
      { title: "Spherical roller reference", detail: "Supports rotation with low friction and accommodates angular misalignment in the described format." },
      { title: "Unit bearing reference", detail: "The supplied image set includes sealed unit-bearing formats for equipment applications." },
      { title: "Application-led selection", detail: "Use the inquiry path to confirm the correct bearing unit for your shaft and environment." },
    ],
    image: "/assets/products/bearings/tr/omega-unit-bearing.webp",
    gallery: [
      media(
        "/assets/products/bearings/tr/omega-unit-bearing.webp",
        "Blue Omega-shaped TR mounted unit bearing",
        "Omega-shaped mounted unit bearing",
      ),
      ...trGallery,
    ],
    brochureUrl: "https://drive.google.com/file/d/1Bd1Azo0kBMIRpLT9Fx-rWg6tWKCiopFe/view?usp=drivesdk",
    resources: [
      { label: "TR bearing specifications", url: "https://drive.google.com/file/d/1Bd1Azo0kBMIRpLT9Fx-rWg6tWKCiopFe/view?usp=drivesdk" },
      { label: "TR Ball Bearing Units catalogue", url: "https://drive.google.com/file/d/1jaI-b5UrS2tW2axT1f5auq2UuebrhUII/view?usp=drivesdk" },
      { label: "TR Spherical Roller Bearing catalogue", url: "https://drive.google.com/file/d/1o1A-rDPuvHJA7kx2NkvKaUibyGYepUU_/view?usp=drivesdk" },
    ],
    featured: true,
  },
];

export type ProductMaterialLayer = {
  id: string;
  order: number;
  name: string;
  tag: string;
  description: string;
  note?: string;
  variant: BagLayerVariant;
};
