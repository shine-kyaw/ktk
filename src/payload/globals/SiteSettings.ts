import type { GlobalConfig } from "payload";
import { signedIn } from "../access";

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  label: "Site settings",
  admin: {
    group: "Settings",
    description: "Switch whole sections of the website on or off.",
  },
  access: { read: () => true, update: signedIn },
  fields: [
    {
      name: "showNews",
      type: "checkbox",
      defaultValue: false,
      label: "Show the News page",
      admin: {
        description:
          "Adds News to the menu and footer. Leave off until at least one news post is published, or visitors find an empty page.",
      },
    },
    {
      name: "showActivities",
      type: "checkbox",
      defaultValue: true,
      label: "Show the Activities page",
    },
  ],
};
