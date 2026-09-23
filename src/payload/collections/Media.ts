import type { CollectionConfig } from "payload";
import { signedIn } from "../access";

export const Media: CollectionConfig = {
  slug: "media",
  labels: { singular: "Image or file", plural: "Media library" },
  admin: {
    group: "Library",
    description:
      "Images and documents uploaded through the CMS. You can also upload straight from any image field while editing.",
    defaultColumns: ["filename", "alt", "updatedAt"],
  },
  access: {
    read: () => true,
    create: signedIn,
    update: signedIn,
    delete: signedIn,
  },
  upload: {
    mimeTypes: ["image/*", "application/pdf", "video/mp4", "video/webm"],
    // Serverless hosts have no writable disk; sizes are generated on demand by
    // the Next image optimiser instead.
    disableLocalStorage: true,
  },
  fields: [
    {
      name: "alt",
      type: "text",
      label: "Alt text",
      admin: { description: "A short description of the image, for screen readers and search engines." },
    },
  ],
};
