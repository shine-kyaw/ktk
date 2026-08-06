import type { MetadataRoute } from "next";
import { getActivities, getNewsSlugs, getProductSlugs } from "@/lib/cms";
import { getSiteUrl } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();
  const [products, news, activities] = await Promise.all([getProductSlugs(), getNewsSlugs(), getActivities()]);
  const staticRoutes = ["", "/about", "/manufacturing", "/services", "/products", "/contact"];
  const now = new Date();

  return [
    ...staticRoutes.map((route) => ({
      url: new URL(route || "/", siteUrl).toString(),
      lastModified: now,
      changeFrequency: route === "" ? ("weekly" as const) : ("monthly" as const),
      priority: route === "" ? 1 : route === "/products" ? 0.9 : 0.7,
    })),
    ...products.map((slug) => ({
      url: new URL(`/products/${slug}`, siteUrl).toString(),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...(news.length ? [{ url: new URL("/blog", siteUrl).toString(), lastModified: now, changeFrequency: "monthly" as const, priority: 0.6 }] : []),
    ...news.map((slug) => ({ url: new URL(`/blog/${slug}`, siteUrl).toString(), lastModified: now, changeFrequency: "monthly" as const, priority: 0.6 })),
    ...(activities.length ? [{ url: new URL("/activities", siteUrl).toString(), lastModified: now, changeFrequency: "monthly" as const, priority: 0.5 }] : []),
  ];
}
