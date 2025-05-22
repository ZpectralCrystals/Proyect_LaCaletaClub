import { Outlet } from "react-router-dom";

import Footer from "@/components/Footer/Footer";



const LayoutAdmin = () => {
  return (
    <div className="pt-24 bg-white min-h-screen">
      
      
      
      <main>
        <Outlet /> {/* Aquí se renderiza cada página */}
      </main>
      <Footer />
    </div>
  );
};

export default LayoutAdmin;
