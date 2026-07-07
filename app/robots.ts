import type { MetadataRoute } from "next";

// Placeholder do podmiany po potwierdzeniu docelowej domeny.
const siteUrl = "https://example.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
