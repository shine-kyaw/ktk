import type { CollectionConfig } from "payload";
import { signedIn } from "../access";
import { imageField } from "../fields";
import { PRODUCT_CATEGORIES } from "./Products";

export const ProductCategories: CollectionConfig = {
  slug: "product-categories",
  labels: { singular: "Product category", plural: "Product categories" },
  orderable: true,
  admin: {
    group: "Products",
    useAsTitle: "name",
    defaultColumns: ["name", "tagline", "updatedAt"],
    description:
      "The sections of the Products page — their banner, heading and introduction. Drag rows to change the section order.",
  },
  access: { read: () => true, create: signedIn, update: signedIn, delete: signedIn },
  fields: [
    {
      name: "name",
      type: "select",
      required: true,
      unique: true,
      options: PRODUCT_CATEGORIES.map((value) => ({ label: value, value })),
      admin: { description: "Products are placed in a section by choosing this category on the product." },
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      label: "Section anchor",
      admin: { description: "Used in links such as /products#thread." },
    },
    { name: "tagline", type: "text", required: true, label: "Tagline" },
    { name: "blurb", type: "textarea", required: true, label: "Introduction" },
    ...imageField("banner", "Banner", { description: "The wide campaign banner shown above this section." }),
    {
      name: "bannerCaption",
      type: "text",
      label: "Line above the banner",
      admin: { description: "Optional. Printed just above the banner, e.g. KTK Bag Closing Sewing Thread." },
    },
  ],
};
