"use client";

import { useRowLabel } from "@payloadcms/ui";

/**
 * Names each collapsed gallery row by its alt text, so an editor scanning a
 * twenty-image gallery can find the one they want without opening every row.
 */
export const GalleryRowLabel = () => {
  const { data, rowNumber } = useRowLabel<{ alt?: string; caption?: string }>();
  const position = String((rowNumber ?? 0) + 1).padStart(2, "0");
  const text = data?.caption || data?.alt;
  return <span>{text ? `${position} · ${text}` : `Image ${position}`}</span>;
};

export default GalleryRowLabel;
