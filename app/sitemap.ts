import type { MetadataRoute } from "next";

// Placeholder do podmiany po potwierdzeniu docelowej domeny.
const siteUrl = "https://example.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
