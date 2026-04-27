import { BaseUrl, ImageUrl } from "@/controller/common";
import axios from "axios";

export async function generateMetadata() {
  return {
    title: "Blog",
    description:
      "Stay updated with the latest tips, guides, and insights on sports, fitness, events, and online booking with Pick Your Slot Blog!",
    metadataBase: new URL("https://pickyourslot.com"),
    keywords: [
      "Pick Your Slot blog",
      "sports news",
      "fitness tips",
      "event booking",
      "online booking guides",
      "sports blogs",
      "Chennai events",
    ],
    robots: "index, follow",
    openGraph: {
      title:
        "Read the Latest Sports, Fitness & Booking Tips - Pick Your Slot Blog",
      description:
        "Explore expert insights on sports, fitness, event booking, and online reservations. Read the latest articles now!",
      url: "https://pickyourslot.com/blog",
      type: "website",
      images: [
        {
          url: "https://pickyourslot.com/pys.jpg",
          width: 1200,
          height: 630,
          alt: "Pick Your Slot Logo",
        },
      ],
    },
    alternates: {
      canonical: "https://pickyourslot.com/blog",
    },
  };
}
export async function getBlogData() {
  try {
    const response = await axios.get(
      `${BaseUrl}/api/service/rest/blog/getBlog?limit=50&offset=0`
    );
// console.log("response", response.data);
    const data = response.data.map((i) => {
      const slug = i.title.replace(/\s+/g, "-");
      return {
        slug,
        ...i,
      };
    });
    return data;
  } catch (error) {
    console.error("Error fetching blog data:", error);
    return [];
  }
}

export async function getBlogDataBySlug(slug) {
  try {
    const response = await axios.get(
      `${ImageUrl}/api/service/rest/blog/getBlog?slug=${slug}&limit=1&offset=0`
    );
// console.log("response", response.data);
  
    return response.data;
  } catch (error) {
    console.error("Error fetching blog data:", error);
    return [];
  }
}
export default function Layout({ children }) {
  return <>{children}</>;
}
