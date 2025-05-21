import { Outlet } from "react-router-dom";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import ScrollToTop from "@/components/ScrollToTop/ScrollToTop";
import Popup from "@/components/Popup/Popup";
import { Toaster } from "@/components/ui/toast/toaster";

const Layout = () => {
  return (
    <div className="pt-24 bg-white min-h-screen">
      <Popup />
      <ScrollToTop />
      <Navbar />
      <Toaster />
      <main>
        <Outlet /> {/* Aquí se renderiza cada página */}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
