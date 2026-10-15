import type { CollectionConfig } from "payload";
import { publishedOrSignedIn, signedIn } from "../access";
import { galleryField, imageField, statusField } from "../fields";

export const ACTIVITY_CATEGORIES = ["CSR", "Events", "Exhibitions", "Training", "Commercial"] as const;

export const Activities: CollectionConfig = {
  slug: "activities",
  labels: { singular: "Activity", plural: "Activities" },
  orderable: true,
  versions: { maxPerDoc: 20 },
  admin: {
    group: "News & activities",
    useAsTitle: "title",
    defaultColumns: ["title", "category", "date", "status"],
    listSearchableFields: ["title", "detail"],
    description:
      "Company events, CSR programmes and commercials on the Activities page. Drag rows to reorder within the page.",
  },
  access: { read: publishedOrSignedIn, create: signedIn, update: signedIn, delete: signedIn },
  fields: [
    {
      type: "row",
      fields: [
        { name: "title", type: "text", required: true, admin: { width: "60%" } },
        {
          name: "category",
          type: "select",
          required: true,
          options: ACTIVITY_CATEGORIES.map((value) => ({ label: value, value })),
          admin: { width: "40%", description: "Decides which heading it appears under." },
        },
      ],
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      label: "Identifier",
      admin: { description: "A short unique id, e.g. team-dinner-2019." },
    },
    {
      name: "date",
      type: "text",
      required: true,
      label: "Date shown",
      admin: { description: "Free text, e.g. 5 October 2019, January–February 2022, or Company archive." },
    },
    { name: "detail", type: "textarea", required: true, label: "Description" },
    {
      type: "tabs",
      tabs: [
        {
          label: "Photos",
          fields: [
            ...imageField("image", "Cover image"),
            galleryField("gallery", "More photos"),
          ],
        },
        {
          label: "Video",
          fields: [
            ...imageField("video", "Video file", {
              description: "An MP4 shown in a player under the photos. Very large files are better hosted on YouTube or Google Drive and linked below.",
            }),
            ...imageField("videoPoster", "Video poster image", {
              description: "The still shown before the video plays.",
            }),
            {
              name: "externalVideoUrl",
              type: "text",
              label: "Embedded video link",
              admin: {
                description:
                  "Instead of a file: an embeddable link, e.g. https://drive.google.com/file/d/<id>/preview. Shown in place of the cover image.",
              },
            },
          ],
        },
        {
          label: "Source",
          fields: [
            {
              name: "sourceUrl",
              type: "text",
              label: "Source link",
              admin: { description: "Optional. Adds a “View full album” link, e.g. to the full photo album." },
            },
          ],
        },
      ],
    },
    statusField,
  ],
};
