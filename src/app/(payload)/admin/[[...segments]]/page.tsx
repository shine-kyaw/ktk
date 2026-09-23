/* Based on the file Payload generates, plus a setup screen for when the
   database is not configured yet. */
import type { Metadata } from "next";

import config from "@payload-config";
import { generatePageMetadata, RootPage } from "@payloadcms/next/views";
import { importMap } from "../importMap.js";
import { CmsSetup } from "@/components/admin/CmsSetup";
import { isCmsEnabled } from "@/lib/payload";

type Args = {
  params: Promise<{
    segments: string[];
  }>;
  searchParams: Promise<{
    [key: string]: string | string[];
  }>;
};

export const generateMetadata = ({ params, searchParams }: Args): Promise<Metadata> =>
  isCmsEnabled()
    ? generatePageMetadata({ config, params, searchParams })
    : Promise.resolve({ title: "Website admin — setup required" });

const Page = ({ params, searchParams }: Args) =>
  // Without a database Payload cannot start, so show what is missing instead
  // of an unhandled error.
  isCmsEnabled() ? RootPage({ config, params, searchParams, importMap }) : <CmsSetup />;

export default Page;
