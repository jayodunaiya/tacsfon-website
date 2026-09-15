import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import FooterCommon from "@/components/common/footer.common";
import NavbarCommon from "@/components/common/navbar.common";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TACSFON LAUTECH",
  description: "The official website of The Apostolic Church Students Fellowship, LAUTECH Chapter. We are a community of students who are passionate about spreading the gospel of Jesus Christ and making a positive impact in our university and society.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <NavbarCommon />
        {children}
        <FooterCommon />
      </body>
    </html>
  );
}
