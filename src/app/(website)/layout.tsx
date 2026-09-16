import Navbar from "@/components/common/navbar.common";
import Footer from "@/components/common/footer.common";

export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />

      <main>{children}</main>

      <Footer />
    </>
  );
}