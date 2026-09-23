import type { GlobalConfig } from "payload";
import { signedIn } from "../access";
import { imageField, textList } from "../fields";

export const Company: GlobalConfig = {
  slug: "company",
  label: "Company details",
  versions: { max: 20 },
  admin: {
    group: "Settings",
    description:
      "Contact details, address and company profile used across the whole website — the footer, the Contact page and the About page.",
  },
  access: { read: () => true, update: signedIn },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Contact",
          fields: [
            {
              name: "phones",
              type: "array",
              label: "Phone numbers",
              labels: { singular: "Number", plural: "Numbers" },
              fields: [{ name: "value", type: "text", required: true, label: "Number" }],
            },
            {
              type: "row",
              fields: [
                { name: "viber", type: "text", label: "Viber number", admin: { width: "50%" } },
                { name: "facebook", type: "text", label: "Facebook page link", admin: { width: "50%" } },
              ],
            },
            textList("emails", "Email addresses"),
            {
              name: "contacts",
              type: "array",
              label: "Named contacts",
              labels: { singular: "Contact", plural: "Contacts" },
              admin: { description: "The people listed on the Contact page." },
              fields: [
                {
                  type: "row",
                  fields: [
                    { name: "name", type: "text", required: true, admin: { width: "35%" } },
                    { name: "title", type: "text", required: true, label: "Role", admin: { width: "35%" } },
                    { name: "phone", type: "text", required: true, admin: { width: "30%" } },
                  ],
                },
              ],
            },
            {
              name: "responseTimes",
              type: "group",
              label: "Response times",
              fields: [
                {
                  type: "row",
                  fields: [
                    { name: "email", type: "text", label: "By email", admin: { width: "50%" } },
                    { name: "phone", type: "text", label: "By phone", admin: { width: "50%" } },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: "Address & hours",
          fields: [
            {
              name: "hq",
              type: "group",
              label: "Head office address",
              fields: [
                { name: "line1", type: "text", label: "Street" },
                { name: "line2", type: "text", label: "Area, city, country" },
              ],
            },
            { name: "mapsUrl", type: "text", label: "Google Maps link" },
            { name: "officeHours", type: "text", label: "Office hours" },
          ],
        },
        {
          label: "Company profile",
          fields: [
            {
              type: "row",
              fields: [
                { name: "legalName", type: "text", label: "Legal name", admin: { width: "50%" } },
                { name: "group", type: "text", label: "Group name", admin: { width: "30%" } },
                { name: "short", type: "text", label: "Short name", admin: { width: "20%" } },
              ],
            },
            { name: "tagline", type: "text" },
            { name: "oneLiner", type: "textarea", label: "One-line description", admin: { description: "Used in search results and link previews." } },
            {
              name: "executiveSummary",
              type: "array",
              label: "About introduction",
              labels: { singular: "Paragraph", plural: "Paragraphs" },
              admin: { description: "The opening paragraphs of the About page." },
              fields: [{ name: "value", type: "textarea", required: true, label: "Paragraph" }],
            },
            textList("businessActivities", "Business activities"),
            textList("industrialProducts", "Industrial components & machinery", "The first list under “Products & services” on the About page."),
            textList("packagingProducts", "Packaging solutions", "The second list under “Products & services” on the About page."),
            textList("reasons", "Why choose KTK", "The reasons listed on the About page."),
            {
              type: "row",
              fields: [
                { name: "foundedTrading", type: "number", label: "Founded", admin: { width: "33%" } },
                { name: "foundedManufacturing", type: "number", label: "Manufacturing since", admin: { width: "33%" } },
                { name: "factory", type: "text", label: "Factory name", admin: { width: "34%" } },
              ],
            },
          ],
        },
        {
          label: "Team photos",
          fields: [
            {
              name: "teamPortraits",
              type: "array",
              label: "Sales & Marketing team",
              labels: { singular: "Portrait", plural: "Portraits" },
              admin: { description: "The team photos on the About page. Drag to reorder." },
              fields: [...imageField("image", "Portrait", { required: true })],
            },
          ],
        },
      ],
    },
  ],
};
