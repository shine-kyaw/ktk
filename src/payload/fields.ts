import type { Field } from "payload";

// ─────────────────────────────────────────────────────────────────────────
// SHARED FIELD BUILDERS
//
// Keep every collection speaking the same language: one publishing control,
// one way to attach an image, one way to write a repeatable list.
// ─────────────────────────────────────────────────────────────────────────

/** Published / Draft control, shown in the sidebar of every content item. */
export const statusField: Field = {
  name: "status",
  type: "select",
  required: true,
  defaultValue: "published",
  index: true,
  options: [
    { label: "Published — visible on the website", value: "published" },
    { label: "Draft — hidden from the website", value: "draft" },
  ],
  admin: {
    position: "sidebar",
    description: "Drafts are saved but never shown on the public website.",
  },
};

/**
 * An image slot.
 *
 * The site's existing photography ships as static files in /public — around
 * two hundred of them. Copying all of those into the database would exhaust a
 * free Neon plan, so each slot carries two fields:
 *
 *   - `<name>`      an upload from the Media library (what editors use)
 *   - `<name>Src`   the built-in path the image shipped with
 *
 * The website shows the upload when there is one and falls back to the
 * built-in path otherwise, so every existing image keeps working untouched and
 * an editor replaces one simply by uploading.
 */
export function imageField(
  name: string,
  label: string,
  options: { required?: boolean; description?: string } = {},
): Field[] {
  return [
    {
      name,
      type: "upload",
      relationTo: "media",
      label,
      admin: {
        description:
          options.description ??
          "Upload or choose an image. This replaces the built-in image below.",
      },
    },
    {
      name: `${name}Src`,
      type: "text",
      label: `${label} — built-in image`,
      admin: {
        description:
          "The image this item shipped with. Leave it alone: it is used only when nothing is uploaded above.",
        condition: (_, siblingData) => Boolean(siblingData?.[`${name}Src`]),
      },
    },
  ];
}

/** A repeatable list of plain text lines (applications, attributes, …). */
export function textList(name: string, label: string, description?: string): Field {
  return {
    name,
    type: "array",
    label,
    labels: { singular: "Item", plural: "Items" },
    admin: { description, initCollapsed: false },
    fields: [{ name: "value", type: "text", required: true, label: "Text" }],
  };
}

/** A gallery: ordered images, each with alt text and an optional caption. */
export function galleryField(name = "gallery", label = "Gallery"): Field {
  return {
    name,
    type: "array",
    label,
    labels: { singular: "Image", plural: "Images" },
    admin: {
      description: "Drag to reorder. The first image appears first in the gallery.",
      initCollapsed: true,
      components: { RowLabel: "/components/admin/GalleryRowLabel#GalleryRowLabel" },
    },
    fields: [
      ...imageField("image", "Image"),
      {
        name: "alt",
        type: "text",
        required: true,
        label: "Alt text",
        admin: { description: "Describe the image for screen readers and search engines." },
      },
      { name: "caption", type: "text", label: "Caption (optional)" },
    ],
  };
}
