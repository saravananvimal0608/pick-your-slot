import axios from "axios";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const SITE_URL = "https://pickyourslot.com";
// const API_URL = "https://dad76ee247b6.ngrok-free.app"
const API_URL = "https://pickyourslot.com:8080"

export async function GET() {
  const fetchBlogSlugs = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/api/service/rest/blog/getBlogSlug?ts=${Date.now()}`
      );
      return response.status === 200 ? response.data : [];
    } catch (error) {
      console.error("Failed to fetch blog slugs:", error);
      return [];
    }
  };

  const fetchVendorSlugs = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/api/service/rest/vendor/getVendorSlug?offset=0&limit=1000&ts=${Date.now()}`
      );
      return response.status === 200 ? response.data : [];
    } catch (error) {
      console.error("Failed to fetch vendor slugs:", error);
      return [];
    }
  };

  // Fetch both in parallel
  const [blogSlugs, vendorSlugs] = await Promise.all([
    fetchBlogSlugs(),
    fetchVendorSlugs(),
  ]);

  const staticRoutes = [
    "/",
    "/about",
    "/contact",
    "/blog",
    "/terms-of-service",
    "/privacy-policy",
    "/listyourbussiness",
    "/login",
  ];

  const urls = [
    // Static URLs
    ...staticRoutes.map((path) => ({
      loc: `${SITE_URL}${path}`,
      changefreq: path === "/" ? "daily" : "weekly",
      priority: path === "/" ? "1.0" : "0.8",
    })),

    // Blog URLs
    ...blogSlugs.map((slug) => ({
      loc: `${SITE_URL}/blog/${slug}`,
      changefreq: "weekly",
      priority: "0.8",
    })),

    // Vendor URLs
    ...vendorSlugs.map((slug) => ({
      loc: `${SITE_URL}/vendors/${slug}`,
      changefreq: "weekly",
      priority: "0.7",
    })),
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls
    .map(
      ({ loc, changefreq, priority }) => `
    <url>
      <loc>${loc}</loc>
      <changefreq>${changefreq}</changefreq>
      <priority>${priority}</priority>
    </url>`
    )
    .join("")}
</urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      Expires: "0",
      Pragma: "no-cache",
    },
  });
}
