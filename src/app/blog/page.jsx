import React from "react";
import BlogList from "@/component/Blog/BlogList";
import { getBlogData } from "./layout";
import schema from "@/lib/schema";

async function Page() {
  const blogData = await getBlogData();
  const categories = [...new Set(blogData.map((post) => post.blogCategory))];
  const tags = [
    ...new Set(blogData.flatMap((post) => post.tags?.split(",") || [])),
  ];

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
      <BlogList blogData={blogData} categories={categories} tags={tags} />
    </>
  );
}

export default Page;
