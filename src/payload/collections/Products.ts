import type { CollectionConfig } from "payload";
import { publishedOrSignedIn, signedIn } from "../access";
import { galleryField, imageField, statusField, textList } from "../fields";

export const PRODUCT_CATEGORIES = [
  "Cement Sacks",
  "PP Woven Bags",
  "Fillers",
  "Thread",
  "Machinery",
  "Bearings",
] as const;

export const Products: CollectionConfig = {
  slug: "products",
  labels: { singular: "Product", plural: "Products" },
  orderable: true,
  versions: { maxPerDoc: 20 },
  admin: {
    group: "Products",
    useAsTitle: "name",
    defaultColumns: ["name", "category", "status", "featured", "updatedAt"],
    listSearchableFields: ["name", "slug", "summary", "brand"],
    description:
      "Every product page on the website. Drag rows to change the order products appear in. Every save is kept in Versions, so any change can be undone.",
    preview: (doc) => (doc?.slug ? `/products/${doc.slug}` : null),
  },
  access: {
    read: publishedOrSignedIn,
    create: signedIn,
    update: signedIn,
    delete: signedIn,
  },
  fields: [
    {
      type: "row",
      fields: [
        { name: "name", type: "text", required: true, label: "Product name", admin: { width: "60%" } },
        {
          name: "category",
          type: "select",
          required: true,
          options: PRODUCT_CATEGORIES.map((value) => ({ label: value, value })),
          admin: { width: "40%" },
        },
      ],
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
      label: "Web address",
      admin: {
        description:
          "The last part of the page address, e.g. ktk-thread gives /products/ktk-thread. Changing it breaks existing links.",
      },
    },
    {
      type: "tabs",
      tabs: [
        {
          label: "Overview",
          fields: [
            { name: "summary", type: "textarea", required: true, label: "Short summary", admin: { description: "Shown on product cards and at the top of the product page." } },
            { name: "longDescription", type: "textarea", label: "Full description" },
            {
              type: "row",
              fields: [
                { name: "eyebrow", type: "text", label: "Small heading", admin: { width: "50%", description: "The short label above the product name." } },
                { name: "brand", type: "text", admin: { width: "50%" } },
              ],
            },
            {
              type: "row",
              fields: [
                { name: "bestFor", type: "text", label: "Best for", admin: { width: "50%" } },
                { name: "model", type: "text", admin: { width: "50%" } },
              ],
            },
            { name: "uniqueValue", type: "textarea", label: "What sets it apart" },
            { name: "printing", type: "text", label: "Printing" },
            textList("applications", "Applications", "Where the product is used."),
            textList("qualityAttributes", "Quality badges", "Short badges shown on the product card, e.g. Food Grade."),
          ],
        },
        {
          label: "Specifications",
          fields: [
            {
              name: "specs",
              type: "array",
              label: "Specification table",
              labels: { singular: "Row", plural: "Rows" },
              admin: { description: "Label and value pairs. Drag to reorder." },
              fields: [
                {
                  type: "row",
                  fields: [
                    { name: "label", type: "text", required: true, admin: { width: "35%" } },
                    { name: "value", type: "text", required: true, admin: { width: "65%" } },
                  ],
                },
              ],
            },
            {
              name: "benefits",
              type: "array",
              label: "Key benefits",
              labels: { singular: "Benefit", plural: "Benefits" },
              fields: [
                { name: "title", type: "text", required: true },
                { name: "detail", type: "textarea", required: true },
              ],
            },
            {
              name: "variants",
              type: "array",
              label: "Sizes and variants",
              labels: { singular: "Variant", plural: "Variants" },
              fields: [
                { name: "name", type: "text", required: true },
                { name: "description", type: "textarea", required: true },
                textList("attributes", "Attributes"),
              ],
            },
            {
              name: "colorOptions",
              type: "array",
              label: "Colour options",
              labels: { singular: "Colour", plural: "Colours" },
              fields: [
                {
                  type: "row",
                  fields: [
                    { name: "name", type: "text", required: true, admin: { width: "60%" } },
                    {
                      name: "hex",
                      type: "text",
                      required: true,
                      label: "Colour code",
                      admin: { width: "40%", description: "e.g. #C7282D" },
                      validate: (value: string | null | undefined) =>
                        !value || /^#[0-9a-f]{6}$/i.test(value) || "Use a six-digit colour code, e.g. #C7282D",
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: "Images",
          fields: [
            ...imageField("image", "Main image", {
              description: "Shown on product cards and as the first image on the product page.",
            }),
            galleryField(),
          ],
        },
        {
          label: "Documents",
          fields: [
            {
              name: "resources",
              type: "array",
              label: "Certificates and downloads",
              labels: { singular: "Document", plural: "Documents" },
              fields: [
                { name: "label", type: "text", required: true, label: "Title" },
                {
                  name: "url",
                  type: "text",
                  required: true,
                  label: "Link",
                  admin: { description: "A file path such as /assets/…/file.pdf, a page such as /about#certificates, or a full web address." },
                },
                { name: "detail", type: "textarea", label: "Description" },
                { name: "preview", type: "text", label: "Preview image path (optional)" },
              ],
            },
            {
              name: "brochureUrl",
              type: "text",
              label: "Brochure link",
              admin: { description: "Link to a downloadable brochure or specification PDF." },
            },
          ],
        },
      ],
    },
    statusField,
    {
      name: "featured",
      type: "checkbox",
      defaultValue: false,
      label: "Feature on the homepage",
      admin: { position: "sidebar" },
    },
  ],
};
