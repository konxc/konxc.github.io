import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

export const GET: APIRoute = async ({ site }) => {
  if (!site) {
    throw new Error("Site URL is required for sitemap generation");
  }

  // Get all blog posts
  const blogPosts = await getCollection("blog");

  // Get all contributors
  const contributors = await getCollection("contributors");

  // Static pages
  const staticPages = [
    "",
    "about",
    "blog",
    "contributors",
    "events",
    "privacy-policy",
    "cookie-policy",
    "terms-conditions",
  ];

  // Generate sitemap XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticPages
    .map((page) => {
      const url = page === "" ? site.href : `${site.href}${page}`;
      const priority = page === "" ? "1.0" : page === "blog" ? "0.9" : "0.8";
      const changefreq = page === "" || page === "blog" ? "daily" : "weekly";

      return `  <url>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
    })
    .join("\n")}
  ${blogPosts
    .map((post) => {
      const url = `${site.href}blog/${post.slug}`;
      const lastmod = post.data.publishDate.toISOString().split("T")[0];

      return `  <url>
    <loc>${url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
    })
    .join("\n")}
  ${contributors
    .map((contributor) => {
      const url = `${site.href}contributors/${contributor.slug}`;

      return `  <url>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`;
    })
    .join("\n")}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600",
    },
  });
};
