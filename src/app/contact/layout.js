export async function generateMetadata() {
  return {
    title: "Contact Us | Get Support & Inquiries - Pick Your Slot",
    description:
      "Need help? Contact Pick Your Slot for customer support, inquiries, or business partnerships. Get in touch with us today!",
    metadataBase: new URL("https://pickyourslot.com"),
    keywords: [
      "Contact Pick Your Slot",
      "customer support",
      "help center",
      "online booking support",
      "inquiries",
      "business partnerships",
      "Chennai customer service",
    ],
    openGraph: {
      title: "Get in Touch with Pick Your Slot | Contact Us Today!",
      description:
        "Have questions or need support? Contact Pick Your Slot for help with bookings, partnerships, or customer service inquiries!",
      url: "https://pickyourslot.com/contact",
      siteName: "Pick Your Slot",
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
    robots: "index, follow",
    alternates: {
      canonical: "https://pickyourslot.com/contact",
    },
  };
}
export default function Layout({ children }) {
  return <>{children}</>;
}
