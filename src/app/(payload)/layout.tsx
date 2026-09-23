import type { ServerFunctionClient } from "payload";
import config from "@payload-config";
import "@payloadcms/next/css";
import { handleServerFunctions, RootLayout } from "@payloadcms/next/layouts";
import React from "react";

import { importMap } from "./admin/importMap.js";
import { isCmsEnabled } from "@/lib/payload";
import "./custom.scss";
import "./admin-enhancements.scss";

type Args = {
  children: React.ReactNode;
};

const serverFunction: ServerFunctionClient = async function (args) {
  "use server";
  return handleServerFunctions({
    ...args,
    config,
    importMap,
  });
};

const Layout = ({ children }: Args) =>
  // Payload's layout needs a working database. Without one, render the setup
  // screen in a plain document rather than failing the whole /admin route.
  isCmsEnabled() ? (
    <RootLayout config={config} importMap={importMap} serverFunction={serverFunction}>
      {children}
    </RootLayout>
  ) : (
    <html lang="en">
      <body>{children}</body>
    </html>
  );

export default Layout;
