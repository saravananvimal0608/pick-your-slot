import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";

// const poppins = Poppins({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
//   weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
//   style: ["normal", "italic"],
// });

export async function generateMetadata() {
  return {
    title: "Online Bookings in Chennai - Find Nearby Services | PickYourSlot",
    description:
      "Pick Your Slot is Chennai's top online booking platform for gyms, salons, sports, and more. Find & book services near you effortlessly!",
    metadataBase: new URL("https://pickyourslot.com"),
    keywords: [
      "Pick Your Slot",
      "Online Booking",
      "Chennai",
      "Gym",
      "Salon",
      "Sports",
      "Services",
      "Appointment",
    ],
    robots: "index, follow",
    openGraph: {
      title: "Pick Your Slot",
      description:
        "Revolutionizing online bookings in Chennai. Find, book, and manage your services effortlessly.",
      url: "https://pickyourslot.com/",
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
      canonical: "https://pickyourslot.com/",
    },
  };
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
