import Navbar from "@/components/common/navbar.common";
import Footer from "@/components/common/footer.common";
import NewsletterModal from "@/components/newsletter/newsletter-modal";

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