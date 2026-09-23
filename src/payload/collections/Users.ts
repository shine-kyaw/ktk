import type { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
  slug: "users",
  labels: { singular: "User", plural: "Users" },
  auth: {
    maxLoginAttempts: 5,
    lockTime: 15 * 60 * 1000,
    tokenExpiration: 8 * 60 * 60,
    removeTokenFromResponses: true,
    cookies: {
      sameSite: "Strict",
      secure: process.env.NODE_ENV === "production",
    },
  },
  admin: {
    useAsTitle: "email",
    defaultColumns: ["name", "email", "updatedAt"],
    listSearchableFields: ["name", "email"],
    group: "Settings",
    hideAPIURL: true,
    description:
      "People who can sign in to edit the website. Five failed sign-ins lock an account for 15 minutes. You cannot delete the account you are signed in with.",
  },
  access: {
    read: ({ req: { user } }) => Boolean(user),
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    // Never let someone delete the account they are using — that is the fastest
    // way to lock a small team out of its own website.
    delete: ({ req: { user }, id }) =>
      Boolean(user) && !(id && String(id) === String(user?.id)),
  },
  fields: [
    { name: "name", type: "text", label: "Name" },
  ],
};
