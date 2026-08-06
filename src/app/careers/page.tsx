import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = { title: "Careers", robots: { index: false, follow: false } };

export default function CareersPage() {
  notFound();
}
