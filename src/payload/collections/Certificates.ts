import type { CollectionConfig } from "payload";
import { publishedOrSignedIn, signedIn } from "../access";
import { imageField, statusField } from "../fields";

export const Certificates: CollectionConfig = {
  slug: "certificates",
  labels: { singular: "Certificate", plural: "Certificates" },
  orderable: true,
  versions: { maxPerDoc: 20 },
  admin: {
    group: "Company",
    useAsTitle: "title",
    defaultColumns: ["title", "issuer", "issuedOn", "status"],
    listSearchableFields: ["title", "issuer", "scope"],
    description:
      "Authorisations and certificates shown on the About page. Only publish a certificate once KTK has confirmed it may be shown publicly.",
  },
  access: { read: publishedOrSignedIn, create: signedIn, update: signedIn, delete: signedIn },
  fields: [
    { name: "title", type: "text", required: true },
    {
      type: "row",
      fields: [
        { name: "issuer", type: "text", admin: { width: "60%" } },
        { name: "referenceNumber", type: "text", label: "Reference number", admin: { width: "40%" } },
      ],
    },
    { name: "scope", type: "textarea", label: "What it covers" },
    {
      type: "row",
      fields: [
        {
          name: "issuedOn",
          type: "date",
          label: "Issued",
          admin: { width: "50%", date: { pickerAppearance: "dayOnly", displayFormat: "d MMM yyyy" } },
        },
        {
          name: "expiresOn",
          type: "date",
          label: "Expires",
          admin: { width: "50%", date: { pickerAppearance: "dayOnly", displayFormat: "d MMM yyyy" } },
        },
      ],
    },
    ...imageField("image", "Preview image", { description: "A picture of the certificate, shown beside it." }),
    ...imageField("document", "Full document", {
      description: "The certificate itself, usually a PDF or a full-size image, opened by “View supplied document”.",
    }),
    {
      name: "anchor",
      type: "text",
      label: "Link anchor",
      index: true,
      admin: {
        position: "sidebar",
        description:
          "Product pages link to certificates with this, e.g. /about#<anchor>. Keep it stable once set, or those links break.",
      },
    },
    statusField,
  ],
};
