export async function generateMetadata() {
  return {
    title: "About",
    description:
      "Pick Your Slot is Chennai's top online booking platform for gyms, salons, sports, and more. Find & book services near you effortlessly!",
    keywords:
      "Pick Your Slot, Online Booking, Chennai, Gym, Salon, Sports, Services, Appointment",
    openGraph: {
      title: "About Pick Your Slot",
      description:
        "Revolutionizing online bookings in Chennai. Find, book, and manage your services effortlessly.",
      url: "https://pickyourslot.com/about",
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
      canonical: "https://pickyourslot.com/about",
    },
  };
}
export default function Layout({ children }) {
  return <>{children}</>;
}
// https://pickyourslot.com/pys.jpg