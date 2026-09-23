import type { GlobalConfig } from "payload";
import { signedIn } from "../access";
import { textList } from "../fields";

export const PageContent: GlobalConfig = {
  slug: "page-content",
  label: "Page content",
  versions: { max: 20 },
  admin: {
    group: "Settings",
    description: "Headline figures and the short repeating lists used on the Home and About pages.",
  },
  access: { read: () => true, update: signedIn },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Key figures",
          fields: [
            {
              name: "stats",
              type: "array",
              label: "Headline figures (About page)",
              labels: { singular: "Figure", plural: "Figures" },
              admin: { description: "Counted up as the visitor scrolls, e.g. 55 % of Myanmar's PP woven-bag market." },
              fields: [
                {
                  type: "row",
                  fields: [
                    { name: "value", type: "number", required: true, admin: { width: "25%" } },
                    { name: "suffix", type: "text", admin: { width: "15%", description: "e.g. %, M, +" } },
                    { name: "label", type: "text", required: true, admin: { width: "60%" } },
                  ],
                },
                {
                  name: "isYear",
                  type: "checkbox",
                  label: "This figure is a year",
                  admin: { description: "Shows it without thousands separators, e.g. 2008 rather than 2,008." },
                },
              ],
            },
            {
              name: "proof",
              type: "array",
              label: "Proof points (Home page)",
              labels: { singular: "Point", plural: "Points" },
              fields: [
                {
                  type: "row",
                  fields: [
                    { name: "value", type: "text", required: true, admin: { width: "30%", description: "e.g. 15M" } },
                    { name: "label", type: "text", required: true, admin: { width: "70%" } },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: "Why KTK",
          fields: [
            {
              name: "whyPoints",
              type: "array",
              label: "Why KTK (Home page)",
              labels: { singular: "Point", plural: "Points" },
              fields: [
                { name: "title", type: "text", required: true },
                { name: "desc", type: "textarea", required: true, label: "Description" },
              ],
            },
            textList("coreValues", "Core values (About page)"),
            textList("industries", "Industries served", "Shown on the Home and About pages."),
          ],
        },
        {
          label: "Quality & process",
          fields: [
            {
              name: "qualityPillars",
              type: "array",
              label: "Quality pillars (Home page)",
              labels: { singular: "Pillar", plural: "Pillars" },
              fields: [
                { name: "tag", type: "text", required: true, admin: { description: "The short label, e.g. RESIN." } },
                { name: "title", type: "text", required: true },
                { name: "body", type: "textarea", required: true, label: "Description" },
              ],
            },
            {
              name: "processSteps",
              type: "array",
              label: "Production process (Home page)",
              labels: { singular: "Step", plural: "Steps" },
              fields: [
                {
                  type: "row",
                  fields: [
                    { name: "no", type: "text", required: true, label: "Number", admin: { width: "20%" } },
                    { name: "stage", type: "text", required: true, admin: { width: "30%" } },
                    { name: "title", type: "text", required: true, admin: { width: "50%" } },
                  ],
                },
                { name: "body", type: "textarea", required: true, label: "Description" },
              ],
            },
          ],
        },
      ],
    },
  ],
};
