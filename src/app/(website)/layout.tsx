import type { Metadata } from "next";

import Navbar from "@/components/common/navbar.common";
import Footer from "@/components/common/footer.common";
import NewsletterModal from "@/components/newsletter/newsletter-modal";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ||
      "http://localhost:3000"
  ),

  title: {
    default: "TACSFON LAUTECH",
    template: "%s | TACSFON LAUTECH",
  },

  description:
    "The Apostolic Church Students' Fellowship of Nigeria, LAUTECH Chapter — a community of students growing together through worship, prayer, fellowship and the Word of God.",

  applicationName: "TACSFON LAUTECH",

  keywords: [
    "TACSFON",
    "TACSFON LAUTECH",
    "LAUTECH Christian Fellowship",
    "LAUTECH Fellowship",
    "Student Fellowship LAUTECH",
    "Christian Fellowship Ogbomoso",
    "The Apostolic Church Students Fellowship of Nigeria",
  ],

  authors: [
    {
      name: "TACSFON LAUTECH",
    },
  ],

  creator: "TACSFON LAUTECH",
  publisher: "TACSFON LAUTECH",

  openGraph: {
    type: "website",
    locale: "en_NG",
    siteName: "TACSFON LAUTECH",

    title: "TACSFON LAUTECH",

    description:
      "A community of students growing together through worship, prayer, fellowship and the Word of God.",

    images: [
      {
        url: "/images/church-hero.jpg",
        width: 1200,
        height: 630,
        alt: "TACSFON LAUTECH",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "TACSFON LAUTECH",

    description:
      "A community of students growing together through worship, prayer, fellowship and the Word of God.",

    images: ["/images/church-hero.jpg"],
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  category: "religion",
};

export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />

      <NewsletterModal />

      <main>{children}</main>

      <Footer />
    </>
  );
}