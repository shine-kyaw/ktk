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
    "KTK High Quality Food Grade bag-closing thread in multiple colors",
    "KTK multicolor thread range",
  ),
  ...["1-1", "1-2", "1-3", "1-4", "1-5", "1-6"].map((file, index) =>
    media(`/assets/products/thread/${file}.webp`, `KTK thread color option ${index + 1}`, ["Orange", "Blue", "Red", "Green", "White", "Yellow"][index]),
  ),
];

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
      { label: "Format", value: "Woven valve sack" },
      { label: "Artwork source", value: "Custom Printing Available (Provide your artwork in .ai, .pdf or .zip formats)" },
      { label: "Source archive", value: "CEMENT.zip" },
      { label: "Shown capacities", value: "20 kg · 50 kg" },
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
    applications: ["Agricultural products", "Flour", "Local rice", "Export rice", "Beans"],
    specs: [
      { label: "Capacity", value: "5 kg – 50 kg" },
      { label: "Material", value: "100% Virgin SABIC Resin" },
      { label: "Recycled content", value: "0%" },
      { label: "Odor", value: "100% odor-free" },
      { label: "Printing", value: "Flexo · up to 6 colors" },
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
    applications: ["Fertilizer", "Animal feed", "Chemicals", "Fine powders"],
    specs: [
      { label: "Capacity", value: "5 kg – 50 kg" },
      { label: "Material", value: "100% Virgin SABIC Resin" },
      { label: "Recycled content", value: "0%" },
      { label: "Odor", value: "100% odor-free" },
      { label: "Structure", value: "Woven PP + protective film" },
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
    applications: ["Premium retail rice", "Pet food", "Aquafeed", "Consumer products", "Fertilizer"],
    specs: [
      { label: "Capacity", value: "5 kg – 25 kg" },
      { label: "Structure", value: "3-layer BOPP laminate" },
      { label: "Printing", value: "HD gravure" },
      { label: "Finish", value: "Glossy or Matt" },
      { label: "Protection", value: "Scratch-resistant · water-resistant" },
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
    summary: "Filler masterbatch and color options for woven sacks, film, extrusion coating, and molding applications.",
    longDescription:
      "The supplied FILLER images show both the finished KTK bag and the granular material. Use this product to start a specification discussion around base resin, loading, color, and the process where the filler will run.",
    applications: ["Woven sacks", "Blown film", "Extrusion coating", "Injection molding", "Blow molding"],
    specs: [
      { label: "Format", value: "Filler / color masterbatch" },
      { label: "Source", value: "Vietnam limestone" },
      { label: "Use", value: "Film · extrusion · molding" },
    ],
    benefits: [
      { title: "Process-aware supply", detail: "Discuss the grade around your production process and target finish." },
      { title: "Color flexibility", detail: "The supplied image set includes color material examples for a visual starting point." },
      { title: "Inquiry-led specifications", detail: "Contact KTK for grade, loading, and application-specific information." },
    ],
    image: "/assets/products/filler/filler-bag.webp",
    gallery: [media("/assets/products/filler/filler-bag.webp", "KTK filler bag"), media("/assets/products/filler/filler.webp", "Color calcium-carbonate filler material")],
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
    image: null,
    qualityAttributes: ["High Quality Thread", "Food Grade", "Japan"],
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
      { label: "Models shown", value: "5 supplied references" },
      { label: "Support", value: "Parts · maintenance · repair" },
      { label: "Service", value: "1-year service warranty" },
    ],
    benefits: [
      { title: "Portable and conveyor formats", detail: "The gallery includes NP, DS, and KS16 references for different operating setups." },
      { title: "Service-backed supply", detail: "KTK supports parts, maintenance, and repair around the supplied equipment range." },
      { title: "Specification matching", detail: "Confirm the correct model against bag format, thread, and production line requirements." },
    ],
    image: "/assets/products/machinery/newlong/ks16.webp",
    gallery: newlongGallery,
    model: "KS16 · DS-6AC · DS-9C · NP-3II · NP-7",
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
      { label: "Models shown", value: "9 supplied references" },
      { label: "Support", value: "Spare parts · maintenance · repair" },
      { label: "Service", value: "1-year service warranty" },
    ],
    benefits: [
      { title: "A broad supplied set", detail: "The gallery covers FACC-N980AC, FN600A, N-series, and U700C references." },
      { title: "One-stop support", detail: "KTK can support machinery, thread, spare parts, and service conversations together." },
      { title: "Model-led inquiry", detail: "Ask KTK to confirm the correct model for your bag, line, and closure method." },
    ],
    image: "/assets/products/machinery/yaohan/facc-n980ac.webp",
    gallery: yaohanGallery,
    model: "FACC-N980AC · FN600A · N320A · N600A · N980A · others",
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
      { label: "Formats shown", value: "Deep groove · tapered roller" },
      { label: "Distribution", value: "Authorized Myanmar distributor" },
    ],
    benefits: [
      { title: "Two core formats", detail: "The supplied gallery separates deep-groove and tapered roller bearing references." },
      { title: "Industrial fit", detail: "Deep-groove formats support radial and axial load conversations across common equipment." },
      { title: "Local distribution", detail: "KTK provides a Myanmar route for HCH sourcing and inquiry." },
    ],
    image: "/assets/products/bearings/hch/deep-groove.webp",
    gallery: hchGallery,
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
      { label: "Formats shown", value: "Spherical roller · unit bearing" },
      { label: "Product range", value: "2000+ items stated in supplied brief" },
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
