import { Outlet } from "react-router-dom";
import Footer from "@/components/Footer/Footer";
import ScrollToTop from "@/components/ScrollToTop/ScrollToTop";
import Popup from "@/components/Popup/Popup";
import { Toaster } from "sonner"; 
import Navbar from "../Navbar/Navbar";

const Layout = () => {
  return (
    <>
      <Popup />
      <ScrollToTop />
      <Navbar />
      <Toaster />
      <div className="pt-[100px] bg-white min-h-screen">
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
