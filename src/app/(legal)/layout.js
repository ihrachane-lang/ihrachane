
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

export default function LegalLayout({ children }) {
  return (
    <div className="site-shell">
      <Navbar />
      <div className="min-h-screen pt-20 lg:pt-24">{children}</div>
      <Footer />
    </div>
  );
}

