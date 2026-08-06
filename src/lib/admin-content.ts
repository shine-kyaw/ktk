export type AdminFieldType = "text" | "textarea" | "number" | "boolean" | "json" | "select" | "date";

export type AdminField = {
  key: string;
  label: string;
  type: AdminFieldType;
  required?: boolean;
  options?: string[];
  help?: string;
};

export type AdminSection = {
  slug: string;
  label: string;
  description: string;
  table: string;
  idField: "id" | "key";
  titleField: string;
  revalidate: string[];
  fields: AdminField[];
};

const status: AdminField = {
  key: "status",
  label: "Publishing status",
  type: "select",
  options: ["draft", "published", "archived"],
  required: true,
  help: "Only published records can appear on the public site.",
};

export const ADMIN_SECTIONS: AdminSection[] = [
  {
    slug: "products",
    label: "Products",
    description: "Catalog entries, technical fields, galleries, variants, documents, and visibility.",
    table: "products",
    idField: "id",
    titleField: "name",
    revalidate: ["/", "/products"],
    fields: [
      { key: "name", label: "Product name", type: "text", required: true },
      { key: "slug", label: "URL slug", type: "text", required: true },
      { key: "category", label: "Category", type: "select", required: true, options: ["Cement Sacks", "PP Woven Bags", "Fillers", "Thread", "Machinery", "Bearings"] },
      { key: "eyebrow", label: "Short label", type: "text" },
      { key: "summary", label: "Card summary", type: "textarea", required: true },
      { key: "long_description", label: "Product overview", type: "textarea" },
      { key: "best_for", label: "Best for", type: "text" },
      { key: "unique_value", label: "What makes it different", type: "textarea" },
      { key: "printing", label: "Printing / finish", type: "text" },
      { key: "brand", label: "Brand", type: "text" },
      { key: "model", label: "Models", type: "text" },
      { key: "image", label: "Primary image URL", type: "text" },
      { key: "brochure_url", label: "Brochure / catalog URL", type: "text" },
      { key: "applications", label: "Applications", type: "json", help: "JSON list, for example [\"Cement\", \"Feed\"]." },
      { key: "specs", label: "Specifications", type: "json", help: "JSON list of {label, value}." },
      { key: "benefits", label: "Benefits", type: "json", help: "JSON list of {title, detail}." },
      { key: "gallery", label: "Gallery", type: "json", help: "JSON list of {src, alt, caption}." },
      { key: "quality_attributes", label: "Quality attributes", type: "json" },
      { key: "variants", label: "Variants", type: "json" },
      { key: "color_options", label: "Color options", type: "json" },
      { key: "material_layers", label: "Material layers", type: "json" },
      { key: "featured", label: "Featured product", type: "boolean" },
      { key: "sort_order", label: "Display order", type: "number" },
      status,
    ],
  },
  {
    slug: "product-categories",
    label: "Product categories",
    description: "Catalog grouping, navigation labels, and category introductions.",
    table: "product_categories",
    idField: "id",
    titleField: "name",
    revalidate: ["/products"],
    fields: [
      { key: "name", label: "Category name", type: "text", required: true },
      { key: "slug", label: "URL anchor", type: "text", required: true },
      { key: "tagline", label: "Tagline", type: "text" },
      { key: "blurb", label: "Introduction", type: "textarea" },
      { key: "sort_order", label: "Display order", type: "number" },
      status,
    ],
  },
  {
    slug: "services",
    label: "Services",
    description: "Service cards, descriptions, and capability points.",
    table: "services",
    idField: "id",
    titleField: "name",
    revalidate: ["/services"],
    fields: [
      { key: "name", label: "Service name", type: "text", required: true },
      { key: "slug", label: "URL slug", type: "text", required: true },
      { key: "summary", label: "Summary", type: "textarea" },
      { key: "points", label: "Service points", type: "json" },
      { key: "sort_order", label: "Display order", type: "number" },
      status,
    ],
  },
  {
    slug: "news",
    label: "Newsroom",
    description: "Approved company updates managed by Thet Wai Soe or an appointed editor.",
    table: "news",
    idField: "id",
    titleField: "title",
    revalidate: ["/", "/blog"],
    fields: [
      { key: "title", label: "Headline", type: "text", required: true },
      { key: "slug", label: "URL slug", type: "text", required: true },
      { key: "date", label: "Publish date", type: "text" },
      { key: "category", label: "Category", type: "select", options: ["Company", "Production", "Partnership", "CSR"] },
      { key: "excerpt", label: "Summary", type: "textarea" },
      { key: "body", label: "Article paragraphs", type: "json" },
      { key: "image", label: "Cover image URL", type: "text" },
      { key: "sort_order", label: "Display order", type: "number" },
      status,
    ],
  },
  {
    slug: "activities",
    label: "Activities / CSR",
    description: "Approved event, training, exhibition, and CSR entries.",
    table: "activities",
    idField: "id",
    titleField: "title",
    revalidate: ["/", "/activities"],
    fields: [
      { key: "title", label: "Activity title", type: "text", required: true },
      { key: "slug", label: "URL slug", type: "text", required: true },
      { key: "category", label: "Category", type: "select", options: ["CSR", "Events", "Exhibitions", "Training"] },
      { key: "date", label: "Date", type: "text" },
      { key: "detail", label: "Approved caption", type: "textarea" },
      { key: "image", label: "Cover image URL", type: "text" },
      { key: "sort_order", label: "Display order", type: "number" },
      status,
    ],
  },
  {
    slug: "company-content",
    label: "Company & site settings",
    description: "Company profile, stats, milestones, contact information, and other structured site blocks.",
    table: "singletons",
    idField: "key",
    titleField: "key",
    revalidate: ["/", "/about", "/contact", "/manufacturing"],
    fields: [
      { key: "key", label: "Content block key", type: "text", required: true },
      { key: "data", label: "Structured content", type: "json", required: true },
      status,
    ],
  },
  {
    slug: "management",
    label: "Management team",
    description: "Approved leadership portraits, roles, and biographies.",
    table: "management",
    idField: "id",
    titleField: "name",
    revalidate: ["/about"],
    fields: [
      { key: "name", label: "Full name", type: "text", required: true },
      { key: "title", label: "Job title", type: "text", required: true },
      { key: "bio", label: "Short biography", type: "textarea" },
      { key: "image", label: "Portrait URL", type: "text" },
      { key: "sort_order", label: "Display order", type: "number" },
      status,
    ],
  },
  {
    slug: "certificates",
    label: "Certificates & authorizations",
    description: "Publication-controlled certificates, brand letters, and supporting documents.",
    table: "certificates",
    idField: "id",
    titleField: "title",
    revalidate: ["/about"],
    fields: [
      { key: "title", label: "Document title", type: "text", required: true },
      { key: "issuer", label: "Issuer", type: "text" },
      { key: "reference_number", label: "Reference / certificate number", type: "text" },
      { key: "scope", label: "Scope", type: "textarea" },
      { key: "issued_on", label: "Issue date", type: "date" },
      { key: "expires_on", label: "Expiry date", type: "date" },
      { key: "image", label: "Preview image URL", type: "text" },
      { key: "document_url", label: "Document URL", type: "text" },
      { key: "permission_confirmed", label: "Publication permission confirmed", type: "boolean" },
      { key: "sort_order", label: "Display order", type: "number" },
      status,
    ],
  },
  {
    slug: "media-library",
    label: "Media library",
    description: "Approved web images and PDF documents with alt text, captions, and publication status.",
    table: "media_library",
    idField: "id",
    titleField: "file_name",
    revalidate: ["/"],
    fields: [
      { key: "file_name", label: "File name", type: "text", required: true },
      { key: "public_url", label: "File URL", type: "text", required: true },
      { key: "mime_type", label: "MIME type", type: "text", required: true },
      { key: "size_bytes", label: "File size (bytes)", type: "number", required: true },
      { key: "alt_text", label: "Alternative text", type: "textarea" },
      { key: "caption", label: "Caption / source note", type: "textarea" },
      status,
    ],
  },
];

