import type { Metadata } from "next";
import { Archivo, IBM_Plex_Mono } from "next/font/google";
import { SiteFrame } from "@/components/SiteFrame";
import "./globals.css";

// Body / UI voice — a clean, neutral grotesque.
const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

// Display voice (Archivo Expanded) is loaded via a Google Fonts <link> below —
// the wide, engineered cut of the same Archivo superfamily as the body, so the
// type system is one cohesive family. It is not in this Next version's bundled
// next/font catalog, hence the link.

// Spec / label voice — technical mono for eyebrows, units, fine print.
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "KTK, Kaung Thu Kha | Industrial Packaging Manufacturer, Myanmar",
    template: "%s · KTK",
  },
  description:
    "Kaung Thu Kha Trading Co., Ltd, Myanmar's industrial packaging manufacturer. Cement sacks and PP woven bags produced on European STARLINGER lines since 2012, plus fillers, thread, bag-closing machinery, and bearings.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${archivo.variable} ${plexMono.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Archivo+Expanded:wght@500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <SiteFrame>{children}</SiteFrame>
      </body>
    </html>
  );
}
