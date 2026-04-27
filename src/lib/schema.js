const schema = {
  localBusiness: {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Pick your slot",
    image: "https://pickyorslot.com/pickyourslot.png",
    "@id": "",
    url: "https://pickyorslot.com",
    telephone: "+917200008383",
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
  },
  organization: {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Pick your slot",
    url: "https://pickyourslot.com/",
    logo: "https://pickyourslot.com/pickyourslot.png",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91 72000 08383",
      contactType: "customer service",
      contactOption: "TollFree",
      areaServed: "IN",
      availableLanguage: ["Tamil", "en"],
    },
    sameAs: [
      "https://www.facebook.com/profile.php?id=61554265561341",
      "https://www.instagram.com/pickyourslot/",
    ],
  },
};
export default schema;