export function getAdminSection(slug: string): AdminSection | undefined {
  return ADMIN_SECTIONS.find((section) => section.slug === slug);
}

export function sanitizeAdminPayload(section: AdminSection, input: unknown): Record<string, unknown> {
  if (!input || typeof input !== "object" || Array.isArray(input)) throw new Error("Invalid record payload.");
  const source = input as Record<string, unknown>;
  const output: Record<string, unknown> = {};

  for (const field of section.fields) {
    let value = source[field.key];
    if (field.required && (value === undefined || value === null || value === "")) {
      throw new Error(`${field.label} is required.`);
    }
    if (value === undefined) continue;
    if (field.type === "number") {
      value = Number(value || 0);
      if (!Number.isFinite(value)) throw new Error(`${field.label} must be a valid number.`);
    }
    if (field.type === "boolean") value = value === true;
    if (field.type === "json" && typeof value === "string") {
      try {
        value = JSON.parse(value);
      } catch {
        throw new Error(`${field.label} must contain valid JSON.`);
      }
    }
    if (["text", "textarea", "select", "date"].includes(field.type) && value !== null) {
      value = String(value).trim();
      if ((value as string).length > 200_000) throw new Error(`${field.label} is too long.`);
    }
    if (field.key === "slug" && value && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(String(value))) {
      throw new Error("URL slug must use lowercase letters, numbers, and single hyphens.");
    }
    if (field.key === "status" && !["draft", "published", "archived"].includes(String(value))) {
      throw new Error("Invalid publishing status.");
    }
    output[field.key] = value;
  }
  return output;
}
