import { Outlet } from "react-router-dom";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import ScrollToTop from "@/components/ScrollToTop/ScrollToTop";
import Popup from "@/components/Popup/Popup";
import { Toaster } from "@/components/ui/toast/toaster";

const Layout = () => {
  return (
    <>
      <Popup />
      <ScrollToTop />
      <Navbar />
      <Toaster />
      <div className="pt-[130px] bg-white min-h-screen">
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
