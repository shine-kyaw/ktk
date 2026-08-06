import type { Metadata } from "next";
import { Archivo, IBM_Plex_Mono } from "next/font/google";
import { SiteFrame } from "@/components/SiteFrame";
import { COMPANY } from "@/content/company";
import { getSiteUrl, SITE_NAME } from "@/lib/site";
import { getCompany, getSiteVisibility } from "@/lib/cms";
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
  metadataBase: getSiteUrl(),
  title: {
    default: "KTK, Kaung Thu Kha | Industrial Packaging Manufacturer, Myanmar",
    template: "%s · KTK",
  },
  description:
    "Kaung Thu Kha Group Co., Ltd. is Myanmar's industrial packaging manufacturer. Cement sacks and PP woven bags produced on European STARLINGER lines since 2012, plus fillers, thread, bag-closing machinery, and bearings.",
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: "KTK | Industrial Packaging Manufacturer, Myanmar",
    description:
      "Cement sacks, PP woven bags, filler, thread, bag-closing machinery, and bearings from Kaung Thu Kha Group.",
    url: "/",
    images: [{ url: "/brand/ktk-logo.png", alt: "Kaung Thu Kha Group" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "KTK | Industrial Packaging Manufacturer, Myanmar",
    description:
      "Cement sacks, PP woven bags, filler, thread, bag-closing machinery, and bearings from Kaung Thu Kha Group.",
    images: ["/brand/ktk-logo.png"],
  },
  robots: { index: true, follow: true },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [visibility, company] = await Promise.all([getSiteVisibility(), getCompany()]);
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: COMPANY.legalName,
              alternateName: COMPANY.short,
              url: getSiteUrl().toString(),
              logo: new URL("/brand/ktk-logo.png", getSiteUrl()).toString(),
              email: COMPANY.emails[0],
              telephone: COMPANY.phones[0],
              address: {
                "@type": "PostalAddress",
                streetAddress: COMPANY.hq.line1,
                addressLocality: "Yangon",
                addressCountry: "MM",
              },
            }).replace(/</g, "\\u003c"),
          }}
        />
        <SiteFrame visibility={visibility} company={company}>{children}</SiteFrame>
      </body>
    </html>
  );
}
