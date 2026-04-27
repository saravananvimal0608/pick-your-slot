import React from "react";
import { notFound } from "next/navigation";
import BlogDetails from "@/component/Blog/BlogDetails";
import { getBlogData, getBlogDataBySlug } from "../layout";
import schema from "@/lib/schema";
import { ImageUrl } from "@/controller/common";

export async function getBlogBySlug(slug) {
  const blogs = await getBlogDataBySlug(slug);
  return blogs[0] || null;
}
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);
  if (!blog) return {};

  return {
    title: `${blog.title}`,
    description: blog.description.replace(/<[^>]*>/g, "").trim(),
    alternates: {
      canonical: `https://pickyourslot.com/blog/${slug}`,
    },
    openGraph: {
      title: blog.title,
      description: blog.description.replace(/<[^>]*>/g, "").trim(),
      url: `https://pickyourslot.com/blog/${blog.slug}`,
      type: "article",
      author: "Pickyourslot",
      images: [
        {
          url: `${ImageUrl}/api/service/rest/photos/getVendorGalleryImagesByKey?KEY=${blog.keyBlog}`,
        },
      ],
    },
  };
}

export default async function Page({ params }) {
  const { slug } = await params;
  const blogDetails = await getBlogBySlug(slug);
  if (!blogDetails) return notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://pickyourslot.com",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Blog",
                item: "https://pickyourslot.com/blog",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: blogDetails.title,
                item: `https://pickyourslot.com/blog/${blogDetails.slug}`,
              },
            ],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema?.localBusiness),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema?.organization),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `https://pickyourslot.com/blog/${blogDetails.slug}`,
            },
            headline: blogDetails.title,
            description: blogDetails.description?.replace(/<[^>]+>/g, ""),
            image: `${ImageUrl}/api/service/rest/photos/getVendorGalleryImagesByKey?KEY=${blogDetails.keyBlog}`,
            author: {
              "@type": "Organization",
              name: "pickyourslot",
            },
            publisher: {
              "@type": "Organization",
              name: "Pickyourslot",
              logo: {
                "@type": "ImageObject",
                url: "https://pickyourslot.com/public/pickyourslot.png",
              },
            },
          }),
        }}
      />
      <BlogDetails blogDetails={blogDetails} />
    </>
  );
}
