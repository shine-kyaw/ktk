import type { CollectionConfig } from "payload";
import { publishedOrSignedIn, signedIn } from "../access";
import { statusField } from "../fields";

// Short, ordered lists that describe the group. Each is its own collection so
// it gets drag-to-reorder and a clean list view.

const access = { read: publishedOrSignedIn, create: signedIn, update: signedIn, delete: signedIn };

export const GroupCompanies: CollectionConfig = {
  slug: "group-companies",
  labels: { singular: "Group company", plural: "Group companies" },
  orderable: true,
  admin: {
    group: "Company",
    useAsTitle: "name",
    defaultColumns: ["name", "website", "status"],
    description:
      "The companies listed under “Our group companies” on the About page. The About headline counts these automatically.",
  },
  access,
  fields: [
    { name: "name", type: "text", required: true },
    { name: "focus", type: "textarea", required: true, label: "What the company does" },
    {
      name: "website",
      type: "text",
      label: "Website",
      admin: { description: "Optional. Adds a “Visit company website” link." },
    },
    statusField,
  ],
};

export const Milestones: CollectionConfig = {
  slug: "milestones",
  labels: { singular: "Milestone", plural: "Company history" },
  orderable: true,
  admin: {
    group: "Company",
    useAsTitle: "title",
    defaultColumns: ["year", "title", "status"],
    description: "The Company history timeline on the About page, in the order shown. Drag rows to reorder.",
  },
  access,
  fields: [
    {
      type: "row",
      fields: [
        { name: "year", type: "text", required: true, admin: { width: "25%" } },
        { name: "title", type: "text", required: true, admin: { width: "75%" } },
      ],
    },
    { name: "text", type: "textarea", required: true, label: "Description" },
    statusField,
  ],
};

export const Partners: CollectionConfig = {
  slug: "partners",
  labels: { singular: "Partner", plural: "Technology & brand partners" },
  orderable: true,
  admin: {
    group: "Company",
    useAsTitle: "name",
    defaultColumns: ["name", "origin", "status"],
    description: "The partner brands listed on the About page.",
  },
  access,
  fields: [
    {
      type: "row",
      fields: [
        { name: "name", type: "text", required: true, admin: { width: "50%" } },
        { name: "origin", type: "text", required: true, label: "Country / region", admin: { width: "50%" } },
      ],
    },
    { name: "note", type: "text", required: true, label: "Relationship" },
    statusField,
  ],
};

export const Services: CollectionConfig = {
  slug: "services",
  labels: { singular: "Service", plural: "Services" },
  orderable: true,
  versions: { maxPerDoc: 20 },
  admin: {
    group: "Services",
    useAsTitle: "name",
    defaultColumns: ["name", "status"],
    description: "The services listed on the Services page.",
  },
  access,
  fields: [
    { name: "name", type: "text", required: true },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      label: "Identifier",
      admin: { description: "A short unique id, e.g. custom-bag-manufacturing." },
    },
    { name: "summary", type: "textarea", required: true },
    {
      name: "points",
      type: "array",
      label: "Key points",
      labels: { singular: "Point", plural: "Points" },
      fields: [{ name: "value", type: "text", required: true, label: "Text" }],
    },
    statusField,
  ],
};
