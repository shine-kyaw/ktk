import type { CollectionConfig } from "payload";
import { publishedOrSignedIn, signedIn } from "../access";
import { imageField, statusField } from "../fields";

export const Leadership: CollectionConfig = {
  slug: "leadership",
  labels: { singular: "Director", plural: "Directors & management" },
  orderable: true,
  admin: {
    group: "Company",
    useAsTitle: "name",
    defaultColumns: ["name", "title", "status"],
    description:
      "The Directors & management portraits on the About page. Drag rows to change the order they appear.",
  },
  access: { read: publishedOrSignedIn, create: signedIn, update: signedIn, delete: signedIn },
  fields: [
    {
      type: "row",
      fields: [
        { name: "name", type: "text", required: true, admin: { width: "50%" } },
        {
          name: "title",
          type: "text",
          required: true,
          label: "Role",
          defaultValue: "Director",
          admin: { width: "50%", description: "e.g. Chairman, Managing Director, Director." },
        },
      ],
    },
    ...imageField("portrait", "Portrait", {
      description: "A 4:5 portrait works best — the same shape as the others in the row.",
    }),
    statusField,
  ],
};
