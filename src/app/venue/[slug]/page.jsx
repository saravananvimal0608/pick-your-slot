import React from "react";
import { notFound } from "next/navigation";
import { getVendorImage, getVendors } from "../layout";
import schema from "@/lib/schema";
import VendorDetails from "@/component/Venue/VendorDetails";
import { ImageUrl } from "@/controller/common";

export async function getVendorSlug(slug) {
  const vendor = await getVendors(slug);
  return vendor[0] || null;
}

export async function getVendorImageKey(VendorId) {
  if (!VendorId) {
    return { imageKeys: [], galleryImages: [] };
  }

  const images = await getVendorImage(VendorId);
  if (Array.isArray(images) && images.length > 0) {
    const imageKeys = images.filter((img) => img?.key).map((img) => img?.key);

    const galleryImages = [];

    return { imageKeys, galleryImages };
  }
  return { imageKeys: [], galleryImages: [] };
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  console.log("Slug", slug);

  const vendor = await getVendors(slug);

  if (!vendor) return {};

  return {
    title: `${vendor[0]?.VendorName}`,
    description: vendor[0]?.Area,
    alternates: {
      canonical: `https://pickyourslot.com/venue/${slug}`,
    },
    openGraph: {
      title: `${vendor[0]?.VendorName}`,
      description: vendor[0]?.Area,
      url: `https://pickyourslot.com/venue/${slug}`,
      images: [
        {
          url: `${ImageUrl}/api/service/rest/photos/getVendorGalleryImagesByKey?KEY=${vendor[0]?.VendorKey}`,
        },
      ],
    },
  };
}
export default async function Page({ params }) {
  const { slug } = await params;

  const vendorDetails = await getVendorSlug(slug);
  if (!vendorDetails) return notFound();

  const { imageKeys, galleryImages } = await getVendorImageKey(
    vendorDetails.VendorId,
  );

  const formatTime = (timeObj) => {
    if (
      !timeObj ||
      typeof timeObj.hour !== "number" ||
      typeof timeObj.minute !== "number"
    )
      return null;
    const pad = (num) => String(num).padStart(2, "0");
    return `${pad(timeObj.hour)}:${pad(timeObj.minute)}`;
  };

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
                item: "https://pickyourslot.com/venue",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: vendorDetails?.VendorName,
                item: `https://pickyourslot.com/venue/${vendorDetails?.slug}`,
              },
            ],
          }),
        }}
      />
      {/* <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: vendorDetails?.VendorName,
            image: "https://pickyorslot.com/pickyourslot.png",
            "@id": "",
            url: `https://pickyourslot.com/venue/${vendorDetails.slug}`,
            // telephone: "+917200008383",
            priceRange: "0",
            address: {
              "@type": "PostalAddress",
              streetAddress: "No.11/198 Mambakkam Main Road, Medavakkam",
              addressLocality: "Chennai",
              postalCode: "600100",
              addressCountry: "IN",
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: 12.9164828,
              longitude: 80.1921594,
            },
            openingHoursSpecification: [
              {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: [
                  "Monday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                  "Tuesday",
                  "Wednesday",
                ],
                opens: "09:00",
                closes: "18:00",
              },
              {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: "Sunday",
                opens: "12:00",
                closes: "18:00",
              },
            ],
            sameAs: [
              "https://www.facebook.com/profile.php?id=61554265561341",
              "https://www.instagram.com/pickyourslot/",
            ],
          }),
        }}
      /> */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: vendorDetails?.VendorName ?? "",
            image: `${ImageUrl}/api/service/rest/photos/getVendorGalleryImagesByKey?KEY=${vendorDetails?.VendorKey}`,
            "@id": "",
            url: `https://pickyourslot.com/venue/${
              vendorDetails?.VendorSlug ?? ""
            }`,
            priceRange: "0",
            address: {
              "@type": "PostalAddress",
              streetAddress: vendorDetails?.Area ?? "",
              addressLocality: vendorDetails?.City ?? "",
              // postalCode: "600100", // If dynamic, replace accordingly
              addressCountry: "IN",
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: vendorDetails?.latitude ?? 0,
              longitude: vendorDetails?.longitude ?? 0,
            },
            openingHoursSpecification: [
              {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                ],
                opens: formatTime(vendorDetails?.OpeningTime) ?? "06:00",
                closes: formatTime(vendorDetails?.ClosingTime) ?? "22:00",
              },
              {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: "Sunday",
                opens: "12:00",
                closes: formatTime(vendorDetails?.ClosingTime) ?? "22:00",
              },
            ],
            // sameAs: [
            //   "https://www.facebook.com/profile.php?id=61554265561341",
            //   "https://www.instagram.com/pickyourslot/",
            // ],
          }),
        }}
      />

      <VendorDetails
        data={vendorDetails}
        imageKey={imageKeys}
        galleryImage={galleryImages}
      />
    </>
  );
}
