import type { Metadata } from "next";
import { Archivo, IBM_Plex_Mono } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "KTK — Kaung Thu Kha | Industrial Packaging Manufacturer, Myanmar",
    template: "%s · KTK",
  },
  description:
    "Kaung Thu Kha Trading Co., Ltd — Myanmar's industrial packaging manufacturer. Cement sacks and PP woven bags produced on European STARLINGER lines since 2012, plus fillers, thread, bag-closing machinery, and bearings.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${archivo.variable} ${plexMono.variable}`}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
