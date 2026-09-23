import type { Access } from "payload";

/** Any signed-in CMS user. */
export const signedIn: Access = ({ req: { user } }) => Boolean(user);

/**
 * Public read for published content; signed-in editors see everything,
 * including drafts. Collections that use this must have a `status` field.
 */
export const publishedOrSignedIn: Access = ({ req: { user } }) =>
  user ? true : { status: { equals: "published" } };
