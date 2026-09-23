import type { CollectionConfig } from "payload";
import { publishedOrSignedIn, signedIn } from "../access";
import { imageField, statusField } from "../fields";

export const NEWS_CATEGORIES = ["Company", "Production", "Partnership", "CSR"] as const;

export const News: CollectionConfig = {
  slug: "news",
  labels: { singular: "News post", plural: "News" },
  versions: { maxPerDoc: 20 },
  defaultSort: "-date",
  admin: {
    group: "News & activities",
    useAsTitle: "title",
    defaultColumns: ["title", "category", "date", "status"],
    listSearchableFields: ["title", "excerpt"],
    description:
      "News posts for the News page. The page itself is switched on or off under Settings → Site settings.",
    preview: (doc) => (doc?.slug ? `/blog/${doc.slug}` : null),
  },
  access: { read: publishedOrSignedIn, create: signedIn, update: signedIn, delete: signedIn },
  fields: [
    { name: "title", type: "text", required: true },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
      label: "Web address",
      admin: { description: "The last part of the page address, e.g. new-starlinger-line gives /blog/new-starlinger-line." },
    },
    {
      type: "row",
      fields: [
        {
          name: "date",
          type: "date",
          required: true,
          admin: { width: "50%", date: { pickerAppearance: "dayOnly", displayFormat: "d MMM yyyy" } },
        },
        {
          name: "category",
          type: "select",
          required: true,
          options: NEWS_CATEGORIES.map((value) => ({ label: value, value })),
          admin: { width: "50%" },
        },
      ],
    },
    {
      name: "excerpt",
      type: "textarea",
      required: true,
      label: "Summary",
      admin: { description: "One or two sentences shown on the News page and in search results." },
    },
    ...imageField("image", "Cover image"),
    { name: "content", type: "richText", required: true, label: "Article" },
    statusField,
  ],
};
